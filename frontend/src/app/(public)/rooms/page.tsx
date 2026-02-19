import { Metadata } from 'next';
import RoomsClient from './RoomsClient';

export const metadata: Metadata = {
    title: 'Rooms & Suites',
    description: 'Explore our luxurious rooms and suites at Kimmiy Hotel. Comfortable, modern, and affordable accommodation near Belgrade Airport.',
};

export default function RoomsPage() {
    return <RoomsClient />;
}
