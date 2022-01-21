module.exports = (sequelize, dataTypes) =>{
    let alias = 'User'
    let cols = {
        
        name:{
            allowNull: false,
            type: dataTypes.STRING(50)
        },
        lastName:{
            allowNull: false,
            type: dataTypes.STRING(50)
        },
        email:{
            unique: true,
            allowNull: false,
            type: dataTypes.STRING(75)
        },
        password:{
            allowNull: false,
            type: dataTypes.STRING(61)
        },
        avatar:{
            allowNull: false,
            type: dataTypes.STRING(200)
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }


    const User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
        User.hasOne(models.Cart, { 
            as: "cart", // El nombre del modelo pero en plural
            foreignKey: "users_id"
        });
        User.belongsToMany(models.Product,{
            as: 'product',
            through: 'users_has_products',
            foreignKey: 'users_id',
            otherKey: 'products_id',
            timestamps: false
        })

    }

    return User
}