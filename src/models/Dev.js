const {Schema, model} =  require('mongoose'); //importação de recursos do mongoose

const DevSchema = new Schema({ //criação de um Schema
    name:{ //objeto name, nome do desenvolvedor
        type: String,
        required: true, //obrigatório o preenchimento do nome
    },

    user:{
        type: String,
        required: true,
    },

    bio: String,
    avatar: {
        type: String, //vai retornar o endereço da imagem
        required: true,
    },

    likes: [{ //serão referenciados pelo ID os devs
        type: Schema.Types.ObjectId,
        ref: 'Dev', // referenciando a 'tabela' Dev
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev', 
    }],


}, {
    timestamps: true, //vai criar uma coluna de forma automática, chamada createdAt(armazena a data de criação do registro) em cada registro e uma outra coluna chamada updatedAt (atualiza a data de alteração do registro)
});

module.exports = model('Dev', DevSchema); //model função importada do mongoose, 'Dev' é o nome do model e o nome do Schema DevSchema. Qualquer arquivo que importar o model, vai poder inserir, alterar, excluir dados dentro da tabela