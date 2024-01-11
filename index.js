import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/calculate-seconds-difference", (req, res) => {
  try {
    const { timestamp1, timestamp2 } = req.body;

    if (!timestamp1 || !timestamp2) {
      throw new Error("Both timestamps are required.");
    }

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error("Invalid timestamp format.");
    }

    if (date1 > date2) {
      throw new Error("Timestamp 1 must be less than or equal to Timestamp 2.");
    }

    const differenceInSeconds = Math.abs((date2 - date1) / 1000);

    res.json({ differenceInSeconds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
