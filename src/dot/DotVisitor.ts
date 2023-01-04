// Generated from src/dot/Dot.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `DotParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface DotVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `DotParser.graph_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGraph_list?: (ctx: Graph_listContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.graph`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGraph?: (ctx: GraphContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.stmt_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt_list?: (ctx: Stmt_listContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.attr_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_stmt?: (ctx: Attr_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.attr_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_list?: (ctx: Attr_listContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.a_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_list?: (ctx: A_listContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.edge_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_stmt?: (ctx: Edge_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.edgeRHS`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdgeRHS?: (ctx: EdgeRHSContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.edgeop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdgeop?: (ctx: EdgeopContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.node_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNode_stmt?: (ctx: Node_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.node_id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNode_id?: (ctx: Node_idContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.port`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort?: (ctx: PortContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.subgraph`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubgraph?: (ctx: SubgraphContext) => Result;

	/**
	 * Visit a parse tree produced by `DotParser.id_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId_?: (ctx: Id_Context) => Result;
}

