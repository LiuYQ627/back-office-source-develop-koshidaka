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
public class DataManagementTablesTableModel {
    public DataManagementTablesTableModel() {}

    /**
     * version.
     */
    private Integer version;

    /**
     * 作成時のタイムスタンプ
     */
    private String createTimestamp;

    /**
     * 最終修正時のタイムスタンプ
     */
    private String lastModifiedTimestamp;

    /**
     * orderOfDeletion.
     */
    private Integer orderOfDeletion;

    /**
     * tableName.
     */
    private String tableName;

    /**
     * displayName.
     */
    private String displayName;

    /**
     * tableType.
     */
    private String tableType;

}
