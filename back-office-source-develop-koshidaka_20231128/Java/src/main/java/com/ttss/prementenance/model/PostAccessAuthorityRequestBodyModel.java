package com.ttss.prementenance.model;


import lombok.Data;

/**
 * AccessAuthority設定リクエストボディモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostAccessAuthorityRequestBodyModel {
    public PostAccessAuthorityRequestBodyModel() {}

    /**
     * リクエストモデル
     */
    private AccessAuthorityModel requestModel = new AccessAuthorityModel();

}

