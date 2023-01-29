import { DotVisitor } from "../dot/DotVisitor";
import { Hover, MarkdownString, Position } from "vscode";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext, Attr_listContext, A_listContext, Assign_stmtContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext, Node_stmtContext, Node_idContext, Compass_ptContext, SubgraphContext, IdContext, LexprContext, RexprContext } from "../dot/DotParser";
import { ParserRuleContext } from "antlr4ts";
import { attributes } from "../attribute/Attributes";


export class DotHoverVisitor implements DotVisitor<void> {
  public result: Hover | null;
  private readonly position: Position;
  constructor(position: Position) {
    this.position = position;
    this.result = null;
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
    for (const graph of ctx.graph()) {
      if (this.positionInContext(graph)) graph.accept(this);
    }
  }
  visitGraph(ctx: GraphContext) {
    const stmt_list = ctx.stmt_list();
    if (this.positionInContext(stmt_list)) stmt_list.accept(this);
  }
  visitStmt_list(ctx: Stmt_listContext) {
    for (const stmt of ctx.stmt()) {
      if (this.positionInContext(stmt)) stmt.accept(this);
    }
  }
  visitStmt(ctx: StmtContext) { this.visitChildren(ctx); }
  visitAttr_stmt(ctx: Attr_stmtContext) {
    const attr_list = ctx.attr_list();
    if (this.positionInContext(attr_list)) attr_list.accept(this);
  }
  visitAttr_list(ctx: Attr_listContext) {
    for (const alist of ctx.a_list()) {
      if (this.positionInContext(alist)) alist.accept(this);
    }
  }
  visitA_list(ctx: A_listContext) {
    for (const assign of ctx.assign_stmt()) {
      if (this.positionInContext(assign)) assign.accept(this);
    }
  }
  visitAssign_stmt(ctx: Assign_stmtContext) {
    if (this.positionInContext(ctx.lexpr())) {
      ctx.lexpr().accept(this);
    }
  }
  visitEdge_stmt(ctx: Edge_stmtContext) {
    const attr_list = ctx.attr_list();
    if (attr_list && this.positionInContext(attr_list))
      attr_list.accept(this);
  }
  visitEdgeRHS(ctx: EdgeRHSContext) { }
  visitEdgeop(ctx: EdgeopContext) { }
  visitNode_stmt(ctx: Node_stmtContext) {
    const attr_list = ctx.attr_list();
    if (attr_list && this.positionInContext(attr_list))
      attr_list.accept(this);
  }
  visitNode_id(ctx: Node_idContext) { }
  visitCompass_pt(ctx: Compass_ptContext) { }
  visitSubgraph(ctx: SubgraphContext) { 
    const stmt_list = ctx.stmt_list();
    if(this.positionInContext(stmt_list)) stmt_list.accept(this);
  }
  visitId(ctx: IdContext) { }

  visitLexpr(ctx: LexprContext) {
    let name = ctx.ID()?.symbol.text || ctx.STRING()?.symbol.text || '';
    if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length - 1);
    // 根据 name 设置 hover 的内容。
    const description = attributes.find(item => item.name == name)?.description;
    if (description)
      this.result = new Hover(new MarkdownString(description));
  }
  visitRexpr(ctx: RexprContext) { }

  visit(tree: ParseTree): void {
    tree.accept(this);
  }

  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++)
      node.getChild(i).accept(this);
  }

  visitTerminal(_node: TerminalNode): void {
    // 遍历到终结符
  }

  visitErrorNode(node: ErrorNode): void {
    // 这里不报异常，和普通终结符一样处理
    this.visitTerminal(node);
  }

}

