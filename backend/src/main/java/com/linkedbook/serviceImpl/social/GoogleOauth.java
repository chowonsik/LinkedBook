package com.linkedbook.serviceImpl.social;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.user.signin.OauthOutput;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.social.SocialOauth;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.linkedbook.response.ResponseStatus.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoogleOauth implements SocialOauth {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final String GOOGLE_OAUTH_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private final String GOOGLE_OAUTH_TOKEN_BASE_URL = "https://oauth2.googleapis.com/token";
    private final String GOOGLE_OAUTH_RESOURCE_BASE_URL = "https://www.googleapis.com/oauth2/v2/userinfo";
    private final String GOOGLE_OAUTH_CALLBACK_URL = "http://i5b307.p.ssafy.io/auth/google/callback";

    @Value("${custom.oauth2.google.client.id}")
    private String GOOGLE_OAUTH_CLIENT_ID;
    @Value("${custom.oauth2.google.client.secret}")
    private String GOOGLE_OAUTH_CLIENT_SECRET;

    @Override
    public String getOauthRedirectURL() {
        Map<String, Object> params = new HashMap<>();
        params.put("scope", "profile email");
        params.put("response_type", "code");
        params.put("client_id", GOOGLE_OAUTH_CLIENT_ID);
        params.put("redirect_uri", GOOGLE_OAUTH_CALLBACK_URL);

        String parameterString = params.entrySet().stream()
                .map(x -> x.getKey() + "=" + x.getValue())
                .collect(Collectors.joining("&"));
        return GOOGLE_OAUTH_BASE_URL + "?" + parameterString;
    }

    @Override
    public Response<SignInOutput> requestLogin(String code) {
        // 1. code 로 Access token 정보 요청
        String googleAccessToken = this.requestAccessToken(code);
        if (googleAccessToken == null) {
            log.error("[auth/google/callback/get] UNAUTHORIZED ACCESS TOKEN error");
            return new Response<>(UNAUTHORIZED_TOKEN);
        }
        // 2. Access Token 으로 사용자 정보 반환
        JsonNode userInfo = this.requestUserInfo(googleAccessToken);
        if (userInfo == null) {
            log.error("[auth/google/callback/get] UNAUTHORIZED ACCESS TOKEN error");
            return new Response<>(UNAUTHORIZED_TOKEN);
        }
        String googleId = userInfo.get("id").asText();
        String email = userInfo.get("email").asText();
        String nickname = userInfo.get("name").asText();
        String image = userInfo.get("picture").asText();
        // 3. user 정보 가져오기
        UserDB userDB;
        try {
            List<UserDB> userDBs = userRepository.findByOauthIdAndStatus(googleId, "ACTIVATE");
            if (userDBs.size() == 0) { // 최초 로그인
                SignInOutput oauthOutput =
                        SignInOutput.builder()
                                .oauth(
                                        OauthOutput.builder()
                                                .type("GOOGLE")
                                                .id(googleId)
                                                .email(email)
                                                .nickname(nickname)
                                                .image(image)
                                                .build()).build();
                return new Response<>(oauthOutput, NEED_SIGNUP);
            }
            if (!StringUtils.isNotEmpty(userDBs.get(0).getOauthId())) { // 기존에 이메일로 가입했을 경우
                userDBs.get(0).setOauth("GOOGLE");
                userDBs.get(0).setOauthId(googleId);
                userDB = userRepository.save(userDBs.get(0));
            } else {
                userDB = userDBs.get(0);
            }
        } catch (Exception e) {
            log.error("[auth/google/callback/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 4. access token 생성
        String accessToken;
        try {
            accessToken = jwtService.createAccessToken(userDB.getId());
            if (accessToken.isEmpty()) {
                return new Response<>(FAILED_TO_CREATE_TOKEN);
            }
        } catch (Exception e) {
            return new Response<>(FAILED_TO_CREATE_TOKEN);
        }
        // 5. 결과 return
        SignInOutput signInOutput = SignInOutput.builder().
                userId(userDB.getId())
                .accessToken(accessToken)
                .oauth(
                        OauthOutput.builder()
                                .type("GOOGLE")
                                .id(googleId)
                                .email(email)
                                .nickname(nickname)
                                .image(image)
                                .build()).build();
        return new Response<>(signInOutput, SUCCESS_SIGN_IN);
    }

    @Override
    public String requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", GOOGLE_OAUTH_CLIENT_ID);
        params.put("client_secret", GOOGLE_OAUTH_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_OAUTH_CALLBACK_URL);
        params.put("grant_type", "authorization_code");

        String accessToken = null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            ResponseEntity<String> responseEntity =
                    restTemplate.postForEntity(GOOGLE_OAUTH_TOKEN_BASE_URL, params, String.class);
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                accessToken = mapper.readTree(responseEntity.getBody()).get("access_token").toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return accessToken;
    }

    @Override
    public JsonNode requestUserInfo(String accessToken) {
        // 구글 서버에 요청
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpGet get = new HttpGet(GOOGLE_OAUTH_RESOURCE_BASE_URL);

        get.addHeader("Authorization", "Bearer " + accessToken); // add header

        JsonNode returnNode = null;
        try {
            final HttpResponse response = client.execute(get);
            final int responseCode = response.getStatusLine().getStatusCode();
            if (responseCode == 200) {
                ObjectMapper mapper = new ObjectMapper();
                returnNode = mapper.readTree(response.getEntity().getContent());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return returnNode;
    }
}
