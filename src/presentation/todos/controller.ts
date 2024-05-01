import { Request, Response } from 'express'

interface Todo {
    id: number;
    name: string;
    createdAt: Date | null;
}

const todos: Todo[] = [
    { id: 1, name: 'Todo 1', createdAt: new Date() },
    { id: 2, name: 'Todo 2', createdAt: new Date() },
    { id: 3, name: 'Todo 3', createdAt: new Date() },
    { id: 4, name: 'Todo 4', createdAt: new Date() },
    { id: 5, name: 'Todo 5', createdAt: new Date() },
];

export class TodoController {
    //*DI
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid ID' })
            return
        }
        const todo = todos.find(todo => todo.id === id)
        //res.json(todo)
        todo
            ? res.json(todo)
            : res.status(404).json({ message: 'Todo not found' })
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) {
            res.status(400).json({ message: 'Text is required' })
            return
        }
        const newTodo = {
            id: todos.length + 1,
            name: text,
            createdAt: null
        }
        todos.push(newTodo)

        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' })

        const todo = todos.find(todo => todo.id === id)
        //res.json(todo)
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        const { text, createdAt } = req.body

        todo.name = text || todo.name;

        (createdAt === 'null')
            ? todo.createdAt = null
            : todo.createdAt = new Date(createdAt || todo.createdAt)

        //! Ojo, referencia


        res.json(todo)

    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' })

        const todo = todos.find(todo => todo.id === id)

        if (!todo) return res.status(404).json({ message: 'Todo not found' })

        const index = todos.indexOf(todo)
        todos.splice(index, 1)
        res.json({ message: 'Todo deleted', todo })

    }


}

