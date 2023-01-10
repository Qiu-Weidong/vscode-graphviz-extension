// 所有属性


// Attribute Type 类型名称，取值范围使用一个正则表达式来校验
// 共 33 种类型 178中属性
export const attributes = [
  { name: "_background", usedby: ['Graphs'], type: ['xdot'], description: `A string in the xdot format specifying an arbitrary background.`, },
  { name: "area", usedby: ['Nodes', 'Clusters'], type: ['double'], description: `Indicates the preferred area for a node or empty cluster.\n patchwork only.`, },
  { name: "arrowhead", usedby: ['Edges'], type: ['arrowType'], description: `Style of arrowhead on the head node of an edge.`, },
  { name: "arrowsize", usedby: ['Edges'], type: ['double'], description: `Multiplicative scale factor for arrowheads.`, },
  { name: "arrowtail", usedby: ['Edges'], type: ['arrowType'], description: `Style of arrowhead on the tail node of an edge.`, },
  { name: "bb", usedby: ['Graphs'], type: ['rect'], description: `Bounding box of drawing in points.\n write only.`, },
  { name: "beautify", usedby: ['Graphs'], type: ['bool'], description: `Whether to draw leaf nodes uniformly in a circle around the root node in sfdp..\n sfdp only.`, },
  { name: "bgcolor", usedby: ['Graphs', 'Clusters'], type: ['color', 'colorList'], description: `Canvas background color.`, },
  { name: "center", usedby: ['Graphs'], type: ['bool'], description: `Whether to center the drawing in the output canvas.`, },
  { name: "charset", usedby: ['Graphs'], type: ['string'], description: `Character encoding used when interpreting string input as a text label..`, },
  { name: "class", usedby: ['Edges', 'Nodes', 'Clusters', 'Graphs'], type: ['string'], description: `Classnames to attach to the node, edge, graph, or cluster's SVG element.\n svg only.`, },
  { name: "cluster", usedby: ['Clusters', 'Subgraphs'], type: ['bool'], description: `Whether the subgraph is a cluster.`, },
  {
    name: "clusterrank", usedby: ['Graphs'], type: ['clusterMode'], description: `Mode used for handling clusters.\n dot only.`,
  }, { name: "color", usedby: ['Edges', 'Nodes', 'Clusters'], type: ['color', 'colorList'], description: `Basic drawing color for graphics, not text.`, },
  { name: "colorscheme", usedby: ['Edges', 'Nodes', 'Clusters', 'Graphs'], type: ['string'], description: `A color scheme namespace: the context for interpreting color names.`, },
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
  }, { name: "xlabel", usedby: ['Edges', 'Nodes'], type: ['lblString'], description: `External label for a node or edge.`, }, {
    name: "xlp", usedby: ['Nodes', 'Edges'], type: ['point'], description: `Position of an exterior label, in points.\n write only.`,
  },
  { name: "z", usedby: ['Nodes'], type: ['double'], description: `Z-coordinate value for 3D layouts and displays.`, },
];

export const attributeValue = new Map([
  ['bool', ['true', 'false']],
  ['arrowType', ['normal', 'inv', 'dot', 'invdot', 'odot', 'invodot', 'none', 'tee',
    'empty', 'invempty', 'diamond', 'odiamond', 'ediamond', 'crow', 'box', 'obox',
    'open', 'halfopen', 'vee']],
  ['clusterMode', ['local', 'global', 'none']],
  ['color', ['silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green',
    'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'orange', 'aliceblue',
    'antiquewhite', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond', 'blueviolet',
    'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
    'cornsilk', 'crimson', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen',
    'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid',
    'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey',
    'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
    'firebrick', 'floralwhite', 'forestgreen', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod',
    'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki',
    'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
    'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
    'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
    'lightsteelblue', 'lightyellow', 'limegreen', 'linen', 'mediumaquamarine', 'mediumblue',
    'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
    'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
    'navajowhite', 'oldlace', 'olivedrab', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
    'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum',
    'powderblue', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen',
    'seashell', 'sienna', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
    'steelblue', 'tan', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'whitesmoke',
    'yellowgreen', 'rebeccapurple'
  ]],
  ['dirType', ['forward', 'back', 'both', 'none']],
  ['outputMode', ['breadthfirst', 'nodesfirst', 'edgesfirst']],
  ['packMode', ['none', 'clust', 'graph', 'array(_flags)?(%d)?']],
  ['pagedir', ['BL', 'BR', 'TL', 'TR', 'RB', 'RT', 'LB', 'LT']],
  ['quadType', ['normal', 'fast', 'none']],
  ['rankdir', ['TB', 'LR', 'BT', 'RL']],
  ['rankType', ['same', 'min', 'source', 'max', 'sink']],
  ['shape', ['box', 'polygon', 'ellipse', 'oval', 'circle', 'point', 'egg',
    'triangle', 'plaintext', 'plain', 'diamond', 'trapezium', 'parallelogram',
    'house', 'pentagon', 'hexagon', 'septagon', 'octagon', 'doublecircle',
    'doubleoctagon', 'tripleoctagon', 'invtriangle', 'invtrapezium',
    'invhouse', 'Mdiamond', 'Msquare', 'Mcircle', 'rect', 'rectangle',
    'square', 'star', 'none', 'underline', 'cylinder', 'note', 'tab',
    'folder', 'box3d', 'component', 'promoter', 'cds', 'terminator', 'record',
    'utr', 'primersite', 'restrictionsite', 'fivepoverhang', 'threepoverhang',
    'noverhang', 'assembly', 'signature', 'insulator', 'ribosite', 'rnastab',
    'proteasesite', 'proteinstab', 'rpromoter', 'rarrow', 'larrow', 'lpromoter']],
  ['smoothType', ['none', 'avg_dist', 'graph_dist', 'power_dist', 'rng', 'spring', 'triangle']],
]);


