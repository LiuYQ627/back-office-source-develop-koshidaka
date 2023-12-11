package com.ttss.prementenance.request;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.DepartmentsModel;
import lombok.Data;

import java.util.List;

/**
* 部門の一覧取得 レスポンス データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class GetDepartmentsResponseModel {

  public GetDepartmentsResponseModel() {}

  /**
   * 実行結果.
   */
  private ApiCommonResponseModel result;

  /**
   * 部門情報.
   */
  private List<DepartmentsModel> departments;

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
   * 部門情報ゲッター.
   * 
   * @return 部門情報
   */
  public List<DepartmentsModel> getDepartments() {
    return departments;
  }

  /**
   * 部門情報セッター.
   * 
   * @param departments 部門情報
   */
  public void setDepartments(List<DepartmentsModel> departments) {
    this.departments = departments;
  }

}
