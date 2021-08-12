package com.linkedbook.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommonCommentOutput {
    private int id;
    private double score;
    private String content;
    private List<CommonCategoryOutput> categories;
    private Date created_at;
    private Date updated_at;
}
