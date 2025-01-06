import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection.js';

class BaseModel extends Model {
    static initialize(sequelize) {
        super.init(
            {
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    allowNull: false,
                },

                updatedAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    allowNull: false,
                },

                meta: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                    defaultValue: {},
                },
            },
            {
                sequelize,
                modelName: 'BaseModel',
                timestamps: true,
                tableName: 'BaseModel',
            }
        );
    }
}

BaseModel.initialize(sequelize);

export default BaseModel
