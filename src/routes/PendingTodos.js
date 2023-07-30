/**
 * @swagger
 * components:
 *   schemas:
 *     PendingTodos:
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
 *   name: pending-todos-controller
 *   description: Pending todos controller
 * /api/v1/todos/getAllPendingTodos:
 *   get:
 *     summary: get all pending todos
 *     tags: [pending-todos-controller]
 *     responses:
 *       200:
 *         description: The pending todos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendingTodos'
 *       500:
 *         description: Some server error
 */


const express = require("express");
const { pendingTodo } = require("../controllers/pendingTodos.controller");
const { auth } = require("../middleware/Authentiation");

const pendingTodoRouter = express.Router();

pendingTodoRouter.get("/getAllPendingTodos", auth, pendingTodo)

exports.pendingTodoRouter = pendingTodoRouter