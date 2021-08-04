import React, { useState } from "react";
import { Plus, X } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Header from "../../../components/Layout/Header";
import { Wrapper } from "./style";

export default function LocationSetting() {
  const [locations, setLocations] = useState([
    { name: "덕명동", isSelected: true },
    { name: "변동", isSelected: false },
  ]);

  const history = useHistory();

  function handleSelectLocation(selectedIdx) {
    setLocations(
      locations.map((location, i) =>
        i === selectedIdx
          ? { ...location, isSelected: true }
          : { ...location, isSelected: false }
      )
    );
  }

  function handleDeleteLocation(selectedIdx) {
    setLocations(locations.filter((location, i) => i !== selectedIdx));
  }

  function handleAddLocation() {
    setLocations([...locations, { name: "샘플", isSelected: false }]);
  }

  function handleComplete() {
    history.push({ pathname: "/" });
  }

  function renderLocation(location, i) {
    return (
      <div
        className={`container location ${
          location.isSelected ? "selected" : ""
        }`}
      >
        <span
          className="name-container"
          onClick={() => {
            handleSelectLocation(i);
          }}
        >
          <span className="name">{location.name}</span>
        </span>
        {
          <span
            className={`icon ${i === 0 || location.isSelected ? "hide" : ""}`}
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

  function renderLocations() {
    const components = [];
    for (let i = 0; i < locations.length; i++) {
      components.push(renderLocation(locations[i], i));
    }
    if (locations.length < 3) {
      components.push(renderAddButton());
    }
    return components;
  }
  return (
    <>
      <Header title="동네 설정" isBack />
      <Wrapper>{renderLocations()}</Wrapper>
      <FooterButton value="선택 완료" onClick={handleComplete} />
    </>
  );
}
