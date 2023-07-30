/**
 * @swagger
 * components:
 *   schemas:
 *     CompletedTodos:
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
 *   name: completed-todos-controller
 *   description: completed todos controller
 * /api/v1/todos/getAllCompletedTodos:
 *   get:
 *     summary: get all completed todos
 *     tags: [completed-todos-controller]
 *     responses:
 *       200:
 *         description: The completed todos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompletedTodos'
 *       500:
 *         description: Some server error
 */


const express = require("express");
const { completedTodo } = require("../controllers/completedTodos.controller");
const { auth } = require("../middleware/Authentiation");

const completedTodoRouter = express.Router();

completedTodoRouter.get("/getAllCompletedTodos", auth, completedTodo)

exports.completedTodoRouter = completedTodoRouter