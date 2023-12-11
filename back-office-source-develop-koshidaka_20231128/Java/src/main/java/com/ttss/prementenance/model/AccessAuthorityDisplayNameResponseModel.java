package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccessAuthorityDisplayNameResponseModel {
    @JsonProperty("default")
    private String defaultValue;
}
