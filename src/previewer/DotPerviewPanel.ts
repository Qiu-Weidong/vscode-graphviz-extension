import { TextEncoder } from "util";
import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn, workspace } from "vscode";
const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });


/**
 * This class manages the state and behavior of HelloWorld webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering HelloWorld webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 * - Setting message listeners so data can be passed between the webview and extension
 */
export class DotPreviewPanel {
  public static currentPanel: DotPreviewPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  private _currentContent: string;
  private _engine: string;

  /**
   * The DotPreviewPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  private constructor(panel: WebviewPanel, extensionUri: Uri, title: string, engine: string, content?: string) {
    this._panel = panel;

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // 设置图标
    this._panel.iconPath = Uri.joinPath(extensionUri, 'media', 'icon.png');

    this._currentContent = '';

    this._engine = engine;

    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview);

    if(content) {
      this._render(title, content, extensionUri);
    }
    else {
      this._panel.webview.html = this._getWebviewWaitingContent(this._panel.webview, extensionUri, title);
    }
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static async preview(extensionUri: Uri, title: string, content: string) {
    content = content.trim();
    title = title.trim();

    if (!DotPreviewPanel.currentPanel) {
      // 选择引擎，创建的时候就要选择引擎
      const engine = await window.showQuickPick(["dot", "circo", "fdp", "neato", "osage", "twopi"], {
        title: 'choose a engine, dot is default',
        placeHolder: 'choose a engine, dot is default'
      });

      // 创建 panel
      const panel = window.createWebviewPanel(
        // Panel view type
        "preview",
        // Panel title
        title,
        // The editor column the panel should be displayed in
        ViewColumn.Beside,
        // Extra panel configurations
        {
          // Enable JavaScript in the webview
          enableScripts: true,
        }
      );
      // 设置 currentPanel
      DotPreviewPanel.currentPanel = new DotPreviewPanel(panel, extensionUri, title, engine || 'dot');
    }

    // 这里已经确定创建了 panel。
    if (DotPreviewPanel.currentPanel._currentContent != content) {
      // 重新渲染
      DotPreviewPanel.currentPanel._render(title, content, extensionUri);
    }
  }

  public static async save(title: string, content: string) {
    const engine = await window.showQuickPick(["dot", "circo", "fdp", "neato", "osage", "twopi"],{
      title: 'choose a engine, dot is default',
      placeHolder: 'choose a engine, dot is default'
    }) || 'dot';
    const format = await window.showQuickPick(["svg", "dot", "xdot", "plain", "plain-ext", "ps", "ps2", "json", "json0"], {
      title: 'choose a format, svg is default',
      placeHolder: 'choose a format, svg is default'
    }) || 'svg';
    const uri = await window.showSaveDialog({
      filters: { 'images': [format] }
    });

    if(uri) {
      let result: string ;
      try {
        result = await viz.renderString(content, { engine, format });
        workspace.fs.writeFile(uri, new TextEncoder().encode(result));
        window.showInformationMessage(`save to file ${uri.toString()}`);
      } 
      catch(err) {
        window.showErrorMessage(`${err}`);
      }
    }

  }

  private _render(title: string, content: string, extensionUri: Uri) {
    // 首先将内容设置为 waiting
    this._panel.webview.html = this._getWebviewWaitingContent(this._panel.webview, extensionUri, title);


    viz.renderString(content, { engine: this._engine || 'dot' }).then((svg: string) => {
      this._currentContent = content;
      this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, title, svg);
      this._panel.title = title;

      if(! this._panel.visible) this._panel.reveal();

    }).catch((err: any) => {
      window.showErrorMessage(`${err}`);
      viz = new Viz({ Module, render });

      this._currentContent = '';
      this._panel.webview.html = this._getWebviewErrorContent(this._panel.webview, extensionUri, title, err);
      this._panel.title = title;
    });
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    DotPreviewPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // 在这里进行一些善后处理

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to CSS and JavaScript files/packages
   * (such as the Webview UI Toolkit) are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri, title: string, svg: string) {
    // 找到 toolkit.js ， 还要 asWebviewUri
    const toolkitUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', '@vscode', 'webview-ui-toolkit', 'dist', 'toolkit.js')
    );
    // 找到 main.js
    const mainUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'media', 'main.js')
    );

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script type="module" src="${toolkitUri}"></script>
          <script type="module" src="${mainUri}"></script>
          <title>${title}</title>
        </head>
        <body>
        <div id="container" style="display: flex;justify-content: center; align-items: center; height: 100vh">
        ${svg}
        </div>
        </body>
      </html>
    `;
  }

  private _getWebviewWaitingContent(webview: Webview, extensionUri: Uri, title: string) {
    const imgUri = webview.asWebviewUri(Uri.joinPath(extensionUri, 'media', 'images', 'loader2.gif'));
    return /*html*/ `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
        </head>
        <body>
        <div id="container" style="display: flex;justify-content: center; align-items: center; height: 100vh">
          
          <img src="${imgUri}" />
        </div>
        </body>
      </html>
    `;
  }

  private _getWebviewErrorContent(webview: Webview, extensionUri: Uri, title: string, err: string) {
    return /*html*/ `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
        </head>
        <body>
        <div id="container" style="display: flex;justify-content: center; align-items: center; height: 100vh">
          ${err}
        </div>
        </body>
      </html>
    `;
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "hello":
            // Code that should run in response to the hello message command
            window.showInformationMessage(text);
            break;
          // Add more switch case statements here as more webview message commands
          // are created within the webview context (i.e. inside media/main.js)
        }
      },
      undefined,
      this._disposables
    );
  }
}
