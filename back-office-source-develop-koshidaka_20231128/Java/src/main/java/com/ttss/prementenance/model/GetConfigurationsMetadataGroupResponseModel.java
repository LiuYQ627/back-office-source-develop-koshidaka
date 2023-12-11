package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * Configurationsノード取得レスポンスモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetConfigurationsMetadataGroupResponseModel {
    public GetConfigurationsMetadataGroupResponseModel() {}

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
    private List<ConfigurationsMetadataModel> responseModel;

}

