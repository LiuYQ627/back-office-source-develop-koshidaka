package com.ttss.prementenance.model;

import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
public class DataClearTableResponseModel {
    private int microServiceNumber;
    private String fieldName;
    private String physicalName;
    private String logicalName;
    private int tableCategory;
    private String dataCount;
}
