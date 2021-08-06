package com.linkedbook.dto.report;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ReportInput {
    private int dealId;
    private String category;
    private String content;
}