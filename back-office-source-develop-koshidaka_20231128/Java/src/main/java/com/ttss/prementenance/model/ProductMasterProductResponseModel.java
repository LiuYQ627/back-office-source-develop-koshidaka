package com.ttss.prementenance.model;


import java.util.List;
import lombok.Data;

/**
 * 商品マスタ検索レスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class ProductMasterProductResponseModel {
    public ProductMasterProductResponseModel() {}

    /**
     * skuId
     */
    private String skuId;

    /**
     * skuIdゲッター
     *
     * @return skuId
     */
    public String getSkuId() {
        return skuId;
    }

    /**
     * skuIdセッター
     *
     * @param skuId skuId
     */
    public void setSkuId(String skuId) {
        this.skuId = skuId;
    }

    /**
     * catalogs
     */
    private CatalogsCommonModel catalogs = new CatalogsCommonModel();

    /**
     * catalogsゲッター
     *
     * @return catalogs
     */
    public CatalogsCommonModel getCatalogs() {
        return catalogs;
    }

    /**
     * catalogsセッター
     *
     * @param catalogs catalogs
     */
    public void setCatalogs(CatalogsCommonModel catalogs) {
        this.catalogs = catalogs;
    }

    /**
     * pricelists
     */
    private PricelistsRecordCommonModel pricelists = new PricelistsRecordCommonModel();

    /**
     * pricelistsゲッター
     *
     * @return pricelists
     */
    public PricelistsRecordCommonModel getPricelists() {
        return pricelists;
    }

    /**
     * pricelistsセッター
     *
     * @param pricelists pricelists
     */
    public void setPricelists(PricelistsRecordCommonModel pricelists) {
        this.pricelists = pricelists;
    }

    private List<ConfigurationsMetadataModel> configurationsMetadataModelList;

}

