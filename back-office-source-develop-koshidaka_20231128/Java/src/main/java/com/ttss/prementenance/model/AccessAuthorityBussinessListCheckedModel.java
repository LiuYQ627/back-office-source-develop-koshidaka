package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/** データクリア対象テーブルマッピング データモデル */
@Data
public class AccessAuthorityBussinessListCheckedModel {
	private List<AccessAuthorityBussinessListModel> checked;
}
