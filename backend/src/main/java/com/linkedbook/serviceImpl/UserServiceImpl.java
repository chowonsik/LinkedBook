package com.linkedbook.serviceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.DealRepository;
import com.linkedbook.dto.user.selectUser.SelectUserOutput;
import com.linkedbook.dto.user.email.EmailInput;
import com.linkedbook.dto.user.email.EmailOutput;
import com.linkedbook.dto.user.signin.KakaoSignInInput;
import com.linkedbook.dto.user.selectUser.SelectUserInput;
import com.linkedbook.dto.user.selectprofile.SelectProfileOutput;
import com.linkedbook.dto.user.signin.SignInInput;
import com.linkedbook.dto.user.signup.SignUpInput;
import com.linkedbook.entity.AreaDB;
import com.linkedbook.entity.UserAreaDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.UserService;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dao.AreaRepository;
import com.linkedbook.dao.UserAreaRepository;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.dto.user.signup.SignUpOutput;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.RandomStringUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.data.domain.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import static com.linkedbook.response.ResponseStatus.*;

@Service("UserService")
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserAreaRepository userAreaRepository;
    private final AreaRepository areaRepository;
    private final DealRepository dealRepository;
    private final JwtService jwtService;

    private final JavaMailSender mailSender;

    private final String userRequestURL = "https://kapi.kakao.com/v2/user/me";

    @Override
    public Response<SignInOutput> signIn(SignInInput signInInput) {
        // 1. 값 형식 체크
        if (signInInput == null)
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(signInInput.getEmail()))
            return new Response<>(BAD_EMAIL_VALUE);
        if (!ValidationCheck.isValid(signInInput.getPassword()))
            return new Response<>(BAD_PASSWORD_VALUE);

        // 2. user 정보 가져오기
        UserDB userDB;
        try {
            String email = signInInput.getEmail();
            String password = signInInput.getPassword();
            List<UserDB> userDBs = userRepository.findByEmailAndStatus(email, "ACTIVATE");
            if (userDBs.size() == 0) {
                return new Response<>(NOT_FOUND_USER);
            } else if (!userDBs.get(0).getPassword().equals(password)) {
                return new Response<>(FAILED_TO_SIGN_IN);
            } else {
                userDB = userDBs.get(0);
            }
        } catch (Exception e) {
            log.error("[users/signin/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        // 3. access token 생성
        String accessToken;
        try {
            accessToken = jwtService.createAccessToken(userDB.getId());
            if (accessToken.isEmpty()) {
                return new Response<>(FAILED_TO_CREATE_TOKEN);
            }
        } catch (Exception e) {
            return new Response<>(FAILED_TO_CREATE_TOKEN);
        }

        // 4. 결과 return
        SignInOutput signInOutput = SignInOutput.builder()
                .userId(userDB.getId())
                .accessToken(accessToken)
                .build();
        return new Response<>(signInOutput, SUCCESS_SIGN_IN);
    }

    @Override
    @Transactional
    public Response<SignUpOutput> signUp(SignUpInput signUpInput) {
        // 1. 값 형식 체크
        if (signUpInput == null)
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(signUpInput.getEmail()))
            return new Response<>(BAD_EMAIL_VALUE);
        if (!ValidationCheck.isValid(signUpInput.getPassword()))
            return new Response<>(BAD_PASSWORD_VALUE);
        if (!ValidationCheck.isValid(signUpInput.getNickname()))
            return new Response<>(BAD_NAME_VALUE);

        // 2. 유저 생성
        UserDB userDB = UserDB.builder().email(signUpInput.getEmail()).password(signUpInput.getPassword())
                .nickname(signUpInput.getNickname()).info(signUpInput.getInfo()).image(signUpInput.getImage())
                .oauth(signUpInput.getOauth()).oauthId(signUpInput.getOauthId()).status("ACTIVATE").build();
        UserAreaDB userAreaDB;
        try {
            String email = signUpInput.getEmail();
            String nickname = signUpInput.getNickname();
            List<UserDB> existUsers = userRepository.findByEmailAndStatus(email, "ACTIVATE");
            List<UserDB> existNickname = userRepository.findByNicknameAndStatus(nickname, "ACTIVATE");

            if (existUsers.size() > 0) { // 이메일 중복 제어
                return new Response<>(EXISTS_EMAIL);
            } else if (existNickname.size() > 0) { // 닉네임 중복 제어
                return new Response<>(EXISTS_NICKNAME);
            } else {
                userDB = userRepository.save(userDB);
            }
            AreaDB areaDB = areaRepository.findById(signUpInput.getAreaId()).orElse(null);

            // 해당 지역 번호가 없을 때
            if (areaDB == null) {
                return new Response<>(BAD_AREA_VALUE);
            }

            userAreaDB = UserAreaDB.builder().user(userDB).area(areaDB).orders(1).build();
            userAreaRepository.save(userAreaDB);
        } catch (Exception e) {
            log.error("[users/signup/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 토큰 생성
        String accessToken;
        try {
            accessToken = jwtService.createAccessToken(userDB.getId());
            if (accessToken.isEmpty()) {
                return new Response<>(FAILED_TO_CREATE_TOKEN);
            }
        } catch (Exception exception) {
            return new Response<>(FAILED_TO_CREATE_TOKEN);
        }

        // 4. 결과 return
        SignUpOutput signUpOutput = new SignUpOutput(userDB.getId(), accessToken);
        return new Response<>(signUpOutput, CREATED_USER);
    }

    @Override
    public Response<SelectProfileOutput> selectProfile(int id) {
        SelectProfileOutput selectProfileOutput;
        try {
            // 유저 id 가져오기
            int myId = jwtService.getUserId();
            selectProfileOutput = userRepository.findUserProfile(id, myId);
        } catch (Exception e) {
            log.error("[users/" + id + "/profile/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(selectProfileOutput, SUCCESS_SELECT_PROFILE);
    }

    @Override
    public PageResponse<SelectUserOutput> selectUser(SelectUserInput selectUserInput) {
        // 1. 값 형식 체크
        if (selectUserInput == null)
            return new PageResponse<>(NO_VALUES);
        if (!ValidationCheck.isValidPage(selectUserInput.getPage())
                || !ValidationCheck.isValidId(selectUserInput.getSize()))
            return new PageResponse<>(BAD_REQUEST);
        if (selectUserInput.getType().equals("SEARCH")) {
            if (!ValidationCheck.isValid(selectUserInput.getNickname()))
                return new PageResponse<>(BAD_REQUEST);
        } else if (selectUserInput.getType().equals("STAR")) {
            if (!ValidationCheck.isValidId(selectUserInput.getAreaId()))
                return new PageResponse<>(BAD_REQUEST);
        } else {
            return new PageResponse<>(BAD_SEARCH_TYPE_VALUE);
        }
        // 2. 일치하는 유저 정보 가져오기
        Page<SelectUserOutput> responseList;
        Pageable paging;
        try {
            Page<UserDB> userDBList;
            if (selectUserInput.getType().equals("SEARCH")) { // 유저 닉네임으로 검색 (닉네임 순으로 정렬)
                String selectNickname = selectUserInput.getNickname();
                paging = PageRequest.of(selectUserInput.getPage(), selectUserInput.getSize(), Sort.Direction.ASC,
                        "nickname");
                userDBList = userRepository.findByStatusAndNicknameContaining("ACTIVATE", selectNickname, paging);
            } else { // 유저 거래지역으로 검색 (책 판매량 많은 순으로 정렬)
                int selectAreaId = selectUserInput.getAreaId();
                int userId = jwtService.getUserId();
                if (userId < 0) {
                    log.error("[users/get] NOT FOUND LOGIN USER error");
                    return new PageResponse<>(BAD_ID_VALUE);
                }
                paging = PageRequest.of(selectUserInput.getPage(), selectUserInput.getSize());
                userDBList = userRepository.findAreaStar(userId, selectAreaId, paging);
            }
            // 최종 출력값 정리
            responseList = userDBList.map(userDB -> SelectUserOutput.builder().userId(userDB.getId())
                    .nickname(userDB.getNickname()).image(userDB.getImage())
                    .dealCnt(dealRepository.countByUserAndStatusNot(userDB, "DELETED")).build());
        } catch (Exception e) {
            log.error("[users/get] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new PageResponse<>(responseList, SUCCESS_SELECT_USER);
    }

    @Override
    public Response<EmailOutput> sendMail(EmailInput emailInput) {
        String generatedString = RandomStringUtils.random(10, true, true);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailInput.getEmail());
        message.setSubject("linkedbook 이메일 인증번호");
        message.setText(generatedString);
        EmailOutput emailOutput = EmailOutput.builder().auth(generatedString).build();

        mailSender.send(message);

        // 결과 return
        return new Response<>(emailOutput, SUCCESS_SENDMAIL);
    }

    @Override
    @Transactional
    public Response<SignInOutput> signInKakao(KakaoSignInInput kakaoSignInInput) {
        // 1. 카카오 서버에 요청
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpPost post = new HttpPost(userRequestURL);

        post.addHeader("Authorization", "Bearer " + kakaoSignInInput.getAccess_token());

        JsonNode json = null;

        HttpResponse response;
        UserDB userDB;
        try {
            response = client.execute(post);
            ObjectMapper mapper = new ObjectMapper();
            if (response.getStatusLine().getStatusCode() == 200) {
                json = mapper.readTree(response.getEntity().getContent());
            } else {
                return new Response<>(UNAUTHORIZED_TOKEN);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        long kakaoId = json.get("id").asLong();
        String name = json.get("kakao_account").get("profile").get("nickname").toString();
        name = name.substring(1, name.length() - 1);
        String picture = null;
        if (json.get("kakao_account").get("profile").has("profile_image_url")) {
            picture = json.get("kakao_account").get("profile").get("profile_image_url").toString();
            picture = picture.substring(1, picture.length() - 1);
            String temp = picture.substring(0, 4);
            String temp2 = picture.substring(4, picture.length());
            picture = temp + "s" + temp2; // https 작업
        }
        String email = null;
        if (json.get("kakao_account").has("email")) {
            email = json.get("kakao_account").get("email").toString();
            email = email.substring(1, email.length() - 1);
        }

        // 2. user 정보 가져오기
        try {
            List<UserDB> userDBs = userRepository.findByEmailAndStatus(email, "ACTIVATE");
            if (userDBs.size() == 0) { // 이메일이 존재하지 않는 경우 추가정보 입력페이지로 이동 시키기
                return new Response<>(NEED_SIGNUP);
            }
            if (!StringUtils.isNotEmpty(userDBs.get(0).getOauthId())) { // 기존에 이메일로 가입했을 경우
                userDBs.get(0).setOauth("KAKAO");
                userDBs.get(0).setOauthId(Long.toString(kakaoId));
                userDB = userRepository.save(userDBs.get(0));
            } else {
                userDB = userDBs.get(0);
            }
        } catch (Exception e) {
            log.error("[users/signin/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        // 3. access token 생성
        String accessToken;
        try {
            accessToken = jwtService.createAccessToken(userDB.getId());
            if (accessToken.isEmpty()) {
                return new Response<>(FAILED_TO_CREATE_TOKEN);
            }
        } catch (Exception e) {
            return new Response<>(FAILED_TO_CREATE_TOKEN);
        }

        // 4. 결과 return
        SignInOutput signInOutput = SignInOutput.builder()
                .userId(userDB.getId())
                .accessToken(accessToken)
                .build();
        return new Response<>(signInOutput, SUCCESS_SIGN_IN);
    }
}
