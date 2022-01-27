import { Request, Response, NextFunction } from "express";
import Enqueue from "../../bull/registerJobs";

export = {
  aprovarItens : async (req: Request, res: Response) => {
    const { data } = req.body;
    console.log("EndPointbull aprovarItens recebeu ", req.body);
    Enqueue.add("AprovarItens", data);
    return res.send(true).status(201);
  },
 aprovarItensUpdate : async (req: Request, res: Response) => {
  const { data } = req.body;
  console.log("EndPointbull aprovarItensUpdate recebeu ", req.body);
  Enqueue.add("AprovarItensUpdate", data);
  return res.send(true).status(201);
},

 corrigirAprovados : async (req: Request, res: Response) => {
  const { data } = req.body;
  console.log("EndPointbull corrigirAprovados recebeu ", req.body);
  Enqueue.add("CorrigirAprovados", data);
  return res.send(true).status(201);
},

 testando : async (req: Request, res: Response) => {
  console.log("EndPointbull rota /teste recebeu ", req.body);
  Enqueue.add("Teste", req.body);
  return res.send(true).status(201);
},

executeQuery : async (req: Request, res: Response) => {
  const { email, subject, body, request } = req.body;
  var { msg } = req.body;
  Enqueue.add("PrintTeste", { msg: msg });
},
}

