import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';
import { DotColorProvider } from './provider/DotColorProvider';
import { DotCompletionItemProvider } from './provider/DotCompletionItemProvider';
import { DotHoverProvider } from './provider/DotHoverProvider';
import { DotFormattingEditProvider } from './provider/DotFormattingEditProvider';
import { DotSymbolProvider } from './provider/DotSymbolProvider';


export function activate(context: vscode.ExtensionContext) {
  // 注册 provider
  registerProviders(context);
}


// 注册 provider
function registerProviders(context: ExtensionContext) {
  // 语法高亮
  const dotSemanticTokensProvider = new DotSemanticTokensProvider();
  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider('dot', dotSemanticTokensProvider, dotSemanticTokensProvider.legend)
  );

  const dotColorProvider = new DotColorProvider();
  context.subscriptions.push(
    vscode.languages.registerColorProvider('dot', dotColorProvider)
  );

  const dotCompletionItemProvider = new DotCompletionItemProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('dot', dotCompletionItemProvider, '=', ':', '[', '"')
  );

  const dotHoverProvider = new DotHoverProvider();
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('dot', dotHoverProvider)
  );

  const dotFormattingEditProvider = new DotFormattingEditProvider();
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('dot', dotFormattingEditProvider)
  );

  const dotSymbolProvider = new DotSymbolProvider();
  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider('dot', dotSymbolProvider),
    vscode.languages.registerReferenceProvider('dot', dotSymbolProvider),
    vscode.languages.registerRenameProvider('dot', dotSymbolProvider)
  );

}

/**

 */