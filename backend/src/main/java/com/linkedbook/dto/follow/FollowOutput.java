package com.linkedbook.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class FollowOutput {
    private int followId;
    private FollowUser user;
    private boolean f4f;
    private FollowStatus status;
    private Date created_at;
    private Date updated_at;
}
