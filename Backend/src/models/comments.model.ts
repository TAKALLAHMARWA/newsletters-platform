import { InferSchemaType, model, models, Schema } from 'mongoose';

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'blog', 
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user', 
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user', 
    default: [],
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });


type Comment = InferSchemaType<typeof commentSchema>;


const Comment = models.Comment || model<Comment>('Comment', commentSchema);

export default Comment;
