import { DotVisitor } from "../dot/DotVisitor";
import {
  Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext,
  Attr_listContext, A_listContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext,
  Node_stmtContext, Node_idContext, SubgraphContext, IdContext, Compass_ptContext, LexprContext, RexprContext, Assign_stmtContext
} from "../dot/DotParser";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Diagnostic, DiagnosticSeverity, Position, Range } from "vscode";
import { Attribute } from "../attribute/Attribute";

export class DotDiagnosticVisitor implements DotVisitor<void> {

  private diagnostics: Diagnostic[];
  private graphType: string;
  private scope: string;

  constructor(diagnostics: Diagnostic[]) {
    this.diagnostics = diagnostics;
    this.graphType = '';
    this.scope = 'none';
  }

  visitGraph_list(ctx: Graph_listContext) {
    this.visitChildren(ctx);
  }
  visitGraph(ctx: GraphContext) {
    if (ctx.DIGRAPH()) this.graphType = 'digraph';
    else if (ctx.GRAPH()) this.graphType = 'graph';

    const lastScope = this.scope;
    this.scope = 'graph';
    this.visitChildren(ctx);
    this.scope = lastScope;
  }
  visitStmt_list(ctx: Stmt_listContext) {
    this.visitChildren(ctx);
  }
  visitStmt(ctx: StmtContext) { this.visitChildren(ctx); }
  visitAttr_stmt(ctx: Attr_stmtContext) {
    const lastScope = this.scope;
    if(ctx.NODE()) this.scope = 'node';
    else if(ctx.GRAPH()) this.scope = 'graph';
    else if(ctx.EDGE()) this.scope = 'edge';
    this.visitChildren(ctx);
    this.scope = lastScope;
  }
  visitAttr_list(ctx: Attr_listContext) {
    this.visitChildren(ctx);
  }
  visitA_list(ctx: A_listContext) {
    this.visitChildren(ctx);
  }
  visitAssign_stmt(ctx: Assign_stmtContext) {
    // 检查属性值是否正确
    let symbol = ctx.lexpr().ID()?.symbol || ctx.lexpr().STRING()?.symbol;
    if(symbol) {
      let name = symbol.text || symbol.text || '';
      if(name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length-1);

      const attribute = Attribute.getInstance();
      
      if(
        (this.scope == 'cluster' || this.scope == 'subgraph') && ! attribute.isClusterOrSubgraphAttribute(name) ||
        this.scope == 'node' && ! attribute.isNodeAttribute(name) ||
        this.scope == 'graph' && ! attribute.isGraphAttribute(name) ||
        this.scope == 'edge' && ! attribute.isEdgeAttribute(name)
      )
      {
        const diagnostic: Diagnostic = {
          severity: DiagnosticSeverity.Warning,
          range: new Range(
            new Position(symbol.line-1, symbol.charPositionInLine),
            new Position(symbol.line-1, symbol.charPositionInLine + name.length)
          ),
          message: 'bad attribute',
          source: 'dot'
        };
        this.diagnostics.push(diagnostic);
      }
    }
  }

  visitEdge_stmt(ctx: Edge_stmtContext) {
    const lastScope = this.scope;
    this.scope = 'edge';
    this.visitChildren(ctx);
    this.scope = lastScope;
  }
  visitEdgeRHS(ctx: EdgeRHSContext) { this.visitChildren(ctx); }
  visitEdgeop(ctx: EdgeopContext) {
    // 检查 运算符 是否正确
    const op = ctx.text.trim();
    const line = ctx.start.line - 1;
    const pos = ctx.start.charPositionInLine;

    if (op != '->' && op != '--' ||
      op == '--' && this.graphType == 'digraph' ||
      op == '->' && this.graphType == 'graph'
    ) {
      const diagnostic: Diagnostic = {
        severity: DiagnosticSeverity.Error,
        range: new Range(
          new Position(line, pos),
          new Position(line, pos + op.length)
        ),
        message: 'you may use wrong edgeop',
        source: 'dot'
      };
      this.diagnostics.push(diagnostic);
    }
  }
  visitNode_stmt(ctx: Node_stmtContext) {
    const lastScope = this.scope;
    this.scope = 'node';
    this.visitChildren(ctx);
    this.scope = lastScope;
  }
  visitNode_id(ctx: Node_idContext) { this.visitChildren(ctx); }
  visitCompass_pt(ctx: Compass_ptContext) { this.visitChildren(ctx); }
  visitSubgraph(ctx: SubgraphContext) {
    let name = ctx.id()?.ID()?.symbol.text
      || ctx.id()?.STRING()?.symbol.text || '';
    if (name.startsWith('"') && name.endsWith('"'))
      name = name.slice(1, name.length - 1);

    const lastScope = this.scope;
    this.scope = name.startsWith('cluster') ? 'cluster' : 'subgraph';
    this.visitChildren(ctx);
    this.scope = lastScope;
  }
  visitId(ctx: IdContext) { this.visitChildren(ctx); }

  visitLexpr(ctx: LexprContext) {
    this.visitChildren(ctx);
  }
  visitRexpr(ctx: RexprContext) { this.visitChildren(ctx); }

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



