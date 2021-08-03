package com.linkedbook.service;

import com.linkedbook.dto.user.selectprofile.SelectProfileOutput;
import com.linkedbook.dto.user.signin.SignInInput;
import com.linkedbook.response.Response;
import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.dto.user.signup.SignUpInput;
import com.linkedbook.dto.user.signup.SignUpOutput;
import com.linkedbook.dto.user.updateprofile.UpdateProfileInput;
import com.linkedbook.dto.user.updateprofile.UpdateProfileOutput;

public interface UserService {
    Response<SignInOutput> signIn(SignInInput signInInput);
    Response<SignUpOutput> signUp(SignUpInput signUpInput);
    Response<SelectProfileOutput> selectProfile(int id);
    Response<Object> updateProfile(int id, UpdateProfileInput updateProfileInput);
}
