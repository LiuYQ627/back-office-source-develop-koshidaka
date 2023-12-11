package com.ttss.prementenance.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * データクリア データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DataManagementModel {
    public DataManagementModel() {}

    /**
     * ノードID.
     */
    private String nodeId;

    /**
     * テーブルリスト
     */
    private List<DataManagementTablesModel> tables;

}
