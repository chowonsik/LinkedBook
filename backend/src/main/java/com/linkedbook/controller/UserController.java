package com.linkedbook.controller;

import com.linkedbook.dto.user.email.EmailInput;
import com.linkedbook.dto.user.email.EmailOutput;
import com.linkedbook.dto.user.jwt.JwtOutput;
import com.linkedbook.dto.user.selectUser.SelectUserInput;
import com.linkedbook.dto.user.selectUser.SelectUserOutput;
import com.linkedbook.dto.user.selectprofile.SelectProfileOutput;
import com.linkedbook.dto.user.signin.SignInInput;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.dto.user.signup.SignUpOutput;
import com.linkedbook.dto.user.updateprofile.UpdateProfileInput;
import com.linkedbook.dto.user.signup.SignUpInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.linkedbook.response.ResponseStatus.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    /**
     * 회원가입 API [POST] /users/signup
     * 
     * @return Response<SignUpOutput>
     */
    // Body
    @PostMapping("/signup")
    public Response<SignUpOutput> signUp(@RequestBody SignUpInput signUpInput) {
        log.info("[POST] /users/signup");
        return userService.signUp(signUpInput);
    }

    /**
     * 로그인 API [POST] /users/signin
     * 
     * @return Response<SignInOutput>
     */
    // Body
    @PostMapping("/signin")
    public Response<SignInOutput> signIn(@RequestBody SignInInput signInInput) {
        log.info("[POST] /users/signin");
        return userService.signIn(signInInput);
    }

    /**
     * 유저 프로필 조회 API [GET] /users/:id/profile
     * 
     * @return Response<SelectProfileOutput>
     */
    // Path-variable
    @ResponseBody
    @GetMapping("/{id}/profile")
    public Response<SelectProfileOutput> selectProfile(@PathVariable("id") int userId) {
        log.info("[GET] /users/" + userId + "/profile");
        return userService.selectProfile(userId);
    }

    /**
     * 유저 프로필 수정 API [PATCH]] /users/:id/profile
     * 
     * @return Response<SelectProfileOutput>
     */
    // Path-variable
    @PatchMapping
    public Response<Object> updateProfile(@RequestBody UpdateProfileInput updateProfileInput) {
        System.out.println("[PATCH] /user/{id}/profile");
        return userService.updateProfile(updateProfileInput);
    }

    /**
     * 유저 조회 API [GET] /users
     * 
     * @return Response<List<SelectUserOutput>>
     */
    // Params
    @GetMapping
    public PageResponse<SelectUserOutput> selectUser(SelectUserInput selectUserInput) {
        log.info("[GET] /users");
        return userService.selectUser(selectUserInput);
    }

    /**
     * 회원탈퇴 API
     * [PATCH] /users/deactivate
     * @return Response<Object>
     */
    // Body
    @PatchMapping("/deactivate")
    public Response<Object> changeDeleteStatus() {
        log.info("[PATCH] /users/deactivate");
        return userService.changeDeleteStatus();
    }

    @PostMapping("/jwt")
    public Response<JwtOutput> jwt() {
        System.out.println("[POST] /user/jwt");
        int userId = jwtService.getUserId();
        if (userId == -1)
            return new Response<>(UNAUTHORIZED_TOKEN);
        if (userId == -2)
            return new Response<>(BAD_ACCESS_TOKEN_VALUE);
        if (userId == -3)
            return new Response<>(FORBIDDEN_USER_ID);
        JwtOutput jwtOutput = new JwtOutput(userId);
        return new Response<>(jwtOutput, SUCCESS_SIGN_IN);
    }

    /**
     * 이메일 인증 API [POST] /users/email
     * 
     * @return Response<EmailOutput>
     */
    // Body
    @PostMapping("/email")
    public Response<EmailOutput> mailSend(@RequestBody EmailInput emailInput) {
        log.info("[POST] /users/email");
        return userService.sendMail(emailInput);
    }
}
