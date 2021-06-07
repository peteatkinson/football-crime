import compression from "compression";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(compression());

app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port: ${port}`));