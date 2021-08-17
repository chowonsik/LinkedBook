package com.linkedbook.dto.user.signin;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class SignInOutput {
    private int userId;
    private String accessToken;
    private OauthOutput oauth;
}