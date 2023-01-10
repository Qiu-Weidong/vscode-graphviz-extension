import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, Location, Position, ProviderResult, Range, ReferenceContext, ReferenceProvider, RenameProvider, SymbolInformation, TextDocument, WorkspaceEdit } from "vscode";
import textDocuments from "../TextDocuments";



export class DotSymbolProvider implements
  DocumentSymbolProvider,
  RenameProvider,
  ReferenceProvider {

  provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]> {
    throw new Error("Method not implemented.");
  }

  provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit> {
    throw new Error("Method not implemented.");
  }

  prepareRename?(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Range | { range: Range; placeholder: string; }> {
    throw new Error("Method not implemented.");
  }

  provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
    textDocuments.updateDocument(document);
    // 提供 node 名称
    /**
     * ports: [{ name: 'port名称', node: '所属节点'}]
     * graphs: ['图的名称'];
     * subgraphs: ['subgraph和cluster的名称']
     * nodes: [{}]
     */

    throw new Error("Method not implemented.");
  }

}


