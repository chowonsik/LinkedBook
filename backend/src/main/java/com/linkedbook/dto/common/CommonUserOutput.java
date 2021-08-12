package com.linkedbook.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommonUserOutput {
    private int id;
    private String email;
    private String nickname;
    private String image;
    private Date created_at;
    private Date updated_at;
}