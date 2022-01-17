module.exports = (sequelize, dataTypes) =>{
    let alias = 'Detail'
    let cols = {
        idDetail:{
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER(18),
        },
        color:{
            type: dataTypes.STRING(45)
        },
        amount:{
            type: dataTypes.INTEGER(3)
        },
        products_idProduct:{
            type: dataTypes.INTEGER(15)
        }
    }
    let config = {
        tableName: "details",
        timestamps: false
    }

    const Detail = sequelize.define(alias, cols, config)

    Detail.associate = function (models) {
        Detail.belongsTo(models.Product, { 
            as: "product",
            foreignKey: "products_idProduct"
        })
    }

    return Detail
}