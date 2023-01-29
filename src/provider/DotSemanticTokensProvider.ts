import {
  CancellationToken, ProviderResult, SemanticTokens, TextDocument,
  DocumentSemanticTokensProvider, SemanticTokensLegend, SemanticTokensBuilder, Range,
} from "vscode";
import textDocuments from "../TextDocuments";
import { DotSemanticTokensVisitor } from "../visitor/DotSemanticTokensVisitor";


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