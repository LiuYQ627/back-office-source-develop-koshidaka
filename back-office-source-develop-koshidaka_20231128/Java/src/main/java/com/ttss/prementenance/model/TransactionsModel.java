package com.ttss.prementenance.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * 取引情報のモデル.
 * 
 * @author TSS 廣田 敏明
 * @version 1.0.0
 *
 */
public class TransactionsModel {
  private String transactionId;
  private String businessUnitId;
  private String workstationId;
  private Integer sequenceNumber;
  private String beginDayDate;
  private String endDayDate;
  private String cycleTime;
  private Integer status;
  private boolean trainingFlag;
  private boolean canceledFlag;
  private boolean zeroPriceFlag;
  private boolean noMasterFlag;
  private boolean ageVerificationFlag;
  private Integer accountMachineId;
  private Integer accountMachineTransactionId;
  private Integer lastUpdateSeqNo;
  private boolean attention = false;
  private RetailTransactionModel retailTransaction;
  
  /**
   * 取引ID取得.
   * @return transactionId
   */
  public String getTransactionId() {
    return transactionId;
  }
  
  /**
   * 取引ID設定.
   * @param transactionId セットする transactionId
   */
  public void setTransactionId(String transactionId) {
    this.transactionId = transactionId;
  }
  
  /**
   * 企業コード取得.
   * @return businessUnitId
   */
  public String getBusinessUnitId() {
    return businessUnitId;
  }
  
  /**
   * 企業コード設定.
   * @param businessUnitId セットする businessUnitId
   */
  public void setBusinessUnitId(String businessUnitId) {
    this.businessUnitId = businessUnitId;
  }
  
  /**
   * 端末ID取得.
   * @return workstationId
   */
  public String getWorkstationId() {
    return workstationId;
  }
  
  /**
   * 端末ID設定.
   * @param workstationId セットする workstationId
   */
  public void setWorkstationId(String workstationId) {
    this.workstationId = workstationId;
  }
  
  /**
   * 取引番号取得.
   * 
   * @return sequenceNumber
   */
  public Integer getSequenceNumber() {
    return sequenceNumber;
  }

  /**
   * 取引番号設定.
   * 
   * @param sequenceNumber セットする sequenceNumber
   */
  public void setSequenceNumber(Integer sequenceNumber) {
    this.sequenceNumber = sequenceNumber;
  }

  /**
   * 取引開始日時取得.
   * 
   * @return beginDayDate
   */
  public String getBeginDayDate() {
    return beginDayDate;
  }

  /**
   * 取引開始日時設定.
   * 
   * @param beginDayDate セットする beginDayDate
   * @throws ParseException 解析エラー
   */
  public void setBeginDayDate(String beginDayDate) throws ParseException {
    this.beginDayDate = beginDayDate;
    this.setCycleTime();
  }
  
  /**
   * 最終更新日時取得.
   * @return endDayDate
   */
  public String getEndDayDate() {
    return endDayDate;
  }
  
  /**
   * 最終更新日時設定.
   * @param endDayDate セットする endDayDate
   * @throws ParseException 解析エラー
   */
  public void setEndDayDate(String endDayDate) throws ParseException {
    this.endDayDate = endDayDate;
    this.setCycleTime();
  }
  
  /**
   * ステータス取得.
   * @return status
   */
  public Integer getStatus() {
    return status;
  }
  
  /**
   * ステータス設定.
   * @param status セットする status
   */
  public void setStatus(Integer status) {
    this.status = status;
  }
  
  /**
   * トレーニングフラグ取得.
   * @return trainingFlag
   */
  public boolean isTrainingFlag() {
    return trainingFlag;
  }
  
  /**
   * トレーニングフラグ設定.
   * @param trainingFlag セットする trainingFlag
   */
  public void setTrainingFlag(boolean trainingFlag) {
    this.trainingFlag = trainingFlag;
  }
  
  /**
   * 取引中止フラグ取得.
   * @return canceledFlag
   */
  public boolean isCanceledFlag() {
    return canceledFlag;
  }
  
  /**
   * 取引中止フラグ設定.
   * @param canceledFlag セットする canceledFlag
   */
  public void setCanceledFlag(boolean canceledFlag) {
    this.canceledFlag = canceledFlag;
  }
  
  /**
   * 0円売価商品フラグ取得.
   * @return zeroPriceFlag
   */
  public boolean isZeroPriceFlag() {
    return zeroPriceFlag;
  }
  
  /**
   * 0円売価商品フラグ設定.
   * @param zeroPriceFlag セットする zeroPriceFlag
   */
  public void setZeroPriceFlag(boolean zeroPriceFlag) {
    this.zeroPriceFlag = zeroPriceFlag;
    
    if (!this.attention) {
      this.attention = zeroPriceFlag;
    }
  }
  
  /**
   * マスタ無商品フラグ取得.
   * @return noMasterFlag
   */
  public boolean isNoMasterFlag() {
    return noMasterFlag;
  }
  
  /**
   * マスタ無商品フラグ設定.
   * @param noMasterFlag セットする noMasterFlag
   */
  public void setNoMasterFlag(boolean noMasterFlag) {
    this.noMasterFlag = noMasterFlag;
    if (!this.attention) {
      this.attention = noMasterFlag;
    }
  }
  
  /**
   * 20禁商品フラグ取得.
   * @return ageVerificationFlag
   */
  public boolean isAgeVerificationFlag() {
    return ageVerificationFlag;
  }
  
  /**
   * 20禁商品フラグ設定.
   * @param ageVerificationFlag セットする ageVerificationFlag
   */
  public void setAgeVerificationFlag(boolean ageVerificationFlag) {
    this.ageVerificationFlag = ageVerificationFlag;
    if (!this.attention) {
      this.attention = ageVerificationFlag;
    }
  }
  
  /**
   * 会計機ID取得.
   * @return accountMachineId
   */
  public Integer getAccountMachineId() {
    return accountMachineId;
  }
  
  /**
   * 会計機ID設定.
   * @param accountMachineId セットする accountMachineId
   */
  public void setAccountMachineId(Integer accountMachineId) {
    this.accountMachineId = accountMachineId;
  }
  
  /**
   * 会計機取引ID取得.
   * @return accountMachineTransactionId
   */
  public Integer getAccountMachineTransactionId() {
    return accountMachineTransactionId;
  }
  
  /**
   * 会計機取引ID設定.
   * @param accountMachineTransactionId セットする accountMachineTransactionId
   */
  public void setAccountMachineTransactionId(Integer accountMachineTransactionId) {
    this.accountMachineTransactionId = accountMachineTransactionId;
  }
  
  /**
   * 最終変更アイテムシーケンスNo.取得.
   * @return lastUpdateSeqNo
   */
  public Integer getLastUpdateSeqNo() {
    return lastUpdateSeqNo;
  }
  
  /**
   * 最終変更アイテムシーケンスNo.設定.
   * @param lastUpdateSeqNo セットする lastUpdateSeqNo
   */
  public void setLastUpdateSeqNo(Integer lastUpdateSeqNo) {
    this.lastUpdateSeqNo = lastUpdateSeqNo;
  }
  
  /**
   * 売上トラン取得.
   * @return retailTransaction
   */
  public RetailTransactionModel getRetailTransaction() {
    return retailTransaction;
  }
  
  /**
   * 売上トラン設定.
   * @param retailTransaction セットする retailTransaction
   */
  public void setRetailTransaction(RetailTransactionModel retailTransaction) {
    this.retailTransaction = retailTransaction;
  }
  
  /**
   * 回遊時間取得.
   * @return cycleTime
   */
  public String getCycleTime() {
    return cycleTime;
  }
  
  /**
   * 回遊時間設定.
   * 
   * @throws ParseException 解析エラー
   */
  public void setCycleTime() throws ParseException {
    if (this.beginDayDate != null && this.endDayDate != null) {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      Calendar beginDayDate = Calendar.getInstance();
      beginDayDate.setTime(sdf.parse(this.getBeginDayDate()));
      Calendar endDayDate = Calendar.getInstance();
      endDayDate.setTime(sdf.parse(this.getEndDayDate()));
      long millis = endDayDate.getTime().getTime() - beginDayDate.getTime().getTime();
      long hour = (millis / (1000 * 60 * 60)) % 24;
      long minute = (millis / (1000 * 60))  % 60;
      this.cycleTime = String.format("%02d:%02d", hour, minute);
      this.beginDayDate = String.format("%02d:%02d", beginDayDate.get(Calendar.HOUR_OF_DAY),
        beginDayDate.get(Calendar.MINUTE));
      this.endDayDate = String.format("%02d:%02d", endDayDate.get(Calendar.HOUR_OF_DAY),
        endDayDate.get(Calendar.MINUTE));
    }
  }
    
  /**
   * アテンションマークフラグ取得.
   * @return attention
   */
  public boolean isAttention() {
    return attention;
  }
  
  /**
   * アテンションマークフラグ設定.
   * @param attention セットする attention
   */
  public void setAttention(boolean attention) {
    this.attention = attention;
  }

}
