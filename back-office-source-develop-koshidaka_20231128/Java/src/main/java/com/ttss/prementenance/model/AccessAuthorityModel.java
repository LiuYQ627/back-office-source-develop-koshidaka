package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccessAuthorityModel {
	private String name;
	private List<AccessAuthorityPermissionsResponseModel> permissions;
	private AccessAuthorityDisplayNameResponseModel displayName;
	private AccessAuthorityBussinessModel bussinessList;
	private AccessAuthorityChangeplanModel changePlan;
}
