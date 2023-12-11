package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * BUSINESS_DAY_TIME データモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationsTimezoneModel {
    // public ConfigurationsContractPeriodModel() {}

    /**
     * version
     */
    private String version;
    /**
     * type
     */
    private String type;
    /**
     * name
     */
    private String name;
    /**
     * value
     */
    private String value;
    /**
     * group
     */
    private String group;
    /**
     * subGroup
     */
    private String subGroup;
    /**
     * name
     */
    private ConfigurationsTimezoneDetailModel description;

}

