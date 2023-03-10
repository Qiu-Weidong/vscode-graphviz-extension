// Generated from src/dot/Dot.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class DotLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly STRICT = 11;
	public static readonly GRAPH = 12;
	public static readonly DIGRAPH = 13;
	public static readonly NODE = 14;
	public static readonly EDGE = 15;
	public static readonly SUBGRAPH = 16;
	public static readonly NUMBER = 17;
	public static readonly STRING = 18;
	public static readonly ID = 19;
	public static readonly HTML_STRING = 20;
	public static readonly COMMENT = 21;
	public static readonly LINE_COMMENT = 22;
	public static readonly PREPROC = 23;
	public static readonly WS = 24;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "STRICT", "GRAPH", "DIGRAPH", "NODE", "EDGE", "SUBGRAPH", "NUMBER", 
		"DIGIT", "STRING", "ID", "LETTER", "HTML_STRING", "TAG", "COMMENT", "LINE_COMMENT", 
		"PREPROC", "WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'{'", "'}'", "';'", "'['", "','", "']'", "'='", "'->'", "'--'", 
		"':'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "STRICT", "GRAPH", "DIGRAPH", 
		"NODE", "EDGE", "SUBGRAPH", "NUMBER", "STRING", "ID", "HTML_STRING", "COMMENT", 
		"LINE_COMMENT", "PREPROC", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(DotLexer._LITERAL_NAMES, DotLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return DotLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(DotLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Dot.g4"; }

	// @Override
	public get ruleNames(): string[] { return DotLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return DotLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return DotLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return DotLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x1A\xE8\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
		"\x1C\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03" +
		"\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x03\n\x03\n" +
		"\x03\n\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x12\x05\x12y\n\x12\x03\x12\x03\x12\x06" +
		"\x12}\n\x12\r\x12\x0E\x12~\x03\x12\x06\x12\x82\n\x12\r\x12\x0E\x12\x83" +
		"\x03\x12\x03\x12\x07\x12\x88\n\x12\f\x12\x0E\x12\x8B\v\x12\x05\x12\x8D" +
		"\n\x12\x05\x12\x8F\n\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14" +
		"\x07\x14\x97\n\x14\f\x14\x0E\x14\x9A\v\x14\x03\x14\x03\x14\x03\x15\x03" +
		"\x15\x03\x15\x07\x15\xA1\n\x15\f\x15\x0E\x15\xA4\v\x15\x03\x16\x03\x16" +
		"\x03\x17\x03\x17\x03\x17\x07\x17\xAB\n\x17\f\x17\x0E\x17\xAE\v\x17\x03" +
		"\x17\x03\x17\x03\x18\x03\x18\x07\x18\xB4\n\x18\f\x18\x0E\x18\xB7\v\x18" +
		"\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\xBF\n\x19\f\x19" +
		"\x0E\x19\xC2\v\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03" +
		"\x1A\x03\x1A\x03\x1A\x07\x1A\xCD\n\x1A\f\x1A\x0E\x1A\xD0\v\x1A\x03\x1A" +
		"\x05\x1A\xD3\n\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x07" +
		"\x1B\xDB\n\x1B\f\x1B\x0E\x1B\xDE\v\x1B\x03\x1B\x03\x1B\x03\x1C\x06\x1C" +
		"\xE3\n\x1C\r\x1C\x0E\x1C\xE4\x03\x1C\x03\x1C\x06\x98\xB5\xC0\xCE\x02\x02" +
		"\x1D\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F" +
		"\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F" +
		"\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13%\x02\x02\'\x02\x14)\x02\x15" +
		"+\x02\x02-\x02\x16/\x02\x021\x02\x173\x02\x185\x02\x197\x02\x1A\x03\x02" +
		"\x16\x04\x02UUuu\x04\x02VVvv\x04\x02TTtt\x04\x02KKkk\x04\x02EEee\x04\x02" +
		"IIii\x04\x02CCcc\x04\x02RRrr\x04\x02JJjj\x04\x02FFff\x04\x02PPpp\x04\x02" +
		"QQqq\x04\x02GGgg\x04\x02WWww\x04\x02DDdd\x03\x022;\x06\x02C\\aac|\x82" +
		"\u0101\x04\x02>>@@\x04\x02\f\f\x0F\x0F\x05\x02\v\f\x0F\x0F\"\"\x02\xF6" +
		"\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02" +
		"\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02" +
		"\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02" +
		"\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02" +
		"\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02" +
		"!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03" +
		"\x02\x02\x02\x02-\x03\x02\x02\x02\x021\x03\x02\x02\x02\x023\x03\x02\x02" +
		"\x02\x025\x03\x02\x02\x02\x027\x03\x02\x02\x02\x039\x03\x02\x02\x02\x05" +
		";\x03\x02\x02\x02\x07=\x03\x02\x02\x02\t?\x03\x02\x02\x02\vA\x03\x02\x02" +
		"\x02\rC\x03\x02\x02\x02\x0FE\x03\x02\x02\x02\x11G\x03\x02\x02\x02\x13" +
		"J\x03\x02\x02\x02\x15M\x03\x02\x02\x02\x17O\x03\x02\x02\x02\x19V\x03\x02" +
		"\x02\x02\x1B\\\x03\x02\x02\x02\x1Dd\x03\x02\x02\x02\x1Fi\x03\x02\x02\x02" +
		"!n\x03\x02\x02\x02#x\x03\x02\x02\x02%\x90\x03\x02\x02\x02\'\x92\x03\x02" +
		"\x02\x02)\x9D\x03\x02\x02\x02+\xA5\x03\x02\x02\x02-\xA7\x03\x02\x02\x02" +
		"/\xB1\x03\x02\x02\x021\xBA\x03\x02\x02\x023\xC8\x03\x02\x02\x025\xD8\x03" +
		"\x02\x02\x027\xE2\x03\x02\x02\x029:\x07}\x02\x02:\x04\x03\x02\x02\x02" +
		";<\x07\x7F\x02\x02<\x06\x03\x02\x02\x02=>\x07=\x02\x02>\b\x03\x02\x02" +
		"\x02?@\x07]\x02\x02@\n\x03\x02\x02\x02AB\x07.\x02\x02B\f\x03\x02\x02\x02" +
		"CD\x07_\x02\x02D\x0E\x03\x02\x02\x02EF\x07?\x02\x02F\x10\x03\x02\x02\x02" +
		"GH\x07/\x02\x02HI\x07@\x02\x02I\x12\x03\x02\x02\x02JK\x07/\x02\x02KL\x07" +
		"/\x02\x02L\x14\x03\x02\x02\x02MN\x07<\x02\x02N\x16\x03\x02\x02\x02OP\t" +
		"\x02\x02\x02PQ\t\x03\x02\x02QR\t\x04\x02\x02RS\t\x05\x02\x02ST\t\x06\x02" +
		"\x02TU\t\x03\x02\x02U\x18\x03\x02\x02\x02VW\t\x07\x02\x02WX\t\x04\x02" +
		"\x02XY\t\b\x02\x02YZ\t\t\x02\x02Z[\t\n\x02\x02[\x1A\x03\x02\x02\x02\\" +
		"]\t\v\x02\x02]^\t\x05\x02\x02^_\t\x07\x02\x02_`\t\x04\x02\x02`a\t\b\x02" +
		"\x02ab\t\t\x02\x02bc\t\n\x02\x02c\x1C\x03\x02\x02\x02de\t\f\x02\x02ef" +
		"\t\r\x02\x02fg\t\v\x02\x02gh\t\x0E\x02\x02h\x1E\x03\x02\x02\x02ij\t\x0E" +
		"\x02\x02jk\t\v\x02\x02kl\t\x07\x02\x02lm\t\x0E\x02\x02m \x03\x02\x02\x02" +
		"no\t\x02\x02\x02op\t\x0F\x02\x02pq\t\x10\x02\x02qr\t\x07\x02\x02rs\t\x04" +
		"\x02\x02st\t\b\x02\x02tu\t\t\x02\x02uv\t\n\x02\x02v\"\x03\x02\x02\x02" +
		"wy\x07/\x02\x02xw\x03\x02\x02\x02xy\x03\x02\x02\x02y\x8E\x03\x02\x02\x02" +
		"z|\x070\x02\x02{}\x05%\x13\x02|{\x03\x02\x02\x02}~\x03\x02\x02\x02~|\x03" +
		"\x02\x02\x02~\x7F\x03\x02\x02\x02\x7F\x8F\x03\x02\x02\x02\x80\x82\x05" +
		"%\x13\x02\x81\x80\x03\x02\x02\x02\x82\x83\x03\x02\x02\x02\x83\x81\x03" +
		"\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x8C\x03\x02\x02\x02\x85\x89\x07" +
		"0\x02\x02\x86\x88\x05%\x13\x02\x87\x86\x03\x02\x02\x02\x88\x8B\x03\x02" +
		"\x02\x02\x89\x87\x03\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x8D\x03\x02" +
		"\x02\x02\x8B\x89\x03\x02\x02\x02\x8C\x85\x03\x02\x02\x02\x8C\x8D\x03\x02" +
		"\x02\x02\x8D\x8F\x03\x02\x02\x02\x8Ez\x03\x02\x02\x02\x8E\x81\x03\x02" +
		"\x02\x02\x8F$\x03\x02\x02\x02\x90\x91\t\x11\x02\x02\x91&\x03\x02\x02\x02" +
		"\x92\x98\x07$\x02\x02\x93\x94\x07^\x02\x02\x94\x97\x07$\x02\x02\x95\x97" +
		"\v\x02\x02\x02\x96\x93\x03\x02\x02\x02\x96\x95\x03\x02\x02\x02\x97\x9A" +
		"\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x98\x96\x03\x02\x02\x02\x99\x9B" +
		"\x03\x02\x02\x02\x9A\x98\x03\x02\x02\x02\x9B\x9C\x07$\x02\x02\x9C(\x03" +
		"\x02\x02\x02\x9D\xA2\x05+\x16\x02\x9E\xA1\x05+\x16\x02\x9F\xA1\x05%\x13" +
		"\x02\xA0\x9E\x03\x02\x02\x02\xA0\x9F\x03\x02\x02\x02\xA1\xA4\x03\x02\x02" +
		"\x02\xA2\xA0\x03\x02\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3*\x03\x02\x02" +
		"\x02\xA4\xA2\x03\x02\x02\x02\xA5\xA6\t\x12\x02\x02\xA6,\x03\x02\x02\x02" +
		"\xA7\xAC\x07>\x02\x02\xA8\xAB\x05/\x18\x02\xA9\xAB\n\x13\x02\x02\xAA\xA8" +
		"\x03\x02\x02\x02\xAA\xA9\x03\x02\x02\x02\xAB\xAE\x03\x02\x02\x02\xAC\xAA" +
		"\x03\x02\x02\x02\xAC\xAD\x03\x02\x02\x02\xAD\xAF\x03\x02\x02\x02\xAE\xAC" +
		"\x03\x02\x02\x02\xAF\xB0\x07@\x02\x02\xB0.\x03\x02\x02\x02\xB1\xB5\x07" +
		">\x02\x02\xB2\xB4\v\x02\x02\x02\xB3\xB2\x03\x02\x02\x02\xB4\xB7\x03\x02" +
		"\x02\x02\xB5\xB6\x03\x02\x02\x02\xB5\xB3\x03\x02\x02\x02\xB6\xB8\x03\x02" +
		"\x02\x02\xB7\xB5\x03\x02\x02\x02\xB8\xB9\x07@\x02\x02\xB90\x03\x02\x02" +
		"\x02\xBA\xBB\x071\x02\x02\xBB\xBC\x07,\x02\x02\xBC\xC0\x03\x02\x02\x02" +
		"\xBD\xBF\v\x02\x02\x02\xBE\xBD\x03\x02\x02\x02\xBF\xC2\x03\x02\x02\x02" +
		"\xC0\xC1\x03\x02\x02\x02\xC0\xBE\x03\x02\x02\x02\xC1\xC3\x03\x02\x02\x02" +
		"\xC2\xC0\x03\x02\x02\x02\xC3\xC4\x07,\x02\x02\xC4\xC5\x071\x02\x02\xC5" +
		"\xC6\x03\x02\x02\x02\xC6\xC7\b\x19\x02\x02\xC72\x03\x02\x02\x02\xC8\xC9" +
		"\x071\x02\x02\xC9\xCA\x071\x02\x02\xCA\xCE\x03\x02\x02\x02\xCB\xCD\v\x02" +
		"\x02\x02\xCC\xCB\x03\x02\x02\x02\xCD\xD0\x03\x02\x02\x02\xCE\xCF\x03\x02" +
		"\x02\x02\xCE\xCC\x03\x02\x02\x02\xCF\xD2\x03\x02\x02\x02\xD0\xCE\x03\x02" +
		"\x02\x02\xD1\xD3\x07\x0F\x02\x02\xD2\xD1\x03\x02\x02\x02\xD2\xD3\x03\x02" +
		"\x02\x02\xD3\xD4\x03\x02\x02\x02\xD4\xD5\x07\f\x02\x02\xD5\xD6\x03\x02" +
		"\x02\x02\xD6\xD7\b\x1A\x02\x02\xD74\x03\x02\x02\x02\xD8\xDC\x07%\x02\x02" +
		"\xD9\xDB\n\x14\x02\x02\xDA\xD9\x03\x02\x02\x02\xDB\xDE\x03\x02\x02\x02" +
		"\xDC\xDA\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02\xDD\xDF\x03\x02\x02\x02" +
		"\xDE\xDC\x03\x02\x02\x02\xDF\xE0\b\x1B\x02\x02\xE06\x03\x02\x02\x02\xE1" +
		"\xE3\t\x15\x02\x02\xE2\xE1\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02\xE4" +
		"\xE2\x03\x02\x02\x02\xE4\xE5\x03\x02\x02\x02\xE5\xE6\x03\x02\x02\x02\xE6" +
		"\xE7\b\x1C\x03\x02\xE78\x03\x02\x02\x02\x15\x02x~\x83\x89\x8C\x8E\x96" +
		"\x98\xA0\xA2\xAA\xAC\xB5\xC0\xCE\xD2\xDC\xE4\x04\x02\x03\x02\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!DotLexer.__ATN) {
			DotLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(DotLexer._serializedATN));
		}

		return DotLexer.__ATN;
	}

}

