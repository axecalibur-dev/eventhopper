import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import ModelConstants from "./constants.js";

class Users extends BaseModel {
    static initialize(sequelize) {
        super.initialize(sequelize);
        this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },

                role: {
                    type: DataTypes.ENUM(ModelConstants.User, ModelConstants.Organizer, ModelConstants.Administrator),
                    allowNull: false,
                    defaultValue: ModelConstants.User
                },

                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },

                phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },

                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                is_deleted : {
                    type : DataTypes.BOOLEAN,
                    allowNull: false,
                    default:false
                }
            },
            {
                sequelize,
                modelName: 'Users',
                tableName: 'Users',
            }
        );
    }
}


export default Users;
