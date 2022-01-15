module.exports = (sequelize, dataTypes) =>{
    let alias = 'Products'
    let cols = {
        idProduct:{
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        productName:{
            allowNull: false,
            type: dataTypes.STRING
        },
        productPrice:{
            allowNull: false,
            type: dataTypes.INTEGER
        },
        listCategoriesProduct:{
            allowNull: false,
            type: dataTypes.STRING
        },
        productDescriptionUpload:{
            allowNull: false,
            type: dataTypes.TEXT
        },
        aimUpload:{
            allowNull: false,
            type: dataTypes.STRING
        },
        active:{
            allowNull: false,
            type: dataTypes.INTEGER
        },
        categoryExchange:{
            type: dataTypes.STRING
        }
        
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    

    const User = sequelize.define(alias, cols, config)

    return User
}