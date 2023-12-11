package com.ttss.prementenance.model;

import lombok.Data;

/**
* 店舗コード データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class ReservationDateModel {
  public ReservationDateModel() {}

  /**
   * id.
   */
  private String id;

  /**
   * idゲッター.
   *
   * @return id
   */
  public String getId() {
    return id;
  }

  /**
   * idセッター.
   *
   * @param id
   */
  public void setId(String id) {
    this.id = id;
  }
  
  /**
   * nodeId.
   */
  private String nodeId;

  /**
   * nodeIdゲッター.
   *
   * @return nodeId
   */
  public String getNodeId() {
    return nodeId;
  }

  /**
   * nodeIdセッター.
   *
   * @param nodeId
   */
  public void setNodeId(String nodeId) {
    this.nodeId = nodeId;
  }
  
  /**
   * configurationType.
   */
  private String configurationType;

  /**
   * configurationTypeゲッター.
   *
   * @return nodeId
   */
  public String getConfigurationType() {
    return configurationType;
  }

  /**
   * configurationTypeセッター.
   *
   * @param nodeId
   */
  public void setConfigurationType(String configurationType) {
    this.configurationType = configurationType;
  }
  
  /**
   * executionDate.
   */
  private String executionDate;

  /**
   * executionDateゲッター.
   *
   * @return executionDate
   */
  public String getExecutionDate() {
    return executionDate;
  }

  /**
   * executionDateセッター.
   *
   * @param executionDate
   */
  public void setExecutionDate(String executionDate) {
    this.executionDate = executionDate;
  }
}
