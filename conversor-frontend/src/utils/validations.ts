export function validateCNPJ(value: string) {
  if (!value) return false

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const isString = typeof value === 'string'
  const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

  // Elimina valor em formato inválido
  if (!validTypes) return false

  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Limita ao máximo de 18 caracteres, para CNPJ formatado
    if (value.length > 18) return false

    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(value)
    // Teste Regex para verificar se é uma string formatada válida
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

    // Se o formato é válido, usa um truque para seguir o fluxo da validação
    if (digitsOnly || validFormat) console.log('')
    // Se não, retorna inválido
    else return false
  }

  // Guarda um array com todos os dígitos do valor
  // @ts-ignore
  const match = value.toString().match(/\d/g)
  const numbers = Array.isArray(match) ? match.map(Number) : []

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false
  
  // Elimina inválidos com todos os dígitos iguais
  // @ts-ignore
  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  // Cálculo validador
  const calc = (x: any) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12)
  
  // Valida 1o. dígito verificador
  const digit0 = calc(12)
  if (digit0 !== digits[0]) return false

  // Valida 2o. dígito verificador
  const digit1 = calc(13)
  return digit1 === digits[1]
}

export function validateCPF(cpf: string | undefined){
    if(!cpf) return false
    
    if((cpf = cpf.replace(/[^\d]/g,"")).length !== 11)
      return false
  
    if (cpf === "00000000000" || cpf === "99999999999" )
      return false;

      

    var i;
    var r;
    var s = 0;
  
    for (i=1; i<=9; i++)
      s = s + parseInt(cpf[i-1]) * (11 - i);
  
    r = (s * 10) % 11;
  
    if ((r === 10) || (r === 11))
      r = 0;
  
    if (r !== parseInt(cpf[9]))
      return false;
  
    s = 0;
  
    for (i = 1; i <= 10; i++)
      s = s + parseInt(cpf[i-1]) * (12 - i);
  
    r = (s * 10) % 11;
  
    if ((r === 10) || (r === 11))
      r = 0;
  
    if (r !== parseInt(cpf[10]))
      return false;
  
    return true;

}

export function validateFieldCpfCnj(value: string | undefined){
  if(value && value.length > 0){
    if(value.length > 14){
        return validateCNPJ(value)
    } else{
        return validateCPF(value)
    }
  } else{
      return false
  }
}