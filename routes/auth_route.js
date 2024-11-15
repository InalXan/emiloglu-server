import express from "express";
const auth_route = express.Router();

//controller
import auth_controller from "../controllers/auth_controller.js";
//middleware
import auth_middleware from "../middlewares/auth_middleware.js";

auth_route.post("/register", auth_controller.register);
auth_route.post("/login", auth_controller.login);
auth_route.get("/profile/:id", auth_middleware, auth_controller.getUserProfile);

export default auth_route;