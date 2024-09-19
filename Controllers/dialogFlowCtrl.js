import { obterCardsServicos } from "../funcoesDFLOW/funcoes.js";
export default class DialogFlowCtrl{

    processarIntencoes(requisicao,resposta){
        if (requisicao.method=='POST'){
            const dados = requisicao.body;
            const nomeIntencao = dados.queryResult.intent.displayName;

            if (nomeIntencao == "Default Welcome Intent"){
                //se a inteção for de boas vindas, nós vamos apresentar
                //o menu de serviços disponíveis enviando cards de serviços
                const origem = dados?.originalDetectIntentRequest?.source;
                if (origem){  //requisição está vindo do ambiente padrão
                    obterCardsServicos("custom").then((cards)=>{
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Bem vindo ao Petshop X! \n",
                                    "Esses são os nossos servicos: \n"
                                ]
                            }
                        });
                        respostaDF.fulfillmentMessages.push(...cards);
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Qual serviço você deseja?"
                                ]
                            }
                        })
                        resposta.status(200).json(respostaDF);
                    }).catch((erro)=>{
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Bem vindo ao Petshop X! \n",
                                    "Não foi possível recuperar a lista de serviços. \n",
                                    "O sistema está com problemas. \n",
                                ]
                            }
                        });
                        resposta.status(200).json(respostaDF);
                    });

                }
                else{ //requisição está vindo do messenger
                    obterCardsServicos("messenger").then((cards)=>{
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Bem vindo ao Petshop X!",
                                    "text": [
                                        "Estamos muito felizes em ter você por aqui!",
                                        "Esses são nossos serviços: \n"
                                    ]
                                }]]
                            }
                        });
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push(...cards);
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push({
                            "type": "description",
                            "title": "Qual serviço você deseja?",
                            "text": []
                        });
                        resposta.json(respostaDF);
                    }).catch((erro)=>{
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Bem vindo ao Petshop X!",
                                    "text": [
                                        "Estamos muito felizes em ter você por aqui!",
                                        "Infelizmente não foi possível recuperar a lista de serviços. \n",
                                        "O sistema está com problemas. \n",
                                    ]
                                }]]
                            }
                        });
                    })
                }
            }

        }

    }
}