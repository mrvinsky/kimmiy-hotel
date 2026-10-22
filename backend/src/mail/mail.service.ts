import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const port = +this.configService.get('SMTP_PORT');
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port,
      secure: port === 465, // implicit TLS on 465, STARTTLS on other ports
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
    replyTo?: string,
  ) {
    try {
      // Providers like Resend use a fixed SMTP username, so the sender address is configured separately
      const fromAddress =
        this.configService.get('SMTP_FROM') ||
        this.configService.get('SMTP_USER');
      const info = await this.transporter.sendMail({
        from: `"${this.configService.get('SMTP_FROM_NAME') || 'Kimmiy Hotel'}" <${fromAddress}>`,
        to,
        subject,
        text,
        html,
        replyTo,
      });
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      // In dev, we might tolerate error if credentials are mock
      return null;
    }
  }
}
