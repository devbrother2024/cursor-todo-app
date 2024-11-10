export interface Todo {
    id: number
    text: string
    completed: boolean
    createdAt: Date
}

export interface TodoItemProps {
    todo: Todo
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

export interface TodoInputProps {
    onAdd: (text: string) => void
}
