export const attributes = [
  { name: "_background", usedby: ['Graphs'], type: ['xdot'], description: `# \_background

  A string in the [\`xdot\` format](/docs/attr-types/xdot/) specifying an arbitrary background
  
  type: _[xdot](/docs/attr-types/xdot/), default: \`<none>\`_
  
  During rendering, the canvas is first filled as described in the [\`bgcolor\` attribute](https://graphviz.org/docs/attrs/bgcolor/).
  
  Then, if \`_background\` is defined, the graphics operations described in the string are performed on the canvas.
  
  See [\`xdot\` format](/docs/attr-types/xdot/) page for more information.
  
  Render a red square in the background
  
  \`\`\`dot
  digraph G {
    _background="c 7 -#ff0000 p 4 4 4 36 4 36 36 4 36";
    a -> b
  }
  \`\`\`
  
  _Valid on:_
  
  * Graphs
  
  [Search the Graphviz codebase for \`"_background"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="_background">)`, },
  { name: "area", usedby: ['Nodes', 'Clusters'], type: ['double'], description: `# area

  Indicates the preferred area for a node or empty cluster
  
  type: _[double](/docs/attr-types/double/), default: \`1.0\`, minimum: \`>0\`_
  
  Example: Australian Coins, area proportional to value
  
  \`\`\`dot
  graph {
    layout="patchwork"
    node [style=filled]
    "5c"  [area=  5 fillcolor=silver]
    "10c" [area= 10 fillcolor=silver]
    "20c" [area= 20 fillcolor=silver]
    "50c" [area= 50 fillcolor=silver]
    "$1"  [area=100 fillcolor=gold]
    "$2"  [area=200 fillcolor=gold]
  }
  \`\`\`
  
  _Valid on:_
  
  * Nodes
  * Clusters
  
  _Note: [patchwork](/docs/layouts/patchwork/) only._
  
  [Search the Graphviz codebase for \`"area"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="area">)
  
  Last modified October 2, 2022: [area: shorten description \(ae570f0\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/ae570f0817415c3bb81f83ce94f6a68ae26bca9c)`, },
  { name: "arrowhead", usedby: ['Edges'], type: ['arrowType'], description: `# arrowhead

Style of arrowhead on the head node of an edge

type: _[arrowType](/docs/attr-types/arrowType/), default: \`normal\`_

This will only appear if the [\`dir\` attribute](https://graphviz.org/docs/attrs/dir/) is \`forward\` or \`both\`.

See the [limitation](https://graphviz.org/doc/info/attrs.html#undir_note).

See also:

* [\`arrowtail\`](https://graphviz.org/docs/attrs/arrowtail/)

_Valid on:_

* Edges

[Search the Graphviz codebase for \`"arrowhead"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="arrowhead">)

Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`, },
  { name: "arrowsize", usedby: ['Edges'], type: ['double'], description: `# arrowsize

  Multiplicative scale factor for arrowheads
  
  type: _[double](/docs/attr-types/double/), default: \`1.0\`, minimum: \`0.0\`_
  
  Example
  
  \`\`\`dot
  digraph {
    quiver -> "0.5" [arrowsize=0.5]
    quiver -> "1"
    quiver -> "2" [arrowsize=2]
    quiver -> "3" [arrowsize=3]
  }
  \`\`\`
  
  
  _Valid on:_
  
  * Edges
  
  [Search the Graphviz codebase for \`"arrowsize"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="arrowsize">)
  
  Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`, },
  { name: "arrowtail", usedby: ['Edges'], type: ['arrowType'], description: `# arrowtail

  Style of arrowhead on the tail node of an edge
  
  type: _[arrowType](/docs/attr-types/arrowType/), default: \`normal\`_
  
  This will only appear if the [\`dir\` attribute](https://graphviz.org/docs/attrs/dir/) is \`back\` or \`both\`.
  
  See the [limitation](https://graphviz.org/doc/info/attrs.html#undir_note).
  
  See also:
  
  * [\`arrowhead\`](https://graphviz.org/docs/attrs/arrowhead/)
  
  _Valid on:_
  
  * Edges
  
  [Search the Graphviz codebase for \`"arrowtail"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="arrowtail">)
  
  Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`, },
  { name: "bb", usedby: ['Graphs'], type: ['rect'], description: `# bb

  Bounding box of drawing in points
  
  type: _[rect](/docs/attr-types/rect/)_
  
  _Valid on:_
  
  * Graphs
  
  _Note: write only._
  
  [Search the Graphviz codebase for \`"bb"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="bb">)
  
  Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`, },
  { name: "beautify", usedby: ['Graphs'], type: ['bool'], description: `# beautify

  Whether to draw leaf nodes uniformly in a circle around the root node in sfdp.
  
  type: _[bool](/docs/attr-types/bool/), default: \`false\`_
  
  Whether to try to draw leaf nodes uniformly on a circle around the root node.
  
  Note this is affected by [Issue 2283](https://gitlab.com/graphviz/graphviz/-/issues/2283): rendering one fewer sector than necessary, overlapping the first and last nodes.
  
  Examples:
  
  Beautify
  
  \`\`\`dot
  digraph G {
      layout="sfdp"
      beautify=true
  
      N0 -> {N1; N2; N3; N4; N5; N6}
  }
  \`\`\`
  
  
  
  No beautify
  
  \`\`\`dot
  digraph G {
      layout="sfdp"
      beautify=false
  
      N0 -> {N1; N2; N3; N4; N5; N6}
  }
  \`\`\`
  
  
  _Valid on:_
  
  * Graphs
  
  _Note: [sfdp](/docs/layouts/sfdp/) only._
  
  [Search the Graphviz codebase for \`"beautify"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="beautify">)
  
  Last modified September 27, 2022: [Add more info to beautify \(e7b6a4d\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/e7b6a4d2f2b439543b12702cfe15649d523f177b)`, },
  { name: "bgcolor", usedby: ['Graphs', 'Clusters'], type: ['color', 'colorList'], description: `# bgcolor

  Canvas background color
  
  type: _[color](/docs/attr-types/color/) | [colorList](/docs/attr-types/colorList/), default: \`<none>\`_
  
  When attached to the root graph, this color is used as the background for entire canvas.
  
  When a cluster attribute, it is used as the initial background for the cluster. If a cluster has a filled [\`style\`](https://graphviz.org/docs/attrs/style/), the cluster's [\`fillcolor\`](https://graphviz.org/docs/attrs/fillcolor/) will overlay the background color.
  
  If the value is a [\`colorList\`](/docs/attr-types/colorList/), a gradient fill is used. By default, this is a linear fill; setting \`[style](https://graphviz.org/docs/attrs/style/)=radial\` will cause a radial fill. Only two colors are used. If the second color \(after a colon\) is missing, the default color is used for it. See also the [\`gradientangle\`](https://graphviz.org/docs/attrs/gradientangle/) attribute for setting the gradient angle.
  
  For certain output formats, such as PostScript, no fill is done for the root graph unless \`bgcolor\` is explicitly set.
  
  For bitmap formats, however, the bits need to be initialized to something, so the canvas is filled with white by default. This means that if the bitmap output is included in some other document, all of the bits within the bitmap's bounding box will be set, overwriting whatever color or graphics were already on the page. If this effect is not desired, and you only want to set bits explicitly assigned in drawing the graph, set \`bgcolor="transparent"\`.
  
  Example
  
  \`\`\`dot
  graph {
    bgcolor="lightblue"
    label="Home"
    subgraph cluster_ground_floor {
      bgcolor="lightgreen"
      label="Ground Floor"
      Lounge
      Kitchen
    }
    subgraph cluster_top_floor {
      bgcolor="lightyellow"
      label="Top Floor"
      Bedroom
      Bathroom
    }
  }
  \`\`\`
  
  _Valid on:_
  
  * Graphs
  * Clusters
  
  [Search the Graphviz codebase for \`"bgcolor"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="bgcolor">)
  
  Last modified September 18, 2022: [Update bgcolor.md: add description \(51135fb\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/51135fb040a93ebb43a8c520d4574e28aabe5420)`, },
  { name: "center", usedby: ['Graphs'], type: ['bool'], description: `# center

  Whether to center the drawing in the output canvas
  
  type: _[bool](/docs/attr-types/bool/), default: \`false\`_
  
  Can be \`true\` or \`false\`.
  
  _Valid on:_
  
  * Graphs
  
  [Search the Graphviz codebase for \`"center"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="center">)
  
  Last modified September 14, 2022: [Update center.md: use 'whether' \(shorter description\). \(ce5ce41\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/ce5ce41233ff4bed8a0c2666d2a7071c6cd5d674)`, },
  { name: "charset", usedby: ['Graphs'], type: ['string'], description: `# charset

  Character encoding used when interpreting string input as a text label.
  
  type: _[string](/docs/attr-types/string/), default: \`"UTF-8"\`_
  
  The default value is \`"UTF-8"\`. The other legal values are:
  
  * \`"utf-8"\` / \`"utf8"\` \(default value\)
  * \`"iso-8859-1"\` / \`"ISO_8859-1"\` / \`"ISO8859-1"\` / \`"ISO-IR-100"\` / \`"Latin1"\` / \`"l1"\` / \`"latin-1"\`
  * \`"big-5"\` / \`"big5"\`: the [Big-5 Chinese encoding](https://en.wikipedia.org/wiki/Big5)
  
  The \`charset\` attribute is case-insensitive.
  
  Note that if the character encoding used in the input does not match the \`charset\` value, the resulting output may be very strange.
  
  Example
  
  \`\`\`dot
  digraph G {
    charset="UTF-8"
    "🍔" -> "💩"
  }
  \`\`\`
  
  _Valid on:_
  
  * Graphs
  
  [Search the Graphviz codebase for \`"charset"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="charset">)
  
  Last modified September 17, 2022: [Update charset.md: add reference to big5 \(b9ccdbb\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b9ccdbbe4ce64737d793ac8c313976b89250359d)`, },
  { name: "class", usedby: ['Edges', 'Nodes', 'Clusters', 'Graphs'], type: ['string'], description: `# class

  Classnames to attach to the node, edge, graph, or cluster's SVG element
  
  type: _[string](/docs/attr-types/string/), default: \`""\`_
  
  Combine with [\`stylesheet\`](https://graphviz.org/docs/attrs/stylesheet/) for styling SVG output using CSS classnames.
  
  Multiple space-separated classes are supported.
  
  See also:
  
  * [\`stylesheet\`](https://graphviz.org/docs/attrs/stylesheet/)
  * [\`id\`](https://graphviz.org/docs/attrs/id/)
  
  Example:
  
  \`\`\`dot
  digraph G {
    graph [class="cats"];
  
    subgraph cluster_big {
      graph [class="big_cats"];
  
      "Lion" [class="yellow social"];
      "Snow Leopard" [class="white solitary"];
    }
  }
  \`\`\`
  
  _Valid on:_
  
  * Edges
  * Nodes
  * Clusters
  * Graphs
  
  _Note: [svg](/docs/outputs/svg/) only._
  
  [Search the Graphviz codebase for \`"class"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="class">)
  
  Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`, },
  { name: "cluster", usedby: ['Clusters', 'Subgraphs'], type: ['bool'], description: `# cluster

  Whether the subgraph is a cluster
  
  type: _[bool](/docs/attr-types/bool/), default: \`false\`_
  
  Subgraph clusters are rendered differently, e.g. [\`dot\`](/docs/layouts/dot/) renders a box around subgraph clusters, but doesn't draw a box around non-subgraph clusters.
  
  Example:
  
  \`\`\`dot
  digraph cats {
    subgraph cluster_big_cats {
      // This subgraph is a cluster, because the name begins with "cluster"
      
      "Lion";
      "Snow Leopard";
    }
  
    subgraph domestic_cats {
      // This subgraph is also a cluster, because cluster=true.
      cluster=true;
  
      "Siamese";
      "Persian";
    }
  
    subgraph not_a_cluster {
      // This subgraph is not a cluster, because it doesn't start with "cluster",
      // nor sets cluster=true.
      
      "Wildcat";
    }
  }
  \`\`\`
  
  _Valid on:_
  
  * Clusters
  * Subgraphs
  
  [Search the Graphviz codebase for \`"cluster"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="cluster">)
  
  Last modified September 17, 2022: [Update cluster.md: remove duplicate dot \(f227bc5\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/f227bc50170040a9317cdcc1294a1d0e0fd69adf)`, },
  { name: "clusterrank", usedby: ['Graphs'], type: ['clusterMode'], description: `# clusterrank

  Mode used for handling clusters
  
  type: _[clusterMode](/docs/attr-types/clusterMode/), default: \`local\`_
  
  If \`clusterrank=local\`, a subgraph whose name begins with \`cluster\` is given special treatment.
  
  The subgraph is laid out separately, and then integrated as a unit into its parent graph, with a bounding rectangle drawn about it. If the cluster has a [\`label\`](https://graphviz.org/docs/attrs/label/) parameter, this label is displayed within the rectangle.
  
  Note also that there can be clusters within clusters.
  
  The modes \`clusterrank=global\` and \`clusterrank=none\` appear to be identical, both turning off the special cluster processing.
  
  _Valid on:_
  
  * Graphs
  
  _Note: [dot](/docs/layouts/dot/) only._
  
  [Search the Graphviz codebase for \`"clusterrank"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="clusterrank">)
  
  Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`,}, 
  { name: "color", usedby: ['Edges', 'Nodes', 'Clusters'], type: ['color', 'colorList'], description: `# color

  Basic drawing color for graphics, not text
  
  type: _[color](/docs/attr-types/color/) | [colorList](/docs/attr-types/colorList/), default: \`black\`_
  
  For the latter, use the [\`fontcolor\`](https://graphviz.org/docs/attrs/fontcolor/) attribute.
  
  For edges, the value can either be a single color or a [\`colorList\`](/docs/attr-types/colorList/).
  
  In the latter case, if \`colorList\` has no fractions, the edge is drawn using parallel splines or lines, one for each color in the list, in the order given.
  
  The head arrow, if any, is drawn using the first color in the list, and the tail arrow, if any, the second color. This supports the common case of drawing opposing edges, but using parallel splines instead of separately routed multiedges.
  
  If any fraction is used, the colors are drawn in series, with each color being given roughly its specified fraction of the edge.
  
  For example, the graph:
  
  Edge Color Example
  
  \`\`\`dot
  digraph G {
    a -> b [dir=both color="red:blue"]
    c -> d [dir=none color="green:red;0.25:blue"]
  }
  \`\`\`
  
  yields:
  
  ![](https://graphviz.org/doc/info/colorlist.svg)
  
  Subgraph \& Node Color Example
  
  \`\`\`dot
  digraph G {
    subgraph cluster_yellow {
      color="yellow"
      a [color="red"]
      b [color="green"]
    }
  }
  \`\`\`
  
  yields:
  
  ![](https://graphviz.org/doc/info/subgraph_node_color.svg)
  
  See also:
  
  * [\`colorscheme\`](https://graphviz.org/docs/attrs/colorscheme/)
  
  _Valid on:_
  
  * Edges
  * Nodes
  * Clusters
  
  [Search the Graphviz codebase for \`"color"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="color">)
  
  Last modified June 12, 2022: [add simple descriptions for attributes \(b2a18ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/b2a18ac791c2a51fed2d08379198d1feb59c84c8)`, },
  { name: "colorscheme", usedby: ['Edges', 'Nodes', 'Clusters', 'Graphs'], type: ['string'], description: `# colorscheme

  A color scheme namespace: the context for interpreting color names
  
  type: _[string](/docs/attr-types/string/), default: \`""\`_
  
  In particular, if a [\`color\`](/docs/attr-types/color/) value has form \`"xxx"\` or \`"//xxx"\`, then the color \`xxx\` will be evaluated according to the current color scheme. If no color scheme is set, the standard [X11 naming](https://graphviz.org/doc/info/colors.html#x11) is used.
  
  For example, if \`colorscheme=oranges9\` \(from [Brewer color schemes](https://graphviz.org/doc/info/colors.html#brewer)\), then \`color=7\` is interpreted as \`color="/oranges9/7"\`, the 7th color in the \`oranges9\` colorscheme.
  
  Orange Colorscheme
  
  \`\`\`dot
  graph {
    node [colorscheme=oranges9] # Apply colorscheme to all nodes
    1 [color=1]
    2 [color=2]
    3 [color=3]
    4 [color=4]
    5 [color=5]
    6 [color=6]
    7 [color=7]
    8 [color=8]
    9 [color=9]
  }
  \`\`\`
  
  Green Colorscheme
  
  \`\`\`dot
  graph {
    node [colorscheme=greens9] # Apply colorscheme to all nodes
    1 [color=1]
    2 [color=2]
    3 [color=3]
    4 [color=4]
    5 [color=5]
    6 [color=6]
    7 [color=7]
    8 [color=8]
    9 [color=9]
  }
  \`\`\`
  
  See also:
  
  * [\`color\`](https://graphviz.org/docs/attrs/color/)
  
  _Valid on:_
  
  * Edges
  * Nodes
  * Clusters
  * Graphs
  
  [Search the Graphviz codebase for \`"colorscheme"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="colorscheme">)
  
  Last modified September 14, 2022: [Update colorscheme.md: make the description shorter \(2d52cba\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/2d52cba6f34af043fa1ce8aebedeecef6a3be191)`, },
  
  
  
  { name: "comment", usedby: ['Edges', 'Nodes', 'Graphs'], type: ['string'], description: `Comments are inserted into output.`, }, {
    name: "compound", usedby: ['Graphs'], type: ['bool'], description: `If true, allow edges between clusters.\n dot only.`,
  }, { name: "concentrate", usedby: ['Graphs'], type: ['bool'], description: `If true, use edge concentrators.`, }, {
    name: "constraint", usedby: ['Edges'], type: ['bool'], description: `If false, the edge is not used in ranking the nodes.\n dot only.`,
  }, {
    name: "Damping", usedby: ['Graphs'], type: ['double'], description: `Factor damping force motions..\n neato only.`,
  }, { name: "decorate", usedby: ['Edges'], type: ['bool'], description: `Whether to connect the edge label to the edge with a line.`, }, {
    name: "defaultdist", usedby: ['Graphs'], type: ['double'], description: `The distance between nodes in separate connected components.\n neato only.`,
  }, {
    name: "dim", usedby: ['Graphs'], type: ['int'], description: `Set the number of dimensions used for the layout.\n neato, fdp, sfdp only.`,
  }, {
    name: "dimen", usedby: ['Graphs'], type: ['int'], description: `Set the number of dimensions used for rendering.\n neato, fdp, sfdp only.`,
  }, { name: "dir", usedby: ['Edges'], type: ['dirType'], description: `Edge type for drawing arrowheads.`, }, {
    name: "diredgeconstraints", usedby: ['Graphs'], type: ['string', 'bool'], description: `Whether to constrain most edges to point downwards.\n neato only.`,
  }, {
    name: "distortion", usedby: ['Nodes'], type: ['double'], description: `Distortion factor for shape=polygon.`,
  }, {
    name: "dpi", usedby: ['Graphs'], type: ['double'], description: `Specifies the expected number of pixels per inch on a display device.\n bitmap output, svg only.`,
  }, {
    name: "edgehref", usedby: ['Edges'], type: ['escString'], description: `Synonym for edgeURL.\n map, svg only.`,
  }, {
    name: "edgetarget", usedby: ['Edges'], type: ['escString'], description: `Browser window to use for the edgeURL link.\n map, svg only.`,
  }, {
    name: "edgetooltip", usedby: ['Edges'], type: ['escString'], description: `Tooltip annotation attached to the non-label part of an edge.\n cmap, svg only.`,
  }, {
    name: "edgeURL", usedby: ['Edges'], type: ['escString'], description: `The link for the non-label parts of an edge.\n map, svg only.`,
  }, {
    name: "epsilon", usedby: ['Graphs'], type: ['double'], description: `Terminating condition.\n neato only.`,
  }, {
    name: "esep", usedby: ['Graphs'], type: ['addDouble', 'addPoint'], description: `Margin used around polygons for purposes of spline edge routing.\n neato only.`,
  }, { name: "fillcolor", usedby: ['Nodes', 'Edges', 'Clusters'], type: ['color', 'colorList'], description: `Color used to fill the background of a node or cluster.`, }, {
    name: "fixedsize", usedby: ['Nodes'], type: ['bool', 'string'], description: `Whether to use the specified width and height attributes to choose node size (rather than sizing to fit the node contents).`,
  }, { name: "fontcolor", usedby: ['Edges', 'Nodes', 'Graphs', 'Clusters'], type: ['color'], description: `Color used for text.`, },
  { name: "fontname", usedby: ['Edges', 'Nodes', 'Graphs', 'Clusters'], type: ['string'], description: `Font used for text.`, },
  {
    name: "fontnames", usedby: ['Graphs'], type: ['string'], description: `Allows user control of how basic fontnames are represented in SVG output.\n svg only.`,
  }, { name: "fontpath", usedby: ['Graphs'], type: ['string'], description: `Directory list used by libgd to search for bitmap fonts.`, },
  { name: "fontsize", usedby: ['Edges', 'Nodes', 'Graphs', 'Clusters'], type: ['double'], description: `Font size, in points, used for text.`, },
  { name: "forcelabels", usedby: ['Graphs'], type: ['bool'], description: `Whether to force placement of all xlabels, even if overlapping.`, },
  { name: "gradientangle", usedby: ['Nodes', 'Clusters', 'Graphs'], type: ['int'], description: `If a gradient fill is being used, this determines the angle of the fill.`, },
  {
    name: "group", usedby: ['Nodes'], type: ['string'], description: `Name for a group of nodes, for bundling edges avoiding crossings..\n dot only.`,
  }, {
    name: "head_lp", usedby: ['Edges'], type: ['point'], description: `Center position of an edge's head label.\n write only.`,
  }, { name: "headclip", usedby: ['Edges'], type: ['bool'], description: `If true, the head of an edge is clipped to the boundary of the head node.`, }, {
    name: "headhref", usedby: ['Edges'], type: ['escString'], description: `Synonym for headURL.\n map, svg only.`,
  }, { name: "headlabel", usedby: ['Edges'], type: ['lblString'], description: `Text label to be placed near head of edge.\n`, },
  { name: "headport", usedby: ['Edges'], type: ['portPos'], description: `Indicates where on the head node to attach the head of the edge.`, }, {
    name: "headtarget", usedby: ['Edges'], type: ['escString'], description: `Browser window to use for the headURL link.\n map, svg only.`,
  }, {
    name: "headtooltip", usedby: ['Edges'], type: ['escString'], description: `Tooltip annotation attached to the head of an edge.\n cmap, svg only.`,
  }, {
    name: "headURL", usedby: ['Edges'], type: ['escString'], description: `If defined, headURL is output as part of the head label of the edge.\n map, svg only.`,
  }, { name: "height", usedby: ['Nodes'], type: ['double'], description: `Height of node, in inches.`, }, {
    name: "href", usedby: ['Graphs', 'Clusters', 'Nodes', 'Edges'], type: ['escString'], description: `Synonym for URL.\n map, postscript, svg only.`,
  }, {
    name: "id", usedby: ['Graphs', 'Clusters', 'Nodes', 'Edges'], type: ['escString'], description: `Identifier for graph objects.\n map, postscript, svg only.`,
  }, { name: "image", usedby: ['Nodes'], type: ['string'], description: `Gives the name of a file containing an image to be displayed inside a node.`, },
  { name: "imagepath", usedby: ['Graphs'], type: ['string'], description: `A list of directories in which to look for image files.`, },
  { name: "imagepos", usedby: ['Nodes'], type: ['string'], description: `Controls how an image is positioned within its containing node.`, },
  { name: "imagescale", usedby: ['Nodes'], type: ['bool', 'string'], description: `Controls how an image fills its containing node.`, }, {
    name: "inputscale", usedby: ['Graphs'], type: ['double'], description: `Scales the input positions to convert between length units.\n neato, fdp only.`,
  }, {
    name: "K", usedby: ['Graphs', 'Clusters'], type: ['double'], description: `Spring constant used in virtual physical model.\n fdp, sfdp only.`,
  }, { name: "label", usedby: ['Edges', 'Nodes', 'Graphs', 'Clusters'], type: ['lblString'], description: `Text label attached to objects.`, }, {
    name: "label_scheme", usedby: ['Graphs'], type: ['int'], description: `Whether to treat a node whose name has the form |edgelabel|* as a special node representing an edge label..\n sfdp only.`,
  }, { name: "labelangle", usedby: ['Edges'], type: ['double'], description: `The angle (in degrees) in polar coordinates of the head & tail edge labels..`, },
  { name: "labeldistance", usedby: ['Edges'], type: ['double'], description: `Scaling factor for the distance of headlabel / taillabel from the head / tail nodes..`, },
  { name: "labelfloat", usedby: ['Edges'], type: ['bool'], description: `If true, allows edge labels to be less constrained in position.`, },
  { name: "labelfontcolor", usedby: ['Edges'], type: ['color'], description: `Color used for headlabel and taillabel..`, },
  { name: "labelfontname", usedby: ['Edges'], type: ['string'], description: `Font for headlabel and taillabel.`, },
  { name: "labelfontsize", usedby: ['Edges'], type: ['double'], description: `Font size of headlabel and taillabel.`, }, {
    name: "labelhref", usedby: ['Edges'], type: ['escString'], description: `Synonym for labelURL.\n map, svg only.`,
  }, { name: "labeljust", usedby: ['Graphs', 'Clusters'], type: ['string'], description: `Justification for graph & cluster labels.`, },
  { name: "labelloc", usedby: ['Nodes', 'Graphs', 'Clusters'], type: ['string'], description: `Vertical placement of labels for nodes, root graphs and clusters.`, }, {
    name: "labeltarget", usedby: ['Edges'], type: ['escString'], description: `Browser window to open labelURL links in.\n map, svg only.`,
  }, {
    name: "labeltooltip", usedby: ['Edges'], type: ['escString'], description: `Tooltip annotation attached to label of an edge.\n cmap, svg only.`,
  }, {
    name: "labelURL", usedby: ['Edges'], type: ['escString'], description: `If defined, labelURL is the link used for the label of an edge.\n map, svg only.`,
  }, { name: "landscape", usedby: ['Graphs'], type: ['bool'], description: `If true, the graph is rendered in landscape mode.`, },
  { name: "layer", usedby: ['Edges', 'Nodes', 'Clusters'], type: ['layerRange'], description: `Specifies layers in which the node, edge or cluster is present.`, },
  { name: "layerlistsep", usedby: ['Graphs'], type: ['string'], description: `The separator characters used to split attributes of type layerRange into a list of ranges..`, },
  { name: "layers", usedby: ['Graphs'], type: ['layerList'], description: `A linearly ordered list of layer names attached to the graph.`, },
  { name: "layerselect", usedby: ['Graphs'], type: ['layerRange'], description: `Selects a list of layers to be emitted.`, }, {
    name: "layersep", usedby: ['Graphs'], type: ['string'], description: `The separator characters for splitting the layers attribute into a list of layer names..`,
  }, { name: "layout", usedby: ['Graphs'], type: ['string'], description: `Which layout engine to use.`, }, {
    name: "len", usedby: ['Edges'], type: ['double'], description: `Preferred edge length, in inches.\n neato, fdp only.`,
  }, {
    name: "levels", usedby: ['Graphs'], type: ['int'], description: `Number of levels allowed in the multilevel scheme.\n sfdp only.`,
  }, {
    name: "levelsgap", usedby: ['Graphs'], type: ['double'], description: `strictness of neato level constraints.\n neato only.`,
  }, {
    name: "lhead", usedby: ['Edges'], type: ['string'], description: `Logical head of an edge.\n dot only.`,
  }, {
    name: "lheight", usedby: ['Graphs', 'Clusters'], type: ['double'], description: `Height of graph or cluster label, in inches.\n write only.`,
  }, { name: "linelength", usedby: ['Graphs'], type: ['int'], description: `How long strings should get before overflowing to next line, for text output..`, }, {
    name: "lp", usedby: ['Edges', 'Graphs', 'Clusters'], type: ['point'], description: `Label center position.\n write only.`,
  }, {
    name: "ltail", usedby: ['Edges'], type: ['string'], description: `Logical tail of an edge.\n dot only.`,
  }, {
    name: "lwidth", usedby: ['Graphs', 'Clusters'], type: ['double'], description: `Width of graph or cluster label, in inches.\n write only.`,
  }, { name: "margin", usedby: ['Nodes', 'Clusters', 'Graphs'], type: ['double', 'point'], description: `For graphs, this sets x and y margins of canvas, in inches.`, }, {
    name: "maxiter", usedby: ['Graphs'], type: ['int'], description: `Sets the number of iterations used.\n neato, fdp only.`,
  }, {
    name: "mclimit", usedby: ['Graphs'], type: ['double'], description: `Scale factor for mincross (mc) edge crossing minimiser parameters.\n dot only.`,
  }, {
    name: "mindist", usedby: ['Graphs'], type: ['double'], description: `Specifies the minimum separation between all nodes.\n circo only.`,
  }, {
    name: "minlen", usedby: ['Edges'], type: ['int'], description: `Minimum edge length (rank difference between head and tail).\n dot only.`,
  }, {
    name: "mode", usedby: ['Graphs'], type: ['string'], description: `Technique for optimizing the layout.\n neato only.`,
  }, {
    name: "model", usedby: ['Graphs'], type: ['string'], description: `Specifies how the distance matrix is computed for the input graph.\n neato only.`,
  }, {
    name: "newrank", usedby: ['Graphs'], type: ['bool'], description: `Whether to use a single global ranking, ignoring clusters.\n dot only.`,
  }, {
    name: "nodesep", usedby: ['Graphs'], type: ['double'], description: `In dot, nodesep specifies the minimum space between two adjacent nodes in the same rank, in inches.`,
  }, { name: "nojustify", usedby: ['Graphs', 'Clusters', 'Nodes', 'Edges'], type: ['bool'], description: `Whether to justify multiline text vs the previous text line (rather than the side of the container)..`, }, {
    name: "normalize", usedby: ['Graphs'], type: ['double', 'bool'], description: `normalizes coordinates of final layout.\n neato, fdp, sfdp, twopi, circo only.`,
  }, {
    name: "notranslate", usedby: ['Graphs'], type: ['bool'], description: `Whether to avoid translating layout to the origin point.\n neato only.`,
  }, {
    name: "nslimit", usedby: ['Graphs'], type: ['double'], description: `Sets number of iterations in network simplex applications.\n dot only.`,
  }, {
    name: "nslimit1", usedby: ['Graphs'], type: ['double'], description: `Sets number of iterations in network simplex applications.\n dot only.`,
  }, {
    name: "oneblock", usedby: ['Graphs'], type: ['bool'], description: `Whether to draw circo graphs around one circle..\n circo only.`,
  }, {
    name: "ordering", usedby: ['Graphs', 'Nodes'], type: ['string'], description: `Constrains the left-to-right ordering of node edges..\n dot only.`,
  }, { name: "orientation", usedby: ['Nodes', 'Graphs'], type: ['double', 'string'], description: `node shape rotation angle, or graph orientation.`, },
  { name: "outputorder", usedby: ['Graphs'], type: ['outputMode'], description: `Specify order in which nodes and edges are drawn.`, },
  {
    name: "overlap", usedby: ['Graphs'], type: ['string', 'bool'], description: `Determines if and how node overlaps should be removed.\n fdp, neato only.`,
  }, {
    name: "overlap_scaling", usedby: ['Graphs'], type: ['double'], description: `Scale layout by factor, to reduce node overlap..\n prism, neato, sfdp, fdp, circo, twopi only.`,
  }, {
    name: "overlap_shrink", usedby: ['Graphs'], type: ['bool'], description: `Whether the overlap removal algorithm should perform a compression pass to reduce the size of the layout.\n prism only.`,
  }, {
    name: "pack", usedby: ['Graphs'], type: ['bool', 'int'], description: `Whether each connected component of the graph should be laid out separately, and then the graphs packed together..`,
  }, { name: "packmode", usedby: ['Graphs'], type: ['packMode'], description: `How connected components should be packed.`, },
  { name: "pad", usedby: ['Graphs'], type: ['double', 'point'], description: `Inches to extend the drawing area around the minimal area needed to draw the graph.`, },
  { name: "page", usedby: ['Graphs'], type: ['double', 'point'], description: `Width and height of output pages, in inches.`, },
  { name: "pagedir", usedby: ['Graphs'], type: ['pagedir'], description: `The order in which pages are emitted.`, },
  { name: "pencolor", usedby: ['Clusters'], type: ['color'], description: `Color used to draw the bounding box around a cluster.`, },
  { name: "penwidth", usedby: ['Clusters', 'Nodes', 'Edges'], type: ['double'], description: `Specifies the width of the pen, in points, used to draw lines and curves.`, },
  { name: "peripheries", usedby: ['Nodes', 'Clusters'], type: ['int'], description: `Set number of peripheries used in polygonal shapes and cluster boundaries.`, },
  {
    name: "pin", usedby: ['Nodes'], type: ['bool'], description: `Keeps the node at the node's given input position.\n neato, fdp only.`,
  }, {
    name: "pos", usedby: ['Edges', 'Nodes'], type: ['point', 'splineType'], description: `Position of node, or spline control points.\n neato, fdp only.`,
  }, {
    name: "quadtree", usedby: ['Graphs'], type: ['quadType', 'bool'], description: `Quadtree scheme to use.\n sfdp only.`,
  }, { name: "quantum", usedby: ['Graphs'], type: ['double'], description: `If quantum > 0.0, node label dimensions will be rounded to integral multiples of the quantum.`, }, {
    name: "rank", usedby: ['Subgraphs'], type: ['rankType'], description: `Rank constraints on the nodes in a subgraph.\n  dot only.`,
  }, {
    name: "rankdir", usedby: ['Graphs'], type: ['rankdir'], description: `Sets direction of graph layout.\n dot only.`,
  }, {
    name: "ranksep", usedby: ['Graphs'], type: ['double', 'doubleList'], description: `Specifies separation between ranks.\n dot, twopi only.`,
  }, { name: "ratio", usedby: ['Graphs'], type: ['double', 'string'], description: `Sets the aspect ratio (drawing height/drawing width) for the drawing.`, }, {
    name: "rects", usedby: ['Nodes'], type: ['rect'], description: `Rectangles for fields of records, in points.\n write only.`,
  }, { name: "regular", usedby: ['Nodes'], type: ['bool'], description: `If true, force polygon to be regular, i.e., the vertices of th.`, }, {
    name: "remincross", usedby: ['Graphs'], type: ['bool'], description: `If there are multiple clusters, whether to run edge crossing minimization a second time..\n dot only.`,
  }, {
    name: "repulsiveforce", usedby: ['Graphs'], type: ['double'], description: `The power of the repulsive force used in an extended Fruchterman-Reingold.\n sfdp only.`,
  }, {
    name: "resolution", usedby: ['Graphs'], type: ['double'], description: `Synonym for dpi..\n bitmap output, svg only.`,
  }, {
    name: "root", usedby: ['Graphs', 'Nodes'], type: ['string', 'bool'], description: `Specifies nodes to be used as the center of the layout.\n twopi, circo only.`,
  }, { name: "rotate", usedby: ['Graphs'], type: ['int'], description: `If rotate=90, sets drawing orientation to landscape.`, }, {
    name: "rotation", usedby: ['Graphs'], type: ['double'], description: `Rotates the final layout counter-clockwise by the specified number of degrees.\n sfdp only.`,
  }, {
    name: "samehead", usedby: ['Edges'], type: ['string'], description: `Edges with the same head and the same samehead value are aimed at the same point on the head.\n dot only.`,
  }, {
    name: "sametail", usedby: ['Edges'], type: ['string'], description: `Edges with the same tail and the same sametail value are aimed at th.\n dot only.`,
  }, { name: "samplepoints", usedby: ['Nodes'], type: ['int'], description: `Gives the number of points used for a circle/ellipse node.`, }, {
    name: "scale", usedby: ['Graphs'], type: ['double', 'point'], description: `Scales layout by the given factor after the initial layout.\n neato, twopi only.`,
  }, {
    name: "searchsize", usedby: ['Graphs'], type: ['int'], description: `During network simplex, the maximum number of edges with negative cut values to search when looking for an edge with minimum cut value..\n dot only.`,
  }, {
    name: "sep", usedby: ['Graphs'], type: ['addDouble', 'addPoint'], description: `Margin to leave around nodes when removing node overlap.\n fdp, neato only.`,
  }, { name: "shape", usedby: ['Nodes'], type: ['shape'], description: `Sets the shape of a node.`, }, { name: "shapefile", usedby: ['Nodes'], type: ['string'], description: `A file containing user-supplied node content.`, }, {
    name: "showboxes", usedby: ['Edges', 'Nodes', 'Graphs'], type: ['int'], description: `Print guide boxes for debugging.\n dot only.`,
  }, { name: "sides", usedby: ['Nodes'], type: ['int'], description: `Number of sides when shape=polygon.`, }, { name: "size", usedby: ['Graphs'], type: ['double', 'point'], description: `Maximum width and height of drawing, in inches.`, },
  { name: "skew", usedby: ['Nodes'], type: ['double'], description: `Skew factor for shape=polygon.`, }, {
    name: "smoothing", usedby: ['Graphs'], type: ['smoothType'], description: `Specifies a post-processing step used to smooth out an uneven distribution of nodes..\n sfdp only.`,
  }, {
    name: "sortv", usedby: ['Graphs', 'Clusters', 'Nodes'], type: ['int'], description: `Sort order of graph components for ordering packmode packing..`,
  }, { name: "splines", usedby: ['Graphs'], type: ['bool', 'string'], description: `Controls how, and if, edges are represented.`, }, {
    name: "start", usedby: ['Graphs'], type: ['startType'], description: `Parameter used to determine the initial layout of nodes.\n neato, fdp, sfdp only.`,
  }, { name: "style", usedby: ['Edges', 'Nodes', 'Clusters', 'Graphs'], type: ['style'], description: `Set style information for components of the graph.`, }, {
    name: "stylesheet", usedby: ['Graphs'], type: ['string'], description: `A URL or pathname specifying an XML style sheet, used in SVG output.\n svg only.`,
  }, {
    name: "tail_lp", usedby: ['Edges'], type: ['point'], description: `Position of an edge's tail label, in points..\n write only.`,
  }, { name: "tailclip", usedby: ['Edges'], type: ['bool'], description: `If true, the tail of an edge is clipped to the boundary of the tail node.`, }, {
    name: "tailhref", usedby: ['Edges'], type: ['escString'], description: `Synonym for tailURL..\n map, svg only.`,
  }, { name: "taillabel", usedby: ['Edges'], type: ['lblString'], description: `Text label to be placed near tail of edge.`, }, { name: "tailport", usedby: ['Edges'], type: ['portPos'], description: `Indicates where on the tail node to attach the tail of the edge.`, }, {
    name: "tailtarget", usedby: ['Edges'], type: ['escString'], description: `Browser window to use for the tailURL link.\n map, svg only.`,
  }, {
    name: "tailtooltip", usedby: ['Edges'], type: ['escString'], description: `Tooltip annotation attached to the tail of an edge.\n cmap, svg only.`,
  }, {
    name: "tailURL", usedby: ['Edges'], type: ['escString'], description: `If defined, tailURL is output as part of the tail label of th.\n map, svg only.`,
  }, {
    name: "target", usedby: ['Edges', 'Nodes', 'Graphs', 'Clusters'], type: ['escString', 'string'], description: `If the object has a URL, this attribute determines which window of the browser is used for the URL..\n map, svg only.`,
  }, {
    name: "TBbalance", usedby: ['Graphs'], type: ['string'], description: `Which rank to move floating (loose) nodes to.\n dot only.`,
  }, {
    name: "tooltip", usedby: ['Nodes', 'Edges', 'Clusters', 'Graphs'], type: ['escString'], description: `Tooltip (mouse hover text) attached to the node, edge, cluster, or graph.\n cmap, svg only.`,
  }, {
    name: "truecolor", usedby: ['Graphs'], type: ['bool'], description: `Whether internal bitmap rendering relies on a truecolor color model or uses.\n bitmap output only.`,
  }, {
    name: "URL", usedby: ['Edges', 'Nodes', 'Graphs', 'Clusters'], type: ['escString'], description: `Hyperlinks incorporated into device-dependent output.\n map, postscript, svg only.`,
  }, {
    name: "vertices", usedby: ['Nodes'], type: ['pointList'], description: `Sets the coordinates of the vertices of the node's polygon, in inches.\n write only.`,
  }, { name: "viewport", usedby: ['Graphs'], type: ['viewPort'], description: `Clipping window on final drawing.`, }, {
    name: "voro_margin", usedby: ['Graphs'], type: ['double'], description: `Tuning margin of Voronoi technique.\n neato, fdp, sfdp, twopi, circo only.`,
  }, { name: "weight", usedby: ['Edges'], type: ['int', 'double'], description: `Weight of edge.`, },
  { name: "width", usedby: ['Nodes'], type: ['double'], description: `Width of node, in inches.`, }, {
    name: "xdotversion", usedby: ['Graphs'], type: ['string'], description: `Determines the version of xdot used in output.\n xdot only.`,
  }, 
  
  { name: "xlabel", usedby: ['Edges', 'Nodes'], type: ['lblString'], description: `External label for a node or edge.`, }, 
  
  
  {
    name: "xlp", usedby: ['Nodes', 'Edges'], type: ['point'], description: `# xlp

    Position of an exterior label, [in points](/doc/info/attrs.html#points)
    
    type: _[point](/docs/attr-types/point/)_
    
    The position indicates the center of the label.
    
    _Valid on:_
    
    * Nodes
    * Edges
    
    _Note: write only._
    
    [Search the Graphviz codebase for \`"xlp"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="xlp">)
    
    Last modified June 18, 2022: [attributes descriptions with links \(25b13ac\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/25b13acb914eab6f408940717df3ae945d4da779)`,
  },


  { name: "z", usedby: ['Nodes'], type: ['double'], description: `# z

  Z-coordinate value for 3D layouts and displays
  
  type: _[double](/docs/attr-types/double/), default: \`0.0\`, minimum: \`-MAXFLOAT\`, \`-1000\`_
  
  **Deprecated:** Use [\`pos\`](https://graphviz.org/docs/attrs/pos/) attribute, along with [\`dimen\`](https://graphviz.org/docs/attrs/dimen/) and/or [\`dim\`](https://graphviz.org/docs/attrs/dim/) to specify dimensions.
  
  If the graph has [\`dim\`](https://graphviz.org/docs/attrs/dim/) set to 3 \(or more\), neato will use a node's \`z\` value for the z coordinate of its initial position if its [\`pos\`](https://graphviz.org/docs/attrs/pos/) attribute is also defined.
  
  Even if no \`z\` values are specified in the input, it is necessary to declare a \`z\` attribute for nodes, e.g, using \`node[z=""]\` in order to get z values on output. Thus, setting \`[dim](https://graphviz.org/docs/attrs/dim/)=3\` but not declaring \`z\` will cause \`neato \-Tvrml\` to layout the graph in 3D but project the layout onto the xy-plane for the rendering. If the \`z\` attribute is declared, the final rendering will be in 3D.
  
  _Valid on:_
  
  * Nodes
  
  [Search the Graphviz codebase for \`"z"\`](<https://gitlab.com/search?group_id=1996273&project_id=4207231&repository_ref=main&scope=blobs&search="z">)
  
  Last modified September 14, 2022: [Update z.md: remove extra dot \(0968dd3\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/0968dd3c82356d4faf79c42d3bec9a6f03363a4f)`, },
];