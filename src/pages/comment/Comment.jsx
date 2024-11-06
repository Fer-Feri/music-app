/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faReply } from "@fortawesome/free-solid-svg-icons";
import mainComment from "../../assets/images/main-comment.jpg";
import replyComment from "../../assets/images/reply-comment.jpg";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalBtn from "../../components/modalBtn/ModalBtn";
import CommentForm from "../../components/commentForm/CommentForm";

const Comment = () => {
  const [isShowCommentForm, setIsShowCommentForm] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [nextId, setNextId] = useState(1);

  const handleReplySubmit = (commentId, replyText, replyAuthor, replyEmail) => {
    const newReply = {
      id: nextId,
      name: replyAuthor || "Reply Author",
      email: replyEmail || "reply@example.com",
      textComment: replyText,
      isLiked: false,
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment
      )
    );

    // افزایش nextId برای ریپلای
    setNextId((prevId) => prevId + 1);
  };

  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    // افزایش nextId برای کامنت جدید
    setNextId((prevId) => prevId + 1);
  };

  const handleLikeToggle = (commentId, replyId = null) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            const updatedReplies = comment.replies.map((reply) =>
              reply.id === replyId ? { ...reply, isLiked: !reply.isLiked } : reply
            );
            return { ...comment, replies: updatedReplies };
          } else {
            return { ...comment, isLiked: !comment.isLiked };
          }
        }
        return comment;
      })
    );
  };

  return (
    <div>
      <h2 className="comment-title">
        <span>
          Comments
          <FontAwesomeIcon icon={faGhost} />
        </span>
        <ModalBtn setIsShowCommentForm={setIsShowCommentForm} />
      </h2>
      <div className="comment-container">
        {isShowCommentForm && (
          <CommentForm
            setIsShowCommentForm={setIsShowCommentForm}
            setComments={setComments}
            comments={comments}
            handleReplySubmit={handleReplySubmit}
            handleCommentSubmit={handleCommentSubmit} // اضافه کردن این تابع
            isReply={isReply}
            parentCommentId={parentCommentId}
            setIsReply={setIsReply}
            setParentCommentId={setParentCommentId}
          />
        )}

        {/* Display comments */}
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <span className="comment-line"></span>
            <div className="main-comment">
              <div className="comment-image">
                <img src={mainComment} alt="" />
              </div>
              <div className="comment-content">
                <div className="comment-details">
                  <div className="comment-author">
                    <span className="comment-author-name">{comment.name}</span>
                    <span className="comment-author-time">Just now</span>
                  </div>
                  <div className="comment-icon">
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => handleLikeToggle(comment.id)}
                      style={{ color: comment.isLiked ? "red" : "" }}
                    />
                    <FontAwesomeIcon
                      icon={faReply}
                      onClick={() => {
                        setIsShowCommentForm(true);
                        setParentCommentId(comment.id);
                        setIsReply(true);
                      }}
                    />
                  </div>
                </div>
                <div className="comment-des">{comment.textComment}</div>
              </div>
            </div>

            {/* Display replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="reply-comments">
                {comment.replies.map((reply) => (
                  <div className="reply-comment" key={reply.id}>
                    <span className="reply-comment-line"></span>
                    <div className="reply-main-comment">
                      <div className="comment-image">
                        <img src={replyComment} alt="" />
                      </div>
                      <div className="comment-content">
                        <div className="comment-details">
                          <div className="comment-author">
                            <span className="comment-author-name">{reply.name}</span>
                            <span className="comment-author-time">Just now</span>
                          </div>
                          <div className="comment-icon">
                            <FontAwesomeIcon
                              icon={faHeart}
                              onClick={() => handleLikeToggle(comment.id, reply.id)} // Pass both comment ID and reply ID
                              style={{ color: reply.isLiked ? "red" : "" }}
                            />
                          </div>
                        </div>
                        <div className="comment-des">{reply.textComment}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
