import { InferSchemaType, model, models, Schema } from 'mongoose';

const blogSchema = new Schema({
  title: { type: String, required: true,  },
  content: { type: String, required: true },
  blogonwerId: { type: String, required: true },
  image: {
    type: String,
    default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
  },
  category: { type: String, default: 'uncategorized' },
}, { timestamps: true });

type Blog = InferSchemaType<typeof blogSchema>;

const blog = models.Blog || model<Blog>('Blog', blogSchema);

export default blog;
