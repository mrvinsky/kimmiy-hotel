import { DataSource } from 'typeorm';
import { Room } from './rooms/entities/room.entity';
import { Booking } from './bookings/entities/booking.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'kimmiyhotel',
    entities: [Room, Booking],
    synchronize: true,
    dropSchema: true, // FORCE DROP SCHEMA to fix type mismatch
});

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');

        const roomRepository = AppDataSource.getRepository(Room);
        const bookingRepository = AppDataSource.getRepository(Booking);

        // Clear existing data (using raw SQL)
        await AppDataSource.query('DELETE FROM booking');
        await AppDataSource.query('DELETE FROM room');

        const rooms = [
            {
                name: { EN: 'Deluxe Queen Room', SR: 'Deluxe Queen Room', ZH: 'Deluxe Queen Room' },
                description: {
                    EN: 'Comfortable room for two with a King size bed, equipped with TV, free WI-FI, wireless charging, kettle and complimentary tea/coffee.',
                    SR: 'Komforna soba za dvoje sa King size krevetom. Opremljena TV-om, besplatnim WI-FI, bežičnim punjačem i kuvalom.',
                    ZH: '舒适的双人房，配有特大号床、电视、免费无线网络、无线充电、水壶和免费茶/咖啡。'
                },
                price: 90,
                capacity: 2,
                images: [
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'King Room with Mountain View', SR: 'King Room with Mountain View', ZH: 'King Room with Mountain View' },
                description: {
                    EN: 'Spacious room for two with a King size bed and a private balcony with mountain view.',
                    SR: 'Prostrana soba za dvoje sa King size krevetom i privatnim balkonom sa pogledom na planinu.',
                    ZH: '宽敞的双人房，配有特大号床和山景私人阳台。'
                },
                price: 110,
                capacity: 2,
                images: [
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'Deluxe Twin Room', SR: 'Deluxe Twin Room', ZH: 'Deluxe Twin Room' },
                description: {
                    EN: 'Twin room with two single beds and a balcony, perfect for friends or colleagues.',
                    SR: 'Dvokrevetna soba sa dva singl kreveta i balkonom.',
                    ZH: '双床房，配有两张单人床和阳台。'
                },
                price: 95,
                capacity: 2,
                images: [
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'Suite with City View', SR: 'Suite with City View', ZH: 'Suite with City View' },
                description: {
                    EN: 'Luxury suite for three people featuring a King size bed, a sofa, and a balcony with city views.',
                    SR: 'Luksuzni apartman za tri osobe sa King size krevetom, sofom i balkonom sa pogledom na grad.',
                    ZH: '三人豪华套房，配有特大号床、沙发和市景阳台。'
                },
                price: 160,
                capacity: 3,
                images: [
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'Deluxe Family Suite', SR: 'Deluxe Family Suite', ZH: 'Deluxe Family Suite' },
                description: {
                    EN: 'Spacious family suite for four, offering two king size beds and a balcony for maximum comfort.',
                    SR: 'Prostrani porodični apartman za četvoro, sa dva King size kreveta i balkonom.',
                    ZH: '宽敞的四人家庭套房，提供两张特大号床和阳台。'
                },
                price: 220,
                capacity: 4,
                images: [
                    'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'Deluxe King Room', SR: 'Deluxe King Room', ZH: 'Deluxe King Room' },
                description: {
                    EN: 'Large room for two with a King size bed, a sofa, and a private balcony.',
                    SR: 'Velika soba za dvoje sa King size krevetom, sofom i privatnim balkonom.',
                    ZH: '宽敞的双人房，配有特大号床、沙发和私人阳台。'
                },
                price: 130,
                capacity: 2,
                images: [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'Queen Room', SR: 'Queen Room', ZH: 'Queen Room' },
                description: {
                    EN: 'Cozy room for two with a King size bed and all standard amenities.',
                    SR: 'Udobna soba za dvoje sa potpunom opremom.',
                    ZH: '舒适的双人房，配有特大号床。'
                },
                price: 85,
                capacity: 2,
                images: [
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop'
                ]
            },
            {
                name: { EN: 'Twin Room', SR: 'Twin Room', ZH: 'Twin Room' },
                description: {
                    EN: 'Classic twin room for two with two single beds.',
                    SR: 'Klasična dvokrevetna soba sa dva singl kreveta.',
                    ZH: '经典双床房，配有两张单人床。'
                },
                price: 85,
                capacity: 2,
                images: [
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop'
                ]
            }
        ];

        for (const roomData of rooms) {
            const room = roomRepository.create(roomData);
            await roomRepository.save(room);
            console.log(`Created room: ${room.name}`);
        }

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
