import moment = require("moment");
import { knexPostgre } from "../../config/knex/";

export default {
  key: "AprovarItensUpdate",
  options:{
    delay: 5555,
    attempts: 3,
    deleteOnComplete: false,
    //priority: "high"
  },
  async handle({data}: any) {
    let getdate = moment().format("YYYY-MM-DD HH:mm:ss.ms");
    var { id_item_produtos, objItens } = data;
    if (id_item_produtos && objItens) {
      try {
        objItens.updated_at = moment().format("YYYY-MM-DD HH:mm:ss.ms");
        return await knexPostgre("produtos_unicos_tbl")
          .withSchema("dbo")
          .whereIn("id_item", id_item_produtos)
          .update(objItens)
          .then((rowsAffected: any) => {
            console.log(`Job "AprovarItensUpdate" - ${rowsAffected} itens atualizados e aprovados`);
            return rowsAffected;
          })
          .catch((error: Error) => {
            throw new Error(error.message)
          });
      } catch (error:any) {
        throw new Error(error.message)
      }
    } else {
      return {rowsAffected: 0, message: "AprovarItens: Não há itens para atualizar."}
    }
  },
};
