async function price_in_words(price) {
  let sglDigit = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ],
    dblDigit = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ],
    tensPlace = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ],
    handle_tens = function (dgt, prevDgt) {
      return 0 === dgt
        ? ''
        : ' ' + (1 === dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (
        (0 !== dgt && 1 !== nxtDgt ? ' ' + sglDigit[dgt] : '') +
        (0 !== nxtDgt || dgt > 0 ? ' ' + denom : '')
      );
    };

  let str = '',
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (((price += ''), isNaN(parseInt(price)))) str = '';
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
      switch (
        ((digit = price[digitIdx] - 0),
        (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
        price.length - digitIdx - 1)
      ) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ''));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(
            0 !== digit
              ? ' ' +
                  sglDigit[digit] +
                  ' Hundred' +
                  (0 !== price[digitIdx + 1] && 0 !== price[digitIdx + 2]
                    ? ' and'
                    : '')
              : ''
          );
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, 'Thousand'));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, 'Lakh'));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, 'Crore'));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(
            0 !== digit
              ? ' ' +
                  sglDigit[digit] +
                  ' Hundred' +
                  (0 !== price[digitIdx + 1] || 0 !== price[digitIdx + 2]
                    ? ' and'
                    : ' Crore')
              : ''
          );
      }
    str = words.reverse().join('');
  } else str = '';
  console.log(str)
  return str;
}

exports.price_in_rupees = async function(total) {
  let splittedNum = total.toString().split('.');
  let nonDecimal = splittedNum[0];
  let decimal = splittedNum[1] ? splittedNum[1] : 0;
  if (decimal[0] === '0') {
    if (Number(decimal[1]) > 0) {
      decimal = '1';
    }
  }
  if (decimal.length > 2){
      decimal = decimal.split('')
      decimal[2] = `${Number(decimal[2]) + 1}` ? Number(decimal[2]) > 5 : Number(decimal[2])
      decimal = decimal.join('')
      decimal = decimal.substring(0,2)
  }
  let value =
    price_in_words(Number(nonDecimal)) +
    'Rupees and' +
    price_in_words(Number(decimal)) +
    'Paise';

  let num = nonDecimal + '.' + decimal;
  return [value, num];
}

