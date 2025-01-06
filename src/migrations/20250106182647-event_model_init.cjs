'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      eventEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      streetname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      locality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_full_string: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizing_entity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizing_secondary_contact_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizing_poc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventShortDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventLongDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eventHeroImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eventProfileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pricePerUnit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ticketsAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  },
};
