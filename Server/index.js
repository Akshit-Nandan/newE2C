import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import { verifyToken } from './middleware/auth.js'
// import { uploadDoc } from './controllers/documents.js';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import studentRoutes from './routes/students.js';
import documentRoutes from './routes/documents.js';
import commentRoutes from './routes/comments.js';


/* CONFIGURATIONS */ 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

/* ROUTES WITH FILES */
// app.post('/document', verifyToken, upload.single('file'), uploadDoc);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/posts", postRoutes);
app.use("/documents", documentRoutes);
app.use("/comments", commentRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect!!`));