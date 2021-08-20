import { Modal, Wrapper } from "./style";

export default function DeleteConfirm({
  confirmShow,
  onCancleButtonClick,
  onDeleteButtonClick,
}) {
  return (
    <>
      <Wrapper confirmShow={confirmShow}></Wrapper>
      <Modal confirmShow={confirmShow}>
        <div className="message-container">
          <span className="message">정말 삭제하시겠습니까?</span>
        </div>
        <div className="button-container">
          <button className="cancel" onClick={onCancleButtonClick}>
            취소
          </button>
          <button className="delete" onClick={onDeleteButtonClick}>
            삭제
          </button>
        </div>
      </Modal>
    </>
  );
}
