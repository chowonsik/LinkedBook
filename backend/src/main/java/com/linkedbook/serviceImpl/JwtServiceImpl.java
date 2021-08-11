package com.linkedbook.serviceImpl;

import io.jsonwebtoken.*;
import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.entity.UserDB;
import com.linkedbook.model.Role;
import com.linkedbook.service.JwtService;
import com.linkedbook.dao.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;

import static com.linkedbook.configuration.ConstantConfig.*;

@Slf4j
@Service("JwtService")
public class JwtServiceImpl implements JwtService {
    @Autowired
    UserRepository userRepository;

    public String createAccessToken(Role role, int userId) {
        Date now = new Date();
        return Jwts.builder()
                .claim("userId", userId)
                .setIssuedAt(now)
//                .setExpiration(new Date(now.getTime() + ConstantConfig.VALID_TIME))
                .signWith(SignatureAlgorithm.HS256, ACCESS_TOKEN_SECRET_KEY)
                .compact();
    }

    @Override
    public String getAccessToken() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        return request.getHeader("X-ACCESS-TOKEN");
    }

    @Override
    public int getUserId() {
        String accessToken = getAccessToken();
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET_KEY)
                    .parseClaimsJws(accessToken);
            if (accessToken == null) return -1;

            int userId = claims.getBody().get("userId", Integer.class);
            if (!ValidationCheck.isValidId(userId)) return -3;

            UserDB userDB = userRepository.findById(userId).orElse(null);
            if (userDB == null || userDB.getStatus().equals("DELETED")) return -3;

            return userId;
        } catch (Exception exception) {
            return -1;
        }
    }

    @Override
    public UserDB getUserDB() {
        String accessToken = getAccessToken();
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET_KEY)
                    .parseClaimsJws(accessToken);
            if (accessToken == null) return null;

            int userId = claims.getBody().get("userId", Integer.class);
            if (!ValidationCheck.isValidId(userId)) return null;

            UserDB userDB = userRepository.findById(userId).orElse(null);
            if (userDB == null || userDB.getStatus().equals("DELETED")) return null;

            return userDB;
        } catch (Exception exception) {
            return null;
        }
    }
}