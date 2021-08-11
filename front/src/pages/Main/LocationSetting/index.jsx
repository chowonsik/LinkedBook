import React, { useEffect, useState } from "react";
import { Plus, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteArea, setSelectedAreaIndex } from "../../../actions/Users";
import { request } from "../../../api";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Header from "../../../components/Layout/Header";
import { Wrapper } from "./style";

export default function LocationSetting() {
  const areas = useSelector((state) => state.userReducer.areas);
  const selectedAreaIndex = useSelector(
    (state) => state.userReducer.selectedAreaIndex
  );
  const [selectedIndex, setSelectedIndex] = useState(selectedAreaIndex);

  const history = useHistory();
  const dispatch = useDispatch();

  function handleDeleteLocation(deleteIndex) {
    if (deleteIndex < selectedIndex) {
      setSelectedIndex(deleteIndex);
    }
    dispatch(deleteArea(deleteIndex));
  }

  function handleAddLocation() {
    history.push({ pathname: "/search/location", state: { isAreaAdd: true } });
  }

  function handleAreaClick(i) {
    setSelectedIndex(i);
  }

  function handleComplete() {
    dispatch(setSelectedAreaIndex(selectedIndex));
    history.push({ pathname: "/" });
  }

  function renderLocation(location, i) {
    return (
      <div
        className={`container location ${
          selectedIndex === i ? "selected" : ""
        }`}
      >
        <span
          className="name-container"
          onClick={() => {
            handleAreaClick(i);
          }}
        >
          <span className="name">{location.areaDongmyeonri}</span>
        </span>
        {
          <span
            className={`icon ${i === 0 || selectedIndex === i ? "hide" : ""}`}
            onClick={() => handleDeleteLocation(i)}
          >
            <X />
          </span>
        }
      </div>
    );
  }
  function renderAddButton() {
    return (
      <div className="container add-button" onClick={handleAddLocation}>
        <span className="icon">
          <Plus />
        </span>
      </div>
    );
  }

  function renderAreas() {
    const components = [];
    for (let i = 0; i < areas.length; i++) {
      components.push(renderLocation(areas[i], i));
    }
    if (areas.length < 3) {
      components.push(renderAddButton());
    }
    return components;
  }

  function requestUpdate() {
    const data = areas.map((area, i) => {
      return { areaId: area.areaId, orders: i + 1 };
    });
    const requestData = {
      area: data,
    };
    request("POST", "/user-areas", requestData);
  }

  useEffect(() => {
    requestUpdate();
  }, [areas]);

  return (
    <>
      <Header title="동네 설정" />
      <Wrapper>{renderAreas()}</Wrapper>
      <FooterButton value="선택 완료" onClick={handleComplete} />
    </>
  );
}
