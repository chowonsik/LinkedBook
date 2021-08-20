import { PersonCircle } from "react-bootstrap-icons";
import { Wrapper, Image, MessageBox, UserName, Message } from "./styles";

function ChatLogBox({ userType, userName, message, profileImage, createdAt }) {
  if (userType) {
    return (
      <Wrapper userType={userType}>
        <MessageBox userType={userType}>
          <UserName>{userName}</UserName>
          <Message>{message}</Message>
          <p>{createdAt}</p>
        </MessageBox>
        {profileImage ? (
          <Image src={profileImage} />
        ) : (
          <PersonCircle className="profile-icon" />
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper userType={userType}>
        {profileImage ? (
          <Image src={profileImage} />
        ) : (
          <PersonCircle className="profile-icon" />
        )}
        <MessageBox userType={userType}>
          <UserName>{userName}</UserName>
          <Message>{message}</Message>
          <p>{createdAt}</p>
        </MessageBox>
      </Wrapper>
    );
  }
}

export default ChatLogBox;
