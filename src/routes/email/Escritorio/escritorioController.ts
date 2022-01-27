import { Request, Response, NextFunction } from "express";
import Enqueue from "../../../bull/registerJobs";

const recuperarSenha = async (req: Request, res: Response) => {
  const { data } = req.body;
  //console.log(">>> Recebi recuperar senha: ", req.body);
  Enqueue.add("Email_RecuperarSenhaEscritorio", data);
  return res.send(true);
};

const enviarEmailConfirmacaoEscritorio = async (req: Request, res: Response) => {
  const { data } = req.body;
  Enqueue.add("Email_ConfirmacaoCadastroEscritorio", data);
  return res.send(true);
};

const enviarEmailConfirmacaoUsuario = async (req: Request, res: Response) => {
  const { data } = req.body;
  Enqueue.add("Email_ConfirmacaoCadastroUsuario", data);
  return res.send(true);
};

export { recuperarSenha, enviarEmailConfirmacaoEscritorio, enviarEmailConfirmacaoUsuario };
