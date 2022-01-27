import mongoose, {Document, Schema} from 'mongoose';

type Contact = Document & {};

const ContactSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
        },
        subject: {
            type: String,
            lowercase: true,
        },
        body: {
            type: String,
        },
        request: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<Contact>('contacts', ContactSchema, 'contacts');