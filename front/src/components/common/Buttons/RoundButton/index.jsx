import { Button } from "./styles";

function RoundButton({
  value,
  width,
  height,
  borderRadius,
  color,
  backgroundColor,
  fontSize,
  onClick,
}) {
  return (
    <>
      <Button
        width={width}
        height={height}
        borderRadius={borderRadius}
        color={color}
        backgroundColor={backgroundColor}
        fontSize={fontSize}
        onClick={onClick}
      >
        {value}
      </Button>
    </>
  );
}

export default RoundButton;
