import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';
import { DotColorProvider } from './provider/DotColorProvider';
import { DotCompletionItemProvider } from './provider/DotCompletionItemProvider';
import { DotHoverProvider } from './provider/DotHoverProvider';
import { DotFormattingEditProvider } from './provider/DotFormattingEditProvider';
import { DotSymbolProvider } from './provider/DotSymbolProvider';
import { DotCodeLensProvider } from './provider/DotCodeLensProvider';
import { DotPreviewPanel } from './previewer/DotPreviewer';
import { Attribute } from './attribute/Attribute';

export function activate(context: vscode.ExtensionContext) {
  DotPreviewPanel.extensionUri = context.extensionUri;
  Attribute.setExtensionUri(context.extensionUri);

  vscode.commands.registerCommand("graphviz.generate", (args: any) => {

    const title: string = args.title || 'graphviz';
    const document: vscode.TextDocument = args.document || vscode.window.activeTextEditor?.document;
    if (document) {
      const settings = vscode.workspace.getConfiguration('graphviz');
      if (settings.get<boolean>('multiPanel')) {
        DotPreviewPanel.preview(title, document);
      }
      else {
        DotPreviewPanel.previewInUniquePanel(document);
      }
    }
  });

  vscode.commands.registerCommand("graphviz.export", (args: any) => {
    const document: vscode.TextDocument = args.document || vscode.window.activeTextEditor?.document;
    if (document) {
      DotPreviewPanel.save(document);
    }
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

  vscode.workspace.onDidOpenTextDocument(document => {
    DotPreviewPanel.updateDocument(document);
  });

  const settings = vscode.workspace.getConfiguration('graphviz');
  if (settings.get<boolean>('hotUpdate')) {
    // 热更新

    vscode.workspace.onDidSaveTextDocument(document => {
      DotPreviewPanel.updateDocument(document);
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

