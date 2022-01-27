import { Router } from "express";
const routes = Router();

routes.get("/", async (req, res) => {
  return res.send(`<div style="font-size:16pt">
  🚀 Effie Background Jobs running 😄
  </div>`);
});

export default routes;
