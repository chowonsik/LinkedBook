package com.linkedbook.serviceImpl;

import io.jsonwebtoken.*;
import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.configuration.security.CustomUserDetailsService;
import com.linkedbook.entity.UserDB;
import com.linkedbook.service.JwtService;
import com.linkedbook.dao.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;

import static com.linkedbook.configuration.ConstantConfig.*;

@Service("JwtService")
@AllArgsConstructor
@Slf4j
public class JwtServiceImpl implements JwtService {
    private final UserRepository userRepository;
    private final CustomUserDetailsService customUserDetailsService;

    public String createAccessToken(int userId) {
        Date now = new Date();
        return Jwts.builder().claim("userId", userId).setIssuedAt(now)
                // .setExpiration(new Date(now.getTime() + ConstantConfig.VALID_TIME))
                .signWith(SignatureAlgorithm.HS256, ACCESS_TOKEN_SECRET_KEY).compact();
    }

    @Override
    public String getAccessToken() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        return request.getHeader("X-ACCESS-TOKEN");
    }

    @Override
    public int getUserId() {
        String accessToken = getAccessToken();
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(ACCESS_TOKEN_SECRET_KEY).parseClaimsJws(accessToken);
            if (accessToken == null)
                return -1;

            int userId = claims.getBody().get("userId", Integer.class);
            if (!ValidationCheck.isValidId(userId))
                return -3;

            UserDB userDB = userRepository.findById(userId).orElse(null);
            if (userDB == null || userDB.getStatus().equals("DELETED"))
                return -3;

            return userId;
        } catch (Exception exception) {
            return -1;
        }
    }

    @Override
    public UserDB getUserDB() {
        String accessToken = getAccessToken();
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(ACCESS_TOKEN_SECRET_KEY).parseClaimsJws(accessToken);
            if (accessToken == null)
                return null;

            int userId = claims.getBody().get("userId", Integer.class);
            if (!ValidationCheck.isValidId(userId))
                return null;

            UserDB userDB = userRepository.findById(userId).orElse(null);
            if (userDB == null || userDB.getStatus().equals("DELETED"))
                return null;

            return userDB;
        } catch (Exception exception) {
            return null;
        }
    }

    @Override
    public UserDB getChatUserDB(String accessToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(ACCESS_TOKEN_SECRET_KEY).parseClaimsJws(accessToken);
            if (accessToken == null)
                return null;

            int userId = claims.getBody().get("userId", Integer.class);
            if (!ValidationCheck.isValidId(userId))
                return null;

            UserDB userDB = userRepository.findById(userId).orElse(null);
            if (userDB == null || userDB.getStatus().equals("DELETED"))
                return null;

            return userDB;
        } catch (Exception exception) {
            return null;
        }
    }

    @Override
    // 인증 성공시 SecurityContextHolder에 저장할 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(this.getUserDB().getEmail());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    @Override
    // Jwt Token의 유효성 및 만료 기간 검사
    public boolean validateToken(String jwtToken) {
        return this.getClaims(jwtToken) != null;
    }

    @Override
    public Jws<Claims> getClaims(String jwtToken) {
        try {
            return Jwts.parser().setSigningKey(ACCESS_TOKEN_SECRET_KEY).parseClaimsJws(jwtToken);
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
            throw ex;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw ex;
        }
        // catch (ExpiredJwtException ex) {
        // log.error("Expired JWT token");
        // throw ex;
        // }
        catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw ex;
        }
    }

}