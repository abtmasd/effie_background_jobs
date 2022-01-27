import Queue from "bull";
import * as jobs from "../jobs";
import redisConfig from "../../config/redis/config";


const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name: any, data: any) {
    const queue = this.queues.find((queue) => queue.name === name);
    return queue?.bull.add(queue?.name, data, queue?.options);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.name, queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log(`Job failed ${job.name}:`, err);
      });
      queue.bull.on("completed", (job, err) => {
        console.log(`Job done ${job.name}`);

        /* //Testando como calcular a porcentagem de execução do job
        var { id_item_produtos } = job.data;
        var { returnvalue } = job;
        var {statusCode, message} = returnvalue;

        if (id_item_produtos && returnvalue) {
          var porcentagemItensAtualizados = (returnvalue / id_item_produtos.length) * 100;
          job.progress(porcentagemItensAtualizados);
        }else{
          job.progress(99);
        } 
        */

        job.progress(100);
        
        //done();
      });
    });
  },
};
