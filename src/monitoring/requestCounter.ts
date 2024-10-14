import client from "prom-client"; // Importing the prom-client library for metrics collection

// Create a Counter metric to track total HTTP requests
const requestCounter = new client.Counter({
  name: "http_requests_total", // The name of the metric
  help: "Total number of HTTP requests", // A brief description of the metric
  labelNames: ["method", "route", "status_code"], // Labels to categorize the metric
});

//@ts-ignore
export function requestCount(req, res, next) {
  // Listen for the 'finish' event on the response object to capture when the response is sent
  res.on("finish", () => {
    // Use req.route to capture the route path, falling back to req.originalUrl if not available
    const route = req.route ? req.route.path : req.originalUrl;

    // Increment the request counter with method, route, and status code
    requestCounter.inc({
      method: req.method, // HTTP method (GET, POST, etc.)
      route: route, // The route that was accessed
      status_code: res.statusCode.toString(), // HTTP status code of the response as a string
    });
  });

  // Call the next middleware or route handler in the stack
  next();
}
