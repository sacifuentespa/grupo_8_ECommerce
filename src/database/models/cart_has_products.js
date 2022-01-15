module.exports = (sequelize, dataTypes) =>{
    let alias = 'cart_has_products'
    let cols = {
        quantity:{
            type: dataTypes.INTEGER(3)
        }
        }
    let config = {
        tableName: "cart_has_products",
        timestamps: false
    }


    const cart_has_products = sequelize.define(alias, cols, config)

    return cart_has_products
}