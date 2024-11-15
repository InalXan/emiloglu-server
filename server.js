import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// db
import conn from "./db/connection.js";
// routes
import auth_route from "./routes/auth_route.js";
import about_route from "./routes/about_route.js";
import contact_route from "./routes/contact_route.js";
import sponsor_route from "./routes/sponsor_route.js";
import category_route from "./routes/category_route.js";
import product_route from "./routes/product_route.js";
import subcategory_route from "./routes/subcategory_route.js";
import spocategory_route from "./routes/spocategory_route.js";

const PORT = 5000;
const a = express();

a.use(
  cors({
    origin: "*", // Allow all origins
    methods: "*", // Allow all methods (GET, POST, PUT, DELETE, etc.)
  }),
);

// logger
a.use(morgan("dev"));

// parser configure
a.use(bodyParser.urlencoded({ extended: true }));
a.use(bodyParser.json());
a.use(cookieParser());

// set file save location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
a.use(
  "/uploads/about",
  express.static(path.join(__dirname, "./uploads/about")),
);
a.use("./uploads", express.static(path.join(__dirname, "./uploads")));
a.use(
  "/uploads/sponsors",
  express.static(path.join(__dirname, "./uploads/sponsors")),
);
a.use(
  "/uploads/products",
  express.static(path.join(__dirname, "./uploads/product")),
);

// routes
a.use("/admin", auth_route);
a.use("/admin", about_route);
a.use("/admin", contact_route);
a.use("/admin", sponsor_route);
a.use("/admin", category_route);
a.use("/admin", product_route);
a.use("/admin", subcategory_route);
a.use("/admin", spocategory_route);
a.listen(PORT, () => {
  // server connection
  try {
    console.log(`https://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
  // mongodb connection
  conn();
});
