//Third-party middlewares
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import sessionConfig from "./config/sessionConfig.js";
//Routers
import jobRoutes from "./routes//jobRoutes.js"
import faiToolRoutes from "./routes/faiToolRoutes.js"
import authRoute from "./routes/authRoute.js"
import AIToolsRoute from  './routes/AIToolsRoute.js'


dotenv.config();
const app = express();
app.use(express.json({limit:"20mb", }));
app.use(cookieParser());
app.use(sessionConfig);

// app.use(cors({
//   origin: ["http://localhost:3000"],
// credentials: true
// })) 

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// APIs
app.use("/api/auth", authRoute);
app.use("/api/ai-tools", AIToolsRoute);
app.use('/api/jobs', jobRoutes);
app.use('/api/fai-tools', faiToolRoutes);

// others for testing 





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error.message));











