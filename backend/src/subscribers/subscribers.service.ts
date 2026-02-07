import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class SubscribersService {
    constructor(
        @InjectRepository(Subscriber)
        private subscribersRepository: Repository<Subscriber>,
        private mailService: MailService,
    ) { }

    async create(createSubscriberDto: CreateSubscriberDto) {
        try {
            const subscriber = this.subscribersRepository.create(createSubscriberDto);
            return await this.subscribersRepository.save(subscriber);
        } catch (error: any) {
            if (error.code === '23505') { // Postgres duplicate key error code
                throw new ConflictException('Email already subscribed');
            }
            throw error;
        }
    }

    findAll() {
        return this.subscribersRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async sendNewsletter(subject: string, message: string) {
        const subscribers = await this.findAll();
        let sentCount = 0;

        for (const sub of subscribers) {
            try {
                // You might want to use a template or HTML here
                const result = await this.mailService.sendMail(sub.email, subject, message);
                if (result) {
                    sentCount++;
                } else {
                    console.warn(`Email returned null for ${sub.email}`);
                }
            } catch (e) {
                console.error(`Failed to send to ${sub.email}`, e);
            }
        }

        return {
            success: sentCount > 0,
            sentCount,
            total: subscribers.length,
            message: sentCount === 0 ? 'No emails were sent. Check backend logs for SMTP errors.' : `Sent to ${sentCount}/${subscribers.length} subscribers.`
        };
    }
}
