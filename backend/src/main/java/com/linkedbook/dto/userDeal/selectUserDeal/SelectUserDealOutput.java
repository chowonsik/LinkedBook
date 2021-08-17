package com.linkedbook.dto.userDeal.selectUserDeal;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SelectUserDealOutput {
    private int userDealId;
    private int dealId;
    private String imageUrl;
    private Date created_at;
    private Date updated_at;
}
