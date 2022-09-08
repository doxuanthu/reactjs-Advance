const express = require("express");
const router = express.Router();

const calculatorController = require("../controllers/CalculatorController");

const divideBy0 = (req, res, next) => {
  const { a, b } = req.query;
  if (+b === 0) {
    res.status(400).send("Loi chia 0");
    return;
  }

  next();
};

router.get("/cong", calculatorController.summary);
router.use("/tru", calculatorController.minus);
router.use("/nhan", calculatorController.multiply);
router.use("/chia", divideBy0, calculatorController.divide);
router.use("/chia-du", divideBy0, calculatorController.splitTheBalance);
router.use("/binh-phuong", calculatorController.square);
router.use("/giai-thua", calculatorController.factorial);
router.use("/luy-thua", calculatorController.exponential);
router.use("/uoc-chung-lon-nhat", calculatorController.greatestCommonDivisor);
router.use("/boi-chung-nho-nhat", calculatorController.lowestCommonMultiple);
router.use("/la-so-nguyen-to", calculatorController.isPrimeNumber);
router.use("/la-so-hoan-hao", calculatorController.isPerfectNumber);
router.use("/hoan-vi", calculatorController.permutation);

module.exports = router;
