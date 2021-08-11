package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.DealRepository;
import com.linkedbook.dao.ReportRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.report.ReportInput;
import com.linkedbook.dto.report.ReportStatus;
import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.ReportDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.ReportService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;


@Service("ReportService")
@AllArgsConstructor
@Slf4j
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final DealRepository dealRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createReport(ReportInput reportInput) {
        // 1. 값 형식 체크
        Response<Object> errorResponse = validateInputValue(reportInput);
        if (errorResponse != null) return errorResponse;

        // 2. 신고 정보 생성
        try {
            UserDB loginUserDB = userRepository.findById(jwtService.getUserId()).orElse(null);
            DealDB dealDB = dealRepository.findById(reportInput.getDealId()).orElse(null);
            if(loginUserDB == null) {
                log.error("[reports/post] NOT FOUND USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            if(dealDB == null) {
                log.error("[reports/post] NOT FOUND DEAL error");
                return new Response<>(NOT_FOUND_DEAL);
            }

            ReportDB reportDB = ReportDB.builder()
                    .user(loginUserDB)
                    .deal(dealDB)
                    .category(ReportStatus.valueOf(reportInput.getCategory()))
                    .content(reportInput.getContent())
                    .build();

            reportRepository.save(reportDB);

        } catch (Exception e) {
            log.error("[reports/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_REPORT);
    }

    private Response<Object> validateInputValue(ReportInput reportInput) {
        try {
            if (reportInput == null) return new Response<>(NO_VALUES);
            if (!ValidationCheck.isValidId(reportInput.getDealId())
                    || !ValidationCheck.isValid(reportInput.getCategory())
                    || !ValidationCheck.isValid(reportInput.getContent())) {
                return new Response<>(BAD_REQUEST);
            }
            ReportStatus.valueOf(reportInput.getCategory());
        } catch (IllegalArgumentException e) {
            log.error("[reports/post] undefined category exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        }

        return null;
    }

}
