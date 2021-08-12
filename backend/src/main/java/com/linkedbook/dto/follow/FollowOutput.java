package com.linkedbook.dto.follow;

import com.linkedbook.dto.common.CommonFollowOutput;
import com.linkedbook.dto.common.CommonUserOutput;
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
    private int id;
    private CommonUserOutput user;
    private CommonFollowOutput follow;
    private Date created_at;
    private Date updated_at;
}
