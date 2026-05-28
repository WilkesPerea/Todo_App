import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    newTodoText: string;
    setNewTodoText: React.Dispatch<React.SetStateAction<string>>;
};

function Modal({
    isOpen,
    onClose,
    onAdd,
    selectedCategory,
    setSelectedCategory,
    newTodoText,
    setNewTodoText,
}: ModalProps) {
    const [render, setRender] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
        setRender(true);
        setVisible(true)
        return;
        }

        setVisible(false);
        const timeout = window.setTimeout(() => setRender(false), 300);
        return () => window.clearTimeout(timeout);
    }, [isOpen]);

    if (!render) return null;

    return (
        <>
        <div
            className={`fixed inset-0 backdrop-blur-0 transition-all duration-300 ease-out ${
            visible ? "backdrop-blur-sm" : ""
            }`}
            onClick={onClose}
        />
        <div
            className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${
            visible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
            className={`relative w-full max-w-lg rounded-3xl p-6 shadow-2xl transform transition-all duration-300 ease-out ${
                visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
            onClick={(event) => event.stopPropagation()}
            >
            <h2 className="text-xl font-bold mb-4 p-2 rounded">Add New Todo</h2>
            <div className="flex flex-col gap-3">
                <label htmlFor="todo-category" className="text-sm font-medium">
                Category
                </label>
                <select
                id="todo-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-700 rounded-lg px-3 py-2"
                >
                <option value="">Select category</option>
                <option value="werk">Werk</option>
                <option value="school">School</option>
                <option value="prive">Prive</option>
                </select>
                <label htmlFor="todo-text" className="text-sm font-medium">
                Todo description
                </label>
                <input
                id="todo-text"
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onAdd()}
                placeholder="Enter a new todo..."
                className="w-full placeholder:text-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-evenly">
                <button
                aria-label="Close Modal"
                type="button"
                className="mt-4 w-40 mr-2 bg-red-700 flex items-center justify-center rounded-lg px-4 py-2 hover:scale-105 transition duration-700 ease-in-out"
                onClick={onClose}
                >
                <FaXmark />
                </button>
                <button
                    aria-label="Add Todo"
                    type="button"
                    className="mt-4 w-40 ml-2 bg-green-700 flex items-center justify-center rounded-lg px-4 py-2 hover:scale-105 transition duration-700 ease-in-out"
                    onClick={onAdd}
                >
                <FaCheck />
                </button>
            </div>
            </div>
        </div>
        </>
    );
}


export default Modal;