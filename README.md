# colorscheme

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

Last modified September 14, 2022: [Update colorscheme.md: make the description shorter \(2d52cba\)](https://gitlab.com/graphviz/graphviz.gitlab.io/commit/2d52cba6f34af043fa1ce8aebedeecef6a3be191)