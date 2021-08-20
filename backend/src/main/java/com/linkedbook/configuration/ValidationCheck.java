package com.linkedbook.configuration;

import java.util.Date;

public class ValidationCheck {
    public static boolean isValid(String value) {
        return (value != null && !value.isEmpty());
    }

    public static boolean isValidId(int id) {
        return (id > 0);
    }

    public static boolean isValidScore(double score) {
        return (score > 0 && score <= 5);
    }

    public static boolean isValidPage(int page) {
        return (page >= 0);
    }

    public static boolean isValidDate(Date date) {
        return (date != null);
    }

    /**
     * @param info URL에 파라미터로 들어온 값
     * @return info 값이 정상이면 true, 비정상이면 false
     */
    public static boolean isValidFollowInfo(String info) {
        return (info.equals("follower")) || (info.equals("following"));
    }

    public static boolean isValidPrice(int price) {
        return (price > 0);
    }

    public static boolean isValidCategoryArray(int[] categories) {
        return (categories != null && categories.length <= 3);
    }
}
