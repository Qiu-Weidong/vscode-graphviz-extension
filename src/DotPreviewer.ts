import { Uri, ViewColumn, WebviewPanel, window } from "vscode";
// import { Utils } from "vscode-uri";

const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });


export class DotPreviewer {
  static panel: WebviewPanel | undefined;
  private currentContent: string = '';
  private uri: Uri;

  constructor(uri: Uri) {
    this.uri = uri
    this.currentContent = '';
  }

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
        console.log(result);
        
        this.currentContent = content;
        const html = `<html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>${name}</title>
        
        </head>
        
        <body>
          <div id="container" style="display: flex;justify-content: center; align-items: center; min-height: 100vh;">
          ${result}
          </div>
        
          <script>
            const svg = document.getElementsByTagName('svg')[0];
            svg.onload = () => {
        
              const container = document.getElementById('container');
              let scale = 1.0, maxScale = 4, minScale = 0.5;
              let isPointerdown = false, lastPointermove = { x: 0, y: 0 };
              let x = 0, y = 0;
              // 根据 svg.scrollWidth 和 svg.scrollHeight 设置最大缩放比例和初始缩放值。
        
              // 绑定滚轮缩放
              container.addEventListener('wheel', (e) => {
                // console.info(e.target);
                let ratio = 1.1;
                // 缩小
                if (e.deltaY > 0) {
                  ratio = 1 / 1.1;
                }
                scale *= ratio;
                if (scale > maxScale) scale = maxScale;
                else if (scale < minScale) scale = minScale;
        
                // scale 后面不要有空格 translateX 里面一定要有单位
                const transform = \`translateX(\${x}px) translateY(\${y}px) scale(\${scale})\`;
                svg.style.transform = transform;
                e.preventDefault();
              });
              // 绑定拖拽功能
              svg.addEventListener('pointerdown', (e) => {
                isPointerdown = true;
                svg.setPointerCapture(e.pointerId);
                lastPointermove = { x: e.clientX, y: e.clientY };
        
                e.preventDefault();
              });
        
              svg.addEventListener('pointerup', (e) => { isPointerdown = false; e.preventDefault(); });
              svg.addEventListener('pointermove', (e) => {
                if (isPointerdown) {
                  const current = { x: e.clientX, y: e.clientY };
                  const dx = current.x - lastPointermove.x;
                  const dy = current.y - lastPointermove.y;
                  lastPointermove = { x: current.x, y: current.y };
                  x += dx; y += dy;
        
                  const transform = \`translateX(\${x}px) translateY(\${y}px) scale(\${scale})\`;
                  svg.style.transform = transform;
                }
                e.preventDefault();
              });
            }
          </script>
        </body>
        
        </html>`;

        // 如果没有 panel 则创建之。
        if (DotPreviewer.panel == undefined) {

          // 如果还没有 panel ，则创建一个新的 panel
          DotPreviewer.panel = window.createWebviewPanel(
            'preview', name, ViewColumn.Beside, {
              enableScripts: true,
              localResourceRoots: [
                Uri.joinPath(this.uri, 'asset')
              ]
          }
          );

          DotPreviewer.panel.onDidDispose(() => {
            DotPreviewer.panel?.dispose();

            // 记得将 panel 设置为 undefined
            DotPreviewer.panel = undefined;
            this.currentContent = '';
          });

          // 创建图标
          DotPreviewer.panel.iconPath = Uri.joinPath(this.uri, 'asset', 'icon.png');
        }

        DotPreviewer.panel.title = name;
        DotPreviewer.panel.webview.html = html;

        if (!DotPreviewer.panel.visible) DotPreviewer.panel.reveal();
      }).catch((err: any) => {
        window.showErrorMessage(`${err}`);
        viz = new Viz({ Module, render });
      });
    }

  }

}




