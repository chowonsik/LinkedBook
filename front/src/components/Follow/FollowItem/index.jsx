import {
  Wrapper,
  Image,
  NickName,
  FollowButton,
  FollowingButton,
} from "./styles";

function FollowItem({ profileImage, nickName, isFollow, onClick, userId }) {
  return (
    <>
      <Wrapper>
        <Image>
          <img src={profileImage} alt={nickName} />
        </Image>
        <NickName>
          <h3>{nickName}</h3>
        </NickName>
        <FollowButton isFollow={isFollow} onClick={onClick} id={userId}>
          팔로우
        </FollowButton>
        <FollowingButton isFollow={isFollow} onClick={onClick} id={userId}>
          팔로잉
        </FollowingButton>
      </Wrapper>
    </>
  );
}

export default FollowItem;
