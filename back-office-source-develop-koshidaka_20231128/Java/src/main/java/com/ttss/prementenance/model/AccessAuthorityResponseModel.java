package com.ttss.prementenance.model;

import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
public class AccessAuthorityResponseModel {
    private String name;
    private AccessAuthorityPermissionsResponseModel permissions;
    private AccessAuthorityDisplayNameResponseModel displayName;
}
