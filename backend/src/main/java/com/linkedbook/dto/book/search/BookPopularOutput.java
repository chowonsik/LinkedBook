package com.linkedbook.dto.book.search;

import com.linkedbook.entity.PopularCategoryView;
import com.linkedbook.entity.PopularCommentView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class BookPopularOutput {
    private double avgScore; // 한줄평 평균 점수
    List<PopularCategoryView> categories; // 인기 카테고리
    List<PopularCommentView> comments; // 인기 한줄평
}
