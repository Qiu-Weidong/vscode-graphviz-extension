import textDocuments from "../TextDocuments";
import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from "vscode";
import { DotCompletionItemVisitor } from "./DotCompletionItemVisitor";


export class DotCompletionItemProvider implements CompletionItemProvider {
  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    textDocuments.updateDocument(document);
    let result: CompletionItem[] = [];
    const visitor = new DotCompletionItemVisitor(position, result, textDocuments.getNodes(document));
    const tree = textDocuments.getTree(document);
    try {
      tree.accept(visitor);
    } catch(e) {}
    
    return result;
  }
  resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {
    throw new Error("Method not implemented.");
  }

}


