'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'Tahsin',
					lastName: 'Ahmed',
					email: 'tahsin@email.com',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					firstName: 'Jane',
					lastName: 'Doe',
					email: 'jane@email.com',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					firstName: 'John',
					lastName: 'Doe',
					email: 'john@email.com',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkDelete('Users', null, {});
	},
};
