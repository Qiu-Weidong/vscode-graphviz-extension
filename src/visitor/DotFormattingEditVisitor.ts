import { ParserRuleContext, Token } from "antlr4ts";
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
  private newlineAfterComment: boolean;
  private result: string;

  constructor(comments: Token[], indentSize: number) {
    this.comments = comments.sort((a, b) => a.tokenIndex - b.tokenIndex);
    this.indentSize = indentSize;
    this.newlineAfterComment = true;
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
    while (this.comments.length > 0 && this.comments[0].tokenIndex < token.tokenIndex) {
      const comment = this.comments[0];
      this.comments = this.comments.slice(1, this.comments.length);
      const text = comment.text?.trim() || '';
      this.result += text;
      if (text.startsWith('//') || this.newlineAfterComment)
        this.writelf();
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

    // 剩下的注释
    for(const comment of this.comments) {
      this.result += comment.text + '\n';
    }
  }

  visitGraph(ctx: GraphContext): void {

    if (ctx.STRICT() != undefined) {
      ctx.STRICT()?.accept(this);
      this.result += ' ';
    }

    if (ctx.DIGRAPH() != undefined) {
      ctx.DIGRAPH()?.accept(this);
    }
    else if (ctx.GRAPH() != undefined) {
      ctx.GRAPH()?.accept(this);
    }
    this.result += ' ';

    if (ctx.id() != undefined) {
      ctx.id()?.accept(this);
      this.result += ' ';
    }

    this.writeToken(ctx._lp);
    // 写完 { 后换行, 并缩进
    this.indent += this.indentSize;
    this.writelf();

    ctx.stmt_list().accept(this);

    this.indent -= this.indentSize;

    // 换行，再写 }
    this.writelf();
    this.writeToken(ctx._rp);
  }

  visitStmt_list(ctx: Stmt_listContext): void {
    const hold = this.newlineAfterComment;
    this.newlineAfterComment = true;
    const stmts = ctx.stmt();
    const last_stmt = stmts.pop();

    for (const stmt of stmts) {
      stmt.accept(this);
      // 每写完一条 stmt，换行, 但最后一条不要换行
      this.writelf();
    }

    if (last_stmt) {
      // 写最后一条不换行
      last_stmt.accept(this);
    }

    this.newlineAfterComment = hold;
  }

  visitStmt(ctx: StmtContext): void {
    // subgraph 不要带 ;
    if (ctx.subgraph()) {
      ctx.subgraph()?.accept(this);
      // 虽然不带分号，但是分号前的注释不能忘了
      if (ctx._semicolon) {
        this.writeLeftComments(ctx._semicolon);
      }
    }
    else {

      this.visitChildren(ctx);

      if (!ctx._semicolon) {
        // 如果没有分号，记得加一个
        this.result += ';';
      }
    }
  }

  visitAttr_stmt(ctx: Attr_stmtContext): void {
    const header = ctx.EDGE() || ctx.GRAPH() || ctx.NODE();
    header?.accept(this);
    // header 写完后缩进一下
    this.indent += this.indentSize;
    this.result += ' ';
    const hold = this.newlineAfterComment;
    this.newlineAfterComment = false;

    ctx.attr_list().accept(this);
    
    this.indent -= this.indentSize;
    this.newlineAfterComment = hold;
  }

  visitAttr_list(ctx: Attr_listContext): void {
    for (const a_list of ctx.a_list()) {
      a_list.accept(this);
    }
  }
  visitA_list(ctx: A_listContext): void {
    this.writeToken(ctx._lp);
    this.indent += this.indentSize;

    const assigns = ctx.assign_stmt();
    const last_assign = assigns.pop();
    for (const assign of assigns) {
      assign.accept(this);
      this.result += ', ';
    }

    // 最后一个 assign 后面不要逗号
    if (last_assign) {
      last_assign.accept(this);
    }

    this.indent -= this.indentSize;
    this.writeToken(ctx._rp);
  }
  visitAssign_stmt(ctx: Assign_stmtContext): void {
    ctx.lexpr().accept(this);
    this.writeToken(ctx._equ);
    ctx.rexpr().accept(this);
  }
  visitEdge_stmt(ctx: Edge_stmtContext): void {
    const header: ParserRuleContext | undefined = ctx.subgraph() || ctx.node_id();
    header?.accept(this);
    this.indent += this.indentSize;
    const hold = this.newlineAfterComment;
    this.newlineAfterComment = false;
    ctx.edgeRHS().accept(this);

    if (ctx.attr_list()) {
      this.result += ' ';
      ctx.attr_list()?.accept(this);
    }

    this.indent -= this.indentSize;
    this.newlineAfterComment = hold;
  }
  visitEdgeRHS(ctx: EdgeRHSContext): void {
    this.visitChildren(ctx);
  }

  visitEdgeop(ctx: EdgeopContext): void {
    // 前后加两个空格
    this.result += ' ';
    this.visitChildren(ctx);
    this.result += ' ';
  }

  visitNode_stmt(ctx: Node_stmtContext): void {
    ctx.node_id().accept(this);
    this.indent += this.indentSize;
    const hold = this.newlineAfterComment;
    this.newlineAfterComment = false;
    if (ctx.attr_list()) {
      this.result += ' ';
      ctx.attr_list()?.accept(this);
    }
    this.indent -= this.indentSize;
    this.newlineAfterComment = hold;
  }

  visitNode_id(ctx: Node_idContext): void {
    const ids = ctx.id();
    const last_id = ids.pop();
    for (const id of ids) {
      id.accept(this);
      this.result += ':';
    }
    if (last_id) {
      // 后面不要有 冒号 了
      last_id.accept(this);
    }
    if (ctx.compass_pt()) {
      this.result += ':';
      ctx.compass_pt()?.accept(this);
    }
  }

  visitCompass_pt(ctx: Compass_ptContext): void { this.visitChildren(ctx); }
  visitSubgraph(ctx: SubgraphContext): void {

    if (ctx.SUBGRAPH()) {
      ctx.SUBGRAPH()?.accept(this);
      this.result += ' ';
    }
    if (ctx.id()) {
      ctx.id()?.accept(this);
      this.result += ' ';
    }

    this.writeToken(ctx._lp);

    this.indent += this.indentSize;
    this.writelf();

    ctx.stmt_list().accept(this);

    this.indent -= this.indentSize;
    this.writelf();
    this.writeToken(ctx._rp);

  }
  visitId(ctx: IdContext): void { this.visitChildren(ctx); }
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
    tree.accept(this);
  }
  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++) {
      node.getChild(i).accept(this);
    }
  }
  visitTerminal(node: TerminalNode): void {
    // 输出 token 和它前面的注释
    this.writeToken(node.symbol);
  }
  visitErrorNode(node: ErrorNode): void {
    this.visitTerminal(node);
  }

}



