import * as vscode from 'vscode';
import textDocuments from './textDocuments';
import { ExtensionContext } from 'vscode';


export function activate(context: vscode.ExtensionContext) {
  // 事件绑定
  bindEvents();

  // 注册 provider





  const tokenTypes = [ 
    // 'strict', 'graph', 'digraph', 'node', 'edge', 'subgraph', 'number', 
    'method', 'function', 'function', 'type', 'type', 'function', 'number', 

    //'string', 'id', 'html_string', 'comment', 'line_comment', 'PREPROC',
    'string', 'keyword', 'regexp', 'comment', 'comment', 'comment',
  ];

  const legend = new vscode.SemanticTokensLegend(tokenTypes);

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
      const tokens = textDocuments.getTokens(document);

      const builder = new vscode.SemanticTokensBuilder(legend);
      for (const token of tokens.getTokens()) {
        if (token.type > 10)
          builder.push(token.line - 1, token.charPositionInLine, token.text?.length || 0, token.type - 11);
      }

      return builder.build();
    }
  };

  vscode.languages.registerDocumentSemanticTokensProvider('dot', provider, legend);
}


// 绑定事件
function bindEvents() {
  // 当关闭时会触发，打开时也会触发，关闭时 listener为 undefined, 注意打印 Uri 的时候需要调用toString
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor == undefined ) return;
    textDocuments.addDocument(editor.document);
  });

  vscode.workspace.onDidChangeTextDocument((e) => {
    textDocuments.updateDocument(e.document);
  });
}
