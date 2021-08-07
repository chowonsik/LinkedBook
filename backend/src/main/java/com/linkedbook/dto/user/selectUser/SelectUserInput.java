package com.linkedbook.dto.user.selectUser;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class SelectUserInput {
    String type;
    String nickname;
    int areaId;
    int page;
    int size;
}
