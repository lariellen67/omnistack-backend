//responsável pela lógica da aplicação, por receber as requisições. As rotas chamam os controllers, os controllers vão receber as requisições e vão formular uma resposta

const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){ //para criar um desenvolvedor
        const {username} = req.body; //objeto que será usado (req.body) + a chave que será buscada (username, no caso)

        const userExists = await Dev.findOne({ user: username});//para garantir que não tenha cadastros repetidos
        if(userExists){
            return res.json(userExists);
        }


        const response = await axios.get(`https://api.github.com/users/${username}`); //busca informações na api do usuário
        
        console.log(response.data);
        console.log(bio);
        
        //resposta que o axios vai retornar

        const { name, bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({ //colocando o Devcreate dentro de uma variável dev
            name,
            user: username,
            bio, 
            avatar 
        })

        return res.json(dev); //tudo que for retornado ´pelo axios será colocado dentro do data

        /*return res.json({ continua_loucão_jordan: true});*/
    }
};