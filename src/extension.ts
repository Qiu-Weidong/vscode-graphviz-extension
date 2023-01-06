import * as vscode from 'vscode';
// import textDocuments from './textDocuments';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';


export function activate(context: vscode.ExtensionContext) {
  // 注册 provider
  registerProviders(context);
}


// 注册 provider
function registerProviders(_context: ExtensionContext) {
  // 语法高亮
  const dotSemanticTokensProvider = new DotSemanticTokensProvider();
  vscode.languages.registerDocumentSemanticTokensProvider('dot', dotSemanticTokensProvider, dotSemanticTokensProvider.legend);
  
  // const legend = new vscode.SemanticTokensLegend([
  //   'namespace', 'class', 'enum', 'interface', 'struct',
  //   'typeParameter', 'type', 'parameter', 'variable',
  //   'property', 'enumMember', 'decorator',
  //   'event', 'function', 'method', 'macro', 'label', 'comment',
  //   'string', 'keyword', 'number', 'regexp', 'operator',
  // ]);
  // const provider: vscode.DocumentSemanticTokensProvider = {
  //   provideDocumentSemanticTokens: function (document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SemanticTokens> {
  //     // throw new Error('Function not implemented.');
  //     const builder = new vscode.SemanticTokensBuilder(legend);
  //     const words = document.getText().split('\n');
  //     for(let i=0; i<words.length; i++) {
  //       builder.push(new vscode.Range(i, 0, i, words[i].length), words[i].trim());
  //     }
      
  //     return builder.build();
  //   }
  // }
  // vscode.languages.registerDocumentSemanticTokensProvider('dot', provider, legend);


}