import { TextEncoder } from "util";
import { Disposable, TextDocument, Uri, ViewColumn, Webview, WebviewPanel, window, workspace } from "vscode";
const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });


export class DotPreviewPanel {
  // 所有的 panel
  private static _panels: Map<Uri, DotPreviewPanel> = new Map() ;
  public static extensionUri: Uri;

  private _disposables: Disposable[] = [];
  private _panel: WebviewPanel;

  private _document: TextDocument;
  private _engine: string;

  constructor(document: TextDocument, title: string, engine?: string) {
    this._document = document;
    this._engine = engine || 'dot';
    this._panel = window.createWebviewPanel(
      "preview",
      title,
      ViewColumn.Beside,
      {
        enableScripts: true,
      }
    );
    this._panel.iconPath = Uri.joinPath(DotPreviewPanel.extensionUri, 'media', 'icon.png');
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, title, '<vscode-progress-ring></vscode-progress-ring>');
    this._setWebviewMessageListener(this._panel.webview);
  }

  public dispose() {
    this._panel.dispose();
    DotPreviewPanel._panels.delete(this._document.uri);

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;

        switch (command) {
          case "switch-engine":
            this._engine = message.text;
          case 'refresh':
            this._refresh();
            break;
          case 'back':
            break;
          case 'save':
            const document = workspace.textDocuments.find(doc => doc.uri == this._document.uri);
            if(document) DotPreviewPanel.save(document);
            break;
        }
      },
      undefined,
      this._disposables
    );
  }

  private _getWebviewContent(webview: Webview, title: string, svgOrError: string): string {
    const toolkitUri = webview.asWebviewUri(
      Uri.joinPath(DotPreviewPanel.extensionUri, 'node_modules', '@vscode', 'webview-ui-toolkit', 'dist', 'toolkit.js')
    );
    const mainUri = webview.asWebviewUri(
      Uri.joinPath(DotPreviewPanel.extensionUri, 'media', 'main.js')
    );
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(DotPreviewPanel.extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css')
    );

    // 用一种很恶心的方式来将 engine 传过去。
    let dic : {[key:string]:string} = {
      "dot": '', "circo": '', "fdp": '', "neato": '', "osage": '', "twopi": ''
    };
    dic[this._engine] = 'selected';

    return /*html */ `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>${title}</title>
          <script src="viz.js"></script>
          <script src="full.render.js"></script>

          <script type="module" src="${toolkitUri}"></script>
          <script type="module" src="${mainUri}"></script>
          <link href="${codiconsUri}" rel="stylesheet" />
        </head>
        <body >
          <div id="toolbar" style="width: 100%; z-index: 99; position: fixed">
            <vscode-button id="back" appearance="icon" aria-label="back">
              <span class="codicon codicon-arrow-small-left"></span>
            </vscode-button>
            <vscode-button id="refresh" appearance="icon" aria-label="refresh">
              <span class="codicon codicon-refresh"></span>
            </vscode-button>
            <vscode-button id="save" appearance="icon" aria-label="save">
              <span class="codicon codicon-save"></span>
            </vscode-button>
          
            <vscode-dropdown id="selector">
              <vscode-option ${dic["dot"]} value="dot">dot</vscode-option>
              <vscode-option ${dic["circo"]} value="circo">circo</vscode-option>
              <vscode-option ${dic["fdp"]} value="fdp">fdp</vscode-option>
              <vscode-option ${dic["neato"]} value="neato">neato</vscode-option>
              <vscode-option ${dic["osage"]} value="osage">osage</vscode-option>
              <vscode-option ${dic["twopi"]} value="twopi">twopi</vscode-option>
            </vscode-dropdown>
          </div>
          
          <div id="container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            ${svgOrError}
          </div>
        </body>
      </html>
    `;
  }

  private _render(document: TextDocument) {
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, 
      this._panel.title, '<vscode-progress-ring></vscode-progress-ring>');
    
    viz.renderString(document.getText(), { engine: this._engine }).then((svg: string) => {
      this._panel.webview.html = this._getWebviewContent(this._panel.webview, 
        this._panel.title, 
        svg);

      // if (!this._panel.visible) this._panel.reveal();
      this._panel.reveal();

    }).catch((err: any) => {
      window.showErrorMessage(`${err}`);
      viz = new Viz({ Module, render });
      this._panel.webview.html = this._getWebviewContent(this._panel.webview, this._panel.title, err);
    });

  }

  private _refresh() {
    // 查找文档并重新渲染。
    const document = workspace.textDocuments.find((doc) => doc.uri == this._document.uri);
    
    if(document) {
      // 如果源文件关闭了，则找不到。
      this._document = document;
      this._render(document);
    }
    else {
      workspace.openTextDocument(this._document.uri).then(document => {
        this._document = document;
        this._render(this._document);
      });  
    }
  }

  public static preview(title: string, document: TextDocument) {
    let panel = DotPreviewPanel._panels.get(document.uri);
    if(! panel) {
      panel = new DotPreviewPanel(document, title);
      DotPreviewPanel._panels.set(document.uri, panel);
    }
    panel._panel.title = title;

    panel._render(document);
  }

  public static async save(document: TextDocument) {
    const engine = await window.showQuickPick(["dot", "circo", "fdp", "neato", "osage", "twopi"], {
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

    if (uri) {
      let result: string;
      try {
        result = await viz.renderString(document.getText(), { engine, format });
        workspace.fs.writeFile(uri, new TextEncoder().encode(result));
        window.showInformationMessage(`save to file ${uri.toString()}`);
      }
      catch (err) {
        window.showErrorMessage(`${err}`);
      }
    }

  }

}

