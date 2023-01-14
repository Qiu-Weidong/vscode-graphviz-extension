// 用于消息传递
const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
  console.log('loaded');

  // 每次 reveal 的时候都会执行
  const container = document.getElementById('container');

  const elements = container.getElementsByTagName('svg');
  if(elements.length > 0) {
    const element = elements[0];
    // 放缩和移动
    bindEvents(element);
  }
  
  const selector = document.getElementById('selector');
  // 这样才能设置 onchange
  selector.onchange = (e) => {
    vscode.postMessage({
      command: 'switch-engine',
      param: e.target.value
    });
    console.log('触发了下拉菜单', e.target.value);
  }

}

function bindEvents(element) {
  let scale = 1.0, maxScale = 4, minScale = 0.05;
  let isPointerdown = false, lastPointermove = { x: 0, y: 0 };
  let x = 0, y = 0;

  document.body.onresize = () => setSize(element);
  // 绑定滚轮缩放
  element.addEventListener('wheel', (e) => {
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

// 设置尺寸
function setSize(element) {
  if (element.scrollWidth > window.innerWidth || element.scrollHeight > window.innerHeight) {
    element.style.width = window.innerWidth + 'px';
    element.style.height = window.innerHeight + 'px';
  }
}

