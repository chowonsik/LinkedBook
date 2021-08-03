package com.linkedbook.entity;

import com.linkedbook.dto.user.signup.SignUpInput;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.awt.geom.Area;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.*;

@Data
@AllArgsConstructor
@DynamicInsert
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @OneToMany(mappedBy = "user") // 양방향 매핑
    private List<UserAreaDB> user_area;

    @Column(name = "email", nullable = false, length = 45)
    private String email;

    @Column(name = "password", nullable = false, length = 45)
    private String password;

    @Column(name = "nickname", nullable = false, length = 45)
    private String nickname;

    @Column(name = "info", nullable = false, length = 45)
    private String info;

    @Column(name = "image", nullable = false, length = 45)
    private String image;

    @Column(name = "oauth", nullable = false, length = 45)
    private String oauth;

    @Column(name = "status", nullable = false, length = 45)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updated_at;

    public UserDB(SignUpInput signUpInput) {
        this.email = signUpInput.getEmail();
        this.password = signUpInput.getPassword();
        this.nickname = signUpInput.getNickname();
        this.info = signUpInput.getInfo();
        this.image = signUpInput.getImage();
        this.oauth = signUpInput.getOauth();
        this.status = "ACTIVATE";
    }

    public UserDB(int id) {
        this.id = id;
    }
}
