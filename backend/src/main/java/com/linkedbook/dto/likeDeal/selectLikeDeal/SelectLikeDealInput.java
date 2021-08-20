package com.linkedbook.dto.likeDeal.selectLikeDeal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SelectLikeDealInput {
    private int userId;
    private int page;
    private int size;
}
