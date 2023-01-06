import * as vscode from 'vscode';
// import textDocuments from './textDocuments';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';


export function activate(context: vscode.ExtensionContext) {
  // 事件绑定
  // bindEvents(context);

  // 注册 provider
  registerProviders(context);
}


// // 绑定事件
// function bindEvents(_context: ExtensionContext) {
//   // 当关闭时会触发，打开时也会触发，关闭时 listener为 undefined, 注意打印 Uri 的时候需要调用toString
//   vscode.window.onDidChangeActiveTextEditor((editor) => {
//     if (editor == undefined ) return;
//     textDocuments.addDocument(editor.document);
//   });

//   vscode.workspace.onDidChangeTextDocument((e) => {
//     // console.log('onDidChangeTextDocument');
//     textDocuments.updateDocument(e.document);
//   });
// }


// 注册 provider
function registerProviders(_context: ExtensionContext) {
  // 语法高亮
  const dotSemanticTokensProvider = new DotSemanticTokensProvider();
  vscode.languages.registerDocumentSemanticTokensProvider('dot', dotSemanticTokensProvider, dotSemanticTokensProvider.legend);


}