import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CompletionItem, Position } from "vscode";
import { Assign_stmtContext, Attr_listContext, Attr_stmtContext, A_listContext, Compass_ptContext, EdgeopContext, EdgeRHSContext, Edge_stmtContext, GraphContext, Graph_listContext, IdContext, LexprContext, Node_idContext, Node_stmtContext, PortContext, RexprContext, StmtContext, Stmt_listContext, SubgraphContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";


export class DotCompletionItemVisitor implements DotVisitor<void> {
  private readonly position: Position;
  private completionItems: CompletionItem[];
  private visitStack: string[];

  constructor(position: Position, completionItems: CompletionItem[]) {
    this.position = position;
    this.completionItems = completionItems;
    this.visitStack = [];
  }

  positionInContext(ctx: ParserRuleContext): boolean {
    const start = ctx.start;
    const stop = ctx.stop;
    if (stop == undefined) return false;
    else if (this.position.line < start.line - 1 || this.position.line > stop.line - 1) return false;
    else if (this.position.line == start.line - 1 && this.position.line == stop.line - 1) {
      // start 和 stop 位于同一行
      return this.position.character >= start.charPositionInLine && this.position.character <= stop.charPositionInLine + (stop.text?.length || 0);
    }
    else if (this.position.line == start.line - 1) {
      // stop 不在这一行
      return this.position.character >= start.charPositionInLine;
    }
    else if (this.position.line == stop.line - 1) {
      return this.position.character <= stop.charPositionInLine + (stop.text?.length || 0);
    }
    else {
      // 在 start 和 stop 中间的某一行
      return true;
    }
  }

  visitGraph_list(ctx: Graph_listContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('graph_list');
      this.visitChildren(ctx);
    }

  }
  visitGraph(ctx: GraphContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('graph');
      this.visitChildren(ctx);
    }
  }
  visitStmt_list(ctx: Stmt_listContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('stmt_list');
      this.visitChildren(ctx);
    }
  }
  visitStmt(ctx: StmtContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('stmt');
      this.visitChildren(ctx);
    }
  }
  visitAttr_stmt(ctx: Attr_stmtContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('attr_stmt');
      this.visitChildren(ctx);
    }
  }
  visitAttr_list(ctx: Attr_listContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('attr_list');
      this.visitChildren(ctx);
    }
  }
  visitA_list(ctx: A_listContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('a_list');
      this.visitChildren(ctx);
    }
  }
  visitAssign_stmt(ctx: Assign_stmtContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('assign_stmt');
      this.visitChildren(ctx);
    }
  }
  visitEdge_stmt(ctx: Edge_stmtContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('edge_stmt');
      this.visitChildren(ctx);
    }
  }
  visitEdgeRHS(ctx: EdgeRHSContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('edgeRHS');
      this.visitChildren(ctx);
    }
  }
  visitEdgeop(ctx: EdgeopContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('edgeop');
      this.visitChildren(ctx);
    }
  }
  visitNode_stmt(ctx: Node_stmtContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('node_stmt');
      this.visitChildren(ctx);
    }
  }
  visitNode_id(ctx: Node_idContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('node_id');
      this.visitChildren(ctx);
    }
  }
  visitPort(ctx: PortContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('port');
      this.visitChildren(ctx);
    }
  }
  visitCompass_pt(ctx: Compass_ptContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('compass_pt');
      this.visitChildren(ctx);
    }
  }
  visitSubgraph(ctx: SubgraphContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('subgraph');
      this.visitChildren(ctx);
    }
  }
  visitId(ctx: IdContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('id');
      this.visitChildren(ctx);
    }
  }
  visitLexpr(ctx: LexprContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('lexpr');
      this.visitChildren(ctx);
    }
  }
  visitRexpr(ctx: RexprContext) {
    if (this.positionInContext(ctx)) {
      this.visitStack.push('rexpr');
      this.visitChildren(ctx);
    }
  }

  visit(tree: ParseTree): void {
    tree.accept(this);
  }

  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++)
      node.getChild(i).accept(this);
  }

  visitTerminal(node: TerminalNode): void {
    if (node.symbol.line - 1 == this.position.line
      && node.symbol.text
      && node.symbol.charPositionInLine <= this.position.character
      && node.symbol.charPositionInLine + (node.symbol.text?.length || 0) >= this.position.character) {
      // 终结符在当前位置
      this.visitStack.push(node.symbol.text);
      console.log(this.visitStack);
    }
    
  }

  visitErrorNode(node: ErrorNode): void {
    // 这里不报异常，和普通终结符一样处理
    this.visitTerminal(node);
  }
}
