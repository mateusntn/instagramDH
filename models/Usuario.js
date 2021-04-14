module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        'Usuario',{
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {
            tableName: "usuarios",
            timestamps: false
        }
    );

    Usuario.associate = (models) => {
        //Relação 1:N (Usuário tem vários posts)
        Usuario.hasMany(models.Post, {as:"posts", foreignKey:"usuarios_id"});
        //Relação N:M (Usuário curte vários posts)
        Usuario.belongsToMany(models.Post, {
            as: "curtiu",
            through: "curtidas",
            foreignKey: "usuarios_id",
            otherKey: "posts_id",
            timestamps: false
        });
    }
    
    return Usuario;
}