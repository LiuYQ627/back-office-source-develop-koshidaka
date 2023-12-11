// KSD V001.000 AS
package com.ttss.prementenance.model;
import java.util.List;

import lombok.Data;

/**
 * データ保持設定情報
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class GetDataRetentionSettingsModel {
    
    private String id;
    private String groupName;
    private String displayName;
    private long retentionPeriod;
    private List<String> tables;
    private boolean deleteByNode;
    private long version;
    private String lastModifiedTimestamp;
    private String createTimestamp;
    private String nodeId;
    private NodeRetentionModel nodeRetentions;

}
// KSD V001.000 AE
