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
    int userId;
    String nickname;
    String image;
    int dealCnt;
}
