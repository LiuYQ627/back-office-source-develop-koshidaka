package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通PaymentRestrictions データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CatalogsCommonPaymentTypeModel {
    public CatalogsCommonPaymentTypeModel() {}

    /**
     * paymentType
     */
    private String paymentType;

}

