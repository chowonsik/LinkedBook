package com.linkedbook.dto.user.signin;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class OauthOutput {
    private String type;
    private String id;
    private String email;
    private String nickname;
    private String image;
}
