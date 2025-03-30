const { Console } = require("console");
const express = require("express");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

const add = (n1, n2) => {
    return n1+n2;
}
const sub = (n1, n2) => {
    return n1-n2;
};
const mul = (n1, n2) => {
    return n1*n2;
};
const div = (n1, n2) => {
    if (n2 === 0) {
        throw new Error("Cannot divide it by zero");
    }
    return n1 / n2;
}

const expo = (n1, n2) => {
    let result = 1;
    for (let i = 0; i < Math.abs(n2); i++) {
        result = result* n1;
    }
    return n2 < 0 ? 1 / result : result; 
};

const root = (n1) => {
    if (n1 < 0) throw new Error("Cannot find square root of a negative number");
    let control = n1;
    let guess = 1;
    while (Math.abs(guess - control) > 0.001) {
        console.log("Control is: " + control);
        console.log("Guess is: " + guess);
        control = n1 / guess;
        guess = (control + guess) / 2;
    }
    return guess;
    
};

const mod = (n1, n2) => {
    return n1 % n2;
}

const calculate = (req, res, operation) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = req.query.n2 !== undefined ? parseFloat(req.query.n2) : null;

        if (isNaN(n1)) throw new Error("n1 not defined correctly");
        if (operation !== "root" && (n2 === null || isNaN(n2))) throw new Error("n2 not defined correctly");

        let result;
        switch (operation) {
            case "add": result = add(n1, n2); break;
            case "sub": result = sub(n1, n2); break;
            case "mul": result = mul(n1, n2); break;
            case "div": result = div(n1, n2); break;
            case "expo": result = expo(n1, n2); break;
            case "root": result = root(n1); break;
            case "mod": result = mod(n1, n2); break;
            default: throw new Error("Invalid operation");
        }
        logger.log({
            level: 'info',
            message: `New ${operation} operation requested: ${n1} ${operation} ${n2 !== null ? n2 : ''}`,
        });

        res.status(200).json({ statuscode: 200, result });
    } catch (error) {
        logger.log({
            level: 'error',
            message: `Error during ${operation} operation: ${error.message}`,
        });
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
};

app.get("/add", (req, res) => calculate(req, res, "add"));
app.get("/sub", (req, res) => calculate(req, res, "sub"));
app.get("/mul", (req, res) => calculate(req, res, "mul"));
app.get("/div", (req, res) => calculate(req, res, "div"));
app.get("/expo", (req, res) => calculate(req, res, "expo"));
app.get("/root", (req, res) => calculate(req, res, "root"));
app.get("/mod", (req, res) => calculate(req, res, "mod"));

const port = 3040;
app.listen(port, () => console.log("Listening on port " + port));