module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',{
            texto: DataTypes.STRING,
            img: DataTypes.STRING,
            usuarios_id: DataTypes.INTEGER,
            n_likes : DataTypes.INTEGER
        }, {
            tableName: "posts",
            timestamps: false
        }
    );

    Post.associate = (models) => {
        // Relação N:1 (Cada post só tem um usuário)
        Post.belongsTo(models.Usuario, {as: "usuario", foreignKey: "usuarios_id"});
        // Relação N:M (Post tem curtidas de varios usuarios)
        Post.belongsToMany(models.Usuario, {
            as: "curtiu",
            through: "curtidas",
            foreignKey: "posts_id",
            otherKey: "usuarios_id",
            timestamps: false
        });

        Post.hasMany(models.Comentario, { as: "comentarios", foreignKey: "posts_id" });
    }
    
    return Post;
}