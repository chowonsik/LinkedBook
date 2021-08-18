package com.linkedbook.dto.userDeal.selectUserDeal;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
@Setter
public class SelectUserDealInput {
    private int userId;
    private String type;
    private int page;
    private int size;
}
