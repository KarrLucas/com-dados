import * as Yup from 'yup';


export function fieldValidate(field: any, translate: Function){

    switch (field.valueType){
        case 'string':
          if(field.isRequired){

            if(field.name === 'cpf' ){
                return {[field.name]: Yup.string().required(translate(field.error)).test(
                    'testeCpf', translate('fields.errors.cpfInvalid'), (cpf) =>{
                        return validateCPF(cpf)
                    }
                )};
            }else if(field.name === 'email'){
              return {[field.name]: Yup.string().min(8,translate('fields.errors.tooShort')).max(40,translate('fields.errors.tooLong')).email(translate('fields.errors.emailInvalid')).required(translate(field.error))};
            }else if(field.name === 'celular'){
              return {[field.name]: Yup.string().min(8,translate('fields.errors.tooShort')).max(15,translate('fields.errors.tooLong')).required(translate(field.error))};
            }else if(field.name === 'senha'){
              return {[field.name]: Yup.string().min(6,translate('fields.errors.tooShort')).max(30,translate('fields.errors.tooLong')).required(translate(field.error))};
            }else{
                return {[field.name]: Yup.string().required(translate(field.error))};
            }

          }else{

            if(field.name === 'cpf' ){
                return {[field.name]: Yup.string().test(
                    'testeCpf', translate('fields.errors.cpfInvalid'), (cpf) =>{
                        if(cpf){
                            return validateCPF(cpf)
                        }
                        return true
                    }
                )};
            }else if(field.name === 'email'){
              return {[field.name]: Yup.string().min(8,translate('fields.errors.tooShort')).max(40,translate('fields.errors.tooLong')).email(translate('fields.errors.emailInvalid'))};
            }else if(field.name === 'celular'){
              return {[field.name]: Yup.string().min(8,translate('fields.errors.tooShort')).max(15,translate('fields.errors.tooLong'))};
            }else if(field.name === 'senha'){
              return {[field.name]: Yup.string().test('teste',translate('fields.errors.tooShort'),(senha) =>{
                if(senha === ''){
                  return true
                }else if(senha && senha.length < 6){
                  return false
                }else{
                  return true
                }
              }).max(30,translate('fields.errors.tooLong'))};
            }else{
                return {[field.name]: Yup.string()};
            }
            
          }
        
        case 'number':
          if(field.isRequired){
            return {[field.name]: Yup.number().required(translate(field.error)).positive("Insira um Número Positivo")};
          }else{
            return {[field.name]: Yup.number()};
          }

        case 'mixed':
          if(field.isRequired){
            return {[field.name]: Yup.mixed().test('required', translate(field.error), (value) => value !== ''),};
          }else{
            return {[field.name]: Yup.mixed()};
          }
        
        case 'array':
          if(field.isRequired){
            return {[field.name]: Yup.array().required(translate(field.error)).min(1, translate(field.error))};
          }else{
            return {[field.name]: Yup.array()};
          }

        default:
          break;

      }
}

function validateCPF(cpf: string | undefined){
if(cpf){

    if((cpf = cpf.replace(/[^\d]/g,"")).length !== 11)
    return false

  if (cpf === "00000000000")
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
return false;
}