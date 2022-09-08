class CalculatorController {
  summary(req, res) {
    const { a, b } = req.query;
    res.send(`${a} + ${b} = ${+a + +b}`);
  }

  minus(req, res) {
    const { a, b } = req.query;
    res.send(`${a} - ${b} = ${+a - +b}`);
  }

  multiply(req, res) {
    const { a, b } = req.query;
    res.send(`${a} * ${b} = ${a * b}`);
  }

  divide(req, res) {
    const { a, b } = req.query;
    res.send(`${a} / ${b} = ${a / b}`);
  }

  splitTheBalance(req, res) {
    const { a, b } = req.query;
    res.send(`${a} % ${b} = ${a % b}`);
  }

  square(req, res) {
    const { a } = req.query;
    res.send(`${a} * ${a} = ${a * a}`);
  }

  factorial(req, res) {
    const { a } = req.query;
    if (+a === 0) {
      res.send(`${a}! = 1`);
      return;
    }
    let flag = 1;
    for (let i = 1; i <= +a; i++) {
      flag *= i;
    }
    res.send(`${a}! = ${flag}`);
  }

  exponential(req, res) {
    const { a, b } = req.query;

    res.send(`${a}^${b} = ${a ** b}`);
  }

  greatestCommonDivisor(req, res) {
    const { a, b } = req.query;
    let flag = 1;
    for (let i = 1; i <= Math.min(+a, +b); i++) {
      if (+a % i === 0 && +b % i === 0) {
        flag = i;
      }
    }
    res.send(`GCD of ${a} and ${b} = ${flag}`);
  }

  lowestCommonMultiple(req, res) {
    const { a, b } = req.query;
    let flag = a * b;
    for (let i = Math.max(+a, +b); i <= flag; i++) {
      if (i % a === 0 && i % b === 0) {
        flag = i;
      }
    }
    res.send(`LCM of ${a} and ${b} = ${flag}`);
  }

  isPrimeNumber(req, res) {
    const { a } = req.query;
    if (+a <= 1) {
      res.send("false");
      return;
    }
    let flag = true;
    for (let i = 2; i < +a; i++) {
      if (a % i === 0) flag = false;
    }
    res.send(`${flag}`);
  }

  isPerfectNumber(req, res) {
    const { a } = req.query;
    if (+a < 1) {
      res.send("false");
      return;
    }
    let flag = 0;
    for (let i = 1; i < +a; i++) {
      if (a % i === 0) {
        flag += i;
      }
    }
    if (flag === +a) {
      res.send("true");
    } else {
      res.send("false");
    }
  }

  permutation(req, res) {
    const { a, b } = req.query;

    res.json({ a: b, b: a });
  }
}

module.exports = new CalculatorController();
