import {
  CancellationToken, ProviderResult, SemanticTokens, TextDocument,
  DocumentSemanticTokensProvider, SemanticTokensLegend, SemanticTokensBuilder, Range,
} from "vscode";
import textDocuments from "../TextDocuments";
import { DotSemanticTokensVisitor } from "./DotSemanticTokensVisitor";


export class DotSemanticTokensProvider implements DocumentSemanticTokensProvider {

  readonly legend = new SemanticTokensLegend(
    [
      'namespace', 'class', 'enum', 'interface', 'struct',
      'typeParameter', 'type', 'parameter', 'variable',
      'property', 'enumMember', 'decorator',
      'event', 'function', 'method', 'macro', 'label', 'comment',
      'string', 'keyword', 'number', 'regexp', 'operator',
    ],
    [
      'declaration', 'definition', 'readonly', 'static', 'deprecated',
      'abstract', 'async', 'modification', 'documentation', 'defaultLibrary',
    ]
  );

  provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens> {
    // 所有的 provider 第一步都是更新文档内容、语法树和token流。
    textDocuments.updateDocument(document);

    const builder = new SemanticTokensBuilder(this.legend);

    const tree = textDocuments.getTree(document);
    const visitor = new DotSemanticTokensVisitor(builder);
    try {
      tree.accept(visitor);
    } catch(e) {}

    const tokens = textDocuments.getTokens(document);
    for (const token of tokens.getTokens()) {
      if (token.channel != 0) {
        // 注释单独处理
        const line = token.line - 1;
        const pos = token.charPositionInLine;
        // 注釋可能有多行, HTML_STRING 也可能有多行
        const lines = token.text?.split('\n') || [];

        // builder.push 先push的有效果
        builder.push(new Range(line, pos, line, pos + lines[0].length), 'comment');
        for (let i = 1; i < lines.length; i++) {
          builder.push(new Range(line + i, 0, line + i, lines[i].length), 'comment');
        }
      }
      // 在这里处理 html_string, 因为它有多行
      // else if (token.type > 10)
      //   builder.push(token.line - 1, token.charPositionInLine, token.text?.length || 0, token.type - 11);
    }

    return builder.build();
  }

}



/**
 * 标准token类型
 * namespace class enum	interface	struct typeParameter type
 * parameter	variable	property	enumMember decorator	event	function
 * method macro	label comment	string	keyword	number regexp	operator
 * 
 * 标准 modifier 类型
 * declaration	definition readonly
 * static deprecated	abstract	
 * async	modification	documentation	defaultLibrary
 */