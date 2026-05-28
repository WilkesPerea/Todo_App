import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Modal from "./Modal";

interface Todo {
    id: number;
    text: string;
    done: boolean;
    type: string;
}

interface TodoItemProps {
    todo: Todo;
    isCompleted?: boolean;
    onToggleDone: (id: number) => void;
    onRemoveTodo: (id: number) => void;
}

function TodoItem({ todo, isCompleted, onToggleDone, onRemoveTodo }: TodoItemProps) {
    return (
        <li className="p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    aria-label="Check Off Todo"
                    className="scale-150 shadow-md accent-softRed hover:scale-155"
                    checked={todo.done}
                    onChange={() => onToggleDone(todo.id)}
                />
                <span className={isCompleted ? "line-through" : ""}>{todo.text}</span>
            </div>
            <div className="flex items-center gap-2">
                {todo.type && <span className="text-sm px-2 py-1 rounded">{todo.type}</span>}
                <button
                    aria-label="Remove Todo"
                    className="text-red-500 hover:text-red-700 hover:scale-105"
                    onClick={() => onRemoveTodo(todo.id)}
                >
                    <FaTrash />
                </button>
            </div>
        </li>
    );
}

interface TodoSectionProps {
    title: string;
    todos: Todo[];
    onToggleDone: (id: number) => void;
    onRemoveTodo: (id: number) => void;
    parentRef: React.RefCallback<HTMLUListElement>;
    isCompleted?: boolean;
}

function TodoSection({ title, todos, onToggleDone, onRemoveTodo, parentRef, isCompleted }: TodoSectionProps) {
    return (
        <>
            <h2 className="text-2xl flex justify-between items-center p-4 w-full rounded-2xl">
                {title}
            </h2>
            <ul ref={parentRef} className="space-y-2">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        isCompleted={isCompleted}
                        onToggleDone={onToggleDone}
                        onRemoveTodo={onRemoveTodo}
                    />
                ))}
            </ul>
        </>
    );
}

function Todolist() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTodoText, setNewTodoText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [undoneParent] = useAutoAnimate<HTMLUListElement>();
    const [doneParent] = useAutoAnimate<HTMLUListElement>();
    const [filter, setFilter] = useState<"all" | "werk" | "school" | "prive">("all");

    useEffect(() => {
        // Load from localStorage first
        const stored = localStorage.getItem("todos");
        if (stored) {
            try {
                setTodos(JSON.parse(stored));
                return;
            } catch (err) {
                // fallback to defaults if localStorage is corrupted
            }
        }

        // Seed with default todos if nothing in localStorage
        const fetchedTodos = [
            { id: 1, text: "Buy groceries", done: true, type: "prive" },
            { id: 2, text: "Finish project", done: false, type: "werk" },
            { id: 3, text: "Call mom", done: false, type: "prive" },
        ];
        setTodos(fetchedTodos);
        localStorage.setItem("todos", JSON.stringify(fetchedTodos));
    }, []);

    useEffect(() => {
        const handleFilter = (event: Event) => {
            const custom = event as CustomEvent<string>;
            const value = custom.detail as "all" | "werk" | "school" | "prive";
            setFilter(value);
        };

        window.addEventListener("todoFilter", handleFilter as EventListener);
        return () => window.removeEventListener("todoFilter", handleFilter as EventListener);
    }, []);

    const handleAddTodo = () => {
        if (!newTodoText.trim() || !selectedCategory) {
            alert("Please fill in both fields");
            return;
        }

        const newTodo: Todo = {
            id: Date.now(),
            text: newTodoText.trim(),
            done: false,
            type: selectedCategory as "werk" | "school" | "prive",
        };

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        // Reset form
        setNewTodoText("");
        setSelectedCategory("");
        setIsModalOpen(false);
    };

    const handleRemoveTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    const handleToggleDone = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    return (
        <div>
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    type="button"
                    aria-label="Open Add Todo Modal"
                    onClick={() => setIsModalOpen((current) => !current)}
                    className="bg-purple-900 hover:bg-purple-950 hover:scale-105 rounded-4xl w-16 h-16 flex items-center justify-center transition duration-700 ease-in-out"
                >
                    <FaPlus />
                </button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddTodo}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    newTodoText={newTodoText}
                    setNewTodoText={setNewTodoText}
                />
            </div>

            <TodoSection
                title="Todo Lijst"
                todos={todos
                    .filter((todo) => !todo.done)
                    .filter((todo) => filter === "all" || todo.type === filter)}
                onToggleDone={handleToggleDone}
                onRemoveTodo={handleRemoveTodo}
                parentRef={undoneParent}
            />

            <TodoSection
                title="Done Todos"
                todos={todos
                    .filter((todo) => todo.done)
                    .filter((todo) => filter === "all" || todo.type === filter)}
                onToggleDone={handleToggleDone}
                onRemoveTodo={handleRemoveTodo}
                parentRef={doneParent}
                isCompleted
            />
        </div>  
    );
}

export default Todolist;