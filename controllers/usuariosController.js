const bcrypt = require('bcryptjs')
const { Usuario, sequelize} = require('../models/');

const usuariosController = {
    index: async (req, res) => {
        const usuarios = await Usuario.findAll();
        return res.render('usuarios', {listarUsuarios: usuarios});
    },

    registro: (req, res) => {
        return res.render('registro');
    },

    login: (req, res) => {
        return res.render('login');
    },

    create: async (req, res) => {
        const { nome, email, senha } = req.body;

        const senhaCrypt = bcrypt.hashSync(senha, 10);

        const novoUsuario = await Usuario.create({nome, email, senha: senhaCrypt});
        
        return res.redirect('/usuarios/login')
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