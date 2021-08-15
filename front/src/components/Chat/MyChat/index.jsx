import { Container } from "./style";

export default function MyChat({ message, createdAt }) {
  function dateToString(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour >= 12) {
      return `오후 ${hour === 12 ? hour : hour - 12}:${
        minute < 10 ? "0" + minute : minute
      }`;
    } else {
      return `오전 ${hour}:${minute < 10 ? "0" + minute : minute}`;
    }
  }
  return (
    <Container>
      <div className="createdAt">{dateToString(createdAt)}</div>
      <div className="message">{message}</div>
    </Container>
  );
}
