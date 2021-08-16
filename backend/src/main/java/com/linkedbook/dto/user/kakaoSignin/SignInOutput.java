package com.linkedbook.dto.user.kakaoSignin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SignInOutput {
    private int userId;
    private String accessToken;
}