# Graphviz(dot) language supported and preview (Visual Studio Code Extension)
[中文版](README.zh.md)


This plugin provides features such as code highlighting, error prompts, auto-completion, color selection, automatic formatting, find references and rename references for the `dot` language. At the same time, use [viz.js](https://github.com/mdaines/viz.js.git) to preview the code.


## syntax highlighting
![Syntax highlighting](asset/other/highlight.jpg)

## Error message
Here a directed graph `digraph` is defined, but `--` is used to connect the edges, so an `error` is prompted. A non-existing attribute `bgcolor` was used in an edge attribute, thus giving a `warning`.
![Diagnostic](asset/other/diagnostic.gif)

## Mouse hover prompt
When the mouse hovers over an `attribute`, information about the attribute will be displayed.
![Mouse Hover Prompt](asset/other/hover.gif)

## Selection of color
When the mouse moves over the color, a color selection box will appear for selecting a color.
![Color Selection](asset/other/color.gif)

## Autocompletion
This plugin gives autocompletion functionality. Keyword attributes and attribute values can be hinted.
![Autocompletion](asset/other/completion1.gif)

At the same time, you can also prompt for the defined nodes and the [port](https://graphviz.org/doc/info/shapes.html#record-based-note) of the nodes.

![](asset/other/completion2.gif)

## formatting
![](asset/other/formatting.gif)

## Find references, rename nodes
![](asset/other/symbol.gif)

## preview
Click `Preview` in the editor to preview, you can drag the mouse or use the scroll wheel to zoom in and out. Click the drop-down menu above to switch the layout engine.
![](asset/other/preview.gif)

### Preview multiple files
Set `graphviz.multiPanel` to `true` in `settings.json` to preview multiple files at the same time.
![](asset/other/previewmul.gif)
### Preview in the same panel
Set `graphviz.multiPanel` to `false` in `settings.json` to preview in the same `panel`.
![](asset/other/previewuni.gif)
### Hot update
Set `graphviz.hotUpdate` to `true` in `settings.json` to enable hot update.


![](asset/other/hotupdate.gif)
As shown in the figure above, change `bgcolor` to `transparent` in the editor on the left, then save, and the preview interface on the right will be updated synchronously immediately.

## export
Click `Export` in the editor to export.
![](asset/other/export.gif)