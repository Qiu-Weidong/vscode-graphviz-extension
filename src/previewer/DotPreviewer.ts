import { Disposable, TextDocument, Uri, ViewColumn, Webview, WebviewPanel, window } from "vscode";


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
      panel = new DotPreviewPanel(this._extensionUri, title);
      this._panels.set(document.uri, panel);
    }

    panel.render(title, document);
  }

}





export class DotPreviewPanel {

  private _disposables: Disposable[] = [];
  private _panel: WebviewPanel;

  constructor(extensionUri: Uri, title: string) {
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
    
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, title);
    this._setWebviewMessageListener(this._panel.webview);
  }

  public dispose() {
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  // 直接将数据投递过去即可，交给 panel 渲染。
  public render(title: string, document: TextDocument) {
    this._panel.title = title;

    this._panel.webview.postMessage({
      command: 'postContent',
      content: document.getText(),
      uri: document.uri.toString()
    }).then(success => {
      if(! success) window.showErrorMessage(`render failed`);
    });
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

  private _getWebviewContent(webview: Webview, extensionUri: Uri, title: string): string {
    const toolkitUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', '@vscode', 'webview-ui-toolkit', 'dist', 'toolkit.js')
    );
    const mainUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'media', 'main.js')
    );
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css')
    );
    const vizUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', 'viz.js', 'viz.js')
    );
    const vizRenderUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'node_modules', 'viz.js', 'full.render.js')
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
          <script src="${vizUri}"></script>
          <script src="${vizRenderUri}"></script>
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
          
            <vscode-dropdown>
              <vscode-option>dot</vscode-option>
              <vscode-option>circo</vscode-option>
              <vscode-option>fdp</vscode-option>
              <vscode-option>neato</vscode-option>
              <vscode-option selected>osage</vscode-option>
              <vscode-option>twopi</vscode-option>
            </vscode-dropdown>
          </div>
          
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div id="loader">
              <vscode-progress-ring></vscode-progress-ring>
            </div>
            <div id="container"></div>
          </div>
        </body>
      </html>
    `;
  }

}

