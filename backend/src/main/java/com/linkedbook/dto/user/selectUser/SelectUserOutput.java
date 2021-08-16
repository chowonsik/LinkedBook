package com.linkedbook.dto.user.selectUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class SelectUserOutput {
    private int userId;
    private String nickname;
    private String image;
    private int dealCnt;
}
