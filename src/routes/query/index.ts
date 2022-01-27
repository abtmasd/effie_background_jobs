import { Router } from "express";
import { tokenAuthenticate } from "../../auth/token/";
import queryController from './queryController';
const routes = Router();


routes.post("/aprovar-itens", tokenAuthenticate, queryController.aprovarItens);

routes.post("/aprovar-itens-update", tokenAuthenticate, queryController.aprovarItensUpdate);

routes.post("/corrigir-aprovados", tokenAuthenticate, queryController.corrigirAprovados);

routes.post("/teste", tokenAuthenticate, queryController.testando);

export default routes;