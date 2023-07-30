/**
 * @swagger
 * components:
 *   schemas:
 *     OngoingTodos:
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
 *   name: ongoing-todos-controller
 *   description: Ongoing todos controller
 * /api/v1/todos/getAllOngoingTodos:
 *   get:
 *     summary: get all ongoing todos
 *     tags: [ongoing-todos-controller]
 *     responses:
 *       200:
 *         description: The ongoing todos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OngoingTodos'
 *       500:
 *         description: Some server error
 */


const express = require("express"); 
const { ongoingTodo } = require("../controllers/ongoingTodos.controller");
const { auth } = require("../middleware/Authentiation");

const ongoingTodoRouter = express.Router();

ongoingTodoRouter.get("/getAllOngoingTodos", auth, ongoingTodo)

exports.ongoingTodoRouter = ongoingTodoRouter