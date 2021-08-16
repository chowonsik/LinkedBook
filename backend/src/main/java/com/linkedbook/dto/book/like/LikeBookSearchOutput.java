package com.linkedbook.dto.book.like;

import com.linkedbook.dto.common.CommonFollowOutput;
import com.linkedbook.dto.common.CommonProfileBookOutput;
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
public class LikeBookSearchOutput {
    private int id;

    // 유저 정보
    private CommonUserOutput user;
    // 로그인한 유저와의 팔로우 정보
    private CommonFollowOutput follow;
    // 책 정보
    private CommonProfileBookOutput book;

    private Date created_at;
    private Date updated_at;
}
