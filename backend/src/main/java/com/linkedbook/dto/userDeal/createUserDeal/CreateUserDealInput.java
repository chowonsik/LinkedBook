package com.linkedbook.dto.userDeal.createUserDeal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
public class CreateUserDealInput {
    private int dealId;
    private int userId;
    private double score;
}
