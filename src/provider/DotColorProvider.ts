import { CancellationToken, Color, ColorInformation, ColorPresentation, DocumentColorProvider, ProviderResult, Range, TextDocument } from "vscode";
import textDocuments from "../TextDocuments";
import { DotColorVisitor } from "./DotColorVisitor";


export class DotColorProvider implements DocumentColorProvider {
  provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult<ColorInformation[]> {
    textDocuments.updateDocument(document);

    let result: ColorInformation[] = [];
    let visitor = new DotColorVisitor(result);
    let tree = textDocuments.getTree(document);
    try {
      tree.accept(visitor);
    } catch(e) {}
    

    return result;
  }
  provideColorPresentations(color: Color,
    context: { readonly document: TextDocument; readonly range: Range; },
    token: CancellationToken): ProviderResult<ColorPresentation[]> {
    // 如果 range 包含了引号，则替换的时候带上引号，否则不带引号
    const st = context.document.lineAt(context.range.start.line).text[context.range.start.character];
    const ed = context.document.lineAt(context.range.end.line).text[context.range.end.character-1];
    
    // 判断 st 和 ed 是否为 "
    let wrap = '';
    if(st == '"' && ed == '"') {
      wrap = '"';
    }
    
    // 将 color 转换为 16 进制。
    function colorToHex(color: Color): string {
      // 转换为 16 进制
      let hold = Math.floor(color.red * 255).toString(16);
      const red = hold.length < 2 ? '0' + hold : hold;
      hold = Math.floor(color.green * 255).toString(16);
      const green = hold.length < 2 ? '0' + hold : hold;
      hold = Math.floor(color.blue * 255).toString(16);
      const blue = hold.length < 2 ? '0' + hold : hold;
      hold = Math.floor(color.alpha * 255).toString(16);
      const alpha = hold.length < 2 ? '0' + hold : hold;

      return `${wrap}#${red}${green}${blue}${alpha}${wrap}`;
    }

    return [new ColorPresentation(colorToHex(color))];
  }

}

