package com.linkedbook.dto.comment.like;

import com.linkedbook.dto.common.CommonFollowOutput;
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
public class LikeCommentOutput {
    private int id;
    private CommonUserOutput user;
    private CommonFollowOutput follow;
    private Date created_at;
    private Date updated_at;
}
