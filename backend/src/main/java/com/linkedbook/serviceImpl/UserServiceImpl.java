package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dto.user.selectprofile.SelectProfileOutput;
import com.linkedbook.dto.user.signin.SignInInput;
import com.linkedbook.dto.user.signup.SignUpInput;
import com.linkedbook.entity.AreaDB;
import com.linkedbook.entity.UserAreaDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.UserService;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dao.AreaRepository;
import com.linkedbook.dao.UserAreaRepository;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.dto.user.signup.SignUpOutput;

import org.apache.commons.lang3.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;


import static com.linkedbook.model.Role.EMPLOYEE;
import static com.linkedbook.response.ResponseStatus.*;

@Service("UserService")
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserAreaRepository userAreaRepository;
    @Autowired
    private final AreaRepository areaRepository;
    @Autowired
    private final JwtService jwtService;


    @Override
    public Response<SignInOutput> signIn(SignInInput signInInput) {
        // 1. 값 형식 체크
        if (signInInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(signInInput.getEmail()))    return new Response<>(BAD_EMAIL_VALUE);
        if (!ValidationCheck.isValid(signInInput.getPassword())) return new Response<>(BAD_PASSWORD_VALUE);

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
            return new Response<>(DATABASE_ERROR);
        }

        // 3. access token 생성
        String accessToken;
        try{
            accessToken = jwtService.createAccessToken(EMPLOYEE, userDB.getId());
            if (accessToken.isEmpty()) {
                return new Response<>(FAILED_TO_CREATE_TOKEN);
            }
        } catch (Exception e) {
            return new Response<>(FAILED_TO_CREATE_TOKEN);
        }

        // 4. 결과 return
        SignInOutput signInOutput = new SignInOutput(userDB.getId(), accessToken);
        return new Response<>(signInOutput, SUCCESS_SIGN_IN);
    }

    @Override
    @Transactional
    public Response<SignUpOutput> signUp(SignUpInput signUpInput) {
        // 1. 값 형식 체크
        if (signUpInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(signUpInput.getEmail()))    return new Response<>(BAD_EMAIL_VALUE);
        if (!ValidationCheck.isValid(signUpInput.getPassword())) return new Response<>(BAD_PASSWORD_VALUE);
        if (!ValidationCheck.isValid(signUpInput.getNickname()))     return new Response<>(BAD_NAME_VALUE);

        // 2. 유저 생성
        UserDB userDB = UserDB.builder().email(signUpInput.getPassword()).password(signUpInput.getPassword()).nickname(signUpInput.getNickname()).info(signUpInput.getInfo()).image(signUpInput.getImage()).status("ACTIVATE").build();
        UserAreaDB userAreaDB;
        try {
            String email = signUpInput.getEmail();
            List<UserDB> existUsers = userRepository.findByEmailAndStatus(email, "ACTIVATE");
            if (existUsers.size() > 0) {
                return new Response<>(EXISTS_EMAIL);
            } else {
                userDB = userRepository.save(userDB);
            }
            AreaDB areaDB = areaRepository.findById(signUpInput.getAreaId()).orElse(null);
            
            // 해당 지역 번호가 없을 때
            if (areaDB == null) {
                return new Response<>(BAD_AREA_VALUE);
            }

            userAreaDB = UserAreaDB.builder().user(userDB).area(areaDB).orders(1).status("ACTIVATE").build();
            userAreaRepository.save(userAreaDB);
        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 토큰 생성
        String accessToken;
        try {
            accessToken = jwtService.createAccessToken(EMPLOYEE, userDB.getId());
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
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(selectProfileOutput, SUCCESS_SELECT_PROFILE);
    }
}
