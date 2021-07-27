package com.linkedbook.configuration;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ValidationCheck {
    public static boolean isValid(String value) { return (value != null && !value.isEmpty()); }

    public static boolean isValidId(int id) { return (id > 0); }

    public static boolean isValidNum(String num) {
        try {
            Double.parseDouble(num);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    public static boolean isValidPage(int page) { return (page >= 0); }

    public static boolean isValidDate(Date date) { return (date != null); }

    public static boolean isValidDate(int date) { return (date > 0) && isValidDate(String.valueOf(date)); }

    public static boolean isValidDate(String date) {
        if (!isValid(date)) return false;
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            dateFormat.setLenient(false);
            dateFormat.parse(date);
            return  true;
        } catch (ParseException e){
            return  false;
        }
    }

    public static boolean isValidTime(String time) {
        if (!isValid(time)) return false;
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("HHmmss");
            dateFormat.setLenient(false);
            dateFormat.parse(time);
            return  true;
        } catch (ParseException e){
            return  false;
        }
    }

    public static boolean isEmpty(List<?> list) { return (list == null) || list.isEmpty(); }
}
