const vscode = acquireVsCodeApi();
let viz = null, 
container = null, 
loader = null, 
selector = null;

window.addEventListener("load", main);

function main() {
  init();

  // render(`digraph { a -> b; }`, 'dot');

  window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
      case 'postContent':
        // console.log(message.content);
        render(message.content);
        break;
    }
  });

  // 刚load的时候发一条消息，告诉vscode页面已经加载。

  // const howdyButton = document.getElementById("howdy");
  // howdyButton.addEventListener("click", handleHowdyClick);

  
}

function handleHowdyClick() {
  // Some quick background:
  // 
  // Webviews are sandboxed environments where abritrary HTML, CSS, and 
  // JavaScript can be executed and rendered (i.e. it's basically an iframe).
  // 
  // Because of this sandboxed nature, VS Code uses a mechanism of message 
  // passing to get data from the extension context (i.e. src/extension.ts) 
  // to the webview context (this file), all while maintaining security.
  // 
  // vscode.postMessage() is the API that can be used to pass data from
  // the webview context back to the extension context––you can think of 
  // this like sending data from the frontend to the backend of the extension.
  // 
  // Note: If you instead want to send data from the extension context to the 
  // webview context (i.e. backend to frontend), you can find documentation for
  // that here:
  // 
  // https://code.visualstudio.com/api/extension-guides/webview#passing-messages-from-an-extension-to-a-webview
  //
  // The main thing to note is that postMessage() takes an object as a parameter.
  // This means arbitrary data (key-value pairs) can be added to the object
  // and then accessed when the message is recieved in the extension context.
  //
  // For example, the below object could also look like this:
  //
  // {
  //  command: "hello",
  //  text: "Hey there partner! 🤠",
  //  random: ["arbitrary", "data"],
  // }
  // 
  vscode.postMessage({
    command: "hello",
    text: "Hey there partner! 🤠",
  });
}

// 初始化全局变量
function bindEvents(element) {
  let scale = 1.0, maxScale = 4, minScale = 0.05;
  let isPointerdown = false, lastPointermove = { x: 0, y: 0 };
  let x = 0, y = 0;

  document.body.onresize = () => setSize(element);
  // 绑定滚轮缩放
  container.addEventListener('wheel', (e) => {
    let ratio = 1.1;
    // 缩小
    if (e.deltaY > 0) {
      ratio = 1 / 1.1;
    }
    scale *= ratio;
    if (scale > maxScale) scale = maxScale;
    else if (scale < minScale) scale = minScale;

    // scale 后面不要有空格 translateX 里面一定要有单位
    const transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
    element.style.transform = transform;

    // 预防执行默认的行为
    e.preventDefault();
  });

  // 绑定拖拽功能
  element.addEventListener('pointerdown', (e) => {
    if (e.button == 0) {
      isPointerdown = true;
      element.setPointerCapture(e.pointerId);
      lastPointermove = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  });

  element.addEventListener('pointerup', (e) => {
    if (e.button == 0) {
      isPointerdown = false;
      e.preventDefault();
    }

  });

  element.addEventListener('pointermove', (e) => {
    if (isPointerdown) {
      const current = { x: e.clientX, y: e.clientY };
      const dx = current.x - lastPointermove.x;
      const dy = current.y - lastPointermove.y;
      lastPointermove = { x: current.x, y: current.y };
      x += dx; y += dy;

      const transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
      element.style.transform = transform;

      e.preventDefault();
    }

  });

  setSize(element);
}

function init() {
  container = document.getElementById('container');
  loader = document.getElementById('loader');
  viz = new Viz();
}

// 设置尺寸
function setSize(element) {
  if (element.scrollWidth > window.innerWidth || element.scrollHeight > window.innerHeight) {
    element.style.width = window.innerWidth + 'px';
    element.style.height = window.innerHeight + 'px';
  }
}


function render(content) {
  loader.style.display = 'block';
  container.innerHTML = '';

  setTimeout(() => {
    viz.renderSVGElement(content)
      .then(element => {
        loader.style.display = 'none';
        container.appendChild(element);
        bindEvents(element);
      })
      .catch(error => {
        viz = new Viz();
        console.error(error);
      });
  }, 1);
}
