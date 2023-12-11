package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * 商品構成マスタ検索レスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class ProductGroupMasterProductGroupResponseModel {
public ProductGroupMasterProductGroupResponseModel() {}

    /**
     * productId
     */
    private String productId;
    /**
     * productIdゲッター
     *
     * @return productId
     */
    public String getProductId() {
        return productId;
    }
    /**
     * productIdセッター
     *
     * @param productId productId
     */
    public void setProductId(String productId) {
        this.productId = productId;
    }

    /**
     * catalogs
     */
    private CatalogsCommonProductGroupModel catalogs = new CatalogsCommonProductGroupModel();
    /**
     * catalogsゲッター
     *
     * @return catalogs
     */
    public CatalogsCommonProductGroupModel getCatalogs() {
        return catalogs;
    }
    /**
     * catalogsセッター
     *
     * @param catalogs catalogs
     */
    public void setCatalogs(CatalogsCommonProductGroupModel catalogs) {
        this.catalogs = catalogs;
    }

}
