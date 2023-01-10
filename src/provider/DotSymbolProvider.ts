import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, Location, Position, ProviderResult, Range, ReferenceContext, ReferenceProvider, RenameProvider, SymbolInformation, TextDocument, WorkspaceEdit } from "vscode";
import textDocuments from "../TextDocuments";



export class DotSymbolProvider implements
  DocumentSymbolProvider,
  RenameProvider,
  ReferenceProvider {

  provideReferences(
    document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken
  ): ProviderResult<Location[]> {
    // 只提供 node 的引用
    textDocuments.updateDocument(document);
    const symbols = textDocuments.getSymbols(document);
    const symbol = symbols.find(symbol => symbol.range.contains(position));
    if(! symbol)
      throw new Error("no Symbol at this positon");
    const locations = symbols.filter(item => item.name == symbol.name && item.detail == symbol.detail).map(item => 
      new Location(document.uri, item.range)
    );
    return locations;
  }

  provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit> {
    throw new Error("Method not implemented.");
  }

  prepareRename?(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Range | { range: Range; placeholder: string; }> {
    throw new Error("Method not implemented.");
  }

  provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
    textDocuments.updateDocument(document);
    return textDocuments.getSymbols(document);
  }

}


