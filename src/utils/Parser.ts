import { TokenT } from "./LexicalAnalyzer";

export class Parser {
    private lexemes: TokenT[];
    private current: number;

    constructor(lexemes: TokenT[]) {
        this.lexemes = lexemes;
        this.current = 0;
    }

    private getCurrentLexeme(): TokenT {
        return this.lexemes[this.current];
    }

    private advance(): TokenT {
        return this.lexemes[this.current++];
    }

    private match(expected: string): boolean {
        if (
            this.current < this.lexemes.length &&
            this.getCurrentLexeme().classType === expected
        ) {
            return true;
        }
        return false;
    }

    // private matchWord(expectedWord: string): boolean {
    //     if (
    //         this.current < this.lexemes.length &&
    //         this.getCurrentLexeme().word === expectedWord
    //     ) {
    //         return true;
    //     }
    //     return false;
    // }

    private consume(expected: string): TokenT {
        if (this.match(expected)) {
            return this.advance();
        }
        throw new Error(
            `Expected ${expected} but found ${
                this.getCurrentLexeme().classType
            } at line ${this.getCurrentLexeme().lineNo}`
        );
    }

    public parseStatement(): void {
        if (this.match("DECLERATOR")) {
            // Checking for Assignment
            this.parseAssignment();
        } else if (this.match("when")) {
            // Checking for Conditional Statements
            this.parseConditionalStatement();
        } else if (this.match("LOOP_KEYWORDS")) {
            // Checking for Loop Statements
            // this.parseLoopStatement();
        } else if (this.match("LOGICAL_EXPRESSION")) {
            // Assuming you have a way to identify logical expressions
            // this.parseLogicalExpression();
        } else {
            throw new Error(
                `Unexpected token ${
                    this.getCurrentLexeme().classType
                } at line ${this.getCurrentLexeme().lineNo}`
            );
        }
        this.consume("STATEMENT_TERMINATOR")
        this.consume("LINE_BREAKER")
    }

    // Add methods for parsing each non-terminal in your CFG
    public parseAssignment(): void {
        this.consume("DECLERATOR");
        this.consume("IDENTIFIER");
        this.consume("ASSIGNMENT_OPERATORS");
        this.parseValue();
        // You can store or process the parsed assignment here
    }

    public parseValue(): void {
        if (
            this.match("INTEGER_CONSTANT") ||
            this.match("FLOAT_CONSTANT") ||
            this.match("BOOLEAN_CONSTANT") ||
            this.match("DOUBLE_CONSTANT") ||
            this.match("STRING_CONSTANT") ||
            this.match("IDENTIFIER")
        ) {
            this.advance(); // Consume the value
        } else {
            throw new Error(
                `Expected a value but found ${
                    this.getCurrentLexeme().classType
                } at line ${this.getCurrentLexeme().lineNo}`
            );
        }
    }

    public parseExpression(): void {
        this.parseValue(); // Parse the first value
        this.consume("OPERATOR"); // Parse the operator
        this.parseValue(); // Parse the second value
    }

    public parseRelationalExpression(): void {
        this.parseValue(); // Parse the left-hand value
        this.consume("RELATIONAL_OPERATOR"); // Parse the relational operator
        this.parseValue(); // Parse the right-hand value
    }

    public parseConditionalStatement(): void {
        this.consume("when"); // Consume 'when'
        this.consume("("); // Consume '('
        this.parseRelationalExpression(); // Parse the condition
        this.consume(")"); // Consume ')'
        this.consume("{"); // Consume '{'
        this.parseStatement(); // Parse the statement
        this.consume("}"); // Consume '}'

        // Check for else clauses
        if (this.match("else")) {
            this.advance(); // Consume 'else'
            this.consume("{"); // Consume '{'
            this.parseStatement(); // Parse the else statement
            this.consume("}"); // Consume '}'
        }
    }
    public parse(): void {
        try {
            while (this.current < this.lexemes.length) {
                this.parseStatement();
                console.log(this.current, this.lexemes.length);

                // Add other constructs as needed
            }
        } catch (error) {
            console.log("err", error);
        }
    }

    // Add more methods for parsing arithmetic, relational, logical, conditional, and loop statements
}
