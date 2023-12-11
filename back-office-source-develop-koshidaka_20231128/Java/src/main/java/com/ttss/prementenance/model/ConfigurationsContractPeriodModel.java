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
public class ConfigurationsContractPeriodModel {
    public ConfigurationsContractPeriodModel() {}

    /**
     * version
     */
    private String version;
    /**
     * type
     */
    private String type;
    /**
     * inherited
     */
    private String inherited;
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
    private String name;
    /**
     * name
     */
    private ConfigurationsContractPeriodDetailModel value;

}

