import express from 'express';
import boardRouter from './routes/board';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use('/api/board', boardRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
