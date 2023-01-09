import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CompletionItem, CompletionItemKind, Position, MarkdownString } from "vscode";
import { Assign_stmtContext, Attr_listContext, Attr_stmtContext, A_listContext, Compass_ptContext, EdgeopContext, EdgeRHSContext, Edge_stmtContext, GraphContext, Graph_listContext, IdContext, LexprContext, Node_idContext, Node_stmtContext, PortContext, RexprContext, StmtContext, Stmt_listContext, SubgraphContext } from "../dot/DotParser";
import { DotVisitor } from "../dot/DotVisitor";
import { attributes, attributeValue } from "./Attribute";


export class DotCompletionItemVisitor implements DotVisitor<void> {
  private readonly position: Position;
  private completionItems: CompletionItem[];


  private readonly node_attrs: CompletionItem[];
  private readonly edge_attrs: CompletionItem[];
  private readonly cluster_attrs: CompletionItem[];
  private readonly subgraph_attrs: CompletionItem[];
  private readonly graph_attrs: CompletionItem[];

  // graph,subgraph,cluster, edge, node, node_attr, edge_attr, graph_attr, cluster_attr, subgraph_attr
  private scope: string;

  constructor(position: Position, completionItems: CompletionItem[]) {
    this.position = position;
    this.completionItems = completionItems;
    this.scope = 'none';

    this.node_attrs = attributes.filter(item => item.usedby.includes('Nodes')).map(item => new CompletionItem(item.name, CompletionItemKind.Property));
    this.edge_attrs = attributes.filter(item => item.usedby.includes('Edges')).map(item => new CompletionItem(item.name, CompletionItemKind.Property));
    this.cluster_attrs = attributes.filter(item => item.usedby.includes('Clusters')).map(item => new CompletionItem(item.name, CompletionItemKind.Property));
    this.graph_attrs = attributes.filter(item => item.usedby.includes('Graphs')).map(item => new CompletionItem(item.name, CompletionItemKind.Property));
    this.subgraph_attrs = attributes.filter(item => item.usedby.includes('Subgraphs')).map(item => new CompletionItem(item.name, CompletionItemKind.Property));

  }

  positionInContext(ctx: ParserRuleContext): boolean {
    // if(! ctx) return false;
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

  // graph_list: graph+ EOF; 
  visitGraph_list(ctx: Graph_listContext) {
    if (ctx.graph().length <= 0) {
      // 暂时还没有定义 graph
      this.completionItems.push(new CompletionItem('strict', CompletionItemKind.Keyword));
      this.completionItems.push(new CompletionItem('graph', CompletionItemKind.Keyword));
      this.completionItems.push(new CompletionItem('digraph', CompletionItemKind.Keyword));
    }
    else {
      // 已经定义了 graph，则直接向下访问
      for (const graph of ctx.graph()) {
        if (this.positionInContext(graph)) graph.accept(this);
      }
    }
  }

  // graph: STRICT? ( GRAPH | DIGRAPH) id? '{' stmt_list '}';
  visitGraph(ctx: GraphContext) {
    if (!ctx.DIGRAPH() && !ctx.GRAPH()) {
      //  如果还没有写 digraph 和 graph 这连个关键字，那么就提示这两个关键字
      this.completionItems.push(new CompletionItem('graph', CompletionItemKind.Keyword));
      this.completionItems.push(new CompletionItem('digraph', CompletionItemKind.Keyword));
    }
    else if (this.positionInContext(ctx.stmt_list())) {
      // 如果正在编辑 stmt_list， 那么就继续，id 不提示
      // 将当前 scope 置为 graph
      this.scope = 'graph';
      ctx.stmt_list().accept(this);
    }

  }

  // stmt_list: ( stmt ';'?)*;
  visitStmt_list(ctx: Stmt_listContext) {
    for (const stmt of ctx.stmt()) {
      if (this.positionInContext(stmt)) stmt.accept(this);
    }
  }

  visitStmt(ctx: StmtContext) { this.visitChildren(ctx); }

  // attr_stmt: ( GRAPH | NODE | EDGE) attr_list;
  visitAttr_stmt(ctx: Attr_stmtContext) {

    if (!ctx.EDGE() && !ctx.GRAPH() && !ctx.NODE()) {
      // 按理说不会到达这里
      this.completionItems.push(new CompletionItem('node', CompletionItemKind.Property));
      this.completionItems.push(new CompletionItem('edge', CompletionItemKind.Property));
      this.completionItems.push(new CompletionItem('graph', CompletionItemKind.Property));
      console.error('never reached');
    }
    else if (this.positionInContext(ctx.attr_list())) {
      // 正在编辑 attr_list;
      this.scope = ctx.EDGE() ? 'edge_attr' : ctx.GRAPH() ? 'graph_attr' : ctx.NODE() ? 'node_attr' : 'unknown_attr';
      ctx.attr_list().accept(this);
    }

  }

  // attr_list: ( '[' a_list? ']')+;
  visitAttr_list(ctx: Attr_listContext) {
    for (const a_list of ctx.a_list()) {
      if (this.positionInContext(a_list)) a_list.accept(this);
    }
  }

  // a_list: ( assign_stmt ','?)+;
  visitA_list(ctx: A_listContext) {
    for (const assign_stmt of ctx.assign_stmt()) {
      if (this.positionInContext(assign_stmt)) assign_stmt.accept(this);
    }
  }















  // assign_stmt: lexpr '=' rexpr ;
  visitAssign_stmt(ctx: Assign_stmtContext) {
    if (this.positionInContext(ctx.lexpr())) {
      // 如果正在编辑属性名，这里则提示属性名
      this.completeAttrName();
    }
    else if (this.positionInContext(ctx.rexpr())) {
      // 在这里提示属性值。
      // 首先获取属性名称
      const token = ctx.lexpr().ID() || ctx.lexpr().STRING();
      if (token != undefined) {
        const attr_name = token.symbol.text || '';
        // 根据属性名称提示
      }
    }

  }

  // edge_stmt: ( node_id | subgraph) edgeRHS attr_list?;
  visitEdge_stmt(ctx: Edge_stmtContext) {
    // 访问到这里的时候，一定可以确定是 edge。
    this.scope = 'edge';

    const attr_list = ctx.attr_list();
    const node_id = ctx.node_id();
    const subgraph = ctx.subgraph();
    if (attr_list && this.positionInContext(attr_list)) {
      this.scope = 'edge_attr';
      attr_list.accept(this);
    }
    else if (node_id && this.positionInContext(node_id)) {
      node_id.accept(this);
    }
    else if (subgraph && this.positionInContext(subgraph)) {
      // 正在编辑 subgraph
      subgraph.accept(this);
    }
    else if (this.positionInContext(ctx.edgeRHS())) {
      ctx.edgeRHS().accept(this);
    }

  }

  // edgeRHS: ( edgeop ( node_id | subgraph))+;
  visitEdgeRHS(ctx: EdgeRHSContext) { }


  visitEdgeop(ctx: EdgeopContext) {
    if (this.positionInContext(ctx)) {
      this.completionItems.push(new CompletionItem('--', CompletionItemKind.Operator));
      this.completionItems.push(new CompletionItem('->', CompletionItemKind.Operator));
    }
  }

  // node_id attr_list?
  visitNode_stmt(ctx: Node_stmtContext) {
    const node_id = ctx.node_id();
    const attr_list = ctx.attr_list();
    if (node_id && this.positionInContext(node_id)) {
      // 注意，虽然 这里定义了 scope是node，但不一定真的是 node。
      node_id.accept(this);
    }
    else if (attr_list && this.positionInContext(attr_list)) {
      // 正在编辑节点的属性
      this.scope = 'node_attr';
      attr_list.accept(this);
    }

  }

  visitNode_id(ctx: Node_idContext) {

    const ids = ctx.id();
    const compass_pt = ctx.compass_pt();
    if (ids.length <= 0) {
      // 节点名称都没有，则提示节点名称, 按理说走到这里应该有一个id。
      console.log('never reached visitNode_id');
    }
    else if (ids.length <= 1) {
      // 正在编辑节点名称(也有可能是 node、graph、edge和subgraph关键字 也可能是赋值语句，需要提示可能的属性)  提示 已经定义了的节点
      if (compass_pt) {
        // 此时可以确定一定是在编辑 nodeid 。
        if (this.positionInContext(ids[0])) {
          // 正在编辑节点名称，提示节点名称即可
        }
        else if (this.positionInContext(compass_pt)) {
          // 正在编辑 compass_pt, 提示 compass_pt 即可。
          this.completeCompassPt();
        }
      }
      else {
        let nodeCompletion = new CompletionItem('node', CompletionItemKind.Class);
        this.completionItems.push(nodeCompletion);
        this.completionItems.push(new CompletionItem('graph', CompletionItemKind.Class));
        this.completionItems.push(new CompletionItem('edge', CompletionItemKind.Class));
        this.completionItems.push(new CompletionItem('subgraph', CompletionItemKind.Class));

        // 提示可能的属性名
        this.completeAttrName();
      }

    }
    else if (ids.length <= 2) {
      // 这时才可以确定是 node id，此时正在编辑 port，那么对 port进行提示。
      if (this.positionInContext(ids[0])) {
        // 正在编辑节点名称，对节点名称进行提示
      }
      else if (this.positionInContext(ids[1])) {
        // 正在编辑 port，对 port 进行提示, 注意，需要同时对 compass_pt 进行提示。
        let name = ids[0].ID()?.symbol.text || ids[0].NUMBER()?.symbol.text || ids[0].STRING()?.symbol.text || '';
        if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length - 1);
        // 根据 节点名称提示 port 和 compass_pt
        this.completeCompassPt();
      }
      else if (compass_pt && this.positionInContext(compass_pt)) {
        this.completeCompassPt();
      }


    }
  }

  visitPort(ctx: PortContext) { }
  visitCompass_pt(ctx: Compass_ptContext) { this.completeCompassPt(); }

  // subgraph: ( SUBGRAPH id?)? '{' stmt_list '}';
  visitSubgraph(ctx: SubgraphContext) {
    if (this.positionInContext(ctx.stmt_list())) {
      // 首先检查是否是 cluster
      let name = ctx.id()?.ID()?.symbol.text
        || ctx.id()?.STRING()?.symbol.text || '';
      if (name.startsWith('"') && name.endsWith('"'))
        name = name.slice(1, name.length - 1);

      this.scope = name.startsWith('cluster') ? 'cluster' : 'subgraph';
      ctx.stmt_list().accept(this);
    }
  }


  visitId(ctx: IdContext) { console.log('never reached id'); }
  visitLexpr(ctx: LexprContext) { console.log('never reached lexpr'); }
  visitRexpr(ctx: RexprContext) { console.log('never reached rexpr'); }

  visit(tree: ParseTree): void {
    tree.accept(this);
  }

  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++)
      node.getChild(i).accept(this);
  }

  visitTerminal(node: TerminalNode): void {
    // if (node.symbol.line - 1 == this.position.line
    //   && node.symbol.text
    //   && node.symbol.charPositionInLine <= this.position.character
    //   && node.symbol.charPositionInLine + (node.symbol.text?.length || 0) >= this.position.character) {
    //   // 终结符在当前位置
    //   this.visitStack.push(node.symbol.text);
    //   console.log(this.visitStack, node.symbol.type);
    // }

  }

  visitErrorNode(node: ErrorNode): void {
    // 这里不报异常，和普通终结符一样处理
    this.visitTerminal(node);
  }


  completeAttrName(): void {
    if (this.scope.includes('subgraph')) {
      this.completionItems.push(...this.subgraph_attrs);
    }
    else if (this.scope.includes('graph')) {
      this.completionItems.push(...this.graph_attrs);
    }
    else if (this.scope.includes('cluster')) {
      this.completionItems.push(...this.cluster_attrs);
    }
    else if (this.scope.includes('node')) {
      this.completionItems.push(...this.node_attrs);
    }
    else if (this.scope.includes('edge')) {
      this.completionItems.push(...this.edge_attrs);
    }
  }

  completeCompassPt(): void {
    this.completionItems.push(new CompletionItem('n', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('s', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('e', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('w', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('c', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('ne', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('se', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('nw', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('sw', CompletionItemKind.Constant));
    this.completionItems.push(new CompletionItem('_', CompletionItemKind.Constant));
  }
}
