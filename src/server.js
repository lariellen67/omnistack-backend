const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express(); //criação do servidor do express
const server = require('http').Server(app); // união do servidor http ao servidor do web socket, para aceitar os dois tipos de conexão
const io = require('socket.io')(server); 

const connectedUsers = {}

io.on('connection', socket => { //toda vez que o usuário se conectar com a aplicação pelo websocket, será recebido o socket
    const { user } = socket.handshake.query;

    console.log(user, socket.id)

    connectedUsers[user] = socket.id;


    /*console.log('Funcionou a nova conexão', socket.id); //ponte direta entre o front e backend

    socket.on('joey says', message => { //ouvindo a mensagem do frontend
        console.log(message);
    }) 

    setTimeout(() => { //o backend também consegue enviar mensagens para o frontend
        socket.emit('rachel says', {
            message: 'Im doing good baby. How you doin?'
        });
    }, 5000)*/

});

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

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(cors()); 
app.use(express.json()); // para o express saber que será usado json
app.use(routes); //para usar o routes que está em outro arquivo
server.listen(3333); 
//faz o backend ouvir o protocolo de web socket, além do protocolo HTTP

