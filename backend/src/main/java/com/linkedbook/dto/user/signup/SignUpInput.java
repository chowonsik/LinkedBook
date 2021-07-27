package com.linkedbook.dto.user.signup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SignUpInput {
    private String email;
    private String password;
    private String nickname;
    private String info;
    private String image;
    private String oauth;
}
