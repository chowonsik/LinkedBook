package com.linkedbook.dto.user.updateprofile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@NoArgsConstructor
@Getter
public class UpdateProfileInput {
    private String password;
    private String nickname;
    private String info;
    private String image;
    private List<UserAreaInput> area;
}
