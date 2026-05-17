import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.model.js';
import { GoalModel } from '../models/Goal.model.js';

const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../.env');
dotenv.config({ path: envPath });

async function seed() {
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI is required to run the seed script');
	}

	await mongoose.connect(process.env.MONGO_URI);
	await Promise.all([UserModel.deleteMany({}), GoalModel.deleteMany({})]);

	const passwordHash = await bcrypt.hash('Password123!', 10);

	const [employee, manager, admin] = await UserModel.create([
		{
			name: 'Employee Demo',
			email: 'employee@atomquest.local',
			passwordHash,
			role: 'employee',
			department: 'Engineering',
		},
		{
			name: 'Manager Demo',
			email: 'manager@atomquest.local',
			passwordHash,
			role: 'manager',
			department: 'Engineering',
		},
		{
			name: 'Admin Demo',
			email: 'admin@atomquest.local',
			passwordHash,
			role: 'admin',
			department: 'Operations',
		},
	]);

	await GoalModel.create({
		employeeId: employee._id,
		title: 'Improve monthly revenue reporting',
		description: 'Deliver automated reporting for the leadership dashboard.',
		thrustArea: 'Analytics',
		uomType: 'number',
		target: 100,
		weightage: 20,
		deadline: new Date('2026-12-31'),
		status: 'draft',
		locked: false,
		submitted: false,
	});

	console.log('Seed complete');
	console.log('Demo users:');
	console.log('employee@atomquest.local / Password123!');
	console.log('manager@atomquest.local / Password123!');
	console.log('admin@atomquest.local / Password123!');

	await mongoose.disconnect();
}

seed().catch((error) => {
	console.error(error);
	process.exit(1);
});
