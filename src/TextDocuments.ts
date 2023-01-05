import { DotLexer } from './dot/DotLexer';
import { DotParser, Graph_listContext } from './dot/DotParser';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Uri, TextDocument } from 'vscode';

type value = {
  tokens: CommonTokenStream,
  tree: Graph_listContext
};


class TextDocuments {

  private documents: Map<Uri, value>;

  constructor() {
    this.documents = new Map();
  }

  public addDocument(document: TextDocument): void {
    // 适用于第一次打开文档
    if (this.documents.has(document.uri)) return;

    this.updateDocument(document);
  }

  public removeDocument(document: TextDocument): void {
    if (!this.documents.has(document.uri)) return;
    this.documents.delete(document.uri);
  }

  public updateDocument(document: TextDocument): void {
    const inputStream = CharStreams.fromString(document.getText());
    const lexer = new DotLexer(inputStream);
    lexer.removeErrorListeners();

    const tokens = new CommonTokenStream(lexer);
    const parser = new DotParser(tokens);
    parser.removeErrorListeners();
    const tree = parser.graph_list();

    this.documents.set(document.uri, { tokens, tree });
  }

  public getTokens(document: TextDocument): CommonTokenStream {
    if(! this.documents.has(document.uri)) this.updateDocument(document);
    const result = this.documents.get(document.uri) as value;
    return result?.tokens;
  }

  public getTree(document: TextDocument): Graph_listContext {
    if(! this.documents.has(document.uri)) this.updateDocument(document);
    const result = this.documents.get(document.uri) as value;
    return result.tree;
  }

  public contains(document: TextDocument) : boolean {
    return this.documents.has(document.uri);
  }

}

// 一个全局变量，用于缓存语法树和token流
let textDocuments = new TextDocuments();
export default textDocuments;


