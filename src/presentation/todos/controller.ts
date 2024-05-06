import { Request, Response } from 'express'
import { prisma } from '../../data/Postgres'
import { CreateTodoDto } from '../../domain/dtos'
import { UpdateTodoDto } from '../../domain/dtos';

interface Todo {
    id: number;
    name: string;
    createdAt: Date | null;
}
//node
export class TodoController {
    //*DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todo = await prisma.todo.findMany()
        res.json(todo)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id))
            return res.status(400).json({ message: 'Invalid ID' })

        const todo = await prisma.todo.findMany({
            where: { id: id }
        });

        (todo) ? res.json(todo) : res.status(404).json({ message: `Todo with id ${id} not found` })

    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ message: error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id

        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id
        })

        if (error) return res.status(400).json({ message: error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });


        if (!todo) return res.status(404).json({ message: `Todo with id ${id} not found` });



        const updateTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values

        });
        res.json(updateTodo)
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id))
            return res.status(400).json({ message: 'Invalid ID' })

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if (!todo) return res.status(404).json({ message: `Todo with id ${id} not found` });

        const deleteTodo = await prisma.todo.delete({
            where: { id }
        })

        res.json({ message: `Todo with id ${id} deleted successfully`, deleteTodo })

    }


}

