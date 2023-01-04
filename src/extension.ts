import * as vscode from 'vscode';
import ColorProvider from './colorProvider';

export function activate(context: vscode.ExtensionContext) {
  // 这条命令会输出在 调试控制台 中，如果没有显示终端，可以点击 终端 -> 显示正在运行的任务。
  console.log('Congratulations, your extension "graphviz" is now active!');

  // 使用 vscode.DocumentColorProvider 来提供颜色选择器
  let colorProvider: vscode.DocumentColorProvider = {
    provideDocumentColors: function (
        document: vscode.TextDocument, 
        token: vscode.CancellationToken
      ): vscode.ProviderResult<vscode.ColorInformation[]> {
      let result: vscode.ColorInformation[] = [];
      // 一个汉字也占用一个 position

      // 找到颜色字段的范围
      const range = new vscode.Range(new vscode.Position(3, 17), new vscode.Position(3, 23));

      // 判断是否为合法颜色, 如果不是，则返回 null;

      // 将字符串转换为 vscode.Color
      result.push(new vscode.ColorInformation(range, new vscode.Color(255, 125, 244, 1)));
      return result;
    },
    provideColorPresentations: function (
        color: vscode.Color, 
        context: { readonly document: vscode.TextDocument; readonly range: vscode.Range; }, 
        token: vscode.CancellationToken
      ): vscode.ProviderResult<vscode.ColorPresentation[]> {
      // 将颜色转换为 16进制形式并返回
      let result : vscode.ColorPresentation[] = [];
      result.push(new vscode.ColorPresentation("颜色"));
      return result;
    }
  };

  // let disposal = vscode.languages.registerColorProvider("dot", colorProvider );
  let disposal = vscode.languages.registerColorProvider("dot", new ColorProvider() );
  context.subscriptions.push(disposal);
}


