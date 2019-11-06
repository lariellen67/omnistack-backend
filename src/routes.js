const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DeslikeController = require('./controllers/DeslikeController');

const routes = express.Router(); // Router é uma função que permite a criação de um obejto específico para rotes, no caso o objeto criado é routes, que será utilizado no lugar do server

/*
routes.get('/', (req, res) => { //resposta de acordo com o parâmetro enviado na rota
    return res.json({message: `tá loucão ${req.query.name}`}); //utilizando json, que devolve como objeto ou array - object message
});


//exemplo de rota não usando o método GET
routes.post('/devs', (req, res) =>{
    console.log(req.body); // requisição do corpo divitado no POST Insomnia
    return res.json ({ok: true}); //resposta é dada no Insomnia
});*/

// ao invés do método acima, pode ser o usado o seguinte
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); //quando essa rota for acessada, o DevController será chamado
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/deslikes', DeslikeController.store);

module.exports = routes; // para exportar as rotas, para que o nosso servidor conheça essas rotas 