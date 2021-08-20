package com.linkedbook.service.social;

import com.fasterxml.jackson.databind.JsonNode;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.dto.user.signin.SocialLoginType;
import com.linkedbook.response.Response;
import com.linkedbook.serviceImpl.social.GoogleOauth;
import com.linkedbook.serviceImpl.social.KakaoOauth;

public interface SocialOauth {
    String getOauthRedirectURL();
    Response<SignInOutput> requestLogin(String code);
    String requestAccessToken(String code);
    JsonNode requestUserInfo(String accessToken);

    default SocialLoginType type() {
        if (this instanceof GoogleOauth) {
            return SocialLoginType.GOOGLE;
        } else if (this instanceof KakaoOauth) {
            return SocialLoginType.KAKAO;
        } else {
            return null;
        }
    }
}
