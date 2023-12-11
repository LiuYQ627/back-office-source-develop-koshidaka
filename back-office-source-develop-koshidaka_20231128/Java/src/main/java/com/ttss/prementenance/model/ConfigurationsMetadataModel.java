package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


/**
 * ユーザデータ情報 データモデル.
 *
 * @author ISB k-takashima
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationsMetadataModel {
    public ConfigurationsMetadataModel() {}

    private String group;
    private String subGroup;
    private String name;
}
