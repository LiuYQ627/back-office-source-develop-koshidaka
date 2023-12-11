package com.ttss.prementenance.utils;

import com.ttss.prementenance.model.CommonDisplayInfoModel;
import java.util.Comparator;

/**
* CommonDisplayInfoModelのソート用比較の共通処理.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
public class ComparatorUtil implements Comparator<CommonDisplayInfoModel> {
  public int compare(CommonDisplayInfoModel c1, CommonDisplayInfoModel c2) {
    return c1.getDisplayKey().compareTo(c2.getDisplayKey());
  }
}
