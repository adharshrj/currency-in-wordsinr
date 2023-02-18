function convert_number(number) {
  if (number < 0 || number > 999999999) {
    return "NUMBER OUT OF RANGE!";
  }
  let Gn = Math.floor(number / 10000000);
  number -= Gn * 10000000;
  let kn = Math.floor(number / 100000);
  number -= kn * 100000;
  let Hn = Math.floor(number / 1000);
  number -= Hn * 1000;
  let Dn = Math.floor(number / 100);
  number = number % 100;
  let tn = Math.floor(number / 10);
  let one = Math.floor(number % 10);
  let res = "";

  if (Gn > 0) {
    res += convert_number(Gn) + " CRORE";
  }
  if (kn > 0) {
    res += (res == "" ? "" : " ") + convert_number(kn) + " LAKH";
  }
  if (Hn > 0) {
    res += (res == "" ? "" : " ") + convert_number(Hn) + " THOUSAND";
  }

  if (Dn) {
    res += (res == "" ? "" : " ") + convert_number(Dn) + " HUNDRED";
  }

  let ones = Array(
    "",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN"
  );
  let tens = Array(
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FOURTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY"
  );

  if (tn > 0 || one > 0) {
    if (!(res == "")) {
      res += " AND ";
    }
    if (tn < 2) {
      res += ones[tn * 10 + one];
    } else {
      res += tens[tn];
      if (one > 0) {
        res += "-" + ones[one];
      }
    }
  }

  if (res == "") {
    res = "zero";
  }
  return res;
}

exports.currency_in_wordsinr = function (value) {
  let fraction = Math.round((value % 1) * 100);
  let fraction_text = "";

  let splitNum = value.toString().split(".");

  if (splitNum[1].length > 2) {
    let decimal = splitNum[1];
    decimal = decimal.split("");
    decimal[1] =
      Number(decimal[2]) > 5 ? `${Number(decimal[1]) + 1}` : Number(decimal[1]);

    decimal = decimal.join("");
    decimal = decimal.substring(0, 2);
    splitNum[1] = decimal;
  }

  splitNum = splitNum.join(".");
  let currency_in_words = convert_number(value) + " RUPEES";

  if (fraction > 0) {
    fraction_text = " AND " + convert_number(fraction) + " PAISE";
    currency_in_words += fraction_text;
  }

  currency_in_words += " ONLY";

  return [currency_in_words, splitNum];
};
