import "./style.scss";
import { Search, GeoAlt } from "react-bootstrap-icons";
const RegionSearch = () => {
  return (
    <div className="region-search">
      <div className="wrap">
        <div className="search-bar">
          <div className="icon">
            <Search size={14} className="search-icon" />
          </div>
          <input type="text" placeholder="동네 이름(동,읍,면)으로 검색" />
        </div>
        <button className="button">
          <GeoAlt size={14} />
          <span>현재 위치로 찾기</span>
        </button>
      </div>
      <div className="dong-list">
        <div className="dong-list-item">대전 서구 월평1동</div>
        <div className="dong-list-item">대전 유성구 하기동</div>
        <div className="dong-list-item">대전 유성구 세동</div>
        <div className="dong-list-item">대전 유성구 어은동</div>
        <div className="dong-list-item">대전 유성구 덕명동</div>
      </div>
    </div>
  );
};

export default RegionSearch;
