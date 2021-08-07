package com.linkedbook.dto.user.selectUser;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SelectUserInput {
    String type;
    String nickName;
    int areaId;
    int page;
    int size;
}
