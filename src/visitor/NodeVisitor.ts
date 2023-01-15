import { DotVisitor } from "../dot/DotVisitor";
import {
  Graph_listContext, GraphContext, Stmt_listContext, StmtContext, Attr_stmtContext,
  Attr_listContext, A_listContext, Edge_stmtContext, EdgeRHSContext, EdgeopContext,
  Node_stmtContext, Node_idContext, PortContext, SubgraphContext, IdContext, Compass_ptContext, LexprContext, RexprContext, Assign_stmtContext
} from "../dot/DotParser";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DocumentSymbol, Position, Range, SymbolKind } from "vscode";


export class NodeVisitor implements DotVisitor<void> {
  // 先不管 port，先把 node、graph、和subgraph处理了
  private symbols: DocumentSymbol[];
  // private selectedRange: Range | undefined;

  private nodes: Map<string, string[]>;
  private defaultPorts: string[];
  private currentNodeName: string | undefined;
  private isRecord: boolean;
  private currentPorts: string[];
  constructor(nodes: Map<string, string[]>, symbols: DocumentSymbol[]) {
    this.nodes = nodes;
    this.symbols = symbols;
    // this.selectedRange = undefined;

    this.defaultPorts = [];
    this.currentNodeName = undefined;
    this.isRecord = false;
    this.currentPorts = [];
  }

  getStringFromId(id: IdContext): string {
    let result = id.ID()?.symbol.text || id.STRING()?.symbol.text || id.NUMBER()?.symbol.text || '';
    if (result.startsWith('"') && result.endsWith('"')) result = result.slice(1, result.length - 1);
    return result;
  }

  getRangeFromId(id: IdContext): Range | undefined {
    let symbol = id.ID()?.symbol || id.STRING()?.symbol || id.NUMBER()?.symbol;
    if (symbol) {
      return new Range(
        new Position(symbol.line - 1, symbol.charPositionInLine),
        new Position(symbol.line - 1, symbol.charPositionInLine + (symbol.text?.length || 0))
      );
    }
    return undefined;
  }

  addSymbol(id: IdContext, detail: string) {
    const range = this.getRangeFromId(id);
    if (range)
      this.symbols.push(
        new DocumentSymbol(this.getStringFromId(id), detail, SymbolKind.Variable,
          range, range,
        ));

  }

  visitGraph_list(ctx: Graph_listContext) {
    for (const graph of ctx.graph()) graph.accept(this);
  }
  visitGraph(ctx: GraphContext) {
    // 将 selectRange 置为整个 graph
    // const start = ctx.start;
    // const stop = ctx.stop;
    // if(stop) {
    //   this.selectedRange = new Range(
    //     new Position(start.line-1, start.charPositionInLine),
    //     new Position(stop.line-1, stop.charPositionInLine + (stop.text?.length || 0))
    //   );
    // }

    const id = ctx.id();
    if (id) {
      this.addSymbol(id, 'Graph');
    }
    ctx.stmt_list().accept(this);
  }


  visitStmt_list(ctx: Stmt_listContext) {
    for (const stmt of ctx.stmt()) stmt.accept(this);
  }
  visitStmt(ctx: StmtContext) { this.visitChildren(ctx); }

  visitAttr_stmt(ctx: Attr_stmtContext) {
    if (!ctx.NODE()) return;

    // 如果 currenNodeName 为 ''， 则更新 defaultPorts。
    this.currentNodeName = '';
    this.isRecord = false;
    this.currentPorts = [];

    // 这会更新 isRecord 和 currentPorts。
    ctx.attr_list().accept(this);

    if (this.isRecord) this.defaultPorts = this.currentPorts;
  }

  visitAttr_list(ctx: Attr_listContext) { this.visitChildren(ctx); }
  visitA_list(ctx: A_listContext) { this.visitChildren(ctx); }

  visitAssign_stmt(ctx: Assign_stmtContext) {
    // 不是 node 的属性
    if (this.currentNodeName == undefined) return;

    // 获取属性名称
    let name = ctx.lexpr().ID()?.symbol.text || ctx.lexpr().STRING()?.symbol.text || '';
    // 去掉多余的引号
    if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length - 1);

    // 获取属性值
    let value = ctx.rexpr().ID()?.symbol.text || ctx.rexpr().STRING()?.symbol.text || ctx.rexpr().NUMBER()?.symbol.text || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, value.length - 1);

    if (name == 'shape' && value == 'record') { this.isRecord = true; }
    else if (name == 'label') {
      // 使用正则表达式来寻找 label 里面的 port 。这里简单地将所有的 <> 中的内容识别为 port
      const re = /<.*?>/g;
      let match = re.exec(value);
      while (match) {
        let label = match[0];
        if (label.startsWith('<') && label.endsWith('>')) label = label.slice(1, label.length - 1);
        this.currentPorts.push(label);
        match = re.exec(value);
      }
    }
  }

  visitEdge_stmt(ctx: Edge_stmtContext) {
    const id = ctx.node_id()?.id()[0];

    if (id == undefined) return;
    this.addSymbol(id, 'Node');
    let name = id.ID()?.symbol.text || id.NUMBER()?.symbol.text || id.STRING()?.symbol.text || '';
    if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length - 1);

    if (!name) return;

    if (!this.nodes.has(name)) {
      this.nodes.set(name, this.defaultPorts);
    }

    ctx.edgeRHS().accept(this);
  }

  visitEdgeRHS(ctx: EdgeRHSContext) {
    for (const node_id of ctx.node_id()) {
      const id = node_id.id()[0];
      if (id) this.addSymbol(id, 'Node');

      let name = id.ID()?.symbol.text || id.NUMBER()?.symbol.text || id.STRING()?.symbol.text || '';
      if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length - 1);

      if (!name) continue;

      if (!this.nodes.has(name)) {
        this.nodes.set(name, this.defaultPorts);
      }
    }
  }

  visitEdgeop(ctx: EdgeopContext) { }

  visitNode_stmt(ctx: Node_stmtContext) {
    const id = ctx.node_id().id()[0];
    if (id) this.addSymbol(id, 'Node');
    let name = id.ID()?.symbol.text || id.NUMBER()?.symbol.text || id.STRING()?.symbol.text || '';
    if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, name.length - 1);

    if (!name) return;

    if (!this.nodes.has(name)) {
      this.nodes.set(name, [...this.defaultPorts]);
    }


    const attr_list = ctx.attr_list();
    this.isRecord = false;
    this.currentPorts = [];
    this.currentNodeName = name;

    attr_list?.accept(this);

    if (this.isRecord) {
      this.nodes.get(name)?.push(...this.currentPorts);
    }
  }

  visitNode_id(ctx: Node_idContext) { }
  visitPort(ctx: PortContext) { }
  visitCompass_pt(ctx: Compass_ptContext) { }

  visitSubgraph(ctx: SubgraphContext) {
    const id = ctx.id();
    if (id) this.addSymbol(id, 'Subgraph');
    ctx.stmt_list().accept(this);
  }

  visitId(ctx: IdContext) { }
  visitLexpr(ctx: LexprContext) { }
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

