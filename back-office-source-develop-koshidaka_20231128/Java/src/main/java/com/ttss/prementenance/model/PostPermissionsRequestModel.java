package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザロール設定リクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostPermissionsRequestModel {
    public PostPermissionsRequestModel() {}

    /**
     * リクエストモデル
     */
    private AccessAuthorityModel requestModel = new AccessAuthorityModel();

}

