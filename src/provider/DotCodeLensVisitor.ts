import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CodeLens, Position, Range } from "vscode";
import { Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext, Attr_listContext, A_listContext, Assign_stmtContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext, Node_stmtContext, Node_idContext, PortContext, Compass_ptContext, SubgraphContext, IdContext, LexprContext, RexprContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";


export class DotCodeLensVisitor implements DotVisitor<string> {
  private codelens: CodeLens[];

  constructor() { this.codelens = []; }
  visitGraph_list(ctx: Graph_listContext): string {
    for (const graph of ctx.graph()) {
      graph.accept<string>(this);
    }
    return '';
  }

  visitGraph(ctx: GraphContext): string {
    const result = this.visitChildren(ctx);

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
            arguments: [{ title: name, content: result }]
          }
        ),
        new CodeLens(
          range2, 
          {
            title: save,
            command: 'graphviz.export',
            arguments: [{ title:name, content: result }]
          }
        )
      );
    }
    // console.log(result);
    return result;
  }
  
  visitStmt_list: ((ctx: Stmt_listContext) => string) = (ctx) => this.visitChildren(ctx);
  visitStmt: ((ctx: StmtContext) => string) = (ctx) => this.visitChildren(ctx);
  visitAttr_stmt: ((ctx: Attr_stmtContext) => string) = (ctx) => this.visitChildren(ctx);
  visitAttr_list: ((ctx: Attr_listContext) => string) = (ctx) => this.visitChildren(ctx);
  visitA_list: ((ctx: A_listContext) => string) = (ctx) => this.visitChildren(ctx);
  visitAssign_stmt: ((ctx: Assign_stmtContext) => string) = (ctx) => this.visitChildren(ctx);
  visitEdge_stmt: ((ctx: Edge_stmtContext) => string) = (ctx) => this.visitChildren(ctx);
  visitEdgeRHS: ((ctx: EdgeRHSContext) => string) = (ctx) => this.visitChildren(ctx);
  visitEdgeop: ((ctx: EdgeopContext) => string) = (ctx) => this.visitChildren(ctx);
  visitNode_stmt: ((ctx: Node_stmtContext) => string) = (ctx) => this.visitChildren(ctx);
  visitNode_id: ((ctx: Node_idContext) => string) = (ctx) => this.visitChildren(ctx);
  visitPort: ((ctx: PortContext) => string) = (ctx) => this.visitChildren(ctx);
  visitCompass_pt: ((ctx: Compass_ptContext) => string) = (ctx) => this.visitChildren(ctx);
  visitSubgraph: ((ctx: SubgraphContext) => string) = (ctx) => this.visitChildren(ctx);
  visitId: ((ctx: IdContext) => string) = (ctx) => this.visitChildren(ctx);
  visitLexpr: ((ctx: LexprContext) => string) = (ctx) => this.visitChildren(ctx);
  visitRexpr: ((ctx: RexprContext) => string) = (ctx) => this.visitChildren(ctx);
  visit(tree: ParseTree): string {
    return tree.accept(this);
  }

  visitChildren(node: RuleNode): string {
    let result = '';
    for (let i = 0; i < node.childCount; i++) {
      const subcontent = node.getChild(i).accept(this).trim();
      result += subcontent + ' ';
    }
    return result;
  }
  visitTerminal(node: TerminalNode): string {
    return node.symbol.text || '';
  }
  visitErrorNode(node: ErrorNode): string {
    return this.visitTerminal(node);
  }

  public getCodeLens(): CodeLens[] {
    return this.codelens;
  }
  



  
  

}

