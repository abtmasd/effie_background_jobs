import moment = require("moment");
import SendMessageToRecipientService from "../../services/mailer/SendMessageToRecipientService";
import { knexPostgre } from "../../config/knex";

export default {
  key: "Email_RecuperarSenhaEscritorio",
  options: {
    delay: 2000,
    attempts: 3,
    deleteOnComplete: false,
    //priority: "high"
  },
  async handle({ data }: any) {
    var { to, subject, html } = data;
    var messageData = { subject: subject, body: html };
    try {
      const sendMessageToRecipient = new SendMessageToRecipientService();
      return await sendMessageToRecipient.run(to, messageData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
