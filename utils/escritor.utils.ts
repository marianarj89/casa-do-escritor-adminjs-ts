import bcrypt from 'bcrypt';

const encryptPassword = async (request:any) => {
  if(request.payload.password) {
    request.payload = {
      ...request.payload,
      password: await bcrypt.hash(request.payload.password, 10)
    }
  }
  return request;
  
};

export { encryptPassword };

// import { BaseRecord } from 'adminjs';
// import { Escritor } from '../models/escritor.entity';
// import { request } from 'express';


// const calcularValorVendidoAction = {
//   actionType: 'record',
//   icon: 'Add',
//   label: 'Valor Vendido',
//   isVisible: (record: BaseRecord) => record?.params?.canCalculateValorVendido, 
//   handler: async (request:any, response: any, data: any) => {
//     console.log('Calcular Valor Vendido clicado');
//     const escritorId = data.record.params.id;
//     const escritor = await Escritor.findByPk(escritorId);
//     if (escritor) {
//       await escritor.calcularValorVendido();
//       await escritor.reload();
//     }
//     return { record: data.record.toJSON(data.currentAdmin) };
//   },
// };

// export default calcularValorVendidoAction;
// export { calcularValorVendidoAction };

