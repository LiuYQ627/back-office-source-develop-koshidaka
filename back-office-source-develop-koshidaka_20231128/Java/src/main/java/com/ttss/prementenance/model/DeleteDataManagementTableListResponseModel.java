package com.ttss.prementenance.model;

import lombok.Data;

/**
 * DataManagementノード取得レスポンスモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class DeleteDataManagementTableListResponseModel {
    public DeleteDataManagementTableListResponseModel() {}

    /**
     * 実行結果
     */
    private ApiCommonResponseModel result = new ApiCommonResponseModel();

    /**
     * 実行結果ゲッター
     *
     * @return 実行結果
     */
    public ApiCommonResponseModel getResult() {
        return result;
    }

    /**
     * 実行結果セッター
     *
     * @param result 実行結果
     */
    public void setResult(ApiCommonResponseModel result) {
        this.result = result;
    }

    /**
     * レスポンスモデル
     */
    private DataManagementModel responseModel;

    /**
     * レスポンスモデルゲッター
     *
     * @return レスポンスモデル
     */
    public DataManagementModel getResponseModel() {
        return responseModel;
    }

    /**
     * レスポンスモデルセッター
     *
     * @param responseModel レスポンスモデル
     */
    public void setResponseModel(DataManagementModel responseModel) {
        this.responseModel = responseModel;
    }


}

