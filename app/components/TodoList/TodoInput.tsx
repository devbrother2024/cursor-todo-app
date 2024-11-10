'use client'

import { useState } from 'react'
import { TodoInputProps } from './types'

export default function TodoInput({ onAdd }: TodoInputProps) {
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        if (input.trim() === '') return
        onAdd(input.trim())
        setInput('')
    }

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                className="flex-1 px-2 py-1 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                placeholder="할일을 입력하세요"
            />
            <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                추가
            </button>
        </div>
    )
}
