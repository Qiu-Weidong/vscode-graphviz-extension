import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CodeLens, Position, Range, TextDocument } from "vscode";
import { Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext, Attr_listContext, A_listContext, Assign_stmtContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext, Node_stmtContext, Node_idContext, Compass_ptContext, SubgraphContext, IdContext, LexprContext, RexprContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";


export class DotCodeLensVisitor implements DotVisitor<void> {
  private codelens: CodeLens[];
  private document: TextDocument;

  constructor(document: TextDocument) { 
    this.document = document;
    this.codelens = []; 
  }

  visitGraph_list(ctx: Graph_listContext): void {
    for (const graph of ctx.graph()) {
      graph.accept(this);
    }
  }

  visitGraph(ctx: GraphContext): void {

    // Generate
    const graph = ctx.DIGRAPH()?.symbol || ctx.GRAPH()?.symbol;
    let name = ctx.id()?.ID()?.symbol.text || ctx.id()?.NUMBER()?.text || ctx.id()?.STRING()?.text || '';
    if(name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length-1);
    const preview = `$(open-preview) Preview ${name}`.trim();
    const save = `$(save) Export ${name}`.trim();
    if (graph) {
      const range = new Range(
        new Position(graph.line - 1, 0),
        new Position(graph.line - 1, preview.length)
      );

      const range2 = new Range(
        new Position(graph.line - 1, preview.length+1),
        new Position(graph.line-1, preview.length+1 + save.length)
      );

      this.codelens.push(
        new CodeLens(
          range,
          {
            title: preview,
            command: 'graphviz.generate',
            arguments: [{ title: name, document: this.document }]
          }
        ),
        new CodeLens(
          range2, 
          {
            title: save,
            command: 'graphviz.export',
            arguments: [{ title: name, document: this.document }]
          }
        )
      );
    }
  }
  
  visitStmt_list: ((ctx: Stmt_listContext) => void) = (ctx) => this.visitChildren(ctx);
  visitStmt: ((ctx: StmtContext) => void) = (ctx) => this.visitChildren(ctx);
  visitAttr_stmt: ((ctx: Attr_stmtContext) => void) = (ctx) => this.visitChildren(ctx);
  visitAttr_list: ((ctx: Attr_listContext) => void) = (ctx) => this.visitChildren(ctx);
  visitA_list: ((ctx: A_listContext) => void) = (ctx) => this.visitChildren(ctx);
  visitAssign_stmt: ((ctx: Assign_stmtContext) => void) = (ctx) => this.visitChildren(ctx);
  visitEdge_stmt: ((ctx: Edge_stmtContext) => void) = (ctx) => this.visitChildren(ctx);
  visitEdgeRHS: ((ctx: EdgeRHSContext) => void) = (ctx) => this.visitChildren(ctx);
  visitEdgeop: ((ctx: EdgeopContext) => void) = (ctx) => this.visitChildren(ctx);
  visitNode_stmt: ((ctx: Node_stmtContext) => void) = (ctx) => this.visitChildren(ctx);
  visitNode_id: ((ctx: Node_idContext) => void) = (ctx) => this.visitChildren(ctx);
  visitCompass_pt: ((ctx: Compass_ptContext) => void) = (ctx) => this.visitChildren(ctx);
  visitSubgraph: ((ctx: SubgraphContext) => void) = (ctx) => this.visitChildren(ctx);
  visitId: ((ctx: IdContext) => void) = (ctx) => this.visitChildren(ctx);
  visitLexpr: ((ctx: LexprContext) => void) = (ctx) => this.visitChildren(ctx);
  visitRexpr: ((ctx: RexprContext) => void) = (ctx) => this.visitChildren(ctx);
  visit(tree: ParseTree): void {
    return tree.accept(this);
  }

  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++) {
      node.getChild(i).accept(this);
    }
  }
  visitTerminal(node: TerminalNode): void {}
  visitErrorNode(node: ErrorNode): void {
    return this.visitTerminal(node);
  }

  public getCodeLens(): CodeLens[] {
    return this.codelens;
  }
  



  
  

}

