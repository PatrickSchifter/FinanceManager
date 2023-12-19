import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

export default app;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});  