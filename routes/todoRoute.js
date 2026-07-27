const express=require('express')
const { createTodoController, getTodoController, deleteTodoController, updateTodocontroller } = require('../controllers/todoController')
const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router()
router.post('/create',authMiddleware,createTodoController)
router.post('/getAll/:userId',authMiddleware,getTodoController)
router.delete('/delete/:id',authMiddleware,deleteTodoController)
router.patch('/update/:id',authMiddleware,updateTodocontroller)

module.exports=router