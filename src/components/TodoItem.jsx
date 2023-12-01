/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "./Layout";
import { getTodoById, updateTodo, deleteTodo } from "../services/indexedDB";

const TodoItem = () => {
  const { id } = useParams();
  const [currentTodo, setCurrentTodo] = useState(null);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, { text: comment, replies: [] }]);
      setComment("");
    }
  };

  const handleReply = (commentIndex) => {
    if (reply.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.push(reply);
      setComments(updatedComments);
      setReply("");
    }
  };

  const handleEdit = () => {
    // Redirect to the edit page with the todo item details
    navigate(`/add/${currentTodo.id}`, { state: { currentTodo } });
  };

  const handleDelete = async () => {
    // Implement your delete logic here
    try {
      await deleteTodo(currentTodo.id);
      // Redirect to the home page after successful deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const todoDetails = await getTodoById(Number(id));
        setCurrentTodo(todoDetails);
      } catch (error) {
        console.error("Error fetching todo details:", error);
      }
    };

    fetchTodoDetails();
  }, [id]);

  if (!currentTodo) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">{currentTodo.title}</h2>
        <p className="text-gray-700 mb-2">{currentTodo.description}</p>
        <p className="text-gray-700 mb-2">
          Due Date: {new Date(currentTodo.dueDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">Label: {currentTodo.label}</p>
        <p className="text-gray-700 mb-2">
          Completed: {currentTodo.isChecked ? "Yes" : "No"}
        </p>

        {/* Comment section */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Add Comment
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddComment}
            >
              Add
            </button>
          </div>
        </div>

        {/* Display comments */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comments
          </label>
          <ul>
            {comments.map((commentObj, commentIndex) => (
              <li key={commentIndex} className="text-gray-700">
                {commentObj.text}
                {commentObj.replies.length > 0 && (
                  <ul className="ml-4">
                    {commentObj.replies.map((replyText, replyIndex) => (
                      <li key={replyIndex}>{replyText}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Reply to this comment"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleReply(commentIndex)}
                  >
                    Reply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Edit and Delete buttons */}
        <div className="flex mt-4 space-x-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
