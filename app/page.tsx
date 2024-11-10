'use client'

import { useState, useEffect } from 'react'
import TodoInput from './components/TodoList/TodoInput'
import TodoItem from './components/TodoList/TodoItem'
import ThemeToggle from './components/ThemeToggle'
import { Todo } from './components/TodoList/types'

const STORAGE_KEY = 'todos'

const loadTodosFromStorage = (): Todo[] => {
    if (typeof window === 'undefined') return []

    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (!savedTodos) return []

    try {
        return JSON.parse(savedTodos).map(
            (todo: Omit<Todo, 'createdAt'> & { createdAt: string }) => ({
                ...todo,
                createdAt: new Date(todo.createdAt)
            })
        )
    } catch (error) {
        console.error('Failed to load todos:', error)
        return []
    }
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        setTodos(loadTodosFromStorage())
    }, [])

    useEffect(() => {
        if (todos.length > 0 || localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
        }
    }, [todos])

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        }
        setTodos([...todos, newTodo])
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <div className="p-4 max-w-md mx-auto">
                <ThemeToggle />
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    TodoList
                </h1>
                <TodoInput onAdd={addTodo} />
                <ul className="space-y-2">
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}
