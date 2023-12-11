package com.ttss.prementenance.model;

import lombok.Data;

/**
* 変更計画の一覧取得 リクエストパラメータ データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
public class PostChangePlanResponseModel {
  public PostChangePlanResponseModel() {}


  /**
   * 実行結果.
   */
  private ApiCommonResponseModel result = new ApiCommonResponseModel();

  /**
   * 実行結果ゲッター.
   *
   * @return 実行結果
   */
  public ApiCommonResponseModel getResult() {
    return result;
  }

  /**
   * 実行結果セッター.
   *
   * @param result 実行結果
   */
  public void setResult(ApiCommonResponseModel result) {
    this.result = result;
  }


    /**
     * レスポンスモデル
     */
    private ChangePlanCommonModel responseModel = new ChangePlanCommonModel();
    /**
     * レスポンスモデルゲッター
     *
     * @return レスポンスモデル
     */
    public ChangePlanCommonModel getResponseModel() {
        return responseModel;
    }
    /**
     * レスポンスモデルセッター
     *
     * @param responseModel レスポンスモデル
     */
    public void setResponseModel(ChangePlanCommonModel responseModel) {
        this.responseModel = responseModel;
    }
  
}
