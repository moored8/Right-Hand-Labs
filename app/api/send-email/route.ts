import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env.local');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter - using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options with high importance
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'dan@navaroglobal.com',
      subject: `🚨 HIGH PRIORITY: Strategy Call Request from ${name || 'Website Visitor'}`,
      text: `
New Strategy Call Request

Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}

Message:
${message || 'No message provided'}

---
This is an automated email from the Right Hand Labs website.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            🚨 HIGH PRIORITY: Strategy Call Request
          </h2>
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-left: 3px solid #f59e0b; margin-top: 10px;">
              ${message || 'No message provided'}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This is an automated email from the Right Hand Labs website.
          </p>
        </div>
      `,
      priority: 'high' as const,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
