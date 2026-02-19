import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
    title: 'Kimmiy Hotel - Your Home in Belgrade',
    description: 'Experience comfort and luxury near Belgrade Airport at Kimmiy Hotel. Perfect for business and leisure travelers in Surcin.',
};

export default function HomePage() {
    return <HomeClient />;
}
