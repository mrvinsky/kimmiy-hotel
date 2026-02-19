import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
    title: 'Our Services',
    description: 'Discover the premium services at Kimmiy Hotel: VIP Airport Transfer, Restaurant, Spa & Wellness, and Secure Parking.',
};

export default function ServicesPage() {
    return <ServicesClient />;
}
