import UserList from "../../../components/user/UserList";
import "./style.scss";
const LinkedStar = () => {
  return (
    <div className="linked-star">
      <div className="wrap">
        <h1>Linked Star</h1>
        <h2>활동이 활발한 책방을 추천해드려요.</h2>
      </div>
      <UserList />
      <button className="button">건너뛰기</button>
    </div>
  );
};

export default LinkedStar;
