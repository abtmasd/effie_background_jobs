
import { Request, Response, NextFunction } from 'express';
import Contact from "../../schemas/Contact";
import CreateMessageService from "../../services/mailer/CreateMessageService";


const sendEmail = async(req : Request, res: Response) => {
    const { email, subject, body, request } = req.body;
  
    //insert a new user
    if (email != "" && subject != "" && body != "") {
      //create a tag of user
      const exist = await Contact.find({ email: email });
      const createMessageService = new CreateMessageService();
      const messageData = { subject, body };
  
      if (exist.length == 0) {
        //user not exist, create and send email
  
        await Contact.create({
          'email': email,
          'request': request
        }).then(async (contact) => {
            if (contact) {
              const message = await createMessageService.run(messageData, email);
              res.status(201).send({
                status: "success",
                message: "email send ✔️",
                data: message,
              });
            } else {
              res.status(400).send({
                status: "failed",
                message: "failed to create contact user",
                data: [],
              });
            }
          })
          .catch((err) => {
            res.status(400).send({
              status: "failed",
              message: "failed to create a new contact",
              data: err,
            });
          });
      } else {
        //user exist, send email
        const message = await createMessageService.run(messageData, email);
        res.status(201).send({
          status: "success",
          message: "email send ✔️",
          data: message,
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        message: "fields empty",
        data: [],
      });
    }
}

export { sendEmail };

