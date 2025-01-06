import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import ModelConstants from "./constants.js";

class Events extends BaseModel {
    static initialize(sequelize) {
        super.initialize(sequelize);
        this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },

                eventName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                eventType: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                eventStartDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                eventEndDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },


                address_level_one : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                address_level_two : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                address_level_three : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                address_level_four : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                address_full_string : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                organizing_entity : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                organizing_secondary_contact_email : {
                    type: DataTypes.STRING,
                    allowNull: true,
                },

                organizing_poc : {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id",
                    },
                },

                eventShortDescription: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                eventLongDescription: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },

                eventHeroImage: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                eventProfileImage: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                pricePerUnit: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },

                ticketsAvailable : {
                    type: DataTypes.NUMBER,
                    allowNull: false,
                },

                is_deleted : {
                    type : DataTypes.BOOLEAN,
                    allowNull: false,
                    default:false
                },

                is_active : {
                    type : DataTypes.BOOLEAN,
                    allowNull: false,
                    default:true
                }
            },
            {
                sequelize,
                modelName: 'Events',
                tableName: 'Events',
            }
        );
    }
}


export default Events;
