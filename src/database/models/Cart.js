module.exports = (sequelize, dataTypes) =>{
    let alias = 'Cart'
    let cols = {
        
        users_id:{
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
            foreignKey: "users_id"
        });
        Cart.belongsToMany(models.Product,{
            as: 'product',
            through: 'cart_has_products',
            foreignKey: 'cart_id',
            otherKey: 'products_id',
            timestamps: false
        })
    }

    return Cart
}