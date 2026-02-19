import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Kimmiy Hotel, our history, and our commitment to providing the best hospitality experience in Belgrade.',
};

export default function AboutPage() {
    return <AboutClient />;
}
