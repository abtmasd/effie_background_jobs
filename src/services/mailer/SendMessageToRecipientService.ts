
const utf8 = require('utf8');
import SES = require("aws-sdk/clients/ses");


class SendMessageToRecipientService {
    private client: SES;
    constructor() {
        this.client = new SES({
            region: process.env.AWS_DEFAULT_REGION
        });
        this.client
            .getSendQuota()
            .promise()
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    async run(to: string, messageData: { subject: string, body: string }) {
        console.log(`Sending message to ${to}`);
        try {
            return await this.client.sendEmail({
                Source: utf8.encode('Escritório Contábil Mezzomo <desenvolvimentomezzomo@gmail.com>'),
                Destination: {
                    ToAddresses: [to]
                },
                Message: {
                    Subject: {
                        Data: messageData.subject,
                        Charset: 'UTF-8'
                    },
                    Body: {
                        Html: {
                            Data: messageData.body,
                            Charset: 'UTF-8'
                        },
                        /*  
                        Text: {
                                Data: 'OIII',
                                Charset: 'UTF-8'
                        } 
                        */
                    }
                },
                ConfigurationSetName: 'mezzomoapp',
            }).promise()
        } catch (error: any) {
            throw new Error(`${error.message}`)
        }
    }

}

export default SendMessageToRecipientService;