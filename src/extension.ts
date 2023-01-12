import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';
import { DotColorProvider } from './provider/DotColorProvider';
import { DotCompletionItemProvider } from './provider/DotCompletionItemProvider';
import { DotHoverProvider } from './provider/DotHoverProvider';
import { DotFormattingEditProvider } from './provider/DotFormattingEditProvider';
import { DotSymbolProvider } from './provider/DotSymbolProvider';
import { DotCodeLensProvider } from './provider/DotCodeLensProvider';
import { DotPreviewer } from './DotPreviewer';

export function activate(context: vscode.ExtensionContext) {
  const previewer = new DotPreviewer(context.extensionUri);

  vscode.commands.registerCommand("graphviz.generate", (args: any) => {
    const name: string = args.title ? args.title : 'graphviz';
    const content: string = args.content;
    previewer.preview(name, content);
    
  });

  vscode.commands.registerCommand("graphviz.export", (args: any) => {
    // const name: string = args.title ? args.title : 'graphviz';
    // const content: string = args.content;
    
  });

  // 注册 provider
  registerProviders(context);

  // 看不懂，直接抄过来的。
  if (vscode.window.registerWebviewPanelSerializer) {
		vscode.window.registerWebviewPanelSerializer('preview', {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
        webviewPanel.reveal();
			}
		});
	}
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


  const dotCodeLensProvider = new DotCodeLensProvider();
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider('dot', dotCodeLensProvider)
  );

}

