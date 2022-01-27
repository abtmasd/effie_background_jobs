import { Router } from "express";
const routes = Router();
import { knexPostgre } from "../../../config/knex/index";

import { tokenAuthenticate } from "../../../auth/token";

import * as escritorioController from './escritorioController';


routes.post("/recuperar-senha", tokenAuthenticate, escritorioController.recuperarSenha);

routes.post("/enviar-email-confirmacao-escritorio", tokenAuthenticate, escritorioController.enviarEmailConfirmacaoEscritorio);

routes.post("/enviar-email-confirmacao-usuario", tokenAuthenticate, escritorioController.enviarEmailConfirmacaoUsuario);


export default routes;