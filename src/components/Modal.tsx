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
    hasError: boolean;
    setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({
    isOpen,
    onClose,
    onAdd,
    selectedCategory,
    setSelectedCategory,
    newTodoText,
    setNewTodoText,
    hasError,
    setHasError,  
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

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div
                    className={`relative w-full max-w-lg rounded-3xl p-6 shadow-2xl transform transition-all duration-300 ease-out modalBg border-2 ${
                        hasError ? "border-red-500 animate-shake" : "border-transparent"
                    }`}
                    onClick={(event) => event.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-4 p-2 rounded">Voeg een nieuwe Todo toe</h2>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="todo-category" className="text-sm font-medium">
                            Categorie
                        </label>
                        <select
                            id="todo-category"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                if (hasError) setHasError(false);
                            }}
                            className="border border-gray-700 rounded-lg px-3 py-2"
                        >
                            <option value="">Selecteer categorie</option>
                            <option value="werk">Werk</option>
                            <option value="school">School</option>
                            <option value="prive">Prive</option>
                        </select>
                        {hasError && !selectedCategory && (
                                <span className="text-xs text-red-500 pl-1 animate-fadeIn">
                                    this field is required
                                </span>
                        )}
                        <label htmlFor="todo-text" className="text-sm font-medium">
                            Todo omschrijving
                        </label>
                        <input
                            id="todo-text"
                            type="text"
                            value={newTodoText}
                            onChange={(e) => {
                                setNewTodoText(e.target.value);
                                if (hasError) setHasError(false);
                            }}
                            onKeyPress={(e) => e.key === "Enter" && onAdd()}
                            placeholder="Typ hier..."
                            className="w-full placeholder:text-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {hasError && !newTodoText.trim() && (
                                <span className="text-xs text-red-500 pl-1 animate-fadeIn">
                                    this field is required
                                </span>
                        )}
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