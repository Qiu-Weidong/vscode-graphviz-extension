import { TextEncoder } from "util";
import { Disposable, TextDocument, Uri, ViewColumn, Webview, WebviewPanel, window, workspace } from "vscode";
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

let viz = new Viz({ Module, render });


export class DotPreviewPanel {
  // 所有的 panel, 不要用 uri 做主键
  private static _panels: Map<string, DotPreviewPanel> = new Map();
  private static _uniquePanel: DotPreviewPanel | undefined = undefined;
  public static extensionUri: Uri;

  private _disposables: Disposable[] = [];
  private _panel: WebviewPanel;

  private _document: TextDocument;
  private _engine: string;
  private _history: { document: TextDocument, engine: string }[];

  constructor(document: TextDocument, title: string, engine?: string) {
    this._document = document;
    this._engine = engine || 'dot';
    this._history = [] /*[ { document, engine: this._engine } ];*/

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
    if (this == DotPreviewPanel._uniquePanel) DotPreviewPanel._uniquePanel = undefined;

    this._panel.dispose();
    DotPreviewPanel._panels.delete(this._document.uri.toString());

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
            this._history.push({ document: this._document, engine: this._engine });
            this._engine = message.text;
          case 'refresh':
            this._render();
            break;
          case 'back':
            this._back();
            break;
          case 'save':
            DotPreviewPanel.save(this._document);
            break;
        }
      },
      undefined,
      this._disposables
    );
  }

  private _back() {
    const item = this._history.pop();
    if (item) {
      this._document = item.document;
      this._engine = item.engine;
      this._render();
    }
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
    let dic: { [key: string]: string } = {
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

  private _render() {
    this._panel.webview.html = this._getWebviewContent(this._panel.webview,
      this._panel.title, '<vscode-progress-ring></vscode-progress-ring>');

    viz.renderString(this._document.getText(), { engine: this._engine }).then((svg: string) => {
      this._panel.webview.html = this._getWebviewContent(this._panel.webview,
        this._panel.title,
        svg);
      // this._panel.reveal();

    }).catch((err: any) => {
      window.showErrorMessage(`${err}`);
      viz = new Viz({ Module, render });
      this._panel.webview.html = this._getWebviewContent(this._panel.webview, this._panel.title, err);
    });

  }



  public static previewInUniquePanel(document: TextDocument) {
    if (!DotPreviewPanel._uniquePanel) {
      DotPreviewPanel._uniquePanel = new DotPreviewPanel(document, 'graphviz');
      DotPreviewPanel._uniquePanel._render();
      if(! DotPreviewPanel._uniquePanel._panel.visible)
      DotPreviewPanel._uniquePanel._panel.reveal();
    }
    else {
      const panel = DotPreviewPanel._uniquePanel;
      panel._history.push({ document: panel._document, engine: panel._engine });
      panel._document = document;
      panel._render();
      if(! panel._panel.visible)
      panel._panel.reveal();
    }
  }


  // 将 panel 和 document 关联起来。
  public static preview(title: string, document: TextDocument) {
    let panel = DotPreviewPanel._panels.get(document.uri.toString());

    if (!panel) {
      panel = new DotPreviewPanel(document, title);
      DotPreviewPanel._panels.set(document.uri.toString(), panel);
    }
    panel._panel.title = title;
    panel._document = document;

    panel._render();
  }

  public static async save(document: TextDocument) {
    const engine = await window.showQuickPick(["dot", "circo", "fdp", "neato", "osage", "twopi"], {
      title: 'choose a engine, dot is default',
      placeHolder: 'choose a engine, dot is default'
    });
    if (!engine) return;

    const format = await window.showQuickPick(["svg", "dot", "xdot", "plain", "plain-ext", "ps", "ps2", "json", "json0"], {
      title: 'choose a format, svg is default',
      placeHolder: 'choose a format, svg is default'
    });

    if (!format) return;

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

  public static updateDocument(document: TextDocument) {
    const panel = DotPreviewPanel._panels.get(document.uri.toString());
    if (panel) {
      panel._document = document;
      panel._render();
    }

    if (DotPreviewPanel._uniquePanel) {
      const uri = DotPreviewPanel._uniquePanel._document.uri.toString();
      const uri2 = document.uri.toString();
      if (uri == uri2) {
        DotPreviewPanel._uniquePanel._document = document;
        DotPreviewPanel._uniquePanel._render();
      }

    }
  }

}

