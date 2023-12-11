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
public class ConfigurationsContractPeriodDetailModel {
    public ConfigurationsContractPeriodDetailModel() {}

    /**
     * useStartMonth
     */
    private String useStartMonth;
    /**
     * useEndMonth
     */
    private String useEndMonth;

}

