package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.AES128;
import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.DealRepository;
import com.linkedbook.dto.user.selectUser.SelectUserOutput;
import com.linkedbook.dto.user.email.EmailInput;
import com.linkedbook.dto.user.email.EmailOutput;
import com.linkedbook.dto.user.selectUser.SelectUserInput;
import com.linkedbook.dto.user.selectprofile.SelectProfileOutput;
import com.linkedbook.dto.user.signin.SignInInput;
import com.linkedbook.dto.user.signin.SocialLoginType;
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
import com.linkedbook.dto.user.updateprofile.UpdateProfileInput;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.RandomStringUtils;

import org.springframework.data.domain.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import static com.linkedbook.response.ResponseStatus.*;
import static com.linkedbook.configuration.ConstantConfig.*;

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
            String password = new AES128(USER_INFO_PASSWORD_KEY).encrypt(signInInput.getPassword());
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
        SignInOutput signInOutput = SignInOutput.builder().userId(userDB.getId()).accessToken(accessToken).build();
        return new Response<>(signInOutput, SUCCESS_SIGN_IN);
    }

    @Override
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
        UserDB userDB;
        UserAreaDB userAreaDB;
        try {
            String email = signUpInput.getEmail();
            String nickname = signUpInput.getNickname();
            boolean existUsers = userRepository.existsByEmailAndStatus(email, "ACTIVATE");
            boolean existNickname = userRepository.existsByNicknameAndStatus(nickname, "ACTIVATE");
            String password = new AES128(USER_INFO_PASSWORD_KEY).encrypt(signUpInput.getPassword());
            userDB = UserDB.builder().email(signUpInput.getEmail()).password(password)
                    .nickname(signUpInput.getNickname()).info(signUpInput.getInfo()).image(signUpInput.getImage())
                    .oauth(signUpInput.getOauth() == null ? null : SocialLoginType.valueOf(signUpInput.getOauth()))
                    .oauthId(signUpInput.getOauthId()).status("ACTIVATE").build();

            if (existUsers) { // 이메일 중복 제어
                return new Response<>(EXISTS_EMAIL);
            } else if (existNickname) { // 닉네임 중복 제어
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
    @Transactional
    public Response<Object> updateProfile(UpdateProfileInput updateProfileInput) {
        UserDB userDB;
        try {
            // 유저 id 가져오기
            int myId = jwtService.getUserId();
            UserDB selectUser = userRepository.findByIdAndStatus(myId, "ACTIVATE");
            userDB = selectUser;

            // 입력 값 벨리데이션
            if (StringUtils.isNotBlank(updateProfileInput.getPassword()))
                userDB.setPassword(new AES128(USER_INFO_PASSWORD_KEY).encrypt(updateProfileInput.getPassword()));
            if (StringUtils.isNotBlank(updateProfileInput.getNickname()))
                userDB.setNickname(updateProfileInput.getNickname());
            if (StringUtils.isNotBlank(updateProfileInput.getInfo()))
                userDB.setInfo(updateProfileInput.getInfo());
            if (StringUtils.isNotBlank(updateProfileInput.getImage()))
                userDB.setImage(updateProfileInput.getImage());
            if (ValidationCheck.isValidId(updateProfileInput.getAreaId())) {
                UserAreaDB userAreaDB;
                Optional<UserAreaDB> getUserAreaDB = userAreaRepository.findByUserIdAndOrders(myId, 1);
                AreaDB areaDB = areaRepository.findById(updateProfileInput.getAreaId()).orElse(null);
                // 해당 지역 번호가 없을 때
                if (areaDB == null || !getUserAreaDB.isPresent()) {
                    return new Response<>(BAD_AREA_VALUE);
                }
                userAreaDB = getUserAreaDB.get();
                userAreaDB.setArea(areaDB);
                userAreaRepository.save(userAreaDB);
            }
            userRepository.save(userDB);
        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(null, SUCCESS_UPDATE_PROFILE);
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
    public Response<Object> changeDeleteStatus() {
        // 1. 로그인한 유저 정보 가져오기
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if(loginUserDB == null) {
                log.error("[users/patch] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            // 2. 로그인한 유저 상태 DELETED 로 변경
            loginUserDB.setStatus("DELETED");
            userRepository.save(loginUserDB);
        } catch (Exception e) {
            log.error("[users/patch] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_USER);
    }

    @Override
    public Response<EmailOutput> sendMail(EmailInput emailInput) {
        // 1. 값 형식 체크
        if (emailInput == null)
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(emailInput.getEmail()))
            return new Response<>(BAD_REQUEST);
        // 2. 중복 메일인지 체크
        try {
            if (userRepository.existsByEmailAndStatus(emailInput.getEmail(), "ACTIVATE")) {
                log.error("[users/email/post] DUPLICATE EMAIL error");
                return new Response<>(EXISTS_EMAIL);
            }
        } catch (Exception e) {
            log.error("[users/email/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 인증 메일 전송
        EmailOutput emailOutput;
        try {
            String generatedString = RandomStringUtils.random(10, true, true);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(emailInput.getEmail());
            message.setSubject("[LinkedBook] 회원가입 이메일 인증번호입니다.");
            message.setText(generatedString);
            emailOutput = EmailOutput.builder().auth(generatedString).build();
            mailSender.send(message);
        } catch (Exception e) {
            log.error("[users/email/post] send email error", e);
            return new Response<>(FAILED_TO_SEND_EMAIL);
        }
        // 4. 결과 return
        return new Response<>(emailOutput, SUCCESS_SEND_MAIL);
    }
}
