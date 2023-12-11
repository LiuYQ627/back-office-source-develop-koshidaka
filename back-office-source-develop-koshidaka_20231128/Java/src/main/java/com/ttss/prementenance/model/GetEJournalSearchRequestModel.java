package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル リクエストパラメータ データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetEJournalSearchRequestModel {

  public GetEJournalSearchRequestModel() {}
  
  /**
   * 店舗ID.
   */
  private String nodeId;
  
  /**
   * 店舗IDゲッター.
   * 
   * @return 店舗コードコード
   */
  public String getNodeId() {
    return nodeId;
  }

  /**
   * 店舗IDセッター.
   * 
   * @param storeCd 店舗コード
   */
  public void setNodeId(String nodeId) {
    this.nodeId = nodeId;
  }

  /**
   * レジID.
   */
  private String endpointId;
  
  /**
   * レジIDゲッター.
   * 
   * @return レジID
   */
  public String getEndpointId() {
    return endpointId;
  }

  /**
   * レジIDセッター.
   * 
   * @param endpointId レジID
   */
  public void setEndpointId(String endpointId) {
    this.endpointId = endpointId;
  }
  
  /**
   * 対象日付Start.
   */
  private String businessDateStart;
  
  /**
   * 対象日付Startゲッター.
   * 
   * @return 対象日付Start
   */
  public String getBusinessDateStart() {
    return businessDateStart;
  }

  /**
   * 対象日付Startセッター.
   * 
   * @param businessDateStart 対象日付Start
   */
  public void setBusinessDateStart(String businessDateStart) {
    this.businessDateStart = businessDateStart;
  }
  
  /**
   * 対象日付End.
   */
  private String businessDateEnd;
  
  /**
   * 対象日付Startゲッター.
   * 
   * @return 対象日付End
   */
  public String getBusinessDateEnd() {
    return businessDateEnd;
  }

  /**
   * 対象日付Startセッター.
   * 
   * @param businessDateEnd 対象日付End
   */
  public void setBusinessDateEnd(String businessDateEnd) {
    this.businessDateEnd = businessDateEnd;
  }
  
  /**
   * 対象時刻Start.
   */
  private String businessTimeStart;
  
  /**
   * 対象時刻Startゲッター.
   * 
   * @return 対象日付End
   */
  public String getBusinessTimeStart() {
    return businessTimeStart;
  }

  /**
   * 対象時刻Startセッター.
   * 
   * @param businessTimeStart 対象時刻Start
   */
  public void setBusinessTimeStart(String businessTimeStart) {
    this.businessTimeStart = businessTimeStart;
  }
  
  /**
   * 対象時刻End.
   */
  private String businessTimeEnd;
  
  /**
   * 対象時刻Endゲッター.
   * 
   * @return 対象日付End
   */
  public String getBusinessTimeEnd() {
    return businessTimeEnd;
  }

  /**
   * 対象時刻Endセッター.
   * 
   * @param businessTimeEnd 対象時刻End
   */
  public void setBusinessTimeEnd(String businessTimeEnd) {
    this.businessTimeEnd = businessTimeEnd;
  }
  
  /**
   * 取引No From.
   */
  private String transactionNoStart;
  
  /**
   * 取引NoFromゲッター.
   * 
   * @return 取引NoFrom
   */
  public String getTransactionNoStart() {
    return transactionNoStart;
  }

  /**
   * 取引NoFromセッター.
   * 
   * @param transactionNoStart 取引NoFrom
   */
  public void setTransactionNoStart(String transactionNoStart) {
    this.transactionNoStart = transactionNoStart;
  }
  
  /**
   * 取引No End.
   */
  private String transactionNoEnd;
  
  /**
   * 取引No Endゲッター.
   * 
   * @return 取引No End
   */
  public String getTransactionNoEnd() {
    return transactionNoEnd;
  }

  /**
   * 取引No Endセッター.
   * 
   * @param transactionNoEnd 取引No End
   */
  public void setTransactionNoEnd(String transactionNoEnd) {
    this.transactionNoEnd = transactionNoEnd;
  }
  
  /**
   * offset.
   */
  private Number offset;
  
  /**
   * offsetゲッター.
   * 
   * @return 取引No End
   */
  public Number getOffset() {
    return offset;
  }

  /**
   * offsetセッター.
   * 
   * @param transactionNoEnd 取引No End
   */
  public void setOffset(Number offset) {
    this.offset = offset;
  }
}
