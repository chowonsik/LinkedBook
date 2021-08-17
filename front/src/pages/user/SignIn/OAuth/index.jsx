import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { requestGet } from "../../../../api.js";
import { showToast } from "../../../../actions/Notification";

export default function OauthLogin() {
    const history = useHistory();
    const dispatch = useDispatch();

    const authenticate = useCallback(async () => {
        const paths = window.location.pathname.split('/');
        const response = await requestGet(`/auth/${paths[2]}/callback` + window.location.search);
        console.log(response);
        // reponse 처리
        if (response.isSuccess) {
            if (response.status === 400) { // oauth 최초 로그인
                const oauthUser = response.result.oauth;
                dispatch(showToast("최초 로그인시, 추가 정보 기입이 필요합니다."));
                history.replace({ pathname: "/signup", state: { oauthUser: oauthUser } });

            } else if (response.status === 200) {
                const loginUser = {
                    email: response.result.oauth.email,
                    id: response.result.userId,
                    accessToken: response.result.accessToken,
                };
                localStorage.setItem("loginUser", JSON.stringify(loginUser));
                const needRecommend = localStorage.getItem("needRecommend");
                if (needRecommend === "false") {
                    history.replace({ pathname: "/" });
                } else {
                    history.replace({ pathname: "/recommend" });
                }

            }
        } else {
            dispatch(showToast("소셜 로그인에 실패하였습니다."));
            history.replace({ pathname: "/signin" });
        }
    }, []);

    useEffect(() => {
      authenticate().then();
    }, [authenticate]);
  
    return <div>Loading...</div>;
  }