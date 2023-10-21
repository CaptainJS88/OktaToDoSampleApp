import React, { useState } from 'react';
import Modal from 'react-modal';

const editIcon = <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;

function TaskShow({ task, onDelete, onEdit, index }) {
    const [showEdit, setShowEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setConfirmModalOpen(true);
    };

    const toggleEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleEditSubmit = () => {
        onEdit(task.id, newTitle);
        setShowEdit(false);
    };

    const confirmDelete = () => {
        onDelete(task.id);
        setConfirmModalOpen(false);
    };

    return (
        <div id="todo-taskshow">
            {showEdit ? (
                <div id="todo-edit">
                    <form id="todo-form-edit" onSubmit={handleEditSubmit}>
                        <input className="todo-input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <button className="todo-button" type="submit">Save</button>
                    </form>
                </div>
            ) : (
                <h3 id="todo-task-title">{index +1})  {task.title}</h3>
            )}
            <button id="todo-edit" className="todo-button" onClick={toggleEdit}>{editIcon}</button>
            <button className="todo-button" onClick={handleDeleteClick}>Complete Task!</button>

            <Modal
                id="complete-confirm-modal"
                isOpen={isConfirmModalOpen}
                onRequestClose={() => setConfirmModalOpen(false)}
                contentLabel="Confirm Deletion"
            >
                <div id="todo-confirm-modal">
                    <h2>Confirm Completion</h2>
                    <p>Are you sure you want to complete and remove this task?</p>
                    <div id="todo-modal-confirm">
                        <button className="todo-button" onClick={confirmDelete}>Yes</button>
                        <button className="todo-button" onClick={() => setConfirmModalOpen(false)}>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TaskShow;
