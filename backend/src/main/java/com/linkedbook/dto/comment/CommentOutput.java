package com.linkedbook.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommentOutput {
    List<CommentByUserOutput> searchByUserList;
    List<CommentByBookOutput> searchByBookList;
    double bookScoreAvg;
}