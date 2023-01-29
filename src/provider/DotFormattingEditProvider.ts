import { Token } from "antlr4ts";
import { CancellationToken, DocumentFormattingEditProvider, FormattingOptions, Position, ProviderResult, Range, TextDocument, TextEdit } from "vscode";
import textDocuments from "../TextDocuments";
import { DotFormattingEditVisitor } from "../visitor/DotFormattingEditVisitor";


export class DotFormattingEditProvider implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    textDocuments.updateDocument(document);
    const tree = textDocuments.getTree(document);
    const tokens = textDocuments.getTokens(document);
    const comments: Token[] = [];
    for(const token of tokens.getTokens()) {
      if(token.channel != 0) comments.push(token);
    }
    
    const visitor = new DotFormattingEditVisitor(comments, options.tabSize);

    try {
      tree.accept(visitor);
    } catch {}
    const result = visitor.getResult();
    if(! result) return;
    
    // 直接将 语法树 转换成 格式化后的字符串。
    return [new TextEdit(
      new Range(
        new Position(0, 0),
        new Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length)
      ),
      result
    )];
  }

}
