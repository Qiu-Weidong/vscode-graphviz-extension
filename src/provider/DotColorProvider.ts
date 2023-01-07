import { CancellationToken, Color, ColorInformation, ColorPresentation, DocumentColorProvider, ProviderResult, Range, TextDocument } from "vscode";
import textDocuments from "../TextDocuments";
import { DotColorVisitor } from "./DotColorVisitor";


export class DotColorProvider implements DocumentColorProvider {
  provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult<ColorInformation[]> {
    textDocuments.updateDocument(document);
    
    let result: ColorInformation[] = [];
    let visitor = new DotColorVisitor(result);
    let tree = textDocuments.getTree(document);
    tree.accept(visitor);
    
    return result;
  }
  provideColorPresentations(color: Color, context: { readonly document: TextDocument; readonly range: Range; }, token: CancellationToken): ProviderResult<ColorPresentation[]> {

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

      return `"#${red}${green}${blue}${alpha}"`;
    }

    return [new ColorPresentation(colorToHex(color))];
  }

}

