import { Wrapper, Buttons, Button } from "./styles";
function Category({ onClick }) {
  return (
    <>
      <Wrapper>
        <h3>신고 항목</h3>
        <Buttons onClick={onClick}>
          <Button id="spam">스팸성 홍보</Button>
          <Button id="illegal-act">불법 행위</Button>
          <Button id="bad-manners">배미너 행위</Button>
          <Button id="etc">기타</Button>
        </Buttons>
      </Wrapper>
    </>
  );
}

export default Category;
