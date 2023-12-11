package com.ttss.prementenance.model;

import java.util.List;
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
public class CatalogsCommonPaymentRestrictionsModel {
    public CatalogsCommonPaymentRestrictionsModel() {}

    /**
     * paymentinclusions
     */
    private List<String> paymentinclusions;

    /**
     * paymentinclusionsゲッター
     *
     * @return paymentinclusions
     */
    public List<String> getPaymentinclusions() {
        return paymentinclusions;
    }

    /**
     * paymentinclusionsセッター
     *
     * @param paymentinclusions paymentinclusions
     */
    public void setPaymentinclusions(List<String> paymentinclusions) {
        this.paymentinclusions = paymentinclusions;
    }

    /**
     * paymentExclusions
     */
    private List<CatalogsCommonPaymentExclusionsModel> paymentExclusions;

    /**
     * paymentExclusionsゲッター
     *
     * @return paymentExclusions
     */
    public List<CatalogsCommonPaymentExclusionsModel> getPaymentExclusions() {
        return paymentExclusions;
    }

    /**
     * paymentExclusionsセッター
     *
     * @param paymentExclusions paymentExclusions
     */
    public void setPaymentExclusions(List<CatalogsCommonPaymentExclusionsModel> paymentExclusions) {
        this.paymentExclusions = paymentExclusions;
    }

    private List<CatalogsCommonPaymentTypeModel> paymentTypeExclusions;

}

