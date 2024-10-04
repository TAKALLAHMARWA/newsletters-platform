import "dotenv/config"; 
import express, { Request, Response} from 'express';
import morgan from "morgan";
import NewslettersRoutes from "./routes/newsletters.route";
import SubscribersRoutes from "./routes/subscribers.route";
import UsersRoutes from "./routes/users.route";
import CommentsRoutes from "./routes/comments.route";
import BlogsRoutes from "./routes/blogs.route";
import authRoutes from "./routes/auth.route"; 
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";


const app = express();

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Ajuste cela à l'origine correcte si nécessaire
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); 
app.use(morgan("dev"));

// Test route for CORS
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: "CORS est bien configuré !" });
});

// Routes non protégées
app.use("/auth", authRoutes);  // Auth routes n'ont pas besoin d'être protégées

// Middleware Clerk
app.use(ClerkExpressWithAuth());

// Routes protégées avec Clerk
app.use("/newsletters",  NewslettersRoutes);
app.use("/subscribers", SubscribersRoutes);
app.use("/users",  UsersRoutes);
app.use("/comments", CommentsRoutes);
app.use("/blogs", BlogsRoutes);

// 404 error handling for undefined routes
app.use((req, res, next) => { 
  next(createHttpError(404, "Endpoint not found"));
});

// Global error handling middleware
app.use((error: unknown, req: Request, res: Response): void => {
  console.log(error);

  let errorMessage = "An unknown error occurred";
  let statusCode = 500; 

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;