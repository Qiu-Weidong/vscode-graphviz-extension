import * as vscode from 'vscode';
import { DotLexer } from './dot/DotLexer';
import { DotParser, Graph_listContext } from './dot/DotParser';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { assert } from 'console';


// 只缓存 token 流和语法树。todo: 缓存报错信息
export let documents: Map<vscode.Uri, {
  tokens: CommonTokenStream,
  tree: Graph_listContext
}> = new Map();


export function activate(context: vscode.ExtensionContext) {
  // 这条命令会输出在 调试控制台 中，如果没有显示终端，可以点击 终端 -> 显示正在运行的任务。
  console.log('Congratulations, your extension "graphviz" is now active!');

  // 当关闭时会触发，打开时也会触发，关闭时 listener为 undefined, 注意打印 Uri 的时候需要调用toString
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor == undefined || documents.has(editor.document.uri)) return;
    parseDocument(editor.document);
  });

  vscode.workspace.onDidChangeTextDocument((e) => {
    parseDocument(e.document);
  });


  const tokenTypes = ['namespace', 'keyword', 'class', 'enum', 'interface',
    'struct', 'typeParameter', 'type', 'parameter', 'variable',
    'property', 'enumMember', 'decorator', 'event', 'function',
    'method', 'comment', 'string', 'number', 'regexp', 'function', 'macro',
  ];

  const legend = new vscode.SemanticTokensLegend(tokenTypes);

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
      if (!documents.has(document.uri)) parseDocument(document);
      assert(documents.has(document.uri));
      let obj = documents.get(document.uri);
      if (obj == undefined) return;
      let { tokens } = obj;

      const builder = new vscode.SemanticTokensBuilder(legend);
      // const n = tokens.getNumberOfOnChannelTokens();
      for (const token of tokens.getTokens()) {
        if (token.type > 10)
          builder.push(token.line - 1, token.charPositionInLine, token.text?.length || 0, 2);
      }

      return builder.build();
    }
  };

  vscode.languages.registerDocumentSemanticTokensProvider('dot', provider, legend);
}

// 生成语法树并缓存
function parseDocument(document: vscode.TextDocument) {
  const inputStream = CharStreams.fromString(document.getText());
  const lexer = new DotLexer(inputStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new DotParser(tokens);
  const tree = parser.graph_list();

  documents.set(document.uri, { tokens, tree });
}

/**
 * 当文件内容发生改变时触发
 * vscode.workspace.onDidChangeTextDocument 
 * 
 * 当打开文件发生变化时触发，注意，当切换文件时会触发两次
 */

