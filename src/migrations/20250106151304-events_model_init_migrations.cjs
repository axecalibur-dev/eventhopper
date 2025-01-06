'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      address_level_one: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_level_two: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_level_three: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_level_four: {
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
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        allowNull: false,
      },
      eventProfileImage: {
        type: Sequelize.STRING,
        allowNull: false,
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  },
};
