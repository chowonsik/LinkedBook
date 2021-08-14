package com.linkedbook.dto.alert;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AlertInput {
    private String type;
    private int commentId;
    private int dealId;
    private int evalId;
    private int toUserId;
}
