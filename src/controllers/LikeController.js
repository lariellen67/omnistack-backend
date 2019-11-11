const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        console.log(req.io, req.connectedUsers);

        const {devId} = req.params;//para acessar um parametro que vem através da rota req.params, e indicar depois o parâmetro que consta no arquivo routes
        const {user} = req.headers; // para acessar o usuário que está dando o like

        const loggedDev = await Dev.findById(user); //const loggedDev é uma nova variável
        const targetDev = await Dev.findById(devId);//const targetDev é uma nova variável

        if(!targetDev){ //para verificar seu o dev requisitado existe
            return res.status(400).json({error: 'Dev not exists. Sorry'});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id); //adiciona uma nova info no vetor likes
        await loggedDev.save(); //salva a informação no vetor
        return res.json(loggedDev); // retorna loggedDev


        /*return res.json({ deu_bom_jordan: true});*/ //substituído pelo retorno acima
    }
};