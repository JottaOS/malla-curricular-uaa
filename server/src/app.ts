import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { corsMiddleware } from './middlewares/cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware())
// Use the routes defined in routes.ts
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
