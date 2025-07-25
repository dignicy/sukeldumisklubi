import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Create SMTP transporter
function createTransporter() {
	return nodemailer.createTransport({
		host: env.SMTP_HOST || 'smtp.gmail.com',
		port: parseInt(env.SMTP_PORT || '465'),
		secure: true, // true for 465, false for other ports
		auth: {
			user: env.SMTP_USER,
			pass: env.SMTP_PASS
		}
	});
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const phone = data.get('phone') as string;
		const subject = data.get('subject') as string;
		const message = data.get('message') as string;

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return fail(400, {
				error: 'Kõik kohustuslikud väljad peavad olema täidetud',
				name,
				email,
				phone,
				subject,
				message
			});
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Palun sisestage kehtiv e-maili aadress',
				name,
				email,
				phone,
				subject,
				message
			});
		}

		try {
			const transporter = createTransporter();

			// Email content
			const htmlContent = `
				<h2>Uus kontaktivormi sõnum</h2>
				<p><strong>Nimi:</strong> ${name}</p>
				<p><strong>E-mail:</strong> ${email}</p>
				<p><strong>Telefon:</strong> ${phone || 'Ei ole märgitud'}</p>
				<p><strong>Teema:</strong> ${subject}</p>
				<p><strong>Sõnum:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>
				<hr>
				<p><small>Saadetud sukeldumiskeskuse kontaktivormist ${new Date().toLocaleString('et-EE')}</small></p>
			`;

			const textContent = `
Uus kontaktivormi sõnum

Nimi: ${name}
E-mail: ${email}
Telefon: ${phone || 'Ei ole märgitud'}
Teema: ${subject}
Sõnum: ${message}

Saadetud sukeldumiskeskuse kontaktivormist ${new Date().toLocaleString('et-EE')}
			`;

			// Send email
			await transporter.sendMail({
				from: env.SMTP_FROM || env.SMTP_USER,
				to: env.CONTACT_EMAIL || 'info@sukeldumisklubi.ee',
				subject: `Kontaktivorm: ${subject}`,
				text: textContent,
				html: htmlContent,
				replyTo: email
			});

			// Optional: Send confirmation email to the sender
			if (env.SEND_CONFIRMATION === 'true') {
				await transporter.sendMail({
					from: env.SMTP_FROM || env.SMTP_USER,
					to: email,
					subject: 'Teie sõnum on vastu võetud - Sukeldumiskeskus',
					html: `
						<h2>Täname teid pöördumise eest!</h2>
						<p>Tere ${name},</p>
						<p>Oleme teie sõnumi kätte saanud ja võtame teiega ühendust esimesel võimalusel.</p>
						<p><strong>Teie sõnumi teema:</strong> ${subject}</p>
						<p>Parimate tervitustega,<br>Sukeldumiskeskuse meeskond</p>
					`,
					text: `
Täname teid pöördumise eest!

Tere ${name},

Oleme teie sõnumi kätte saanud ja võtame teiega ühendust esimesel võimalusel.

Teie sõnumi teema: ${subject}

Tervitades,
Sukeldumiskeskuse meeskond
					`
				});
			}

			return {
				success: true,
				message: 'Sõnum on edukalt saadetud!'
			};

		} catch (error) {
			console.error('Email sending error:', error);
			return fail(500, {
				error: 'Sõnumi saatmisel tekkis viga. Palun proovige hiljem uuesti.',
				name,
				email,
				phone,
				subject,
				message
			});
		}
	}
}; 