/** @format */

const ModalBtn = ({ setIsShowCommentForm }) => {
  return (
    <div>
      <button onClick={() => setIsShowCommentForm(true)} className="modal-button">
        Write Your Opinion
        <div className="modal-hover-effect">
          <div></div>
        </div>
      </button>
    </div>
  );
};

export default ModalBtn;
