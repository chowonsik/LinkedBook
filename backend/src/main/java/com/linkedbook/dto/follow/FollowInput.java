package com.linkedbook.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FollowInput {
    private int toUserId;
    private int fromUserId;
    private String status;
}