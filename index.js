import express from 'express';
import rotaServico from './Routes/rotaServico.js';
import rotaDialogFlow from './Routes/rotaDialogFlow.js';


const app = express();
const porta = 3000;
const host = "0.0.0.0";
app.use(express.json()); //dá a essa aplicação a competência em reconhecer o formato json

app.use("/webhook",rotaDialogFlow);
app.use("/servico",rotaServico);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})