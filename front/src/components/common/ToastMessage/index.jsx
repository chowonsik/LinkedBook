import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../../actions/Notification";
import "./style";
import { Message, Wrapper } from "./style";

export default function ToastMessage() {
  const toastShow = useSelector((state) => state.notificationReducer.toastShow);
  const toastMessage = useSelector(
    (state) => state.notificationReducer.toastMessage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastShow) {
      setTimeout(function () {
        dispatch(hideToast());
      }, 2000);
    }
  }, [toastShow]);
  return (
    <>
      <Wrapper toastShow={toastShow}>
        <Message>
          <div>{toastMessage}</div>
        </Message>
      </Wrapper>
    </>
  );
}
