import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';
import { DotColorProvider } from './provider/DotColorProvider';
import { DotCompletionItemProvider } from './provider/DotCompletionItemProvider';
import { DotHoverProvider } from './provider/DotHoverProvider';
import { DotFormattingEditProvider } from './provider/DotFormattingEditProvider';
import { DotSymbolProvider } from './provider/DotSymbolProvider';
import { DotCodeLensProvider } from './provider/DotCodeLensProvider';

const Viz = require("viz.js");
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("graphviz.generate", (args: any) => {
    const name: string = args.title ? args.title : 'graphviz';
    const content: string = args.content;
    // 生成预览图的代码放在这里。

    viz.renderString(content).then((result: any) => {
      const panel = vscode.window.createWebviewPanel(
        'preview', name, vscode.ViewColumn.Beside
      );
      panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>graphviz preview</title>
    </head>
    <body>
      <div>${result}</div>
    </body>
    </html>`;

    }).catch((err: any) => {
      vscode.window.showErrorMessage(`${err}`);
      viz = new Viz({ Module, render });
    });
  });

  // 注册 provider
  registerProviders(context);

  // 看不懂，直接抄过来的。
  if (vscode.window.registerWebviewPanelSerializer) {
		vscode.window.registerWebviewPanelSerializer('preview', {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
        const column = vscode.window.activeTextEditor?.viewColumn;
        webviewPanel.reveal(column);
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

/**

 */