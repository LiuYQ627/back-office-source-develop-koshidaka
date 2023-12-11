package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

/**
 * ログインAPI リクエスト ログイン情報 データモデル.
 *
 * @author TSS 岩崎 由佳子
 * @version 1.0.0
 */
@Data
public class LoginInfoModel {

    public LoginInfoModel() {}

    /**
     * ユーザID.
     */
    @NotEmpty
    @Size(min = 1, max = 10)
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "{validation.Pattern.AlphaNum.message}")
    private String userId;

    /**
     * Webクライアントで入力されたパスワード.
     */
    @NotEmpty
    private String inputPassword;

    /**
     * 入力エラー回数.
     */
    private int errorCnt;

    /**
     * ユーザIDゲッター.
     * 
     * @return ユーザID
     */
    public String getUserId() {
        return userId;
    }

    /**
     * ユーザIDセッター.
     * 
     * @param userId ユーザID
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Webクライアントで入力されたパスワードゲッター.
     *
     * @return Webクライアントで入力されたパスワード
     */
    public String getInputPassword() {
        return inputPassword;
    }

    /**
     * Webクライアントで入力されたパスワードセッター.
     *
     * @param inputPassword Webクライアントで入力されたパスワード
     */
    public void setInputPassword(String inputPassword) {
        this.inputPassword = inputPassword;
    }

    public int getErrorCnt() {
        return errorCnt;
    }

    public void setErrorCnt(int errorCnt) {
        this.errorCnt = errorCnt;
    }

}
