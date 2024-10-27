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
            this.consume("STATEMENT_TERMINATOR");
        } else if (this.match("CONDITIONAL_KEYWORD")) {
            // Checking for Conditional Statements
            this.parseConditionalStatement();
        } else if (this.match("LOOP_KEYWORDS")) {
            // Checking for Loop Statements
            this.parseLoopStatement();
        } else if (this.match("LOGICAL_EXPRESSION")) {
            // Assuming you have a way to identify logical expressions
            this.parseLogicalExpression();
        }else if (this.match("LINE_BREAKER")) {
            this.advance();
        } else {
            throw new Error(
                `Unexpected token ${
                    this.getCurrentLexeme().classType
                } at line ${this.getCurrentLexeme().lineNo}`
            );
        }
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
        this.consume("COMPARISON_OPERATORS"); // Parse the relational operator
        this.parseValue(); // Parse the right-hand value
    }

    public parseConditionalStatement(): void {
        this.consume("CONDITIONAL_KEYWORD"); // Consume 'when'
        this.consume("PARENTHESES_OPEN"); // Consume '('
        this.parseRelationalExpression(); // Parse the condition
        this.consume("PARENTHESES_CLOSE"); // Consume ')'
        this.consume("BRACE_OPEN"); // Consume '{'
        // Parse the body of the loop. Assuming it consists of one or more statements.
        while (!this.match('BRACE_CLOSE')) {
            this.parseStatement(); // Parse each statement inside the loop
        }
        this.consume("BRACE_CLOSE"); // Consume '}'

        // Check for else clauses
        if (this.match("else")) {
            this.advance(); // Consume 'else'
            this.consume("{"); // Consume '{'
            this.parseStatement(); // Parse the else statement
            this.consume("}"); // Consume '}'
        }
    }
    public parseLoopStatement(): void {    
        // Check for the loop keyword, either 'asLongAs' or 'iterate'
        if (this.match('LOOP_KEYWORDS')) {
            this.consume('LOOP_KEYWORDS'); // Consume 'asLongAs'
        } else {
            throw new Error(`Expected loop keyword 'asLongAs' or 'iterate' but found ${this.getCurrentLexeme().classType} at line ${this.getCurrentLexeme().lineNo}`);
        }
    
        // Expecting '(' after the loop keyword
        this.consume('PARENTHESES_OPEN');
        
        // Parse the relational expression, which acts as the loop's condition
        this.parseRelationalExpression();
    
        // Expecting ')' after the relational expression
        this.consume('PARENTHESES_CLOSE');
        
        // Expecting '{' to start the loop body
        this.consume('BRACE_OPEN');
        
        // Parse the body of the loop. Assuming it consists of one or more statements.
        while (!this.match('BRACE_CLOSE')) {
            this.parseStatement(); // Parse each statement inside the loop
        }
    
        // Expecting '}' to close the loop body
        this.consume('BRACE_CLOSE');
        
    }

    public parseLogicalExpression(): void {
        console.log("Parsing logical expression...");
    
        // Parse the first value or nested logical expression
        this.parseValue(); 
    
        // Check for the presence of a logical operator (&& or ||)
        while (this.match('&&') || this.match('||')) {
            // Consume the logical operator
            this.consume(this.getCurrentLexeme().classType);
            
            // Parse the next value or logical expression on the right side of the operator
            this.parseValue();
        }
    
        console.log("Logical expression parsed successfully.");
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
