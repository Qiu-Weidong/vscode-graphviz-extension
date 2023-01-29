import { CommonTokenStream, ParserRuleContext, Token } from "antlr4ts";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext, Attr_listContext, A_listContext, Assign_stmtContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext, Node_stmtContext, Node_idContext, Compass_ptContext, SubgraphContext, IdContext, LexprContext, RexprContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";



export class DotFormattingEditVisitor implements DotVisitor<void> {
  private comments: Token[];
  private indent: number;
  private readonly indentSize: number;

  private result: string;

  constructor(comments: Token[], indentSize: number) {
    this.comments = comments.sort((a, b) => a.tokenIndex - b.tokenIndex);
    this.indentSize = indentSize;
    this.indent = 0;

    this.result = '';
  }

  public getResult(): string { return this.result; }

  // 换行
  private writelf() {
    this.result += '\n';
    for (let i = 0; i < this.indent; i++) this.result += ' ';
  }

  private writeLeftComments(token: Token) {
    // 输出 token 前面的 注释
    while(this.comments.length > 0 && this.comments[0].tokenIndex < token.tokenIndex) {
      const comment = this.comments[0];
      this.comments = this.comments.slice(1, this.comments.length);
      const text = comment.text?.trim() || '';
      if(text.startsWith('//')) {
        // 输出之后一定要换行
        this.result += text;
        this.writelf();
      }
      else {
        this.result += text;
      }
    }
  }

  private writeToken(token: Token) {
    // 输出 token 前的所有注释
    this.writeLeftComments(token);
    this.result += token.text;
  }

  visitGraph_list(ctx: Graph_listContext): void {
    for (const graph of ctx.graph()) {
      graph.accept(this);
      this.writelf();
    }
  }

  visitGraph(ctx: GraphContext): void {

    if (ctx.STRICT() != undefined) {
      ctx.STRICT()?.accept(this);
    }

    if (ctx.DIGRAPH() != undefined) {
      ctx.DIGRAPH()?.accept(this);
    }
    else if (ctx.GRAPH() != undefined) {
      ctx.GRAPH()?.accept(this);
    }

    if (ctx.id() != undefined) {
      ctx.id()?.accept(this);
      this.result += ' ';
    }

    // 写完 { 后换行, 并缩进
    this.indent += this.indentSize;
    this.writeToken(ctx._lp);
    this.writelf();

    ctx.stmt_list().accept(this);

    this.indent -= this.indentSize;

    // 换行，再写 }
    this.writelf();
    this.writeToken(ctx._rp);

  }
  visitStmt_list(ctx: Stmt_listContext): void {
    for (const stmt of ctx.stmt()) {
      stmt.accept(this);
      // 每写完一条 stmt，换行
      this.writelf();
    }
  }
  visitStmt(ctx: StmtContext): void {
    if (ctx.subgraph()) {
      // 缩进
      this.indent += this.indentSize;
      ctx.subgraph()?.accept(this);
      this.indent -= this.indentSize;
    }
    else {
      this.visitChildren(ctx);
      const semicolon = ctx._semicolon;
      if (! semicolon) {
        // this.writeToken(semicolon);
        this.result += ';';
      }
    }
  }

  visitAttr_stmt(ctx: Attr_stmtContext): void {
    this.visitChildren(ctx);
  }

  visitAttr_list(ctx: Attr_listContext): void {
    for (const a_list of ctx.a_list()) {
      a_list.accept(this);
    }
  }
  visitA_list(ctx: A_listContext): void {
    this.writeToken(ctx._lp);
    for (const assign of ctx.assign_stmt()) {
      assign.accept(this);
      const separator = ctx._separator;
      if (separator) {
        this.writeToken(separator);
      }
      else {
        this.result += ', ';
      }
    }
    this.writeToken(ctx._rp);
  }
  visitAssign_stmt(ctx: Assign_stmtContext): void {
    // return ctx.lexpr().accept(this) + '=' + ctx.rexpr().accept(this);
    ctx.lexpr().accept(this);
    this.writeToken(ctx._equ);
    ctx.rexpr().accept(this);
  }
  visitEdge_stmt(ctx: Edge_stmtContext): void {
    if (ctx.node_id()) ctx.node_id()?.accept(this);
    else if (ctx.subgraph()) ctx.subgraph()?.accept(this);

    ctx.edgeRHS().accept(this);
    if (ctx.attr_list()) ctx.attr_list()?.accept(this);
  }
  visitEdgeRHS(ctx: EdgeRHSContext): void {
    this.visitChildren(ctx);
  }

  visitEdgeop(ctx: EdgeopContext): void {
    return this.visitChildren(ctx);
  }
  visitNode_stmt(ctx: Node_stmtContext): void {
    ctx.node_id().accept(this);
    if (ctx.attr_list()) { ctx.attr_list()?.accept(this); }
  }
  visitNode_id(ctx: Node_idContext): void {
    for (const id of ctx.id()) {
      id.accept(this);
    }
    if (ctx.compass_pt()) ctx.compass_pt()?.accept(this);

    // if(result.endsWith(':')) result = result.slice(0, result.length-1);
  }

  visitCompass_pt(ctx: Compass_ptContext): void { return this.visitChildren(ctx); }
  visitSubgraph(ctx: SubgraphContext): void {
    this.visitChildren(ctx);
  }
  visitId(ctx: IdContext): void { return this.visitChildren(ctx); }
  visitLexpr(ctx: LexprContext): void {
    // 去掉引号
    const symbol = ctx.ID()?.symbol || ctx.STRING()?.symbol;
    if (symbol) {
      let result = symbol.text || '';
      if (result.startsWith('"') && result.endsWith('"')) result = result.slice(1, result.length - 1);

      // 先写注释
      this.writeLeftComments(symbol);
      this.result += result;
    }

  }
  visitRexpr(ctx: RexprContext): void {
    if (ctx.ID()) {
      // 先把 id 前面的注释写了
      this.writeLeftComments(ctx.ID()?.symbol as Token);
      // 然后把结果用 "" 包裹起来
      this.result += `"${ctx.ID()?.symbol.text || ''}"`;
    }
    else {
      this.visitChildren(ctx);
    }
  }

  visit(tree: ParseTree): void {
    return tree.accept(this);
  }
  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++) {
      node.getChild(i).accept(this);
    }
  }
  visitTerminal(node: TerminalNode): void {
    // 输出 token 和它前面的注释
    this.writeToken(node.symbol);
    // 再后面加一个空格
    this.result += ' ';
  }
  visitErrorNode(node: ErrorNode): void {
    return this.visitTerminal(node);
  }

}



