import { InferSchemaType, model, models, Schema } from 'mongoose';

const newslettersSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  newsLetterOwnerId: { type: String },
}, { timestamps: true });

type Newsletter = InferSchemaType<typeof newslettersSchema>;

const newsletter = models.Newsletters || model<Newsletter>("Newsletters", newslettersSchema);


export default newsletter;
