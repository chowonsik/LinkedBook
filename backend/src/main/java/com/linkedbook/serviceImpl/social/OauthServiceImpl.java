package com.linkedbook.serviceImpl.social;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.dto.user.signin.SocialLoginType;
import com.linkedbook.response.Response;
import com.linkedbook.service.social.OauthService;
import com.linkedbook.service.social.SocialOauth;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service("OauthService")
@RequiredArgsConstructor
@Slf4j
public class OauthServiceImpl implements OauthService {

    private final List<SocialOauth> socialOauthList;
    private final HttpServletResponse response;

    @Override
    public void request(String type) {
        SocialOauth socialOauth = this.findSocialOauthByType(type);
        String redirectURL = socialOauth.getOauthRedirectURL();
        try {
            response.sendRedirect(redirectURL);
        } catch (IOException e) {
            log.error("[auth/get] FAILED TO SOCIAL LOGIN exception", e);
        }
    }

    @Override
    public Response<SignInOutput> requestLogin(String type, String code) {
        SocialOauth socialOauth = this.findSocialOauthByType(type);
        return socialOauth.requestLogin(code);
    }

    @Override
    public SocialOauth findSocialOauthByType(String type) {
        // 값 형식 체크
        boolean isError = validateInputValue(type);
        if (isError) return null;

        SocialLoginType socialLoginType = SocialLoginType.valueOf(type.toUpperCase());
        return socialOauthList.stream()
                .filter(x -> x.type() == socialLoginType)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("알 수 없는 SocialLoginType 입니다."));
    }

    private boolean validateInputValue(String type) {
        try {
            if (!ValidationCheck.isValid(type)) return true;
            SocialLoginType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.error("[auth/get] undefined social login exception", e);
            return true;
        }

        return false;
    }
}
