import { InferSchemaType, model, models, Schema } from 'mongoose';


const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  
  },
  newsLetterOwnerId: {
    type: String,
  },
  source: {
    type: String,
  },
  status: {
    type: String,
  },
}, { timestamps: true });


type Subscriber = InferSchemaType<typeof subscriberSchema>;

const Subscriber = models.Subscriber || model<Subscriber>('Subscriber', subscriberSchema);
export default Subscriber;
