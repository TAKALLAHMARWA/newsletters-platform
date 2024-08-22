import "dotenv/config";
import express, { Request, Response, NextFunction } from 'express';
import NewslettersRoutes from "./routes/newsletters.route";
import SubscribersRoutes from "./routes/subscribers.route";
import UsersRoutes from "./routes/users.route";
import CommentsRoutes from "./routes/comments.route";
import BlogsRoutes from "./routes/blogs.route";
import morgan from "morgan";


const app = express();
app.use(morgan("dev"));


app.use(express.json());

app.use("/api/newsletters",NewslettersRoutes);
app.use("/api/subscribers",SubscribersRoutes);
app.use("/api/users",UsersRoutes);
app.use("/api/comments",CommentsRoutes);
app.use("/api/blogs",BlogsRoutes);

 
app.use((req, res, next) =>{
    next(Error("Endpoint not found"));
}
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.log(error);

    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
        errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
});

export default app;