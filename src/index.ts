import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import "./database";

const __init = (): void => {
  app.listen(app.get("port"));
  console.log("Server on http://localhost:" + app.get("port"));
};

// 0:21:26
__init();
