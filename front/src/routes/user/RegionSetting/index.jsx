import "./style.scss";
import React from "react";
import { Plus, X } from "react-bootstrap-icons";

const RegionSetting = () => {
  return (
    <div className="region-setting">
      <div className="wrap">
        <h1>내 지역 설정</h1>
        <div className="region-container">
          <div className="region-box">
            <div className="dong">덕명동</div>
            <div className="button">
              <X size={30} />
            </div>
          </div>
          <div className="region-box">
            <div className="dong">역삼동</div>
            <div className="button">
              <X size={30} />
            </div>
          </div>
          <div className="region-box">
            <div className="dong"></div>
            <div className="button">
              <Plus size={30} />
            </div>
          </div>
        </div>
        <button className="button">선택 완료</button>
      </div>
    </div>
  );
};

export default RegionSetting;
