import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('subscribers')
export class SubscribersController {
    constructor(private readonly subscribersService: SubscribersService) { }

    @Post()
    create(@Body() createSubscriberDto: CreateSubscriberDto) {
        return this.subscribersService.create(createSubscriberDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    findAll() {
        return this.subscribersService.findAll();
    }

    @Post('send-email')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    sendEmail(@Body() body: { subject: string; message: string }) {
        return this.subscribersService.sendNewsletter(body.subject, body.message);
    }
}
