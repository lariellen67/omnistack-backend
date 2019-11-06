const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express(); //criação do servidor do express

mongoose.connect('mongodb+srv://omnistack:omnistack1@cluster0-uacyv.mongodb.net/omnistack8?retryWrites=true&w=majority', {useNewUrlParser: true});

// Métodos principais dentro de uma API: 
//GET (busca), POST (cria), PUT(edita), DELETE (deleta)  

/*
//chamada de rota, sempre se utiliza o método get
server.get('/', (req, res) => { // '/':(endereço raiz). recebe a requisição e a resposta
    return res.send('Hello World'); //retorna uma resposta
});
server.listen(3333); // definição de qual porta será utilizada para o servidor 'ouvir'
*/

/*
//esses parâmetros podem ficar dentro do routes.js para organizar melhor as rotas
server.get('/', (req, res) => { //resposta de acordo com o parâmetro enviado na rota
    return res.send(`Hello ${req.query.name}`); //req.query porque será uma requisição, .name porque é o parâmetro usado na rota.
});
server.listen(3333); 
*/

server.use(cors()); 
server.use(express.json()); // para o express saber que será usado json
server.use(routes); //para usar o routes que está em outro arquivo
server.listen(3333); 

