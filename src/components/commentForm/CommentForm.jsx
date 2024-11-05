/** @format */

import { useState } from "react";

const CommentForm = ({
  setIsShowCommentForm,
  comments,
  setComments,
  handleReplySubmit,
  isReply,
  parentCommentId,
  setIsReply,
  setParentCommentId,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [textComment, setTextComment] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isReply && parentCommentId) {
      handleReplySubmit(parentCommentId, textComment, name, email);
    } else {
      const newComment = {
        id: Date.now(),
        name,
        email,
        textComment,
        replies: [],
        isLiked: false,
      };
      setComments([...comments, newComment]);
    }
    setName("");
    setEmail("");
    setTextComment("");
    setIsShowCommentForm(false);
    setIsReply(false);
    setParentCommentId(null);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="textarea">Write your opinion</label>
          <textarea
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            name="textarea"
            id="textarea"
            rows="10"
            cols="50"
            required></textarea>
        </div>
        <div className="form-btn">
          <button className="form-submit-btn" type="submit">
            Submit
          </button>
          <button
            className="form-cancel-btn"
            type="button"
            onClick={() => {
              setIsShowCommentForm(false);
              setIsReply(false);
              setParentCommentId(null);
            }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
