module.exports = (sequelize, dataTypes) =>{
    let alias = 'users_has_products'
    let cols = {
        relation:{
            allowNull: false,
            type: dataTypes.STRING(45)
        }
        }
    let config = {
        tableName: "users_has_products",
        timestamps: false
    }


    const users_has_products = sequelize.define(alias, cols, config)

    return users_has_products
}