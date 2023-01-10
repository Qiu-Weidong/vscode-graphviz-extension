import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CodeLens, Position, Range } from "vscode";
import { Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext, Attr_listContext, A_listContext, Assign_stmtContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext, Node_stmtContext, Node_idContext, PortContext, Compass_ptContext, SubgraphContext, IdContext, LexprContext, RexprContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";


export class DotCodeLensVisitor implements DotVisitor<void> {
  private codelens: CodeLens[];

  constructor() { this.codelens = []; }

  public getCodeLens(): CodeLens[] {
    return this.codelens;
  }
  
  visitGraph_list(ctx: Graph_listContext): void {
    for (const graph of ctx.graph()) {
      graph.accept(this);
    }
  }

  visitGraph(ctx: GraphContext): void {
    // Generate
    const graph = ctx.DIGRAPH()?.symbol || ctx.GRAPH()?.symbol;
    const label = 'Generate';
    if (graph) {
      const range = new Range(
        new Position(graph.line - 1, 0),
        new Position(graph.line - 1, label.length)
      );

      this.codelens.push(
        new CodeLens(
          range,
          {
            title: label,
            command: 'graphviz.generate',
            arguments: [ctx.text]
          }
        )
      );
    }
  }
  visitStmt_list?: ((ctx: Stmt_listContext) => void) | undefined;
  visitStmt?: ((ctx: StmtContext) => void) | undefined;
  visitAttr_stmt?: ((ctx: Attr_stmtContext) => void) | undefined;
  visitAttr_list?: ((ctx: Attr_listContext) => void) | undefined;
  visitA_list?: ((ctx: A_listContext) => void) | undefined;
  visitAssign_stmt?: ((ctx: Assign_stmtContext) => void) | undefined;
  visitEdge_stmt?: ((ctx: Edge_stmtContext) => void) | undefined;
  visitEdgeRHS?: ((ctx: EdgeRHSContext) => void) | undefined;
  visitEdgeop?: ((ctx: EdgeopContext) => void) | undefined;
  visitNode_stmt?: ((ctx: Node_stmtContext) => void) | undefined;
  visitNode_id?: ((ctx: Node_idContext) => void) | undefined;
  visitPort?: ((ctx: PortContext) => void) | undefined;
  visitCompass_pt?: ((ctx: Compass_ptContext) => void) | undefined;
  visitSubgraph?: ((ctx: SubgraphContext) => void) | undefined;
  visitId?: ((ctx: IdContext) => void) | undefined;
  visitLexpr?: ((ctx: LexprContext) => void) | undefined;
  visitRexpr?: ((ctx: RexprContext) => void) | undefined;
  visit(tree: ParseTree): void {
    throw new Error("Method not implemented.");
  }
  visitChildren(node: RuleNode): void {
    throw new Error("Method not implemented.");
  }
  visitTerminal(node: TerminalNode): void {
    throw new Error("Method not implemented.");
  }
  visitErrorNode(node: ErrorNode): void {
    throw new Error("Method not implemented.");
  }

}

