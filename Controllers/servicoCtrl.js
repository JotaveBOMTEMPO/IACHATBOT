import Servico from "../Models/Servico.js";
export default class ServicoCtrl{
    //a classe irá manipular requisições HTTP
    gravar(requisicao, resposta){
        if (requisicao.method=='POST' && requisicao.is("application/json")){
            const dados = requisicao.body;
            const titulo = dados.titulo;
            const descricao = dados.descricao;
            const valorServico = dados.valorServico;
            const urlImagem = dados.urlImagem;
            
            if (titulo && descricao && valorServico > 0 && urlImagem){
                const servico = new Servico(0, titulo, descricao, valorServico, urlImagem);    
                servico.gravar().then(() =>{
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Serviço gravado com sucesso!"
                    });
                }).catch((erro) =>{
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao tentar gravar o serviço:" + erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Informe todos os dados do serviço conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem":"Requisição inválida. Método não permitido!"
            });
        }
    }

    alterar(requisicao, resposta){
        if (requisicao.method=='PUT' && requisicao.is("application/json")){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const titulo = dados.titulo;
            const descricao = dados.descricao;
            const valorServico = dados.valorServico;
            const urlImagem = dados.urlImagem;

            if (codigo && codigo > 0 && titulo && descricao && valorServico > 0 && urlImagem)
            {
                const servico = new Servico(codigo, titulo, descricao, valorServico, urlImagem);
                servico.alterar().then(() =>{
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Serviço alterado com sucesso!"
                    });
                }).catch((erro) =>{
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao tentar alterar o serviço:" + erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Por favor informe todos os dados de um serviço para alteração!"
                });
            }
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem":"Requisição inválida. Método não permitido!"
            });
        }
    }

    excluir(requisicao, resposta){
        if (requisicao.method=='DELETE' && requisicao.is("application/json")){
            const dados = requisicao.body;
            const codigo = dados.codigo;

            if (codigo && codigo > 0){
                const servico = new Servico(codigo);
                servico.excluir().then(() =>{
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Serviço excluído com sucesso!"
                    });
                }).catch((erro) =>{
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao tentar excluir o serviço:" + erro.message
                    })
                });
            }
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem":"Requisição inválida. Método não permitido!"
            });
        }
    }

    consultar(requisicao, resposta){
        if (requisicao.method=='GET'){
            const servico = new Servico();
            servico.consultar().then((listaDeServicos) =>{
                resposta.status(200).json({
                    "status": true,
                    listaDeServicos
                });
            }).catch((erro) =>{
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao tentar consultar os servicos:" + erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem":"Requisição inválida. Método não permitido!"
            });
        }
    }
}