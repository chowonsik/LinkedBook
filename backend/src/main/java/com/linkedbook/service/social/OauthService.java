package com.linkedbook.service.social;

import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.response.Response;

public interface OauthService {
    void request(String type);
    Response<SignInOutput> requestLogin(String type, String code);
    SocialOauth findSocialOauthByType(String type);
}
