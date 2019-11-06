//responsável pela lógica da aplicação, por receber as requisições. As rotas chamam os controllers, os controllers vão receber as requisições e vão formular uma resposta

const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res){
        const { user } = req.headers; //buscar a informação user do req.headers
        const loggedDev = await Dev.findById(user); //mostrar os dados do usuário logado

        const users = await Dev.find({ //buscar dentro da base de dados todos os usuários que não tem deslike, like ou não estão logados
            $and: [ // $and, condição para que os filtros passem como AND e não como OR
                {_id: {$ne: user} }, //$ne --> not equal -- vai trazer os users que não tenham o id igual ao passado
                {_id: {$nin: loggedDev.likes }}, // $nin --> o que estiver dentro, vai trazer os likes que estiverem dentro do loggedDev
                {_id: {$nin: loggedDev.deslikes }}
            ], 
        })
        return res.json(users);
},


    async store(req, res){ //para criar um desenvolvedor
        const {username} = req.body; //objeto que será usado (req.body) + a chave que será buscada (username, no caso)

        const userExists = await Dev.findOne({ user: username});//para garantir que não tenha cadastros repetidos
        if(userExists){
            return res.json(userExists);
        }


        const response = await axios.get(`https://api.github.com/users/${username}`); //busca informações na api do usuário
        
        console.log(response.data); //resposta que o axios vai retornar
        
        const { name, bio, avatar_url: avatar} = response.data;
        console.log(bio);

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