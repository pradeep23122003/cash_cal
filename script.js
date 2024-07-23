document.addEventListener("DOMContentLoaded", () => {
  const et2000 = document.getElementById("et2000");
  const et500 = document.getElementById("et500");
  const et200 = document.getElementById("et200");
  const et100 = document.getElementById("et100");
  const et50 = document.getElementById("et50");
  const et20 = document.getElementById("et20");
  const et10 = document.getElementById("et10");
  const cashInputs = [et2000, et500, et200, et100, et50, et20, et10];
  const cashTexts = [
    document.getElementById("txt2000"),
    document.getElementById("txt500"),
    document.getElementById("txt200"),
    document.getElementById("txt100"),
    document.getElementById("txt50"),
    document.getElementById("txt20"),
    document.getElementById("txt10"),
  ];

  const txtFinalCash = document.getElementById("txtFinalCash");
  const txtFinalCashInWords = document.getElementById("txtFinalCashInWords");
  const btnReset = document.getElementById("btnReset");

  cashInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      cashCalculate(index);
    });
  });

  btnReset.addEventListener("click", clearData);

  function cashCalculate(index) {
    const denominations = [2000, 500, 200, 100, 50, 20, 10];
    const rowValue = cashInputs[index].value * denominations[index];
    cashTexts[index].textContent = rowValue.toFixed(0);
    totalCash();
  }

  function totalCash() {
    let totalCashValue = 0;
    cashTexts.forEach((text) => {
      totalCashValue += parseInt(text.textContent);
    });
    txtFinalCash.textContent = "Total Cash: " + totalCashValue;
    txtFinalCashInWords.textContent = `Total Cash In Words: ${convertToWords(
      totalCashValue
    )}`;
  }

  function clearData() {
    cashInputs.forEach((input) => {
      input.value = "";
    });
    cashTexts.forEach((text) => {
      text.textContent = "0";
    });
    totalCash();
  }

  function convertToWords(number) {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (number === 0) {
      return "Zero";
    }

    let words = "";

    if (Math.floor(number / 10000000) > 0) {
      words += convertToWords(Math.floor(number / 10000000)) + " Crore ";
      number %= 10000000;
    }

    if (Math.floor(number / 100000) > 0) {
      words += convertToWords(Math.floor(number / 100000)) + " Lakh ";
      number %= 100000;
    }

    if (Math.floor(number / 1000) > 0) {
      words += convertToWords(Math.floor(number / 1000)) + " Thousand ";
      number %= 1000;
    }

    if (Math.floor(number / 100) > 0) {
      words += convertToWords(Math.floor(number / 100)) + " Hundred ";
      number %= 100;
    }

    if (number > 0) {
      if (number < 10) {
        words += units[number];
      } else if (number < 20) {
        words += teens[number - 10];
      } else {
        words += tens[Math.floor(number / 10)];
        if (number % 10 > 0) {
          words += " " + units[number % 10];
        }
      }
    }

    return words.trim();
  }
});
