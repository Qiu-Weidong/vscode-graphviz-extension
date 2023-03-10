// Generated from src/dot/Dot.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { DotListener } from "./DotListener";
import { DotVisitor } from "./DotVisitor";


export class DotParser extends Parser {
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
	public static readonly RULE_graph_list = 0;
	public static readonly RULE_graph = 1;
	public static readonly RULE_stmt_list = 2;
	public static readonly RULE_stmt = 3;
	public static readonly RULE_attr_stmt = 4;
	public static readonly RULE_attr_list = 5;
	public static readonly RULE_a_list = 6;
	public static readonly RULE_assign_stmt = 7;
	public static readonly RULE_edge_stmt = 8;
	public static readonly RULE_edgeRHS = 9;
	public static readonly RULE_edgeop = 10;
	public static readonly RULE_node_stmt = 11;
	public static readonly RULE_node_id = 12;
	public static readonly RULE_compass_pt = 13;
	public static readonly RULE_subgraph = 14;
	public static readonly RULE_id = 15;
	public static readonly RULE_lexpr = 16;
	public static readonly RULE_rexpr = 17;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"graph_list", "graph", "stmt_list", "stmt", "attr_stmt", "attr_list", 
		"a_list", "assign_stmt", "edge_stmt", "edgeRHS", "edgeop", "node_stmt", 
		"node_id", "compass_pt", "subgraph", "id", "lexpr", "rexpr",
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(DotParser._LITERAL_NAMES, DotParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return DotParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Dot.g4"; }

	// @Override
	public get ruleNames(): string[] { return DotParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return DotParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(DotParser._ATN, this);
	}
	// @RuleVersion(0)
	public graph_list(): Graph_listContext {
		let _localctx: Graph_listContext = new Graph_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, DotParser.RULE_graph_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 37;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 36;
				this.graph();
				}
				}
				this.state = 39;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.STRICT) | (1 << DotParser.GRAPH) | (1 << DotParser.DIGRAPH))) !== 0));
			this.state = 41;
			this.match(DotParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public graph(): GraphContext {
		let _localctx: GraphContext = new GraphContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, DotParser.RULE_graph);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === DotParser.STRICT) {
				{
				this.state = 43;
				this.match(DotParser.STRICT);
				}
			}

			this.state = 46;
			_la = this._input.LA(1);
			if (!(_la === DotParser.GRAPH || _la === DotParser.DIGRAPH)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 48;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.NUMBER) | (1 << DotParser.STRING) | (1 << DotParser.ID))) !== 0)) {
				{
				this.state = 47;
				this.id();
				}
			}

			this.state = 50;
			_localctx._lp = this.match(DotParser.T__0);
			this.state = 51;
			this.stmt_list();
			this.state = 52;
			_localctx._rp = this.match(DotParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmt_list(): Stmt_listContext {
		let _localctx: Stmt_listContext = new Stmt_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, DotParser.RULE_stmt_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 57;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.T__0) | (1 << DotParser.GRAPH) | (1 << DotParser.NODE) | (1 << DotParser.EDGE) | (1 << DotParser.SUBGRAPH) | (1 << DotParser.NUMBER) | (1 << DotParser.STRING) | (1 << DotParser.ID))) !== 0)) {
				{
				{
				this.state = 54;
				this.stmt();
				}
				}
				this.state = 59;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let _localctx: StmtContext = new StmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, DotParser.RULE_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 65;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				this.state = 60;
				this.node_stmt();
				}
				break;

			case 2:
				{
				this.state = 61;
				this.edge_stmt();
				}
				break;

			case 3:
				{
				this.state = 62;
				this.attr_stmt();
				}
				break;

			case 4:
				{
				this.state = 63;
				this.assign_stmt();
				}
				break;

			case 5:
				{
				this.state = 64;
				this.subgraph();
				}
				break;
			}
			this.state = 68;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === DotParser.T__2) {
				{
				this.state = 67;
				_localctx._semicolon = this.match(DotParser.T__2);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attr_stmt(): Attr_stmtContext {
		let _localctx: Attr_stmtContext = new Attr_stmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, DotParser.RULE_attr_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.GRAPH) | (1 << DotParser.NODE) | (1 << DotParser.EDGE))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 71;
			this.attr_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attr_list(): Attr_listContext {
		let _localctx: Attr_listContext = new Attr_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, DotParser.RULE_attr_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 74;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 73;
				this.a_list();
				}
				}
				this.state = 76;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === DotParser.T__3);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public a_list(): A_listContext {
		let _localctx: A_listContext = new A_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, DotParser.RULE_a_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			_localctx._lp = this.match(DotParser.T__3);
			this.state = 85;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === DotParser.STRING || _la === DotParser.ID) {
				{
				{
				this.state = 79;
				this.assign_stmt();
				this.state = 81;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === DotParser.T__2 || _la === DotParser.T__4) {
					{
					this.state = 80;
					_localctx._separator = this._input.LT(1);
					_la = this._input.LA(1);
					if (!(_la === DotParser.T__2 || _la === DotParser.T__4)) {
						_localctx._separator = this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
				}

				}
				}
				this.state = 87;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 88;
			_localctx._rp = this.match(DotParser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assign_stmt(): Assign_stmtContext {
		let _localctx: Assign_stmtContext = new Assign_stmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, DotParser.RULE_assign_stmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
			this.lexpr();
			this.state = 91;
			_localctx._equ = this.match(DotParser.T__6);
			this.state = 92;
			this.rexpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public edge_stmt(): Edge_stmtContext {
		let _localctx: Edge_stmtContext = new Edge_stmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, DotParser.RULE_edge_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 96;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case DotParser.NUMBER:
			case DotParser.STRING:
			case DotParser.ID:
				{
				this.state = 94;
				this.node_id();
				}
				break;
			case DotParser.T__0:
			case DotParser.SUBGRAPH:
				{
				this.state = 95;
				this.subgraph();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 98;
			this.edgeRHS();
			this.state = 100;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === DotParser.T__3) {
				{
				this.state = 99;
				this.attr_list();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public edgeRHS(): EdgeRHSContext {
		let _localctx: EdgeRHSContext = new EdgeRHSContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, DotParser.RULE_edgeRHS);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 102;
				this.edgeop();
				this.state = 105;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case DotParser.NUMBER:
				case DotParser.STRING:
				case DotParser.ID:
					{
					this.state = 103;
					this.node_id();
					}
					break;
				case DotParser.T__0:
				case DotParser.SUBGRAPH:
					{
					this.state = 104;
					this.subgraph();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === DotParser.T__7 || _la === DotParser.T__8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public edgeop(): EdgeopContext {
		let _localctx: EdgeopContext = new EdgeopContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, DotParser.RULE_edgeop);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 111;
			_la = this._input.LA(1);
			if (!(_la === DotParser.T__7 || _la === DotParser.T__8)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public node_stmt(): Node_stmtContext {
		let _localctx: Node_stmtContext = new Node_stmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, DotParser.RULE_node_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 113;
			this.node_id();
			this.state = 115;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === DotParser.T__3) {
				{
				this.state = 114;
				this.attr_list();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public node_id(): Node_idContext {
		let _localctx: Node_idContext = new Node_idContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, DotParser.RULE_node_id);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 117;
			this.id();
			this.state = 120;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 118;
				_localctx._colon = this.match(DotParser.T__9);
				this.state = 119;
				this.id();
				}
				break;
			}
			this.state = 124;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === DotParser.T__9) {
				{
				this.state = 122;
				_localctx._colon = this.match(DotParser.T__9);
				this.state = 123;
				this.compass_pt();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compass_pt(): Compass_ptContext {
		let _localctx: Compass_ptContext = new Compass_ptContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, DotParser.RULE_compass_pt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 126;
			_la = this._input.LA(1);
			if (!(_la === DotParser.STRING || _la === DotParser.ID)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subgraph(): SubgraphContext {
		let _localctx: SubgraphContext = new SubgraphContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, DotParser.RULE_subgraph);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === DotParser.SUBGRAPH) {
				{
				this.state = 128;
				this.match(DotParser.SUBGRAPH);
				this.state = 130;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.NUMBER) | (1 << DotParser.STRING) | (1 << DotParser.ID))) !== 0)) {
					{
					this.state = 129;
					this.id();
					}
				}

				}
			}

			this.state = 134;
			_localctx._lp = this.match(DotParser.T__0);
			this.state = 135;
			this.stmt_list();
			this.state = 136;
			_localctx._rp = this.match(DotParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public id(): IdContext {
		let _localctx: IdContext = new IdContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, DotParser.RULE_id);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 138;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.NUMBER) | (1 << DotParser.STRING) | (1 << DotParser.ID))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lexpr(): LexprContext {
		let _localctx: LexprContext = new LexprContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, DotParser.RULE_lexpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 140;
			_la = this._input.LA(1);
			if (!(_la === DotParser.STRING || _la === DotParser.ID)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rexpr(): RexprContext {
		let _localctx: RexprContext = new RexprContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, DotParser.RULE_rexpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 142;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DotParser.NUMBER) | (1 << DotParser.STRING) | (1 << DotParser.ID) | (1 << DotParser.HTML_STRING))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1A\x93\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x03\x02\x06\x02(\n\x02\r\x02\x0E\x02)\x03\x02\x03\x02\x03\x03" +
		"\x05\x03/\n\x03\x03\x03\x03\x03\x05\x033\n\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x04\x07\x04:\n\x04\f\x04\x0E\x04=\v\x04\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x05\x05D\n\x05\x03\x05\x05\x05G\n\x05\x03\x06\x03" +
		"\x06\x03\x06\x03\x07\x06\x07M\n\x07\r\x07\x0E\x07N\x03\b\x03\b\x03\b\x05" +
		"\bT\n\b\x07\bV\n\b\f\b\x0E\bY\v\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t" +
		"\x03\n\x03\n\x05\nc\n\n\x03\n\x03\n\x05\ng\n\n\x03\v\x03\v\x03\v\x05\v" +
		"l\n\v\x06\vn\n\v\r\v\x0E\vo\x03\f\x03\f\x03\r\x03\r\x05\rv\n\r\x03\x0E" +
		"\x03\x0E\x03\x0E\x05\x0E{\n\x0E\x03\x0E\x03\x0E\x05\x0E\x7F\n\x0E\x03" +
		"\x0F\x03\x0F\x03\x10\x03\x10\x05\x10\x85\n\x10\x05\x10\x87\n\x10\x03\x10" +
		"\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13" +
		"\x03\x13\x02\x02\x02\x14\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 " +
		"\x02\"\x02$\x02\x02\t\x03\x02\x0E\x0F\x04\x02\x0E\x0E\x10\x11\x04\x02" +
		"\x05\x05\x07\x07\x03\x02\n\v\x03\x02\x14\x15\x03\x02\x13\x15\x03\x02\x13" +
		"\x16\x02\x95\x02\'\x03\x02\x02\x02\x04.\x03\x02\x02\x02\x06;\x03\x02\x02" +
		"\x02\bC\x03\x02\x02\x02\nH\x03\x02\x02\x02\fL\x03\x02\x02\x02\x0EP\x03" +
		"\x02\x02\x02\x10\\\x03\x02\x02\x02\x12b\x03\x02\x02\x02\x14m\x03\x02\x02" +
		"\x02\x16q\x03\x02\x02\x02\x18s\x03\x02\x02\x02\x1Aw\x03\x02\x02\x02\x1C" +
		"\x80\x03\x02\x02\x02\x1E\x86\x03\x02\x02\x02 \x8C\x03\x02\x02\x02\"\x8E" +
		"\x03\x02\x02\x02$\x90\x03\x02\x02\x02&(\x05\x04\x03\x02\'&\x03\x02\x02" +
		"\x02()\x03\x02\x02\x02)\'\x03\x02\x02\x02)*\x03\x02\x02\x02*+\x03\x02" +
		"\x02\x02+,\x07\x02\x02\x03,\x03\x03\x02\x02\x02-/\x07\r\x02\x02.-\x03" +
		"\x02\x02\x02./\x03\x02\x02\x02/0\x03\x02\x02\x0202\t\x02\x02\x0213\x05" +
		" \x11\x0221\x03\x02\x02\x0223\x03\x02\x02\x0234\x03\x02\x02\x0245\x07" +
		"\x03\x02\x0256\x05\x06\x04\x0267\x07\x04\x02\x027\x05\x03\x02\x02\x02" +
		"8:\x05\b\x05\x0298\x03\x02\x02\x02:=\x03\x02\x02\x02;9\x03\x02\x02\x02" +
		";<\x03\x02\x02\x02<\x07\x03\x02\x02\x02=;\x03\x02\x02\x02>D\x05\x18\r" +
		"\x02?D\x05\x12\n\x02@D\x05\n\x06\x02AD\x05\x10\t\x02BD\x05\x1E\x10\x02" +
		"C>\x03\x02\x02\x02C?\x03\x02\x02\x02C@\x03\x02\x02\x02CA\x03\x02\x02\x02" +
		"CB\x03\x02\x02\x02DF\x03\x02\x02\x02EG\x07\x05\x02\x02FE\x03\x02\x02\x02" +
		"FG\x03\x02\x02\x02G\t\x03\x02\x02\x02HI\t\x03\x02\x02IJ\x05\f\x07\x02" +
		"J\v\x03\x02\x02\x02KM\x05\x0E\b\x02LK\x03\x02\x02\x02MN\x03\x02\x02\x02" +
		"NL\x03\x02\x02\x02NO\x03\x02\x02\x02O\r\x03\x02\x02\x02PW\x07\x06\x02" +
		"\x02QS\x05\x10\t\x02RT\t\x04\x02\x02SR\x03\x02\x02\x02ST\x03\x02\x02\x02" +
		"TV\x03\x02\x02\x02UQ\x03\x02\x02\x02VY\x03\x02\x02\x02WU\x03\x02\x02\x02" +
		"WX\x03\x02\x02\x02XZ\x03\x02\x02\x02YW\x03\x02\x02\x02Z[\x07\b\x02\x02" +
		"[\x0F\x03\x02\x02\x02\\]\x05\"\x12\x02]^\x07\t\x02\x02^_\x05$\x13\x02" +
		"_\x11\x03\x02\x02\x02`c\x05\x1A\x0E\x02ac\x05\x1E\x10\x02b`\x03\x02\x02" +
		"\x02ba\x03\x02\x02\x02cd\x03\x02\x02\x02df\x05\x14\v\x02eg\x05\f\x07\x02" +
		"fe\x03\x02\x02\x02fg\x03\x02\x02\x02g\x13\x03\x02\x02\x02hk\x05\x16\f" +
		"\x02il\x05\x1A\x0E\x02jl\x05\x1E\x10\x02ki\x03\x02\x02\x02kj\x03\x02\x02" +
		"\x02ln\x03\x02\x02\x02mh\x03\x02\x02\x02no\x03\x02\x02\x02om\x03\x02\x02" +
		"\x02op\x03\x02\x02\x02p\x15\x03\x02\x02\x02qr\t\x05\x02\x02r\x17\x03\x02" +
		"\x02\x02su\x05\x1A\x0E\x02tv\x05\f\x07\x02ut\x03\x02\x02\x02uv\x03\x02" +
		"\x02\x02v\x19\x03\x02\x02\x02wz\x05 \x11\x02xy\x07\f\x02\x02y{\x05 \x11" +
		"\x02zx\x03\x02\x02\x02z{\x03\x02\x02\x02{~\x03\x02\x02\x02|}\x07\f\x02" +
		"\x02}\x7F\x05\x1C\x0F\x02~|\x03\x02\x02\x02~\x7F\x03\x02\x02\x02\x7F\x1B" +
		"\x03\x02\x02\x02\x80\x81\t\x06\x02\x02\x81\x1D\x03\x02\x02\x02\x82\x84" +
		"\x07\x12\x02\x02\x83\x85\x05 \x11\x02\x84\x83\x03\x02\x02\x02\x84\x85" +
		"\x03\x02\x02\x02\x85\x87\x03\x02\x02\x02\x86\x82\x03\x02\x02\x02\x86\x87" +
		"\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x89\x07\x03\x02\x02\x89\x8A" +
		"\x05\x06\x04\x02\x8A\x8B\x07\x04\x02\x02\x8B\x1F\x03\x02\x02\x02\x8C\x8D" +
		"\t\x07\x02\x02\x8D!\x03\x02\x02\x02\x8E\x8F\t\x06\x02\x02\x8F#\x03\x02" +
		"\x02\x02\x90\x91\t\b\x02\x02\x91%\x03\x02\x02\x02\x14).2;CFNSWbfkouz~" +
		"\x84\x86";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!DotParser.__ATN) {
			DotParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(DotParser._serializedATN));
		}

		return DotParser.__ATN;
	}

}

export class Graph_listContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(DotParser.EOF, 0); }
	public graph(): GraphContext[];
	public graph(i: number): GraphContext;
	public graph(i?: number): GraphContext | GraphContext[] {
		if (i === undefined) {
			return this.getRuleContexts(GraphContext);
		} else {
			return this.getRuleContext(i, GraphContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_graph_list; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterGraph_list) {
			listener.enterGraph_list(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitGraph_list) {
			listener.exitGraph_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitGraph_list) {
			return visitor.visitGraph_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GraphContext extends ParserRuleContext {
	public _lp!: Token;
	public _rp!: Token;
	public stmt_list(): Stmt_listContext {
		return this.getRuleContext(0, Stmt_listContext);
	}
	public GRAPH(): TerminalNode | undefined { return this.tryGetToken(DotParser.GRAPH, 0); }
	public DIGRAPH(): TerminalNode | undefined { return this.tryGetToken(DotParser.DIGRAPH, 0); }
	public STRICT(): TerminalNode | undefined { return this.tryGetToken(DotParser.STRICT, 0); }
	public id(): IdContext | undefined {
		return this.tryGetRuleContext(0, IdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_graph; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterGraph) {
			listener.enterGraph(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitGraph) {
			listener.exitGraph(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitGraph) {
			return visitor.visitGraph(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Stmt_listContext extends ParserRuleContext {
	public stmt(): StmtContext[];
	public stmt(i: number): StmtContext;
	public stmt(i?: number): StmtContext | StmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtContext);
		} else {
			return this.getRuleContext(i, StmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_stmt_list; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterStmt_list) {
			listener.enterStmt_list(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitStmt_list) {
			listener.exitStmt_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitStmt_list) {
			return visitor.visitStmt_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	public _semicolon!: Token;
	public node_stmt(): Node_stmtContext | undefined {
		return this.tryGetRuleContext(0, Node_stmtContext);
	}
	public edge_stmt(): Edge_stmtContext | undefined {
		return this.tryGetRuleContext(0, Edge_stmtContext);
	}
	public attr_stmt(): Attr_stmtContext | undefined {
		return this.tryGetRuleContext(0, Attr_stmtContext);
	}
	public assign_stmt(): Assign_stmtContext | undefined {
		return this.tryGetRuleContext(0, Assign_stmtContext);
	}
	public subgraph(): SubgraphContext | undefined {
		return this.tryGetRuleContext(0, SubgraphContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_stmt; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterStmt) {
			listener.enterStmt(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitStmt) {
			listener.exitStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitStmt) {
			return visitor.visitStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_stmtContext extends ParserRuleContext {
	public attr_list(): Attr_listContext {
		return this.getRuleContext(0, Attr_listContext);
	}
	public GRAPH(): TerminalNode | undefined { return this.tryGetToken(DotParser.GRAPH, 0); }
	public NODE(): TerminalNode | undefined { return this.tryGetToken(DotParser.NODE, 0); }
	public EDGE(): TerminalNode | undefined { return this.tryGetToken(DotParser.EDGE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_attr_stmt; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterAttr_stmt) {
			listener.enterAttr_stmt(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitAttr_stmt) {
			listener.exitAttr_stmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitAttr_stmt) {
			return visitor.visitAttr_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_listContext extends ParserRuleContext {
	public a_list(): A_listContext[];
	public a_list(i: number): A_listContext;
	public a_list(i?: number): A_listContext | A_listContext[] {
		if (i === undefined) {
			return this.getRuleContexts(A_listContext);
		} else {
			return this.getRuleContext(i, A_listContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_attr_list; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterAttr_list) {
			listener.enterAttr_list(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitAttr_list) {
			listener.exitAttr_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitAttr_list) {
			return visitor.visitAttr_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_listContext extends ParserRuleContext {
	public _lp!: Token;
	public _separator!: Token;
	public _rp!: Token;
	public assign_stmt(): Assign_stmtContext[];
	public assign_stmt(i: number): Assign_stmtContext;
	public assign_stmt(i?: number): Assign_stmtContext | Assign_stmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Assign_stmtContext);
		} else {
			return this.getRuleContext(i, Assign_stmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_a_list; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterA_list) {
			listener.enterA_list(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitA_list) {
			listener.exitA_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitA_list) {
			return visitor.visitA_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_stmtContext extends ParserRuleContext {
	public _equ!: Token;
	public lexpr(): LexprContext {
		return this.getRuleContext(0, LexprContext);
	}
	public rexpr(): RexprContext {
		return this.getRuleContext(0, RexprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_assign_stmt; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterAssign_stmt) {
			listener.enterAssign_stmt(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitAssign_stmt) {
			listener.exitAssign_stmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitAssign_stmt) {
			return visitor.visitAssign_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Edge_stmtContext extends ParserRuleContext {
	public edgeRHS(): EdgeRHSContext {
		return this.getRuleContext(0, EdgeRHSContext);
	}
	public node_id(): Node_idContext | undefined {
		return this.tryGetRuleContext(0, Node_idContext);
	}
	public subgraph(): SubgraphContext | undefined {
		return this.tryGetRuleContext(0, SubgraphContext);
	}
	public attr_list(): Attr_listContext | undefined {
		return this.tryGetRuleContext(0, Attr_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_edge_stmt; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterEdge_stmt) {
			listener.enterEdge_stmt(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitEdge_stmt) {
			listener.exitEdge_stmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitEdge_stmt) {
			return visitor.visitEdge_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EdgeRHSContext extends ParserRuleContext {
	public edgeop(): EdgeopContext[];
	public edgeop(i: number): EdgeopContext;
	public edgeop(i?: number): EdgeopContext | EdgeopContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EdgeopContext);
		} else {
			return this.getRuleContext(i, EdgeopContext);
		}
	}
	public node_id(): Node_idContext[];
	public node_id(i: number): Node_idContext;
	public node_id(i?: number): Node_idContext | Node_idContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Node_idContext);
		} else {
			return this.getRuleContext(i, Node_idContext);
		}
	}
	public subgraph(): SubgraphContext[];
	public subgraph(i: number): SubgraphContext;
	public subgraph(i?: number): SubgraphContext | SubgraphContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SubgraphContext);
		} else {
			return this.getRuleContext(i, SubgraphContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_edgeRHS; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterEdgeRHS) {
			listener.enterEdgeRHS(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitEdgeRHS) {
			listener.exitEdgeRHS(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitEdgeRHS) {
			return visitor.visitEdgeRHS(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EdgeopContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_edgeop; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterEdgeop) {
			listener.enterEdgeop(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitEdgeop) {
			listener.exitEdgeop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitEdgeop) {
			return visitor.visitEdgeop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Node_stmtContext extends ParserRuleContext {
	public node_id(): Node_idContext {
		return this.getRuleContext(0, Node_idContext);
	}
	public attr_list(): Attr_listContext | undefined {
		return this.tryGetRuleContext(0, Attr_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_node_stmt; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterNode_stmt) {
			listener.enterNode_stmt(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitNode_stmt) {
			listener.exitNode_stmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitNode_stmt) {
			return visitor.visitNode_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Node_idContext extends ParserRuleContext {
	public _colon!: Token;
	public id(): IdContext[];
	public id(i: number): IdContext;
	public id(i?: number): IdContext | IdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdContext);
		} else {
			return this.getRuleContext(i, IdContext);
		}
	}
	public compass_pt(): Compass_ptContext | undefined {
		return this.tryGetRuleContext(0, Compass_ptContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_node_id; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterNode_id) {
			listener.enterNode_id(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitNode_id) {
			listener.exitNode_id(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitNode_id) {
			return visitor.visitNode_id(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Compass_ptContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(DotParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(DotParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_compass_pt; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterCompass_pt) {
			listener.enterCompass_pt(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitCompass_pt) {
			listener.exitCompass_pt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitCompass_pt) {
			return visitor.visitCompass_pt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubgraphContext extends ParserRuleContext {
	public _lp!: Token;
	public _rp!: Token;
	public stmt_list(): Stmt_listContext {
		return this.getRuleContext(0, Stmt_listContext);
	}
	public SUBGRAPH(): TerminalNode | undefined { return this.tryGetToken(DotParser.SUBGRAPH, 0); }
	public id(): IdContext | undefined {
		return this.tryGetRuleContext(0, IdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_subgraph; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterSubgraph) {
			listener.enterSubgraph(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitSubgraph) {
			listener.exitSubgraph(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitSubgraph) {
			return visitor.visitSubgraph(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(DotParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(DotParser.STRING, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(DotParser.NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_id; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterId) {
			listener.enterId(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitId) {
			listener.exitId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitId) {
			return visitor.visitId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexprContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(DotParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(DotParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_lexpr; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterLexpr) {
			listener.enterLexpr(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitLexpr) {
			listener.exitLexpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitLexpr) {
			return visitor.visitLexpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RexprContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(DotParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(DotParser.STRING, 0); }
	public HTML_STRING(): TerminalNode | undefined { return this.tryGetToken(DotParser.HTML_STRING, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(DotParser.NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DotParser.RULE_rexpr; }
	// @Override
	public enterRule(listener: DotListener): void {
		if (listener.enterRexpr) {
			listener.enterRexpr(this);
		}
	}
	// @Override
	public exitRule(listener: DotListener): void {
		if (listener.exitRexpr) {
			listener.exitRexpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DotVisitor<Result>): Result {
		if (visitor.visitRexpr) {
			return visitor.visitRexpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


