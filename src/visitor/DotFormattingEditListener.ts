import { CommonTokenStream, ParserRuleContext, Token } from "antlr4ts";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DotListener } from "../dot/DotListener";



export class DotFormattingEditListener implements DotListener {
  private result: string ;
  private comments: Token[];
  private indent: number;
  private newline: true;
  constructor(comments: Token[], indent: number) {
    this.result = '';
    this.indent = indent;
    this.newline = true;
    // 将 comments 按照 index 排序, 降序排序，方便编码
    this.comments = comments.sort((a, b) => a.tokenIndex - b.tokenIndex);
  }

  public getResult(): string { return this.result; }

  // private print(token: Token) {
  //   this.result += token.text?.trim() + '\n';
  // }

  visitTerminal(node: TerminalNode): void {
    const index = node.symbol.tokenIndex;

    // 将终结符前面的注释全部输出
    while(this.comments.length > 0 && this.comments[0].tokenIndex < index) {
      const comment = this.comments[0];
      this.comments = this.comments.slice(1, this.comments.length);
      const text = comment.text?.trim() || '';
      if(text.startsWith('//')) {
        // 输出之后一定要换行
        this.newline = true;
      }
      else if(text.startsWith('/*')) {

      }
    }
    
  }
  visitErrorNode(node: ErrorNode): void { this.visitTerminal(node); }
  enterEveryRule(ctx: ParserRuleContext):void {}
  exitEveryRule(ctx: ParserRuleContext) : void {}
}


