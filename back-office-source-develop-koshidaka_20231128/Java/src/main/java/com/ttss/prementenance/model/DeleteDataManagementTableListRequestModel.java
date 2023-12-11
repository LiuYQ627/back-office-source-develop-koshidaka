package com.ttss.prementenance.model;


import lombok.Data;

/**
 * DataManagementノード取得リクエストモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class DeleteDataManagementTableListRequestModel {
    public DeleteDataManagementTableListRequestModel() {}

    /**
     * nodeId
     */
    private String nodeId;

}

