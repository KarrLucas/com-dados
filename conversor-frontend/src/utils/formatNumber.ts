import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}

export const money = (valor: any) => { // formata o valor para o formato 'R$ 00,00' para exibição
  var valor_formatado = "R$ "+parseFloat(valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
  return valor_formatado;
}

export const desMoney = (valor: any) => { // recebe um valor (string) no formato 'R$ 00,00' e converte para o formato 0.0 como float, para fazer calculos, cadastrar no banco, etc
  var valor_formatado = parseFloat(valor.replace(/[\D]+/g,''))/100
  return valor_formatado;
}

export const maskMoney = (campo: string) => {
  if (campo) {
      campo = campo.toString();
      if (campo.indexOf("R$") === -1) { // caso não exista 'R$' na string, significa que é o primeiro valor, que vem do banco cru
          campo = "R$ " + parseFloat(campo).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
      } else {
          var temp = parseInt(campo.replace(/[\D]+/g, '')); // converte para inteiro e retira todos os caracteres nao numéricos
          var tmp: any = temp + '';
          if (tmp.length <= 2) {
              if (tmp.length === 1) {
                  campo = "R$ 0,0" + tmp;
              } else {
                  campo = "R$ 0," + tmp;
              }
          } else {
              tmp = tmp.replace(/([0-9]{2})$/g, ",$1"); // coloca os digitos de centavos
              tmp = tmp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // separa os milhares colocando ponto

              if (tmp === 'NaN' || temp === undefined) {
                  tmp = 0;
              }

              if (tmp === 0) {
                  campo = "R $0,00";
              } else {
                  campo = "R$ " + tmp;
              }
          }
      }
  } else {
      campo = "R$0,00";
  }

  return campo
}