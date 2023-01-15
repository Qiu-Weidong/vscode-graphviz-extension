import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import {
  Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext,
  Attr_listContext, A_listContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext,
  Node_stmtContext, Node_idContext, PortContext, SubgraphContext, IdContext, Compass_ptContext, LexprContext, RexprContext, Assign_stmtContext
} from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";
import { Position, Range, SemanticTokensBuilder } from "vscode";
import { assert } from "console";


export class DotSemanticTokensVisitor implements DotVisitor<void> {
  private builder : SemanticTokensBuilder;
  constructor(builder: SemanticTokensBuilder) {
    this.builder = builder;
  }

  private addHighlight(node: TerminalNode, tokenType: string): void {
    const token = node.symbol;
    const range = new Range(
      new Position(token.line-1, token.charPositionInLine),
      new Position(token.line-1, token.charPositionInLine+(token.text?.length || 0))
    );
    this.builder.push(range, tokenType);
  }

  visitGraph_list(ctx: Graph_listContext) { this.visitChildren(ctx); }
  visitGraph(ctx: GraphContext) {
    this.visitChildren(ctx);
  }
  visitStmt_list(ctx: Stmt_listContext) { this.visitChildren(ctx); }
  visitStmt(ctx: StmtContext) { 
    this.visitChildren(ctx); 
  }
  visitAttr_stmt(ctx: Attr_stmtContext) { this.visitChildren(ctx); }
  visitAttr_list(ctx: Attr_listContext) { this.visitChildren(ctx); }
  visitA_list(ctx: A_listContext) { this.visitChildren(ctx); }
  visitAssign_stmt(ctx: Assign_stmtContext) { this.visitChildren(ctx); }
  visitEdge_stmt(ctx: Edge_stmtContext) { this.visitChildren(ctx); }
  visitEdgeRHS(ctx: EdgeRHSContext) { this.visitChildren(ctx); }
  visitEdgeop(ctx: EdgeopContext) { this.visitChildren(ctx); }
  visitNode_stmt(ctx: Node_stmtContext) { this.visitChildren(ctx); }
  visitNode_id(ctx: Node_idContext) { this.visitChildren(ctx); }
  visitPort(ctx: PortContext) { this.visitChildren(ctx); }
  visitCompass_pt(ctx: Compass_ptContext) { 
    this.visitChildren(ctx); 
  }
  visitSubgraph(ctx: SubgraphContext) { this.visitChildren(ctx); }
  visitId(ctx: IdContext) { this.visitChildren(ctx); }
  visitLexpr(ctx: LexprContext) {
    const terminal = ctx.ID() || ctx.STRING();
    if(terminal != undefined) {
      this.addHighlight(terminal, 'keyword');
    }
  }
  visitRexpr(ctx: RexprContext) { 
    const id = ctx.ID();
    if(id != undefined) {
      this.addHighlight(id, 'label');
    }
    else 
      this.visitChildren(ctx); 
  }
  
  visit(tree: ParseTree): void {
    tree.accept(this);
  }
  
  visitChildren(node: RuleNode): void {
    for(let i=0; i < node.childCount; i++) 
      node.getChild(i).accept(this);
  }
  
  visitTerminal(node: TerminalNode): void {
    // 遍历到终结符
    const tokenType = DotSemanticTokensVisitor.getTokenType(node.symbol.type);
    // if(tokenType == 'operator') { console.log('fuck'); }
    if(tokenType != 'none') {
      this.addHighlight(node, tokenType);
    }
  }
  
  visitErrorNode(node: ErrorNode): void {
    // 这里不报异常，和普通终结符一样处理
    this.visitTerminal(node);
  }
  
  // 注意，当语法更新时，需要同步更新
  static getTokenType(num: number): string {
    
    assert(num < 21);
    // '=' '->' '--' ':'
    if(num == 4 || num >=8 && num <= 10) { return 'operator';}
    // 'strict' 给个 decorator
    else if(num == 11) return 'interface';
    // 'graph' 'subgraph' 'digraph' 'node' 'edge'
    else if(num >= 12 && num <= 16 ) return 'function';
    // number
    else if(num == 17) return 'number'; 
    // string
    else if(num == 18) return 'string';
    // ID
    else if(num == 19) return 'parameter';

    // 由于 HTML_STRING有多行，因此和注释一起渲染。
    else
      return 'none';
  }
}


/**
 * 标准token类型
 * namespace class enum	interface	struct 
 * typeParameter type
 * parameter	variable	property	
 * enumMember decorator	
 * event	function
 * method macro	label comment	
 * string	keyword	number 
 * regexp	operator
 * 
 * 标准 modifier 类型
 * declaration	definition readonly
 * static deprecated	abstract	
 * async	modification	documentation	defaultLibrary
 */

