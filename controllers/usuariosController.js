const { Usuario, sequelize} = require('../models/');

const usuariosController = {
    index: async (req, res) => {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    },

    create: async (req, res) => {
        const { nome, email, senha } = req.body;
        const novoUsuario = await Usuario.create({nome, email, senha});
        return res.json(novoUsuario);
    },

    update: async (req, res) => {
        const {id} = req.params;
        const { nome, email, senha } = req.body;

        const usuarioAtualizado = await Usuario.update({nome, email, senha},{where: {id}});

        return res.json(usuarioAtualizado);
    },

    delete: async (req,res) => {
        const{id} = req.params;
        const usuarioDeletado = await Usuario.destroy({where: {id}});
        return res.json(usuarioDeletado);
    }
}

module.exports = usuariosController;