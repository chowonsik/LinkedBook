package com.linkedbook.dto.user.signup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SignUpOutput {
    private int userId;
    private String accessToken;
}
