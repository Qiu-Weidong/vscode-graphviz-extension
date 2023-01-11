import { DotLexer } from './dot/DotLexer';
import { DotParser } from './dot/DotParser';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Uri, TextDocument, Diagnostic } from 'vscode';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { NodeVisitor } from './provider/NodeVisitor';
import { DiagnosticCollection } from 'vscode';
import { languages } from 'vscode';
import { DotDiagnosticListener } from './DotDiagnosticListener';
import { DocumentSymbol } from 'vscode';

// 缓存内容 token 流、语法树、符号表(储存所有的顶点名称即可)、错误信息
type value = {
  content: string,
  tokens: CommonTokenStream,
  tree: ParseTree,
  
  // 节点名称， port列表
  nodes: Map<string, string[]>,
  symbols: DocumentSymbol[]
};


class TextDocuments {

  private documents: Map<Uri, value>;
  private diangostics: DiagnosticCollection;

  constructor() {
    this.documents = new Map();
    this.diangostics = languages.createDiagnosticCollection();
  }

  public removeDocument(document: TextDocument): void {
    if (!this.documents.has(document.uri)) return;
    this.documents.delete(document.uri);
  }

  public updateDocument(document: TextDocument): void {
    const documentText = document.getText().trim() + '\n'; // 注意一定要加上一个换行，否则最后一行如果是注释的话会报错。
    // 通过检查文本内容是否改变来更新语法树等信息。
    if(this.documents.get(document.uri)?.content == documentText) {
      return;
    }
    
    let diagnostics: Diagnostic[] = [];
    const diagnosticListener = new DotDiagnosticListener(diagnostics);
    const inputStream = CharStreams.fromString(documentText);
    const lexer = new DotLexer(inputStream);
    lexer.removeErrorListeners();
    lexer.addErrorListener(diagnosticListener);

    const tokens = new CommonTokenStream(lexer);
    const parser = new DotParser(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(diagnosticListener);

    const tree = parser.graph_list();

    
    // 解析节点以及对应的 port 。
    let nodes: Map<string, string[]> = new Map();
    const symbols : DocumentSymbol[] = [];
    const visitor = new NodeVisitor(nodes, symbols);
    try {
      tree.accept(visitor);
    }
    catch(err) {}

    // 检查属性是否正确，使用 warning 。
    
    this.diangostics.set(document.uri, diagnostics);
    this.documents.set(document.uri, { tokens, tree, content: documentText, nodes, symbols });
  }

  public getTokens(document: TextDocument): CommonTokenStream {
    if(! this.documents.has(document.uri)) this.updateDocument(document);
    const result = this.documents.get(document.uri) as value;
    return result?.tokens;
  }

  public getTree(document: TextDocument): ParseTree {
    if(! this.documents.has(document.uri)) this.updateDocument(document);
    const result = this.documents.get(document.uri) as value;
    return result.tree;
  }

  public getNodes(document: TextDocument): Map<string, string[]> {
    if(! this.documents.has(document.uri)) this.updateDocument(document);
    const result = this.documents.get(document.uri) as value;
    return result.nodes;
  }

  public getSymbols(document: TextDocument): DocumentSymbol[] {
    if(! this.documents.has(document.uri)) this.updateDocument(document);
    const result = this.documents.get(document.uri) as value;
    return result.symbols;
  }

  public contains(document: TextDocument) : boolean {
    return this.documents.has(document.uri);
  }

}

// 一个全局变量，用于缓存语法树和token流
let textDocuments = new TextDocuments();
export default textDocuments;


