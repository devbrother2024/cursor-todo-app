'use client'

import { TodoItemProps } from './types'

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <li className="flex items-center gap-2 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="accent-blue-500"
            />
            <span
                className={`flex-1 text-gray-900 dark:text-white ${
                    todo.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : ''
                }`}
            >
                {todo.text}
            </span>
            <button
                onClick={() => onDelete(todo.id)}
                className="px-2 py-1 text-red-500 hover:text-red-600 transition-colors"
            >
                삭제
            </button>
        </li>
    )
}
