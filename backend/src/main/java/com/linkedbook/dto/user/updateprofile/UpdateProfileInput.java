package com.linkedbook.dto.user.updateprofile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
public class UpdateProfileInput {
    private String password;
    private String nickname;
    private String info;
    private String image;
    private int areaId;
}
