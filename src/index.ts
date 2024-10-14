import express from "express";
import { middleware } from "./middleware/mid";

const app = express();

app.use(express.json());
app.use(middleware);

app.get("/user", async (req, res) => {
  res.send({
    name: "John Doe",
    age: 27,
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 1,
  });
});

// Correctly log the server running message
app.listen(3000, () => {
  console.log(`Server running on port ${3000}`); // Use console.lo
});
