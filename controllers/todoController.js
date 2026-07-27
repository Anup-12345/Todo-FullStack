const todoModel = require("../models/todoModel")

const createTodoController=async(req,res)=>{
    try{
        const {title,description,isCompleted,createdBy}=req.body
        if(!title ||!description){
            return res.status(500).send({
                success:false,
                message:'Please provide title and description'
            })
        }
        const todo=new todoModel({title,description,isCompleted,createdBy})
        const result=await todo.save()
        res.status(201).send({
            success:true,
            message:'your task has been created',
            result
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in create todo api',
            error
        })
    }
}
const getTodoController=async(req,res)=>{
    try{
        const {userId}=req.params
        if(!userId){
            return res.status(404).send({
                success:false,
                message:'No User Found with This Id'
            })
        }
        const todos=await todoModel.find({createdBy:userId})
        if(!todos){
            return res.status(404).send({
                success:false,
                message:'You have no todo'
            })
        }
        res.status(200).send({
            success:true,
            message:'your todo',
            todos
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get Todo Api',
            error
        })
    }
}
const deleteTodoController = async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'No todo found with this id'
            })
        }
        const todo=await todoModel.findByIdAndDelete(id)
        if(!todo){
            return res.status(404).send({
                success:false,
                message:'No task found',
            })
        }
        res.status(200).send({
            success:true,
            message:'task deleted Successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in delete todo api '
        })
    }
}
const updateTodocontroller=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Please Provide todo id'
            })
        }

        const data=req.body
        const todo=await todoModel.findByIdAndUpdate(id,{$set:data},{returnOriginal:false})
        res.status(200).send({
            success:true,
            message:'your task has been update',
            todo
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in update todo api'
        })
    }
}
module.exports={createTodoController,getTodoController,deleteTodoController,updateTodocontroller}
