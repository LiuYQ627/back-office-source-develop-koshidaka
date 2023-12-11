package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccessAuthorityPermissionsResponseModel {
    private String name;
}
