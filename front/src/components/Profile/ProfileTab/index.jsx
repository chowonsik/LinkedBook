import React from "react";
import { Wrapper } from "./styles";

const ProfileTab = ({ handleTabClick, activeTab }) => {
  return (
    <Wrapper>
      <ul className="tabs">
        <li
          onClick={() => handleTabClick(0)}
          className={activeTab === 0 ? "active" : ""}
        >
          판매중
        </li>
        <li
          onClick={() => handleTabClick(1)}
          className={activeTab === 1 ? "active" : ""}
        >
          관심거래
        </li>
      </ul>
    </Wrapper>
  );
};

export default ProfileTab;
