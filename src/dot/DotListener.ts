// Generated from src/dot/Dot.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { Graph_listContext } from "./DotParser";
import { GraphContext } from "./DotParser";
import { Stmt_listContext } from "./DotParser";
import { StmtContext } from "./DotParser";
import { Attr_stmtContext } from "./DotParser";
import { Attr_listContext } from "./DotParser";
import { A_listContext } from "./DotParser";
import { Edge_stmtContext } from "./DotParser";
import { EdgeRHSContext } from "./DotParser";
import { EdgeopContext } from "./DotParser";
import { Node_stmtContext } from "./DotParser";
import { Node_idContext } from "./DotParser";
import { PortContext } from "./DotParser";
import { SubgraphContext } from "./DotParser";
import { Id_Context } from "./DotParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `DotParser`.
 */
export interface DotListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `DotParser.graph_list`.
	 * @param ctx the parse tree
	 */
	enterGraph_list?: (ctx: Graph_listContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.graph_list`.
	 * @param ctx the parse tree
	 */
	exitGraph_list?: (ctx: Graph_listContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.graph`.
	 * @param ctx the parse tree
	 */
	enterGraph?: (ctx: GraphContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.graph`.
	 * @param ctx the parse tree
	 */
	exitGraph?: (ctx: GraphContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.stmt_list`.
	 * @param ctx the parse tree
	 */
	enterStmt_list?: (ctx: Stmt_listContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.stmt_list`.
	 * @param ctx the parse tree
	 */
	exitStmt_list?: (ctx: Stmt_listContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterStmt?: (ctx: StmtContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitStmt?: (ctx: StmtContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.attr_stmt`.
	 * @param ctx the parse tree
	 */
	enterAttr_stmt?: (ctx: Attr_stmtContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.attr_stmt`.
	 * @param ctx the parse tree
	 */
	exitAttr_stmt?: (ctx: Attr_stmtContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.attr_list`.
	 * @param ctx the parse tree
	 */
	enterAttr_list?: (ctx: Attr_listContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.attr_list`.
	 * @param ctx the parse tree
	 */
	exitAttr_list?: (ctx: Attr_listContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.a_list`.
	 * @param ctx the parse tree
	 */
	enterA_list?: (ctx: A_listContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.a_list`.
	 * @param ctx the parse tree
	 */
	exitA_list?: (ctx: A_listContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.edge_stmt`.
	 * @param ctx the parse tree
	 */
	enterEdge_stmt?: (ctx: Edge_stmtContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.edge_stmt`.
	 * @param ctx the parse tree
	 */
	exitEdge_stmt?: (ctx: Edge_stmtContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.edgeRHS`.
	 * @param ctx the parse tree
	 */
	enterEdgeRHS?: (ctx: EdgeRHSContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.edgeRHS`.
	 * @param ctx the parse tree
	 */
	exitEdgeRHS?: (ctx: EdgeRHSContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.edgeop`.
	 * @param ctx the parse tree
	 */
	enterEdgeop?: (ctx: EdgeopContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.edgeop`.
	 * @param ctx the parse tree
	 */
	exitEdgeop?: (ctx: EdgeopContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.node_stmt`.
	 * @param ctx the parse tree
	 */
	enterNode_stmt?: (ctx: Node_stmtContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.node_stmt`.
	 * @param ctx the parse tree
	 */
	exitNode_stmt?: (ctx: Node_stmtContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.node_id`.
	 * @param ctx the parse tree
	 */
	enterNode_id?: (ctx: Node_idContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.node_id`.
	 * @param ctx the parse tree
	 */
	exitNode_id?: (ctx: Node_idContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.port`.
	 * @param ctx the parse tree
	 */
	enterPort?: (ctx: PortContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.port`.
	 * @param ctx the parse tree
	 */
	exitPort?: (ctx: PortContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.subgraph`.
	 * @param ctx the parse tree
	 */
	enterSubgraph?: (ctx: SubgraphContext) => void;
	/**
	 * Exit a parse tree produced by `DotParser.subgraph`.
	 * @param ctx the parse tree
	 */
	exitSubgraph?: (ctx: SubgraphContext) => void;

	/**
	 * Enter a parse tree produced by `DotParser.id_`.
	 * @param ctx the parse tree
	 */
	enterId_?: (ctx: Id_Context) => void;
	/**
	 * Exit a parse tree produced by `DotParser.id_`.
	 * @param ctx the parse tree
	 */
	exitId_?: (ctx: Id_Context) => void;
}

