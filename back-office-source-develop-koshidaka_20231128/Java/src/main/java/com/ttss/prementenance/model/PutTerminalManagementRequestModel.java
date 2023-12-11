package com.ttss.prementenance.model;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 端末管理マスタ更新 リクエストボディ データモデル.
 * @author TSS 可知 徹生
 * @version 1.0.0
 */
@Data
public class PutTerminalManagementRequestModel {

  public PutTerminalManagementRequestModel() {}

  /**
   * 端末管理情報.
   */
  @NotNull
  @Valid
  private List<TerminalManagementUpdateInfoModel> terminalInfos;

  /**
   * 端末管理情報ゲッター.
   * @return 端末管理情報
   */
  public List<TerminalManagementUpdateInfoModel> getTerminalInfos() {
    return terminalInfos;
  }

  /**
   * 端末管理情報セッター.
   * @param terminalInfos 端末管理情報
   */
  public void setTerminalInfos(
                List<TerminalManagementUpdateInfoModel> terminalInfos) {
    this.terminalInfos = terminalInfos;
  }
}
