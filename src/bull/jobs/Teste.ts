import moment from 'moment';
import { knexPostgre } from '../../config/knex';

export default {
  key: "Teste",
  options:{
    delay: 4000,
    attempts: 4,
    deleteOnComplete: false,
    //priority: "high"
  },
  async handle({data}: any) {
    
    console.log("Teste job ==>>", data);
   
  },
};
