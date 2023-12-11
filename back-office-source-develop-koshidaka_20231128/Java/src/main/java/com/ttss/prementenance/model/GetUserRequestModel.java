package com.ttss.prementenance.model;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

/**
 * ユーザマスタ検索 リクエストパラメータ データモデル.
 * 
 * @author TSS 早川 剛生
 * @version 1.0.0
 */

@Data
public class GetUserRequestModel {

    public GetUserRequestModel() {}

    /**
     * 検索フラグ.
     */
    private Integer searchFlg;

    /**
     * ユーザID.
     */
    @Size(min = 1, max = 50)
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "{validation.Pattern.AlphaNum.message}")
    private String userId;

    /**
     * 名称.
     */
    private String name;

    /**
     * 検索フラグゲッター.
     * 
     * @return 検索フラグ
     */
    public Integer getSearchFlg() {
        return searchFlg;
    }

    /**
     * 検索フラグセッター.
     * 
     * @param searchFlg 検索フラグ
     */
    public void setSearchFlg(Integer searchFlg) {
        this.searchFlg = searchFlg;
    }

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
     * 名称ゲッター.
     * 
     * @return 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 名称セッター.
     * 
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name;
    }
}
