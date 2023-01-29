import { CommonTokenStream, ParserRuleContext, Token } from "antlr4ts";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext, Attr_listContext, A_listContext, Assign_stmtContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext, Node_stmtContext, Node_idContext, PortContext, Compass_ptContext, SubgraphContext, IdContext, LexprContext, RexprContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";



export class DotFormattingEditVisitor implements DotVisitor<string> {
  private tokens: CommonTokenStream;
  private retraction: string = '';

  constructor(tokens: CommonTokenStream) { this.tokens = tokens; }

  // 判断是否包含注释
  containsComment(ctx: ParserRuleContext): boolean {
    const start = ctx.start;
    const stop = ctx.stop;
    for(let i=start.tokenIndex; i<=(stop?.tokenIndex || -100); i++) {
      const channel = this.tokens.get(i).channel;
      if(channel != 0) return true;
    }
    return false;
  }

  visitGraph_list(ctx: Graph_listContext): string { 
    let result = '';
    for(const graph of ctx.graph()) {
      result += graph.accept(this);
      result += '\n';
    }
    return result; 
  }
  visitGraph(ctx: GraphContext): string { 
    let result = this.retraction;

    if(ctx.STRICT() != undefined) {
      result += ctx.STRICT()?.accept(this) + ' ';
    }
    
    if(ctx.DIGRAPH() != undefined)
      result += ctx.DIGRAPH()?.accept(this) + ' ';
    else if(ctx.GRAPH() != undefined)
      result += ctx.GRAPH()?.accept(this) + ' ';
    
    if(ctx.id() != undefined) result += ctx.id()?.accept(this);

    result += '{\n' + this.retraction;

    this.retraction += '  ';

    result += ctx.stmt_list().accept(this);
    
    this.retraction = this.retraction.slice(0, this.retraction.length-2);

    result += '\n' + this.retraction +'}';
    return result; 
  }
  visitStmt_list(ctx: Stmt_listContext): string { 
    let result = '';
    for(const stmt of ctx.stmt()) {
      result += this.retraction + stmt.accept(this) + '\n';
    }
    return result; 
  }
  visitStmt(ctx: StmtContext): string { 
    if(ctx.subgraph()) return `\n${this.retraction}` + ctx.subgraph()?.accept(this) + '\n';
    return this.visitChildren(ctx) + ';'; 
  }

  visitAttr_stmt(ctx: Attr_stmtContext): string { 
    let result = '';
    if(ctx.GRAPH()) result += 'graph ';
    else if(ctx.EDGE()) result += 'edge ';
    else if(ctx.NODE()) result += 'node ';

    result += ctx.attr_list().accept(this) ;
    return result; 
  }

  visitAttr_list(ctx: Attr_listContext): string { 
    let result = '';
    for(const a_list of ctx.a_list()) {
      result += '[' + a_list.accept(this) + '] ';
    }

    return result.trim(); 
  }
  visitA_list(ctx: A_listContext): string { 
    let result = '';
    for(const assign of ctx.assign_stmt()) {
      result += assign.accept(this) + ', ';
    }
    if(result.endsWith(', ')) result = result.slice(0, result.length-2);
    return result; 
  }
  visitAssign_stmt(ctx: Assign_stmtContext): string { 
    return ctx.lexpr().accept(this) + '=' + ctx.rexpr().accept(this);
  }
  visitEdge_stmt(ctx: Edge_stmtContext): string { 
    let result = '';
    if(ctx.node_id()) result += ctx.node_id()?.accept(this) ;
    else if(ctx.subgraph()) result += ctx.subgraph()?.accept(this) ;

    result += ctx.edgeRHS().accept(this);
    if(ctx.attr_list()) result += ' ' + ctx.attr_list()?.accept(this);

    return result; 
  }
  visitEdgeRHS(ctx: EdgeRHSContext): string { 
    let result = '';
    for (let i = 0; i < ctx.childCount; i++) {
      const subcontent = ' ' + ctx.getChild(i).accept(this).trim();
      result += subcontent ;
    }
    return result; 
  }

  visitEdgeop(ctx: EdgeopContext): string { 
    return this.visitChildren(ctx); 
  }
  visitNode_stmt(ctx: Node_stmtContext): string { 
    let result = ctx.node_id().accept(this);
    if(ctx.attr_list()) { result += ' ' + ctx.attr_list()?.accept(this); }
    return result; 
  }
  visitNode_id(ctx: Node_idContext): string { 
    let result = '';
    for(const id of ctx.id()) {
      result += id.accept(this) + ':';
    }  
    if(ctx.compass_pt()) result += ctx.compass_pt()?.accept(this);

    if(result.endsWith(':')) result = result.slice(0, result.length-1);
    return result; 
  }

  visitPort(ctx: PortContext): string { return this.visitChildren(ctx); }

  visitCompass_pt(ctx: Compass_ptContext): string { return this.visitChildren(ctx); }
  visitSubgraph(ctx: SubgraphContext): string { 
    let result = '';
    if(ctx.SUBGRAPH()) result += 'subgraph ';
    if(ctx.id()) result += ctx.id()?.accept(this) + ' ';
    result += '{\n';

    this.retraction += '  ';
    result += ctx.stmt_list().accept(this);
    this.retraction = this.retraction.slice(0, this.retraction.length-2);
    result += '\n' + this.retraction + '}';
    return result; 
  }
  visitId(ctx: IdContext): string { return this.visitChildren(ctx); }
  visitLexpr(ctx: LexprContext): string { 
    let result = ctx.ID()?.symbol.text || ctx.STRING()?.symbol.text || '';
    if(result.startsWith('"') && result.endsWith('"')) result = result.slice(1, result.length-1);
    return result; 
  }
  visitRexpr(ctx: RexprContext):  string { 
    if(ctx.ID()) {
      return '"' + ctx.ID()?.accept(this) + '"';
    }
    return this.visitChildren(ctx); 
  }

  visit(tree: ParseTree): string {
    return tree.accept(this);
  }
  visitChildren(node: RuleNode): string {
    let result = '';
    for (let i = 0; i < node.childCount; i++) {
      const subcontent = node.getChild(i).accept(this).trim();
      result += subcontent ;
    }
    return result;
  }
  visitTerminal(node: TerminalNode): string {
    if(node.symbol.type == Token.EOF) return '';
    return node.symbol.text || '';
  }
  visitErrorNode(node: ErrorNode): string {
    return this.visitTerminal(node);
  }

}



