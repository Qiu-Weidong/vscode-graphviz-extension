import { ViewColumn, WebviewPanel, window } from "vscode";

const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });


export class DotPreviewer {
  static panel: WebviewPanel | undefined;

  private currentContent: string;

  constructor() { this.currentContent = ''; }

  preview(name: string, content: string) {
    if (DotPreviewer.panel == undefined) {
      // 如果还没有 panel ，则创建一个新的 panel
      DotPreviewer.panel = window.createWebviewPanel(
        'preview', name, ViewColumn.Beside
      );
      DotPreviewer.panel.onDidChangeViewState((e) => {
        if (DotPreviewer.panel?.visible) this.update(name, content);
      });
    }

    else {
      const column = window.activeTextEditor?.viewColumn;
      DotPreviewer.panel.reveal(column);
      // 更新 panel 。
      if(DotPreviewer.panel.visible)
        this.update(name, content);
    }


  }


  update(name: string, content: string) {
    if (content.trim() == this.currentContent) return;

    viz.renderString(content).then((result: any) => {
      const webview = DotPreviewer.panel?.webview;
      if (webview) {
        webview.html = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>${name}</title>
                        </head>
                        <body>
                          <div>${result}</div>
                        </body>
                        </html>`;
      }

    }).catch((err: any) => {
      window.showErrorMessage(`${err}`);
      viz = new Viz({ Module, render });
    });
  }
}




