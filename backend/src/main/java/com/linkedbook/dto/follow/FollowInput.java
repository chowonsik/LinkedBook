package com.linkedbook.dto.follow;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class FollowInput {
    private int toUserId;
    private int fromUserId;
}