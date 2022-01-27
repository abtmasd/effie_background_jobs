import moment from 'moment';
import { knexPostgre } from '../../config/knex';

//OK! 26/10/2021
export default {
  key: "AprovarItens",
  options:{
    delay: 4000,
    attempts: 4,
    deleteOnComplete: false,
    //priority: "high"
  },
  async handle({data}: any) {
    
    var { id_item_produtos, objItens } = data;
    if (id_item_produtos && objItens) {
      try {
        objItens.updated_at = moment().format("YYYY-MM-DD HH:mm:ss.ms");
        if (data) {
          return await knexPostgre("produtos_unicos_tbl")
            .withSchema("dbo")
            .whereIn("id_item", id_item_produtos)
            .update(objItens)
            .then(async function (rowsAffected: any) {
              console.log(`Job "AprovarItens" - ${rowsAffected} itens aprovados`);
              return rowsAffected;
            })
            .catch((error: Error) => {
              throw new Error(error.message)
            });
        }
      } catch (error: any) {
        throw new Error(error.message)
      }
    } else {
      return {rowsAffected: 0, message: "AprovarItens: Não há itens para atualizar."}
    }
  },
};
