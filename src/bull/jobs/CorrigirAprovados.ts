import moment = require('moment');
import { knexPostgre } from '../../config/knex/';

export default {
  key: 'CorrigirAprovados',
  options:{
    delay: 5555,
    attempts: 3,
    deleteOnComplete: false,
    //priority: "high"
  },
  async handle({data}: any) {
    var { id_item_produtos, objItens } = data;
    console.log("Chegou no CorrigirAprovados ", id_item_produtos, objItens)
    objItens.updated_at = moment().format('YYYY-MM-DD HH:mm:ss.ms');
    if (id_item_produtos && objItens) {
      return await knexPostgre("produtos_unicos_tbl").withSchema('dbo')
        //.whereIn(['id_item', 'descricao_item'], id_item_produtos)
        .whereIn('id_item', id_item_produtos) //culpa do Gabriel 16/11/2021
        .update(objItens)
        .then((rowsAffected : any) => {
            console.log(`Job "CorrigirAprovados" - ${rowsAffected} itens corrigidos` );
            return rowsAffected;
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        });
    }else{
      return {rowsAffected: 0, message: "AprovarItens: Não há itens para atualizar."}
    }
  }

};
