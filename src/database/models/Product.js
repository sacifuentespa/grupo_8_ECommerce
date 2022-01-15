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

    Product.associate = function(models) {
        Product.hasMany(models.Detail, { 
            as: "details", // El nombre del modelo pero en plural
            foreignKey: "products_idProduct"
        });
        Product.hasMany(models.Image, { 
            as: "images", // El nombre del modelo pero en plural
            foreignKey: "products_idProduct"
        });
        Product.belongsToMany(models.User,{
            as: 'users',
            through: 'users_has_products',
            foreignKey: 'products_idProduct',
            otherKey: 'users_idUser',
            timestamps: false
        })

    }

    return Product
}