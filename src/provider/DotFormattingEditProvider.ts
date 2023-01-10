import { CancellationToken, DocumentFormattingEditProvider, FormattingOptions, Position, ProviderResult, Range, TextDocument, TextEdit } from "vscode";
import textDocuments from "../TextDocuments";
import { DotFormattingEditVisitor } from "./DotFormattingEditVisitor";


export class DotFormattingEditProvider implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    textDocuments.updateDocument(document);
    const tree = textDocuments.getTree(document);
    const visitor = new DotFormattingEditVisitor();

    let result = '';
    try {
      result = tree.accept(visitor);
    } catch {}
    if(! result) return;
    
    // 直接将 语法树 转换成 格式化后的字符串。
    return [new TextEdit(
      new Range(
        new Position(0, 0),
        new Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length)
      ),
      result
    )];

    throw new Error("Method not implemented.");
  }

}
