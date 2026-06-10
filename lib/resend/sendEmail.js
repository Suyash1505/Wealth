"use server";

import { Resend } from "resend";

// INITIALIZE RESEND
const resend = new Resend(
    process.env.RESEND_API_KEY
);

// SEND EMAIL FUNCTION
export async function sendEmail({ to, subject, react, }) {
    try {

        // VALIDATE ENV
        if (!process.env.RESEND_API_KEY) {
            throw new Error(
                "RESEND_API_KEY IS MISSING"
            );
        }

        // SEND EMAIL
        const data = await resend.emails.send({
            from:
                "FlowMint <onboarding@resend.dev>",
            to,
            subject,
            react,
        });

        console.log(
            "EMAIL SENT SUCCESSFULLY:",
            data.id
        );

        return {
            success: true,
            data,
        };

    } 
    catch (error) {

        console.error(
            "FLOWMINT EMAIL ERROR:",
            error
        );

        return {
            success: false,
            message:
                error.message ||
                "FAILED TO SEND EMAIL",
        };
    }
}