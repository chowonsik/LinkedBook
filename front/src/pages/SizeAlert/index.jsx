import React, { useLayoutEffect, useState, useEffect } from "react";
import { Wrapper, Bar, ProgressBar, Icon } from "./styles";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth - 600, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function SizeAlert() {
  const [width, height] = useWindowSize();

  return (
    <Wrapper>
      <h3>화면이 너무 넓어요😅</h3>
      <h3>화면의 크기를 줄여주세요</h3>
      <Bar initWidth={window.innerWidth - 250}>
        <Icon pos={width - 5}>🚗</Icon>
        <ProgressBar width={width} />
      </Bar>
    </Wrapper>
  );
}

export default SizeAlert;
