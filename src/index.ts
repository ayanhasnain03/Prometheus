import express from "express"; // Importing the Express framework
import client from "prom-client"; // Importing the prom-client for metrics collection
import { histogram } from "./monitoring/histogram";

const app = express(); // Creating an instance of an Express application

// Middleware to parse JSON request bodies
app.use(express.json());

// Use requestCount middleware without invoking it
// This middleware will track HTTP requests and their metrics
app.use(histogram);

// Route to get user information
app.get("/user", async (req, res) => {
  // Send a JSON response with user data
  res.send({
    name: "John Doe",
    age: 27,
  });
});

// Route to create a new user
app.post("/user", (req, res) => {
  const user = req.body; // Get the user data from the request body
  // Send back the user data along with a generated ID
  res.send({
    ...user,
    id: 1, // Hardcoded ID for demonstration
  });
});

// Route to expose metrics for monitoring
app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics(); // Retrieve collected metrics
  res.set("Content-Type", client.register.contentType); // Set the response content type
  res.end(metrics); // Send the metrics back to the client
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log(`Server running on port ${3000}`); // Log a message to the console
});
