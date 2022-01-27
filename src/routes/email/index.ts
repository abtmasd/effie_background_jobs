import { Router } from "express";
const routes = Router();
import { tokenAuthenticate } from "../../auth/token/";

import { sendEmail } from './emailController';

routes.post("/send", tokenAuthenticate, sendEmail);

export default routes;