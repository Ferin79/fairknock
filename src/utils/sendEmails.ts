/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ejs from "ejs";
import jwt from "jsonwebtoken";
import path from "path";
import sgMail from "../configs/SendGridMailer";
import { User } from "./../components/User/model";
import { logger } from "./../configs/Logger";

export const sendConfirmationEmail = async (user: User) => {
  try {
    const payload = {
      id: user.id,
    };

    const token = await jwt.sign(payload, process.env.CONFIRM_EMAIL_SECRET!, {
      expiresIn: "1d",
    });

    const url = `${process.env.BACKEND_URL!}/auth/confirm/${token}`;

    ejs.renderFile(
      path.join(__dirname, "../templates/confirmation.ejs"),
      { user, url },
      async function (err, str) {
        if (err) {
          console.log(err);
          logger.error(err);
          return;
        }
        const msg = {
          to: user.email,
          from: "ferinpatel2017@gmail.com", // Use the email address or domain you verified above
          subject: "Email Confirmation",
          text: "Verify Your Email",
          html: str,
        };
        try {
          await sgMail.send(msg);
          logger.info("Mail Sent Successfully");
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      }
    );
  } catch (error) {
    logger.error(error);
  }
};
