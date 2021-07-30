package com.linkedbook.dto.user.signin;

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