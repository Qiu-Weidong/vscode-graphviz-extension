/*
 copy from https://github.com/antlr/grammars-v4.git
 */

grammar Dot;

graph_list: graph+ EOF;

graph: STRICT? ( GRAPH | DIGRAPH) id_? '{' stmt_list '}';

stmt_list: ( stmt ';'?)*;

stmt:
	node_stmt
	| edge_stmt
	| attr_stmt
	| id_ '=' id_
	| subgraph;

attr_stmt: ( GRAPH | NODE | EDGE) attr_list;

attr_list: ( '[' a_list? ']')+;

a_list: ( id_ ( '=' id_)? ','?)+;

edge_stmt: ( node_id | subgraph) edgeRHS attr_list?;

edgeRHS: ( edgeop ( node_id | subgraph))+;

edgeop: '->' | '--';

node_stmt: node_id attr_list?;

node_id: id_ port?;

port: ':' id_ ( ':' id_)?;

subgraph: ( SUBGRAPH id_?)? '{' stmt_list '}';

id_: ID | STRING | HTML_STRING | NUMBER;

// "The keywords node, edge, graph, digraph, subgraph, and strict are case-independent"

STRICT: [Ss] [Tt] [Rr] [Ii] [Cc] [Tt];

GRAPH: [Gg] [Rr] [Aa] [Pp] [Hh];

DIGRAPH: [Dd] [Ii] [Gg] [Rr] [Aa] [Pp] [Hh];

NODE: [Nn] [Oo] [Dd] [Ee];

EDGE: [Ee] [Dd] [Gg] [Ee];

SUBGRAPH: [Ss] [Uu] [Bb] [Gg] [Rr] [Aa] [Pp] [Hh];

/** "a numeral [-]?(.[0-9]+ | [0-9]+(.[0-9]*)? )" */ NUMBER:
	'-'? ('.' DIGIT+ | DIGIT+ ( '.' DIGIT*)?);

fragment DIGIT: [0-9];

/** "any double-quoted string ("...") possibly containing escaped quotes" */ STRING:
	'"' ('\\"' | .)*? '"';

/** "Any string of alphabetic ([a-zA-Z\200-\377]) characters, underscores
 ('_') or digits ([0-9]),
 not beginning with a digit"
 */
ID: LETTER ( LETTER | DIGIT)*;

fragment LETTER: [a-zA-Z\u0080-\u00FF_];

/** "HTML strings, angle brackets must occur in matched pairs, and
 unescaped newlines are
 allowed."
 */
HTML_STRING: '<' ( TAG | ~ [<>])* '>';

fragment TAG: '<' .*? '>';

COMMENT: '/*' .*? '*/' -> channel(HIDDEN);

LINE_COMMENT: '//' .*? '\r'? '\n' -> channel(HIDDEN);

/** "a '#' character is considered a line output from a C preprocessor (e.g.,
 # 34 to indicate
 line
 34 ) and discarded"
 */
PREPROC: '#' ~[\r\n]* -> channel(HIDDEN);

WS: [ \t\n\r]+ -> skip;