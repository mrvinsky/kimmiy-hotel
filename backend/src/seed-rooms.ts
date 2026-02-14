import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoomsService } from './rooms/rooms.service';
import { CreateRoomDto } from './rooms/dto/create-room.dto';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const roomsService = app.get(RoomsService);

    const rooms: CreateRoomDto[] = [
        {
            name: { EN: "Deluxe Queen Room", SR: "Deluxe Queen Soba", ZH: "豪华大床房" },
            description: {
                EN: "Ideally suited for couples or solo travelers featuring a King size bed. Equipped with TV, free WI-FI, wireless charging, and tea/coffee facilities.",
                SR: "Idealno za parove ili solo putnike sa velikim bračnim krevetom. Opremljeno TV-om, besplatnim WI-FI internetom, bežičnim punjenjem i aparatom za čaj/kafu.",
                ZH: "非常适合情侣或独自旅行者，配有一张特大号床。配备电视、免费无线网络、无线充电和茶/咖啡设施。"
            },
            capacity: 2,
            price: 80,
            totalStock: 5,
            images: ["/rooms/room-v2-1.jpg"],
            amenities: ["wifi", "tv", "ac", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "King Room with Mountain View", SR: "King Soba sa Pogledom na Planinu", ZH: "山景大床房" },
            description: {
                EN: "Spacious room with a King size bed and a private balcony offering scenic views. Includes TV, WI-FI, and all standard amenities.",
                SR: "Prostrana soba sa velikim bračnim krevetom i privatnim balkonom sa pogledom. Uključuje TV, WI-FI i sve standardne sadržaje.",
                ZH: "宽敞的客房配有一张特大号床和私人阳台，享有美丽的景色。包括电视、无线网络和所有标准设施。"
            },
            capacity: 2,
            price: 95,
            totalStock: 3,
            images: ["/rooms/room-v2-2.jpg"],
            amenities: ["wifi", "tv", "ac", "balcony", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "Deluxe Twin Room", SR: "Deluxe Dvokrevetna Soba", ZH: "豪华双床房" },
            description: {
                EN: "Perfect for friends or colleagues, features two single beds and a balcony. Comfortable and well-equipped.",
                SR: "Savršeno za prijatelje ili kolege, sadrži dva singl kreveta i balkon. Udobno i dobro opremljeno.",
                ZH: "非常适合朋友或同事，设有两张单人床和一个阳台。舒适且设备齐全。"
            },
            capacity: 2,
            price: 85,
            totalStock: 4,
            images: ["/rooms/room-v2-3.jpg"],
            amenities: ["wifi", "tv", "ac", "balcony", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "Suite with City View", SR: "Apartman sa Pogledom na Grad", ZH: "市景套房" },
            description: {
                EN: "Luxurious suite for 3 people with a King size bed, a sofa, and a balcony overlooking the city.",
                SR: "Luksuzan apartman za 3 osobe sa velikim bračnim krevetom, sofom i balkonom sa pogledom na grad.",
                ZH: "豪华套房可供 3 人入住，配有一张特大号床、一张沙发和一个俯瞰城市的阳台。"
            },
            capacity: 3,
            price: 130,
            totalStock: 2,
            images: ["/rooms/room-v2-4.jpg"],
            amenities: ["wifi", "tv", "ac", "balcony", "minibar", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "Deluxe Family Suite", SR: "Deluxe Porodični Apartman", ZH: "豪华家庭套房" },
            description: {
                EN: "Spacious family accommodation for 4 people, featuring two King size beds and a balcony. Perfect for families.",
                SR: "Prostran porodični smeštaj za 4 osobe, sa dva velika bračna kreveta i balkonom. Savršeno za porodice.",
                ZH: "宽敞的家庭住宿可供 4 人入住，设有两张特大号床和一个阳台。非常适合家庭入住。"
            },
            capacity: 4,
            price: 160,
            totalStock: 2,
            images: ["/rooms/room-v2-5.jpg"],
            amenities: ["wifi", "tv", "ac", "balcony", "minibar", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "Deluxe King Room", SR: "Deluxe King Soba", ZH: "豪华大床房" },
            description: {
                EN: "Premium room for 2 people with a King size bed, a comfortable sofa, and a private balcony.",
                SR: "Premium soba za 2 osobe sa velikim bračnim krevetom, udobnom sofom i privatnim balkonom.",
                ZH: "两人的高级客房，配有一张特大号床、一张舒适的沙发和一个私人阳台。"
            },
            capacity: 2,
            price: 110,
            totalStock: 3,
            images: ["/rooms/room-v2-6.jpg"],
            amenities: ["wifi", "tv", "ac", "balcony", "sofa", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "Queen Room", SR: "Queen Soba", ZH: "大床房" },
            description: {
                EN: "Cozy room for 2 people with a King size bed. Ideal for a comfortable stay.",
                SR: "Udobna soba za 2 osobe sa velikim bračnim krevetom. Idealno za prijatan boravak.",
                ZH: "两人的舒适客房，配有一张特大号床。理想的舒适住宿。"
            },
            capacity: 2,
            price: 75,
            totalStock: 5,
            images: ["/rooms/room-v2-7.jpg"],
            amenities: ["wifi", "tv", "ac", "tea_coffee", "wireless_charging"]
        },
        {
            name: { EN: "Twin Room", SR: "Dvokrevetna Soba", ZH: "双床房" },
            description: {
                EN: "Standard room with two single beds. Offers all essential amenities for a pleasant stay.",
                SR: "Standardna soba sa dva singl kreveta. Nudi sve osnovne sadržaje za prijatan boravak.",
                ZH: "带两张单人床的标准房。提供所有基本设施，让您度过愉快的时光。"
            },
            capacity: 2,
            price: 75,
            totalStock: 5,
            images: ["/rooms/room-v2-8.jpg"],
            amenities: ["wifi", "tv", "ac", "tea_coffee", "wireless_charging"]
        }
    ];

    console.log('Clearing existing rooms...');
    const existingRooms = await roomsService.findAll();
    for (const room of existingRooms) {
        await roomsService.remove(room.id);
    }
    console.log('Existing rooms cleared.');

    console.log('Seeding rooms...');
    for (const room of rooms) {
        await roomsService.create(room);
        console.log(`Created room: ${room.name.EN}`);
    }

    await app.close();
    console.log('Done!');
}

bootstrap();
