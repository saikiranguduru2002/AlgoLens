import cors from 'cors';
import express from 'express';
import algorithmRoutes from './routes/algorithmRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://algolenslab.vercel.app/'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
    credentials: true
  })
);
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.use('/', algorithmRoutes);

app.listen(PORT, () => {
  console.log(`AlgoLens backend listening on http://localhost:${PORT}`);
});
