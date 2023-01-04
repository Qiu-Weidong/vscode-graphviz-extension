/* eslint-disable class-methods-use-this */

import { assert } from "console";
import * as vscode from "vscode";
import colors from "./colors";

function componentToHex(c: number): string {
  const hex = Math.floor(c * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase());
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : null;
}

function hexToRgbAlpha(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase());
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: parseInt(result[4], 16) / 255,
  } : null;
}

function hexToColor(hex: string): vscode.Color | null {
  const c = hexToRgb(hex);
  if (!c) return null;

  return new vscode.Color(c.r, c.g, c.b, 1.0);
}

function hexToColorAlpha(hex: string): vscode.Color | null {
  const c = hexToRgbAlpha(hex);
  if (!c) return null;

  return new vscode.Color(c.r, c.g, c.b, c.a);
}

export default class ColorProvider implements vscode.DocumentColorProvider {
  private colors: { [name: string]: vscode.Color } = {};

  constructor() {
    colors.split("\n").forEach((color) => {
      const [name, value] = color.split("#");
      const res = hexToColor(`#${value}`);
      if (res) {
        this.colors[name] = res;
      }
    });
  }

  public provideDocumentColors(
    document: vscode.TextDocument,
    // token: vscode.CancellationToken,
  ):
    Promise<vscode.ColorInformation[]> {
    const co: vscode.ColorInformation[] = [];

    const re = /((color|fillcolor|bgcolor)\s*=\s*)("(.*)"|\w+)/g;

    for (let line = 0; line < document.lineCount; line += 1) {
      const t = document.lineAt(line).text;

      let match;
      // eslint-disable-next-line no-cond-assign
      while ((match = re.exec(t)) != null) {
        let offset = match.index + match[1].length;
        if (match[4]) {
          offset += 1;
          match[4].split(":").forEach((i) => {
            const range = new vscode.Range(
              new vscode.Position(line, offset),
              new vscode.Position(line, offset + i.length),
            );
            if (this.colors[i]) {
              const ci = new vscode.ColorInformation(range, this.colors[i]);
              co.push(ci);
            } else if (i[0] === "#" && i.length === 7) {
              const color = hexToColor(i);
              if (color) {
                const ci = new vscode.ColorInformation(range, color);
                co.push(ci);
              }
            } else if (i[0] === "#" && i.length === 9) {
              const color = hexToColorAlpha(i);
              if (color) {
                const ci = new vscode.ColorInformation(range, color);
                co.push(ci);
              }
            }
            offset += 1 + i.length;
          });
        } else if (this.colors[match[3]]) {
          const ci = new vscode.ColorInformation(new vscode.Range(
            new vscode.Position(line, offset),
            new vscode.Position(line, offset + match[3].length),
          ), this.colors[match[3]]);
          co.push(ci);
        }
      }
    }

    return Promise.resolve(co);
  }

  // 点击选择颜色的时候会触发。鼠标指向颜色选择框时也会触发。
  public provideColorPresentations(
    color: vscode.Color,
    context: { document: vscode.TextDocument, range: vscode.Range },
    // token: vscode.CancellationToken,
  ):
    Promise<vscode.ColorPresentation[]> {
    const ret: vscode.ColorPresentation[] = [];

    let wrap = "";

    const line = context.document.lineAt(context.range.start.line).text;
    const snipp = line.slice(0, context.range.start.character);
    if (snipp.match(/\s*=\s*$/)) {
      // 如果没有引号， 则添加之
      wrap = "\"";
    }

    let msg = `${wrap}#${componentToHex(color.red)}${componentToHex(color.green)}${componentToHex(color.blue)}${componentToHex(color.alpha)}${wrap}`
    ret.push(new vscode.ColorPresentation(msg));
    
    console.log(msg);
    console.log(ret.length);
    return Promise.resolve(ret);
  }
}
