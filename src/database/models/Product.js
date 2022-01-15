module.exports = (sequelize, dataTypes) =>{
    let alias = 'Product'
    let cols = {
        idProduct:{
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER(15),
        },
        productName:{
            allowNull: false,
            type: dataTypes.STRING(50)
        },
        productPrice:{
            allowNull: false,
            type: dataTypes.INTEGER(11)
        },
        listCategoriesProduct:{
            allowNull: false,
            type: dataTypes.STRING(15)
        },
        productDescriptionUpload:{
            allowNull: false,
            type: dataTypes.STRING(1000)
        },
        aimUpload:{
            allowNull: false,
            type: dataTypes.STRING(9)
        },
        active:{
            allowNull: false,
            type: dataTypes.INTEGER(1)
        },
        categoryExchange:{
            type: dataTypes.STRING(15)
        }
        
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    

    const Product = sequelize.define(alias, cols, config)

    return Product
}