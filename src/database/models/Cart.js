module.exports = (sequelize, dataTypes) =>{
    let alias = 'Cart'
    let cols = {
        idCart:{
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER(11),
        },
        users_idUser:{
            type: dataTypes.INTEGER(11)
        }
    }
    let config = {
        tableName: "cart",
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function (models) {
        Cart.belongsTo(models.User, { 
            as: "user",
            foreignKey: "users_idUser"
        });
        Cart.belongsToMany(models.Product,{
            as: 'product',
            through: 'cart_has_products',
            foreignKey: 'cart_idCart',
            otherKey: 'products_idProduct',
            timestamps: false
        })
    }

    return Cart
}