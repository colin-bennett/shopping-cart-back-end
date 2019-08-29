"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.use("/", routes);

const port = 3000;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
