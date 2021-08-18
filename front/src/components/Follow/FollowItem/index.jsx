import { Link } from "react-router-dom";
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
        <Link to={`/profile/${userId}`}>
          <Image>
            <img
              src={profileImage}
              alt={nickName}
              onError={(e) => {
                e.target.src =
                  "https://www.voakorea.com/themes/custom/voa/images/Author__Placeholder.png";
              }}
            />
          </Image>
        </Link>
        <NickName>
          <Link to={`/profile/${userId}`}>
            <h3>{nickName}</h3>
          </Link>
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
