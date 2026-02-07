import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersRepository = app.get(getRepositoryToken(User));

    const adminUsername = 'admin';
    const adminPassword = 'adminpassword123'; // Change this in production!

    const existingAdmin = await usersRepository.findOne({ where: { username: adminUsername } });

    if (existingAdmin) {
        console.log('Admin user already exists.');

        // Update role if missing (for existing generic users turned admins)
        if (!existingAdmin.role || existingAdmin.role !== 'admin') {
            existingAdmin.role = 'admin';
            await usersRepository.save(existingAdmin);
            console.log('Updated existing admin user role to admin.');
        }

    } else {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const newAdmin = usersRepository.create({
            username: adminUsername,
            password: hashedPassword,
            role: 'admin',
        });
        await usersRepository.save(newAdmin);
        console.log(`Admin user created. Username: ${adminUsername}, Password: ${adminPassword}`);
    }

    await app.close();
}

bootstrap();
