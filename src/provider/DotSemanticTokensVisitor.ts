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


class DotSemanticTokensVisitor implements DotVisitor<void> {
  visitGraph_list?: ((ctx: Graph_listContext) => void) | undefined;
  visitGraph?: ((ctx: GraphContext) => void) | undefined;
  visitStmt_list?: ((ctx: Stmt_listContext) => void) | undefined;
  visitStmt?: ((ctx: StmtContext) => void) | undefined;
  visitAttr_stmt?: ((ctx: Attr_stmtContext) => void) | undefined;
  visitAttr_list?: ((ctx: Attr_listContext) => void) | undefined;
  visitA_list?: ((ctx: A_listContext) => void) | undefined;
  visitEdge_stmt?: ((ctx: Edge_stmtContext) => void) | undefined;
  visitEdgeRHS?: ((ctx: EdgeRHSContext) => void) | undefined;
  visitEdgeop?: ((ctx: EdgeopContext) => void) | undefined;
  visitNode_stmt?: ((ctx: Node_stmtContext) => void) | undefined;
  visitNode_id?: ((ctx: Node_idContext) => void) | undefined;
  visitPort?: ((ctx: PortContext) => void) | undefined;
  visitSubgraph?: ((ctx: SubgraphContext) => void) | undefined;
  visitId_?: ((ctx: Id_Context) => void) | undefined;
  
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

