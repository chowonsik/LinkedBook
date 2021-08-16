import { PersonCircle } from "react-bootstrap-icons";

import {
  Wrapper,
  Image,
  NickName,
  FollowButton,
  FollowingButton,
} from "./styles";

function FollowItem({
  profileImage,
  nickName,
  isFollow,
  isF4F,
  onClick,
  followId,
  userId,
  loginUserId,
}) {
  return (
    <>
      <Wrapper>
        {profileImage ? (
          <Image>
            <img src={profileImage} alt={nickName} />
          </Image>
        ) : (
          <PersonCircle className="profile-icon" />
        )}

        <NickName>
          <h3>{nickName}</h3>
        </NickName>
        {isF4F || isFollow ? (
          <FollowingButton
            onClick={onClick}
            id={followId}
            isEqualUser={userId !== loginUserId}
          >
            팔로잉
          </FollowingButton>
        ) : (
          <FollowButton
            onClick={onClick}
            id={userId}
            isEqualUser={userId !== loginUserId}
          >
            팔로우
          </FollowButton>
        )}
      </Wrapper>
    </>
  );
}

export default FollowItem;
