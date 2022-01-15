module.exports = (sequelize, dataTypes) =>{
    let alias = 'User'
    let cols = {
        idUsers:{
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER(11),
        },
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

    return User
}