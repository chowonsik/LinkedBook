import "./style.scss";
import UserListItem from "../UserListItem";

const UserList = () => {
  return (
    <div className="user-list">
      <UserListItem nickname={"대웅짱1234"} count={30} />
      <UserListItem nickname={"대웅이는 못말려"} count={28} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
      <UserListItem nickname={"대웅이는 대우"} count={26} />
    </div>
  );
};

export default UserList;
