/**
 * @swagger
 * components:
 *   schemas:
 *     upcomingTodos:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: title of task
 *         noOfDays:
 *           type: string
 *           description: no of days left or remaining for the task
 */
 
/**
 * @swagger
 * tags:
 *   name: upcoming-todos-controller
 *   description: upcoming todos controller
 * /api/v1/todos/getAllupcomingTodos:
 *   get:
 *     summary: get all upcoming todos
 *     tags: [upcoming-todos-controller]
 *     responses:
 *       200:
 *         description: The upcoming todos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/upcomingTodos'
 *       500:
 *         description: Some server error
 */


const express = require("express");
const { upcomingTodo } = require("../controllers/upcomingTodos.controller");
const { auth } = require("../middleware/Authentiation");

const upcomingTodoRouter = express.Router();

upcomingTodoRouter.get("/getAllUpcomingTodos", auth, upcomingTodo)

exports.upcomingTodoRouter = upcomingTodoRouter