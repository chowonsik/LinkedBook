package com.linkedbook.dto.user.signin;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SignInInput {
    private String email;
    private String password;
}
