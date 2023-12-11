package com.ttss.prementenance.model;

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
public class DataManagementTablesModel {
    public DataManagementTablesModel() {}

    /**
     * noOfRecordsFoundForNode.
     */
    private Integer noOfRecordsFoundForNode;

    /**
     * DataManagementTablesTableModel
     */
    private DataManagementTablesTableModel table;

}
