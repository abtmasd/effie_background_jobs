import Enqueue from '../../bull/registerJobs';

class CreateMessageService {
    async run (messageData: { subject: string, body: string}, email:  string) : Promise<void> {
            //Envia apenas um email
            //Criar foreach para multiplos emails
            await Enqueue.add(`EnviarEmail: ${email}`, {
                data: {
                    to: `${email}`,
                    messageData: messageData
                }
            });
        }
}

export default CreateMessageService;
