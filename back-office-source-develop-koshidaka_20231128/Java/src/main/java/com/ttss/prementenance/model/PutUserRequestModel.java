package com.ttss.prementenance.model;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * ユーザマスタ更新 リクエストボディ データモデル.
 * @author TSS 早川 剛生
 * @version 1.0.0
 */
@Data
public class PutUserRequestModel {

  public PutUserRequestModel() {}

  /**
   * ユーザ情報.
   */
  @NotNull
  @Valid
  private List<UserUpdateInfoModel> users;

  /**
   * ユーザ情報ゲッター.
   * @return ユーザ情報
   */
  public List<UserUpdateInfoModel> getUsers() {
    return users;
  }

  /**
   * ユーザ情報セッター.
   * @param users ユーザ情報
   */
  public void setUsers(List<UserUpdateInfoModel> users) {
    this.users = users;
  }
}
