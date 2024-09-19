import { Router } from "express";
import ServicoCtrl from "../Controllers/servicoCtrl.js";

const rotaServico = new Router();
const servCtrl = new ServicoCtrl();

rotaServico
.get("/", servCtrl.consultar)
.post("/", servCtrl.gravar)
.put("/", servCtrl.alterar)
.delete("/", servCtrl.excluir);

export default rotaServico;