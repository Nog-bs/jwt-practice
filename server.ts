import express from "express";

const app = express();

app.get("/", (_req, res) => res.send("Express + TypeScript Server"));

// INITIATES PORT ON SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`⚡⚡⚡⚡ Server Active on Port: ${PORT} ⚡⚡⚡⚡`);
});
