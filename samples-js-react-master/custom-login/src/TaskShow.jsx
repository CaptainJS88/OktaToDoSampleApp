// import React, { useState } from 'react';

// function TaskShow({ task, onDelete, onEdit }) {
//     const [showEdit, setShowEdit] = useState(false);
//     const [newTitle, setNewTitle] = useState(task.title);

//     const handleDeleteClick = () => {
//         const shouldDelete = window.confirm('Are you sure you want to complete and remove this task?');
      
//         if (shouldDelete) {
//           onDelete(task.id);
//         }
//       };
      

//     const toggleEdit = () => {
//         setShowEdit(!showEdit);
//     }

//     const handleEditSubmit = () => {
//         onEdit(task.id, newTitle);
//         setShowEdit(false);
//     }

//     return (
//         <div id="todo-taskshow">
//             {showEdit ? (
//                 <div>
//                     <form onSubmit={handleEditSubmit}>
//                     <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
//                     <button type="submit">Save</button>
//                     </form>
//                 </div>
//             ) : (
//                 <h3>{task.title}</h3>
//             )}
//             <button onClick={toggleEdit}>Edit</button>
//             <button onClick={handleDeleteClick}>Complete Task!</button>
//         </div>
//     )
// }

// export default TaskShow;


import React, { useState } from 'react';
import Modal from 'react-modal'; // Import the Modal component from react-modal

function TaskShow({ task, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); 

  const handleDeleteClick = () => {
    setConfirmModalOpen(true); // Open the confirmation modal
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
    setConfirmModalOpen(false); // Close the confirmation modal after confirming
  };

  return (
    <div id="todo-taskshow">
      {showEdit ? (
        <div>
          <form onSubmit={handleEditSubmit}>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <button type="submit">Save</button>
          </form>
        </div>
      ) : (
        <h3>{task.title}</h3>
      )}
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={handleDeleteClick}>Complete Task!</button>

      {/* The confirmation modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setConfirmModalOpen(false)}
        contentLabel="Confirm Deletion"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to complete and remove this task?</p>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={() => setConfirmModalOpen(false)}>No</button>
      </Modal>
    </div>
  );
}

export default TaskShow;
