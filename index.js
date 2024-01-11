import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate-difference', (req, res) => {
  const { timestamp1, timestamp2 } = req.body;

  if (!timestamp1 || !timestamp2) {
    return res.status(400).json({ error: 'Both timestamps are required.' });
  }

  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return res.status(400).json({ error: 'Invalid timestamp format.' });
  }

  const differenceInSeconds = Math.abs((date2 - date1) / 1000);

  res.json({ differenceInSeconds });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
