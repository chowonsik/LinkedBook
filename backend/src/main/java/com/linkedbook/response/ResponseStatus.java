package com.linkedbook.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 HTTP 에러 코드
 */
@AllArgsConstructor
@Getter
public enum ResponseStatus {
    /*
     * 2XX Success
     */
    // 200 OK - 클라이언트의 요청을 서버가 정상적으로 처리했다.
    SUCCESS(200, 200, "요청에 성공하였습니다."), SUCCESS_SIGN_IN(200, 201, "로그인에 성공하였습니다."),
    SUCCESS_GET_FOLLOW_LIST(200, 202, "팔로우 리스트를 가져오는데 성공하였습니다."),
    SUCCESS_CHANGE_FOLLOW(200, 203, "팔로우 활성화 상태를 변경하는데 성공하였습니다."), SUCCESS_SELECT_PROFILE(200, 204, "프로필 조회에 성공하였습니다."),
    SUCCESS_SELECT_DEAL_LIST(200, 205, "거래 조회에 성공하였습니다."), SUCCESS_CHANGE_DEAL(200, 206, "거래 수정에 성공하였습니다."),
    // 201 Created - 클라이언트의 요청을 서버가 정상적으로 처리했고 새로운 리소스가 생겼다.,
    CREATED(201, 200, "리소스 생성에 성공하였습니다."), CREATED_USER(201, 201, "회원가입에 성공하였습니다."),
    CREATED_FOLLOW(201, 202, "새로운 팔로우 관계 등록에 성공하였습니다."), CREATED_DEAL(201, 203, "거래글 등록에 성공하였습니다."),

    // 202 Accepted - 클라이언트의 요청은 정상적이나, 서버가 아직 요청을 완료하지 못했다. 비동기
    ACCEPTED(202, 200, "요청에 성공하였습니다."),

    // 204 No Content - 클라이언트의 요청은 정상적이다. 하지만 컨텐츠를 제공하지 않는다.
    NO_CONTENT(204, 200, "요청에 성공하였습니다."),

    /*
     * 4XX Client errors
     */
    // 400 Rad Request - 클라이언트의 요청이 유효하지 않아 더 이상 작업을 진행하지 않는 경우
    BAD_REQUEST(400, 400, "요청에 실패하였습니다."), FAILED_TO_REQUEST(400, 401, "데이터를 불러오는데 실패하였습니다."),
    FAILED_TO_CREATE_TOKEN(400, 402, "토큰 생성에 실패하였습니다."), FAILED_TO_SIGN_IN(400, 403, "로그인에 실패하였습니다."),
    EXISTS_EMAIL(400, 404, "이미 존재하는 이메일입니다."), EXISTS_NICKNAME(400, 405, "이미 존재하는 닉네임입니다."),
    NO_VALUES(400, 410, "입력되지 않은 값이 존재합니다."), BAD_ACCESS_TOKEN_VALUE(400, 411, "accessToken을 입력해주세요."),
    BAD_EMAIL_VALUE(400, 412, "올바른 이메일을 입력해주세요."), BAD_PASSWORD_VALUE(400, 413, "올바른 비밀번호를 입력해주세요."),
    BAD_NAME_VALUE(400, 414, "올바른 이름을 입력해주세요."), BAD_FOLLOW_INFO_VALUE(400, 415, "올바른 팔로우 관계를 입력해주세요."),
    BAD_ID_VALUE(400, 416, "올바른 아이디를 입력해주세요."), BAD_STATUS_VALUE(400, 417, "올바른 상태를 입력해주세요."),
    BAD_AREA_VALUE(400, 416, "올바른 지역을 입력해주세요."),

    // 401 Unauthorized - 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우
    UNAUTHORIZED(401, 400, "권한이 없습니다."), UNAUTHORIZED_TOKEN(401, 410, "유효하지 않은 토큰입니다."),

    // 403 Forbidden - 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우
    FORBIDDEN(403, 400, "권한이 없습니다."), FORBIDDEN_USER_ID(403, 410, "해당 userId에 대한 권한이 없습니다."),

    // 404 Not Found - 클라이언트가 요청한 자원이 존재하지 않다.
    NOT_FOUND(404, 400, "NOT FOUND"), NOT_FOUND_USER(404, 405, "사용자 정보가 존재하지 않습니다."),

    // 405 Method Not Allowed - 클라이언트의 요청이 허용되지 않는 메소드인 경우
    METHOD_NOT_ALLOWED(405, 400, "허용되지 않는 HTTP Method 입니다."),

    // 409 Conflict - 클라이언트의 요청이 서버의 상태와 충돌이 발생한 경우
    CONFLICT(409, 400, "충돌이 발생하였습니다."),

    // 429 Too Many Requests - 클라이언트가 일정 시간 동안 너무 많은 요청을 보낸 경우
    TOO_MANY_REQUESTS(429, 400, "요청이 너무 많습니다."),

    /*
     * 5XX Server errors
     */
    // 500 내부 서버 오류가 발생한 경우
    SERVER_ERROR(500, 500, "서버와의 통신에 실패하였습니다."), INFOTECH_SERVER_ERROR(500, 501, "서버와의 통신에 실패하였습니다."),
    DATABASE_ERROR(500, 502, "데이터베이스 연결에 실패하였습니다.");

    private final int status;
    private final int code;
    private final String message;
}