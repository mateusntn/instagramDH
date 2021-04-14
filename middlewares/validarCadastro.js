const { Usuario } = require('../models')

module.exports = async (request, response, next) => {

    let { nome, email, senha } = request.body;
    

    if(nome && email && senha) {
        let usuarios = await Usuario.findAll({ where: {email} });
        if (!usuarios.length) {
            if( senha.length >= 6 && senha.length <= 12){
                next();
            } else {
                response.status(400).json({ erro: "A senha deve ter entre 6 e 12 caracteres" });
            }
            
        } else {
            response.status(400).json({ erro: "Email já cadastrado" });
        }
    } else {
        response.status(400).json({ erro: "Todos os campos devem ser preenchidos!" });
    }

}

