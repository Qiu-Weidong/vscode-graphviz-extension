import { CancellationToken, Hover, HoverProvider, Position, ProviderResult, TextDocument } from "vscode";
import { DotHoverVisitor } from "./DotHoverVisitor";
import textDocuments from "../TextDocuments";


export class DotHoverProvider implements HoverProvider {
  provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
    textDocuments.updateDocument(document);
    const tree = textDocuments.getTree(document);

    const visitor = new DotHoverVisitor(position);

    try {
      tree.accept(visitor);
    } catch {}
    
    return visitor.result;
  }
  
}

