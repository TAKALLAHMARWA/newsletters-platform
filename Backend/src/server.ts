import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../doc/swagger'; 
import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;
console.log('listen to port:', port);

mongoose.connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");

    const appWithSwaggerUI = express();

    appWithSwaggerUI.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    
    appWithSwaggerUI.use('/', app);

    appWithSwaggerUI.listen(port, () => {
      console.log("Server running on port:", port);
    });
  })
  .catch(console.error);
 