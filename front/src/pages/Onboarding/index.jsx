import React, { useEffect } from "react";
import { Content, Footer, Logo, Wrapper } from "./style";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
export default function Onboarding() {
  const history = useHistory();
  const data = [
    {
      image: "images/i1.png",
      text: "다양한 책의 리뷰와 합리적인 가격으로 책을 만나보세요",
    },
    {
      image: "images/i2.png",
      text: "개인 책방을 운영하며 다른 사람들과 책을 거래해봐요",
    },
    {
      image: "images/i3.png",
      text: "책을 통해 다양한 사람들과 연결해보세요",
    },
  ];
  const setting = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    className: "slider",
  };
  useEffect(() => {
    localStorage.setItem("onboarding", "true");
  }, []);
  return (
    <Wrapper>
      <Logo>
        <img src="assets/images/logo/main-logo.png" alt="로고" />
      </Logo>
      <Content>
        <Slider {...setting}>
          {data.map((item, i) => (
            <div className="item">
              <div className="container">
                <div className="image-container">
                  <img src={item.image} alt="img" />
                </div>
                <div className="text-container">
                  <div className="text">{item.text}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Content>
      <Footer>
        <button
          onClick={() => {
            history.push("/signin");
          }}
        >
          링크드북 시작하기
        </button>
      </Footer>
    </Wrapper>
  );
}
