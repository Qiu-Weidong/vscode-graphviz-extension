import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { DotSemanticTokensProvider } from './provider/DotSemanticTokensProvider';
import { DotColorProvider } from './provider/DotColorProvider';
import { DotCompletionItemProvider } from './provider/DotCompletionItemProvider';


export function activate(context: vscode.ExtensionContext) {
  // 在这里研究一下正则表达式
  // const label = '<label1> xxxxx <label2> xxxx <label3> ....';
  // const re = /<.*?>/g ;
  // let match = re.exec(label);
  // while(match) {
  //   console.log(match);
  //   match = re.exec(label);
  // }
  


  // 注册 provider
  registerProviders(context);
}


// 注册 provider
function registerProviders(context: ExtensionContext) {
  // 语法高亮
  const dotSemanticTokensProvider = new DotSemanticTokensProvider();
  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider('dot', dotSemanticTokensProvider, dotSemanticTokensProvider.legend)
  );

  const dotColorProvider = new DotColorProvider();
  context.subscriptions.push(
    vscode.languages.registerColorProvider('dot', dotColorProvider)
  );

  const dotCompletionItemProvider = new DotCompletionItemProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('dot', dotCompletionItemProvider, '=', ':', '[', '"')
  );

  // const legend = new vscode.SemanticTokensLegend([
  //   'namespace', 'class', 'enum', 'interface', 'struct',
  //   'typeParameter', 'type', 'parameter', 'variable',
  //   'property', 'enumMember', 'decorator',
  //   'event', 'function', 'method', 'macro', 'label', 'comment',
  //   'string', 'keyword', 'number', 'regexp', 'operator',
  // ], [
  //   'declaration', 'definition', 'readonly', 'static', 'deprecated',
  //   'abstract', 'async', 'modification', 'documentation', 'defaultLibrary',
  // ]);
  // const provider: vscode.DocumentSemanticTokensProvider = {
  //   provideDocumentSemanticTokens: function (document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SemanticTokens> {
  //     // throw new Error('Function not implemented.');
  //     const builder = new vscode.SemanticTokensBuilder(legend);
  //     const words = document.getText().split('\n');
  //     for (let i = 0; i < words.length; i++) {
  //       let word = words[i].trim();
  //       if (word.length <= 0) continue;
  //       let spans = word.split('.');
  //       // console.log(spans.slice(1));
  //       builder.push(new vscode.Range(i, 0, i, word.length), spans[0], spans.slice(1));
  //     }

  //     return builder.build();
  //   }
  // }
  // vscode.languages.registerDocumentSemanticTokensProvider('dot', provider, legend);

  // const arrows = "box|polygon|ellipse|oval|circle|point|egg|triangle|plaintext|plain|diamond|trapezium|parallelogram|house|pentagon|hexagon|septagon|octagon|doublecircle|doubleoctagon|tripleoctagon|invtriangle|invtrapezium|invhouse|Mdiamond|Msquare|Mcircle|rect|rectangle|square|star|none|underline|cylinder|note|tab|folder|box3d|component|promoter|cds|terminator|utr|primersite|restrictionsite|fivepoverhang|threepoverhang|noverhang|assembly|signature|insulator|ribosite|rnastab|proteasesite|proteinstab|rpromoter|rarrow|larrow|lpromoter";
  // const array = arrows.split('|');
  // console.log(array);
}

/**

 */