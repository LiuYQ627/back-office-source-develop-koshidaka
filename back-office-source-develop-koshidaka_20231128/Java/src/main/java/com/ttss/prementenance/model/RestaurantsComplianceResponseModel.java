//KSD V001.000 20230901 AS
package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
 * コシダカ　Restaurants共通レスポンスモデル.
 * 応答:"jsonBody": {..}の形
 */
@Data
public class RestaurantsComplianceResponseModel {
	public RestaurantsComplianceResponseModel() {}

	//条文画像
	private List<LanguageDisplayModel> languageDisplay;
	public List<LanguageDisplayModel> getLanguageDisplay() {
		return languageDisplay;
	}
	public void setLanguageDisplay(List<LanguageDisplayModel> languageDisplay) {
		this.languageDisplay = languageDisplay;
	}
	
	//保護者同伴 利用可能時間
	private  DurationTimeModel	guardianTime;
	public DurationTimeModel getGuardianTime() {
		return guardianTime;
	}
	public void setGuardianTime(DurationTimeModel guardianTime) {
		this.guardianTime = guardianTime;
	}
	
	//18歳未満 利用可能時間
	private  DurationTimeModel	under18Time;
	public DurationTimeModel getUnder18Time() {
		return under18Time;
	}
	public void setUnder18Time(DurationTimeModel under18Time) {
		this.under18Time = under18Time;
	}
	
	//16歳未満 利用可能時間
	private  DurationTimeModel	under16Time;
	public DurationTimeModel getUnder16Time() {
		return under16Time;
	}
	public void setUnder16Time(DurationTimeModel under16Time) {
		this.under16Time = under16Time;
	}
}
//KSD V001.000 20230901 AE

