package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccessAuthorityDataModel {
    public AccessAuthorityDataModel() {}

    private Integer version;
    // private String createTimestamp;
    // private String lastModifiedTimestamp;
    // private String name;
    // private AccessAuthorityPermissionsResponseModel permissions;
    // private AccessAuthorityDisplayNameResponseModel displayName;
}
