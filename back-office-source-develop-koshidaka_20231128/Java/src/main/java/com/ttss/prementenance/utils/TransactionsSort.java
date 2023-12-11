package com.ttss.prementenance.utils;

import com.ttss.prementenance.model.TransactionsModel;
import java.util.Comparator;

/**
 * TransactionModelのソートクラス.
 * 
 * @author TSS 廣田 敏明
 * @version 1.0.0
 *
 */
public class TransactionsSort implements Comparator<TransactionsModel> {

  /**
   * TransactionsModelをステータス=>シーケンスNoで昇順に並び替える.
   * 
   * @param c1 比較対象の取引情報モデル
   * @param c2 比較対象の取引情報モデル
   * @return 並び替え済みのデータ
   */
  public int compare(TransactionsModel c1, TransactionsModel c2) {
    if (c1.getStatus() < c2.getStatus()) {
      return -1;
    } else if (c1.getStatus() > c2.getStatus()) {
      return 1;
    } else {
      return c1.getSequenceNumber().compareTo(c2.getSequenceNumber());
    }
  }
}
