import { CancellationToken, CodeLens, CodeLensProvider, Event, Position, ProviderResult, Range, TextDocument, Command } from "vscode";
import textDocuments from "../TextDocuments";
import { DotCodeLensVisitor } from "./DotCodelensVisitor";

export class DotCodeLensProvider implements CodeLensProvider {
  onDidChangeCodeLenses?: Event<void> | undefined;
  provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
    textDocuments.updateDocument(document);
    const visitor = new DotCodeLensVisitor();
    try {
       textDocuments.getTree(document).accept(visitor);
    } catch(err) {}

    return visitor.getCodeLens();
  }
  resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): ProviderResult<CodeLens> {
    throw new Error("Method not implemented.");
  }
  
}

