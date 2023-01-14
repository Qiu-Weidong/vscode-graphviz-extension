import { Disposable, TextDocument, Uri, ViewColumn, Webview, WebviewPanel, window } from "vscode";
const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });



export class DotPreviewer {
  private _panels: Map<Uri, DotPreviewPanel>;
  private _extensionUri: Uri;

  constructor(extensionUri: Uri) {
    this._panels = new Map();
    this._extensionUri = extensionUri;
  }


  public preview(title: string, document: TextDocument) {
    let panel = this._panels.get(document.uri);
    if(! panel) {
      panel = new DotPreviewPanel(this._extensionUri, document.uri, title);
      this._panels.set(document.uri, panel);
      panel.render(title, document.getText(), this._extensionUri);
    }
    else {
      panel.render(title, document.getText(), this._extensionUri);
    }
    
  }

}





export class DotPreviewPanel {
  private static _panels: Map<Uri, DotPreviewPanel> = new Map() ;

  private _disposables: Disposable[] = [];
  private _panel: WebviewPanel;
  private _documentUri: Uri;

  constructor(extensionUri: Uri, documentUri: Uri, title: string) {
    this._documentUri = documentUri
    this._panel = window.createWebviewPanel(
      "preview",
      title,
      ViewColumn.Beside,
      {
        enableScripts: true,
      }
    );
    this._panel.iconPath = Uri.joinPath(extensionUri, 'media', 'icon.png');
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, title, '<vscode-progress-ring></vscode-progress-ring>');
    this._setWebviewMessageListener(this._panel.webview);
  }

  public dispose() {
    this._panel.dispose();
    DotPreviewPanel._panels.delete(this._documentUri);
    
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
        const text = message.text;

        switch (command) {
          case "hello":
            window.showInformationMessage(text);
            break;
        }
      },
      undefined,
      this._disposables
    );
  }

  private _getWebviewContent(webview: Webview, extensionUri: Uri, title: string, svgOrError: string): string {
    const toolkitUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', '@vscode', 'webview-ui-toolkit', 'dist', 'toolkit.js')
    );
    const mainUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'media', 'main.js')
    );
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css')
    );

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
            <vscode-button appearance="icon" aria-label="back">
              <span class="codicon codicon-arrow-small-left"></span>
            </vscode-button>
            <vscode-button appearance="icon" aria-label="refresh">
              <span class="codicon codicon-refresh"></span>
            </vscode-button>
            <vscode-button appearance="icon" aria-label="save">
              <span class="codicon codicon-save"></span>
            </vscode-button>
          
            <vscode-dropdown id="selector">
              <vscode-option value="dot">dot</vscode-option>
              <vscode-option value="circo">circo</vscode-option>
              <vscode-option value="fdp">fdp</vscode-option>
              <vscode-option value="neato">neato</vscode-option>
              <vscode-option value="osage">osage</vscode-option>
              <vscode-option value="twopi">twopi</vscode-option>
            </vscode-dropdown>
          </div>
          
          <div id="container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            ${svgOrError}
          </div>
        </body>
      </html>
    `;
  }

  public render(title: string, content: string, extensionUri: Uri) {
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, title, '<vscode-progress-ring></vscode-progress-ring>');
    viz.renderString(content).then((svg: string) => {
      this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, title, svg);
      this._panel.title = title;

      if (!this._panel.visible) this._panel.reveal();

    }).catch((err: any) => {
      window.showErrorMessage(`${err}`);
      viz = new Viz({ Module, render });
      this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, title, err);
      this._panel.title = title;
    });

  }

}

