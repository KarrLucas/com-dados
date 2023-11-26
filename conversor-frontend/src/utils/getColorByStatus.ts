export type tableStatus = 'active' | 'inactive' 

const tableStatusObject = {
  'inactive' : {
    color: 'error',
    translate:"Inativo"
  },
  'active':{
    color:'success',
    translate:"Ativo"
  },
  'seller' : {
    color: 'info',
    translate:"Vendedor"
  },
  'client':{
    color:'default',
    translate:"Cliente"
  },
}

export function tableStatusColor(status: tableStatus){
  return tableStatusObject[status] ? tableStatusObject[status] : {
    color: 'default',
    translate: "-"
  }
}