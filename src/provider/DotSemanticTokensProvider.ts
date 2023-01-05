import {
  CancellationToken, ProviderResult, SemanticTokens, TextDocument,
  DocumentSemanticTokensProvider, SemanticTokensLegend, SemanticTokensBuilder, Range
} from "vscode";
import textDocuments from "../TextDocuments";


export class DotSemanticTokensProvider implements DocumentSemanticTokensProvider {

  readonly legend = new SemanticTokensLegend([
    // 'strict', 'graph', 'digraph', 'node', 'edge', 'subgraph', 'number', 
    'method', 'function', 'function', 'type', 'type', 'function', 'number',

    //'string', 'id', 'html_string', 'comment', 'line_comment', 'PREPROC',
    'string', 'keyword', 'regexp', 'comment', 'comment', 'comment',
  ]);

  provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens> {
    const tokens = textDocuments.getTokens(document);

    const builder = new SemanticTokensBuilder(this.legend);
    for (const token of tokens.getTokens()) {
      if (token.channel != 0) {
        console.log(token.text);
        // 注释单独处理
        const line = token.line - 1;
        const pos = token.charPositionInLine;
        // 注釋可能有多行
        const lines = token.text?.split('\n') || [];
        builder.push(new Range(line, pos, line, pos + lines[0].length), 'comment');
        for (let i = 1; i < lines.length; i++) {
          builder.push(new Range(line + i, 0, line + i, lines[i].length), 'comment');
        }
      }
      else if (token.type > 10)
        builder.push(token.line - 1, token.charPositionInLine, token.text?.length || 0, token.type - 11);
    }

    return builder.build();
  }

}



