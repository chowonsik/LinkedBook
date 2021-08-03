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
public class FollowUser {
    private int userId;
    private String email;
    private String nickname;
    private String image;
    private String status;
    private Date created_at;
    private Date updated_at;
}
