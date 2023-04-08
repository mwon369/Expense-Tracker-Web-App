import React from "react";

interface IDeletePromptProps {
  handlePromptShow: () => void;
  handleDelete: () => void;
}

const DeletePrompt = (props: IDeletePromptProps) => {
  const { handlePromptShow, handleDelete } = props;
  return (
    <>
      <div className="prompt">
        <h4>Confirm Delete</h4>
        <p>Are you sure you want to delete this transaction?</p>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="close-btn" onClick={handlePromptShow}>
          Close
        </button>
      </div>
    </>
  );
};

export default DeletePrompt;
