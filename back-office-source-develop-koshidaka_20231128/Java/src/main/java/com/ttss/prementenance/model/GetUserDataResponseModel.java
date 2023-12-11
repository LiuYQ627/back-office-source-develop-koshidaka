package com.ttss.prementenance.model;

import lombok.Data;

@Data
public class GetUserDataResponseModel {
    public GetUserDataResponseModel() {}

    /**
     * 実行結果.
     */
    private ApiCommonResponseModel result;

    private UserDataModel userDataModel;

}
