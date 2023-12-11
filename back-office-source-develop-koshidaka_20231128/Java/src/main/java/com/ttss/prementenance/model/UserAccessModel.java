package com.ttss.prementenance.model;

import lombok.Data;


/**
 * ユーザデータ情報 データモデル.
 *
 * @author ISB k-takashima
 * @version 1.0.0
 */
@Data
public class UserAccessModel {
    public UserAccessModel() {}

    private String displayName;
    private String accessAuthority;
}
