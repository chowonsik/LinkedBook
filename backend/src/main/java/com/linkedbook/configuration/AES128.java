package com.linkedbook.configuration;

import org.springframework.beans.factory.annotation.Value;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import static java.nio.charset.StandardCharsets.UTF_8;

public class AES128 {

    private final String ips;
    private final Key keySpec;

    @Value("${custom.aes128.secret.key}")
    private String AES128_SECRET_KEY;

    public AES128(String key) {
        byte[] keyBytes = new byte[16];
        byte[] b = key.getBytes(UTF_8);
        System.arraycopy(b, 0, keyBytes, 0, keyBytes.length);
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
        this.ips = key.substring(0, 16);
        this.keySpec = keySpec;
    }

    public String encrypt(String value) throws NoSuchPaddingException, NoSuchAlgorithmException, BadPaddingException,
            IllegalBlockSizeException, InvalidAlgorithmParameterException, InvalidKeyException {
        Cipher cipher = Cipher.getInstance(AES128_SECRET_KEY);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(ips.getBytes()));
        byte[] encrypted = cipher.doFinal(value.getBytes(UTF_8));
        return new String(Base64.getEncoder().encode(encrypted));
    }

    public String decrypt(String value) throws NoSuchPaddingException, NoSuchAlgorithmException, BadPaddingException,
            IllegalBlockSizeException, InvalidAlgorithmParameterException, InvalidKeyException {
        Cipher cipher = Cipher.getInstance(AES128_SECRET_KEY);
        cipher.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(ips.getBytes(UTF_8)));
        byte[] decrypted = Base64.getDecoder().decode(value.getBytes());
        return new String(cipher.doFinal(decrypted), UTF_8);
    }
}
