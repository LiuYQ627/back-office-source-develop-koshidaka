// KSD V001.000 AS
package com.ttss.prementenance.model;
import lombok.Data;

/**
 * データ保持設定情報
 * @Author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class DataRetentionSettingsNodeModel {

    private String nodeId;
    private String nodeRetentionPeriod;
    
}
// KSD V001.000 AE
