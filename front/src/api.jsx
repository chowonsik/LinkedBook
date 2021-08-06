import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: "KakaoAK 30a622c4a81a7598f9de414dfabc31c9", // 공통으로 요청 할 헤더
  },
});

export const KakaoBook = (params) => {
  return Kakao.get("/v3/search/book", { params });
};
