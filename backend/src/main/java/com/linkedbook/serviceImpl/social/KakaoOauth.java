package com.linkedbook.serviceImpl.social;

import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.response.Response;
import com.linkedbook.service.social.SocialOauth;
import org.springframework.stereotype.Component;

@Component
public class KakaoOauth implements SocialOauth {
    @Override
    public String getOauthRedirectURL() {
        return "";
    }

    @Override
    public Response<SignInOutput> requestLogin(String code) {
        return null;
    }
}
