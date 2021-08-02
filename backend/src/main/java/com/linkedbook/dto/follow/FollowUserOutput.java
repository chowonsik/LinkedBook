package com.linkedbook.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FollowUserOutput {
    private int id;
    private FollowUser user;
    private FollowStatus status;
    private Date created_at;
    private Date updated_at;
}
