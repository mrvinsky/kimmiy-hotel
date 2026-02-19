import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Kimmiy Hotel. Book your stay, ask questions, or provide feedback. We are here to help 24/7.',
};

export default function ContactPage() {
    return <ContactClient />;
}
