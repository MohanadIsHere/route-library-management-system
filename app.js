import express from "express";
import { PORT } from "./src/config/env.js";
import runServer from "./src/server.js";
const app = express();
const port = PORT || 8303;
runServer({ express, app });
app.listen(port, () => console.log(`App listening on port ${port} 🚀 !`));
