package com.linkedbook.dto.alert;

import com.linkedbook.dto.common.CommonCommentOutput;
import com.linkedbook.dto.common.CommonDealOutput;
import com.linkedbook.dto.common.CommonUserOutput;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class AlertSearchOutput {
    private int id;
    private AlertStatus type;
    private String status;
    private int evalId;
    private CommonDealOutput deal;
    private CommonCommentOutput comment;
    private CommonUserOutput fromUser;
    private Date created_at;
}
