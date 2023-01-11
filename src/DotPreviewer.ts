import { ViewColumn, WebviewPanel, window } from "vscode";

const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });


export class DotPreviewer {
  static panel: WebviewPanel | undefined;
  private currentContent: string = '';

  preview(name: string, content: string) {
    // 首先对参数进行 trim。
    content = content.trim();
    name = name.trim();

    // 检查是否已经渲染
    if (this.currentContent == content && DotPreviewer.panel) {
      if (!DotPreviewer.panel.visible) { DotPreviewer.panel.reveal(); }
    }

    else {
      // 渲染之。
      viz.renderString(content).then((result: string) => {
        this.currentContent = content;
        const html = `<!DOCTYPE html>
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

        // 如果没有 panel 则创建之。
        if (DotPreviewer.panel == undefined) {

          // 如果还没有 panel ，则创建一个新的 panel
          DotPreviewer.panel = window.createWebviewPanel(
            'preview', name, ViewColumn.Beside
          );

          DotPreviewer.panel.onDidDispose(() => {
            DotPreviewer.panel?.dispose();

            // 记得将 panel 设置为 undefined
            DotPreviewer.panel = undefined;
            this.currentContent = '';
          });
        }

        DotPreviewer.panel.title = name;
        DotPreviewer.panel.webview.html = html;

        if(! DotPreviewer.panel.visible) DotPreviewer.panel.reveal();
      }).catch((err: any) => {
        window.showErrorMessage(`${err}`);
        viz = new Viz({ Module, render });
      });
    }

  }

}




