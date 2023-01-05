import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import {
  Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext,
  Attr_listContext, A_listContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext,
  Node_stmtContext, Node_idContext, PortContext, SubgraphContext, Id_Context
} from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";
import { SemanticTokensBuilder } from "vscode";


export class DotSemanticTokensVisitor implements DotVisitor<void> {
  private builder : SemanticTokensBuilder;
  constructor(builder: SemanticTokensBuilder) {
    this.builder = builder;
  }

  visitGraph_list(ctx: Graph_listContext) {}
  visitGraph(ctx: GraphContext) {};
  visitStmt_list(ctx: Stmt_listContext) {}
  visitStmt(ctx: StmtContext) {}
  visitAttr_stmt(ctx: Attr_stmtContext) {}
  visitAttr_list(ctx: Attr_listContext) {}
  visitA_list(ctx: A_listContext) {}
  visitEdge_stmt(ctx: Edge_stmtContext) {}
  visitEdgeRHS(ctx: EdgeRHSContext) {}
  visitEdgeop(ctx: EdgeopContext) {}
  visitNode_stmt(ctx: Node_stmtContext) {}
  visitNode_id(ctx: Node_idContext) {}
  visitPort(ctx: PortContext) {}
  visitSubgraph(ctx: SubgraphContext) {}
  visitId_(ctx: Id_Context) {}
  
  visit(tree: ParseTree): void {
    tree.accept(this);
  }
  
  visitChildren(node: RuleNode): void {
    for(let i=0; i < node.childCount; i++) 
      node.getChild(i).accept(this);
  }
  
  visitTerminal(node: TerminalNode): void {
    // 遍历到终结符
  }
  
  visitErrorNode(node: ErrorNode): void {
    // 这里不报异常，和普通终结符一样处理
    this.visitTerminal(node);
  }

}

