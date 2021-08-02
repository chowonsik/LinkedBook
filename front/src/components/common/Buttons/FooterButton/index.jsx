import { Button } from "./styles";

function FooterButton({ value, onClick }) {
  return <Button onClick={onClick}>{value}</Button>;
}

export default FooterButton;
