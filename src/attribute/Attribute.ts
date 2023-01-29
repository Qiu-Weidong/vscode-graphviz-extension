import { CompletionItem, CompletionItemKind, MarkdownString, SnippetString, Uri } from "vscode";
import { attributes } from "./Attributes";

const colorMap = new Map([
  ['silver', '#c0c0c0'],
  ['gray', '#808080'],
  ['white', '#ffffff'],
  ['maroon', '#800000'],
  ['red', '#ff0000'],
  ['purple', '#800080'],
  ['fuchsia', '#ff00ff'],
  ['green', '#008000'],
  ['lime', '#00ff00'],
  ['olive', '#808000'],
  ['yellow', '#ffff00'],
  ['navy', '#000080'],
  ['blue', '#0000ff'],
  ['teal', '#008080'],
  ['aqua', '#00ffff'],
  ['orange', '#ffa500'],
  ['aliceblue', '#f0f8ff'],
  ['antiquewhite', '#faebd7'],
  ['aquamarine', '#7fffd4'],
  ['azure', '#f0ffff'],
  ['beige', '#f5f5dc'],
  ['bisque', '#ffe4c4'],
  ['blanchedalmond', '#ffe4c4'],
  ['blueviolet', '#8a2be2'],
  ['brown', '#a52a2a'],
  ['burlywood', '#deb887'],
  ['cadetblue', '#5f9ea0'],
  ['chartreuse', '#7fff00'],
  ['chocolate', '#d2691e'],
  ['coral', '#ff7f50'],
  ['cornflowerblue', '#6495ed'],
  ['cornsilk', '#fff8dc'],
  ['crimson', '#dc143c'],
  ['darkblue', '#00008b'],
  ['darkcyan', '#008b8b'],
  ['darkgoldenrod', '#b8860b'],
  ['darkgray', '#a9a9a9'],
  ['darkgreen', '#006400'],
  ['darkgrey', '#a9a9a9'],
  ['darkkhaki', '#bdb76b'],
  ['darkmagenta', '#8b008b'],
  ['darkolivegreen', '#556b2f'],
  ['darkorange', '#ff8c00'],
  ['darkorchid', '#9932cc'],
  ['darkred', '#8b0000'],
  ['darksalmon', '#e9967a'],
  ['darkseagreen', '#8fbc8f'],
  ['darkslateblue', '#483d8b'],
  ['darkslategray', '#2f4f4f'],
  ['darkslategrey', '#2f4f4f'],
  ['darkturquoise', '#00ced1'],
  ['darkviolet', '#9400d3'],
  ['deeppink', '#ff1493'],
  ['deepskyblue', '#00bfff'],
  ['dimgray', '#696969'],
  ['dimgrey', '#696969'],
  ['dodgerblue', '#1e90ff'],
  ['firebrick', '#b22222'],
  ['floralwhite', '#fffaf0'],
  ['forestgreen', '#228b22'],
  ['gainsboro', '#dcdcdc'],
  ['ghostwhite', '#f8f8ff'],
  ['gold', '#ffd700'],
  ['goldenrod', '#daa520'],
  ['greenyellow', '#adff2f'],
  ['grey', '#808080'],
  ['honeydew', '#f0fff0'],
  ['hotpink', '#ff69b4'],
  ['indianred', '#cd5c5c'],
  ['indigo', '#4b0082'],
  ['ivory', '#fffff0'],
  ['khaki', '#f0e68c'],
  ['lavender', '#e6e6fa'],
  ['lavenderblush', '#fff0f5'],
  ['lawngreen', '#7cfc00'],
  ['lemonchiffon', '#fffacd'],
  ['lightblue', '#add8e6'],
  ['lightcoral', '#f08080'],
  ['lightcyan', '#e0ffff'],
  ['lightgoldenrodyellow', '#fafad2'],
  ['lightgray', '#d3d3d3'],
  ['lightgreen', '#90ee90'],
  ['lightgrey', '#d3d3d3'],
  ['lightpink', '#ffb6c1'],
  ['lightsalmon', '#ffa07a'],
  ['lightseagreen', '#20b2aa'],
  ['lightskyblue', '#87cefa'],
  ['lightslategray', '#778899'],
  ['lightslategrey', '#778899'],
  ['lightsteelblue', '#b0c4de'],
  ['lightyellow', '#ffffe0'],
  ['limegreen', '#32cd32'],
  ['linen', '#faf0e6'],
  ['mediumaquamarine', '#66cdaa'],
  ['mediumblue', '#0000cd'],
  ['mediumorchid', '#ba55d3'],
  ['mediumpurple', '#9370db'],
  ['mediumseagreen', '#3cb371'],
  ['mediumslateblue', '#7b68ee'],
  ['mediumspringgreen', '#00fa9a'],
  ['mediumturquoise', '#48d1cc'],
  ['mediumvioletred', '#c71585'],
  ['midnightblue', '#191970'],
  ['mintcream', '#f5fffa'],
  ['mistyrose', '#ffe4e1'],
  ['moccasin', '#ffe4b5'],
  ['navajowhite', '#ffdead'],
  ['oldlace', '#fdf5e6'],
  ['olivedrab', '#6b8e23'],
  ['orangered', '#ff4500'],
  ['orchid', '#da70d6'],
  ['palegoldenrod', '#eee8aa'],
  ['palegreen', '#98fb98'],
  ['paleturquoise', '#afeeee'],
  ['palevioletred', '#db7093'],
  ['papayawhip', '#ffefd5'],
  ['peachpuff', '#ffdab9'],
  ['peru', '#cd853f'],
  ['pink', '#ffc0cb'],
  ['plum', '#dda0dd'],
  ['powderblue', '#b0e0e6'],
  ['rosybrown', '#bc8f8f'],
  ['royalblue', '#4169e1'],
  ['saddlebrown', '#8b4513'],
  ['salmon', '#fa8072'],
  ['sandybrown', '#f4a460'],
  ['seagreen', '#2e8b57'],
  ['seashell', '#fff5ee'],
  ['sienna', '#a0522d'],
  ['skyblue', '#87ceeb'],
  ['slateblue', '#6a5acd'],
  ['slategray', '#708090'],
  ['slategrey', '#708090'],
  ['snow', '#fffafa'],
  ['springgreen', '#00ff7f'],
  ['steelblue', '#4682b4'],
  ['tan', '#d2b48c'],
  ['thistle', '#d8bfd8'],
  ['tomato', '#ff6347'],
  ['turquoise', '#40e0d0'],
  ['violet', '#ee82ee'],
  ['wheat', '#f5deb3'],
  ['whitesmoke', '#f5f5f5'],
  ['yellowgreen', '#9acd32'],
  ['rebeccapurple', '#663399'],
  ['transparent', '#00000000']
]);

// 采用单例模式
export class Attribute {
  private static extensionUri: Uri;
  private static instance: Attribute | undefined = undefined;

  public static getInstance(): Attribute {
    if (!Attribute.instance) {
      Attribute.instance = new Attribute();
    }

    return Attribute.instance;
  }

  public static setExtensionUri(extensionUri: Uri) {
    Attribute.extensionUri = extensionUri;
  }

  private readonly node_attrs: CompletionItem[];
  private readonly edge_attrs: CompletionItem[];
  private readonly cluster_attrs: CompletionItem[];
  private readonly subgraph_attrs: CompletionItem[];
  private readonly graph_attrs: CompletionItem[];
  private attrMap: Map<string, CompletionItem[]>;

  private constructor() {
    this.node_attrs = this._filterAttribute('Nodes');
    this.edge_attrs = this._filterAttribute('Edges');
    this.cluster_attrs = this._filterAttribute('Clusters');
    this.graph_attrs = this._filterAttribute('Graphs');
    this.subgraph_attrs = this._filterAttribute('Subgraphs');

    this.attrMap = new Map();
    this.attrMap.set('bool', this._getBoolValue());
    this.attrMap.set('arrowType', this._getArrowTypeValue());
    this.attrMap.set('clusterMode', this._getClusterModeValue());
    this.attrMap.set('color', this._getColorValue());
    this.attrMap.set('dirType', this._getDirTypeValue());
    this.attrMap.set('outputMode', this._getOutputModeValue());
    this.attrMap.set('packMode', this._getPackModeValue());
    this.attrMap.set('pagedir', this._getPagedirValue());
    this.attrMap.set('quadType', this._getQuadTypeValue());
    this.attrMap.set('rankdir', this._getRankdirValue());
    this.attrMap.set('rankType', this._getRankTypeValue());
    this.attrMap.set('shape', this._getShapeValue());
    this.attrMap.set('smoothType', this._getSmoothValue());

    this.attrMap.set('style:node', this._getNodeStyleValue());
    this.attrMap.set('style:edge', this._getEdgeStyleValue());
    this.attrMap.set('style:cluster', this._getClusterStyleValue());
  }

  public isNodeAttribute(attrName: string): boolean {
    const attr = attributes.find(attr => attr.name == attrName);
    if (!attr) return false;
    return attr.usedby.includes('Nodes');
  }

  public isEdgeAttribute(attrName: string): boolean {
    const attr = attributes.find(attr => attr.name == attrName);
    if (!attr) return false;
    return attr.usedby.includes('Edges');
  }

  public isGraphAttribute(attrName: string): boolean {
    const attr = attributes.find(attr => attr.name == attrName);
    if (!attr) return false;
    return attr.usedby.includes('Graphs');
  }

  public isClusterOrSubgraphAttribute(attrName: string) {
    const attr = attributes.find(attr => attr.name == attrName);
    if (!attr) return false;
    return attr.usedby.includes('Subgraphs') || attr.usedby.includes('Clusters');
  }

  public provideValueofStyle(ty: string): CompletionItem[] {
    if (ty.includes('graph') || ty.includes('cluster')) {
      return this.attrMap.get('style:cluster') || [];
    }
    else if (ty.includes('node')) {
      return this.attrMap.get('style:node') || [];
    }
    else if (ty.includes('edge')) {
      return this.attrMap.get('style:edge') || [];
    }
    return [];
  }

  public provideValueOfAttribute(attrName: string): CompletionItem[] {
    const attr = attributes.find(item => item.name == attrName);
    let result: CompletionItem[] = [];
    if (attr) {
      for (const ty of attr.type) {
        result.push(...(this.attrMap.get(ty) || []));
      }
    }
    return result;
  }

  public provideSubgraphAttribute() {
    return this.subgraph_attrs;
  }

  public providegraphAttribute() {
    return this.graph_attrs;
  }

  public provideEdgeAttribute() {
    return this.edge_attrs;
  }

  public provideNodeAttribute() {
    return this.node_attrs;
  }

  public provideClusterAttribute() {
    return this.cluster_attrs;
  }

  private _filterAttribute(attr: string) {
    return attributes.filter(item => item.usedby.includes(attr)).map(
      item => {
        let result = new CompletionItem(item.name, CompletionItemKind.Property);
        result.detail = `(attribute) ${item.name}`;
        result.documentation = new MarkdownString(item.description);
        if (item.type.length == 1) {
          const ty = item.type[0];
          switch (ty) {
            case 'string':
              result.insertText = new SnippetString(`${item.name} = "$1"`);
              break;
            case 'rect':
              result.insertText = new SnippetString(`${item.name}="$1, $2, $3, $4"`);
              break;
          }

        }
        return result;
      }
    );
  }

  private _getBoolValue(): CompletionItem[] {
    return ['true', 'false'].map(
      value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.detail = `Boolean; true or false.`;
        return ret;
      }
    );
  }

  private _getArrowTypeValue(): CompletionItem[] {
    return ['normal', 'inv', 'dot', 'invdot', 'odot', 'invodot', 'none', 'tee',
      'empty', 'invempty', 'diamond', 'odiamond', 'ediamond', 'crow', 'box', 'obox',
      'open', 'halfopen', 'vee'].map(value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.documentation = new MarkdownString(`![img](${Uri.joinPath(
          Attribute.extensionUri, 'asset', 'arrowType', value + '.gif')})`
        );
        ret.detail = `Edge arrowhead shape`;
        return ret;
      });
  }

  private _getClusterModeValue(): CompletionItem[] {
    return ['local', 'global', 'none'].map(
      value => new CompletionItem(value, CompletionItemKind.Constant)
    );
  }

  private _getColorValue(): CompletionItem[] {
    let result: CompletionItem[] = [];
    for (const [key, value] of colorMap.entries()) {
      const ret = new CompletionItem(key, CompletionItemKind.Color);
      ret.detail = key;
      ret.documentation = value;
      result.push(ret);
    }
    return result;
  }

  private _getDirTypeValue(): CompletionItem[] {
    return ['forward', 'back', 'both', 'none'].map(value => {
      const ret = new CompletionItem(value, CompletionItemKind.Constant);
      ret.documentation = new MarkdownString(`![](${Uri.joinPath(
        Attribute.extensionUri, 'asset', 'dirType', value + '.gif'
      )})`);
      ret.detail = `Edge arrow direction type`;
      return ret;
    });
  }

  private _getOutputModeValue(): CompletionItem[] {
    const pairs = [
      {
        name: 'breadthfirst',
        detail: `The default "breadthfirst" is the simplest, but when the graph layout does not avoid edge-node overlap, this mode will sometimes have edges drawn over nodes and sometimes on top of nodes.`
      }, {
        name: 'nodesfirst',
        detail: `If the mode "nodesfirst" is chosen, all nodes are drawn first, followed by the edges. This guarantees an edge-node overlap will not be mistaken for an edge ending at a node.`
      }, {
        name: 'edgesfirst',
        detail: `On the other hand, usually for aesthetic reasons, it may be desirable that all edges appear beneath nodes, even if the resulting drawing is ambiguous. This can be achieved by choosing "edgesfirst".`
      }
    ];

    return pairs.map(item => {
      const ret = new CompletionItem(item.name, CompletionItemKind.Constant);
      ret.documentation = item.detail;
      ret.detail = `The order in which nodes and edges are drawn in output.`;
      return ret;
    });
  }

  private _getPackModeValue(): CompletionItem[] {
    const documentation = `The modes "node", "clust" or "graph" specify that the components should be packed together tightly, using the specified granularity. A value of "node" causes packing at the node and edge level, with no overlapping of these objects. This produces a layout with the least area, but it also allows interleaving, where a node of one component may lie between two nodes in another component. A value of "graph" does a packing using the bounding box of the component. Thus, there will be a rectangular region around a component free of elements of any other component. A value of "clust" guarantees that top-level clusters are kept intact. What effect a value has also depends on the layout algorithm. For example, neato does not support clusters, so a value of "clust" will have the same effect as the default "node" value.

    The mode "array(_flag)?(%d)?" indicates that the components should be packed at the graph level into an array of graphs. By default, the components are in row-major order, with the number of columns roughly the square root of the number of components. If the optional flags contains 'c', then column-major order is used. Finally, if the optional integer suffix is used, this specifies the number of columns for row-major or the number of rows for column-major. Thus, the mode "array_c4" indicates array packing, with 4 rows, starting in the upper left and going down the first column, then down the second column, etc., until all components are used.

    If a graph is smaller than the array cell it occupies, it is centered by default. The optional flags may contain 't', 'b', 'l', or 'r', indicating that the graphs should be aligned along the top, bottom, left or right, respectively.
    
    If the optional flags contains 'u', this causes the insertion order of elements in the array to be determined by user-supplied values. Each component can specify its sort value by a non-negative integer using the sortv attribute. Components are inserted in order, starting with the one with the smallest sort value. If no sort value is specified, zero is used.
    `;
    const ret = [
      new CompletionItem('none', CompletionItemKind.Constant),
      new CompletionItem('clust', CompletionItemKind.Constant),
      new CompletionItem('graph', CompletionItemKind.Constant),
      new CompletionItem('array(_flags)?(%d)?', CompletionItemKind.Constant)
    ];
    ret.forEach(item => {
      item.detail = `How closely to pack together graph components`;
      item.documentation = documentation;
    });


    return ret;
  }

  private _getPagedirValue(): CompletionItem[] {
    const ret = ['BL', 'BR', 'TL', 'TR', 'RB', 'RT', 'LB', 'LT'];
    const documentation = `These specify the 8 row or column major orders for traversing a rectangular array, the first character corresponding to the major order and the second to the minor order. Thus, for "BL", the major order is from bottom to top, and the minor order is from left to right. This means the bottom row is traversed first, from left to right, then the next row up, from left to right, and so on, until the topmost row is traversed.`;
    return ret.map(value => {
      const ret = new CompletionItem(value, CompletionItemKind.Constant);
      ret.documentation = documentation;
      ret.detail = `Page Direction`;
      return ret;
    });
  }

  private _getQuadTypeValue(): CompletionItem[] {
    const documentation = `Using "fast" gives about a 2-4 times overall speedup compared with "normal", though layout quality can suffer a little.`;
    return ['normal', 'fast', 'none'].map(value => {
      const ret = new CompletionItem(value, CompletionItemKind.Constant);
      ret.documentation = documentation;
      return ret;
    });
  }

  private _getRankdirValue(): CompletionItem[] {
    const documentation = `Corresponding to directed graphs drawn from top to bottom, from left to right, from bottom to top, and from right to left, respectively.`;
    return ["TB", "LR", "BT", "RL"].map(value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.documentation = documentation;
        ret.detail = `Direction to draw directed graphs (one rank at a time)`;
        return ret;
      });
  }

  private _getRankTypeValue(): CompletionItem[] {
    const detail = `Rank constraints on the nodes in a subgraph`;
    return ['same', 'min', 'source', 'max', 'sink'].map(value => {
      const ret = new CompletionItem(value, CompletionItemKind.Constant);
      ret.detail = detail;
      return ret;
    })
  }

  private _getShapeValue(): CompletionItem[] {
    const result = ['box', 'polygon', 'ellipse', 'oval', 'circle', 'point', 'egg',
      'triangle', 'plaintext', 'plain', 'diamond', 'trapezium', 'parallelogram',
      'house', 'pentagon', 'hexagon', 'septagon', 'octagon', 'doublecircle',
      'doubleoctagon', 'tripleoctagon', 'invtriangle', 'invtrapezium',
      'invhouse', 'Mdiamond', 'Msquare', 'Mcircle', 'rect', 'rectangle',
      'square', 'star', 'none', 'underline', 'cylinder', 'note', 'tab',
      'folder', 'box3d', 'component', 'promoter', 'cds', 'terminator',
      'utr', 'primersite', 'restrictionsite', 'fivepoverhang', 'threepoverhang',
      'noverhang', 'assembly', 'signature', 'insulator', 'ribosite', 'rnastab',
      'proteasesite', 'proteinstab', 'rpromoter', 'rarrow', 'larrow', 'lpromoter'].map(value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.documentation = new MarkdownString(`![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'shape', value + '.gif')
          })`);
        ret.detail = `the shape of a node`;
        return ret;
      });

    const record = new CompletionItem('record', CompletionItemKind.Constant);
    record.detail = `Record-based Nodes`;
    record.documentation = new MarkdownString(`
As an example of a record node, the dot input:
\`\`\`dot
digraph structs {
  node [shape=record];
  struct1 [label="<f0> left|<f1> mid&#92; dle|<f2> right"];
  struct2 [label="<f0> one|<f1> two"];
  struct3 [label="hello&#92;nworld |{ b |{c|<here> d|e}| f}| g | h"];
  struct1:f1 -> struct2:f0;
  struct1:f2 -> struct3:here;
}
\`\`\`
`);
    result.push(record);
    // 补充一个record
    return result;
  }

  private _getSmoothValue(): CompletionItem[] {
    return ['none', 'avg_dist', 'graph_dist', 'power_dist', 'rng', 'spring', 'triangle'].map(
      value => new CompletionItem(value, CompletionItemKind.Constant)
    );
  }

  private _getNodeStyleValue(): CompletionItem[] {
    const result = ["dashed", "dotted", "solid", "bold", "filled", "striped", "wedged", "diagonals", "rounded"].map(
      value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.documentation = new MarkdownString(`![img](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'node', 'n_' + value + '.png')
          })`);
        ret.detail = value;
        return ret;
      });
    // 添加一个invis
    const invis = new CompletionItem('invis', CompletionItemKind.Constant);
    invis.detail = 'invis';
    result.push(invis);

    // 添加一个 radical
    const radial = new CompletionItem('radial', CompletionItemKind.Constant);
    radial.detail = 'radial';
    radial.documentation = `The style "radial" is recognized for nodes, clusters and graphs, and indicates a radial-style gradient fill if applicable.`;
    result.push(radial);
    return result;
  }

  private _getEdgeStyleValue(): CompletionItem[] {
    const result: CompletionItem[] = ["dashed", "dotted", "solid", "bold"].map(
      value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.documentation = new MarkdownString(`![img](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'e_' + value + '.png')
          })`);
        ret.detail = value;
        return ret;
      });

    // 添加一个invis
    const invis = new CompletionItem('invis', CompletionItemKind.Constant);
    invis.detail = 'invis';
    result.push(invis);

    // tapered
    const tapered = new CompletionItem('tapered', CompletionItemKind.Constant);
    tapered.detail = 'tapered';
    tapered.documentation = new MarkdownString(`
|dir or arrowhead |	normal |	none |
| -- | -- | -- |
| forward | ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'normal_forward.png')}) | ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'none_forward.png')}) |		
| back		| ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'normal_back.png')}) | ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'none_back.png')}) |
| both		| ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'normal_both.png')}) | ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'none_both.png')}) |
| none		| ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'normal_none.png')}) | ![](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'edge', 'none_none.png')}) |
`);


    result.push(tapered);
    return result;
  }

  private _getClusterStyleValue(): CompletionItem[] {
    const result: CompletionItem[] = ["dashed", "dotted", "solid", "bold", "filled", "striped", "rounded"].map(
      value => {
        const ret = new CompletionItem(value, CompletionItemKind.Constant);
        ret.documentation = new MarkdownString(`![img](${Uri.joinPath(Attribute.extensionUri, 'asset', 'style', 'cluster', 'c_' + value + '.png')
          })`);
        ret.detail = value;
        return ret;
      });

    const radial = new CompletionItem('radial', CompletionItemKind.Constant);
    radial.detail = 'radial';
    radial.documentation = `The style "radial" is recognized for nodes, clusters and graphs, and indicates a radial-style gradient fill if applicable.`;
    result.push(radial);
    // 添加一个invis
    const invis = new CompletionItem('invis', CompletionItemKind.Constant);
    invis.detail = 'invis';
    result.push(invis);

    return result;
  }



};
