package com.ttss.prementenance.model;


import lombok.Data;

/**
 * DataManagementノード取得リクエストモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetDataManagementTableListRequestModel {
    public GetDataManagementTableListRequestModel() {}

    /**
     * nodeId
     */
    private String nodeId;

}

