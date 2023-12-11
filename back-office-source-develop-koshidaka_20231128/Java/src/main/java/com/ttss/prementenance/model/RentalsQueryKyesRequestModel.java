package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
 * Rentals情報照会リクエストKyes データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class RentalsQueryKyesRequestModel {
	public RentalsQueryKyesRequestModel() {}

	/* nodeId */
	private List<String> nodeId;
	public List<String> getNodeId() {
		return nodeId;
	}
	public void setNodeId(List<String> nodeId) {
		this.nodeId = nodeId;
	}

	/* weekdayCode */
	private List<Long> weekdayCode;
	public List<Long> getWeekdayCode() {
		return weekdayCode;
	}
	public void setWeekdayCode(List<Long> weekdayCode) {
		this.weekdayCode = weekdayCode;
	}

	/* chargeCode */
	private List<Long> chargeCode;
	public List<Long> getChargeCode() {
		return chargeCode;
	}
	public void setChargeCode(List<Long> chargeCode) {
		this.chargeCode = chargeCode;
	}

	/* chargeCode */
	private List<Long> drinkCourseNo;
	public List<Long> getDrinkCourseNo() {
		return drinkCourseNo;
	}
	public void setDrinkCourseNo(List<Long> drinkCourseNo) {
		this.drinkCourseNo = drinkCourseNo;
	}

	/* memberPrice */
	private List<Long> memberPrice;
	public List<Long> getMemberPrice() {
		return memberPrice;
	}
	public void setMemberPrice(List<Long> memberPrice) {
		this.memberPrice = memberPrice;
	}

	/* ageDivisionCode */
	private List<Long> ageDivisionCode;
	public List<Long> getAgeDivisionCode() {
		return ageDivisionCode;
	}
	public void setAgeDivisionCode(List<Long> ageDivisionCode) {
		this.ageDivisionCode = ageDivisionCode;
	}

	/* countSetting */
	private List<Long> countSetting;
	public List<Long> getCountSetting() {
		return countSetting;
	}
	public void setCountSetting(List<Long> countSetting) {
		this.countSetting = countSetting;
	}

	/* equipNo */
	private List<Long> equipNo;
	public List<Long> getEquipNo() {
		return equipNo;
	}
	public void setEquipNo(List<Long> equipNo) {
		this.equipNo = equipNo;
	}
	
	/* modelNo */
	private List<Long> modelNo;
	public List<Long> getModelNo() {
		return modelNo;
	}
	public void setModelNo(List<Long> modelNo) {
		this.modelNo = modelNo;
	}

	/* indexNo */
	private List<Long> indexNo;
	public List<Long> getIndexNo() {
		return indexNo;
	}
	public void setIndexNo(List<Long> indexNo) {
		this.indexNo = indexNo;
	}
	/* yyDate */
	private List<Long> yyDate;
	public List<Long> getYyDate() {
		return yyDate;
	}
	public void setYyDate(List<Long> yyDate) {
		this.yyDate = yyDate;
	}
	/* mmDate */
	private List<Long> mmDate;
	public List<Long> getMmDate() {
		return mmDate;
	}
	public void setMmDate(List<Long> mmDate) {
		this.mmDate = mmDate;
	}
	/* dayDate */
	private List<Long> dayDate;
	public List<Long> getDayDate() {
		return dayDate;
	}
	public void setDayDate(List<Long> dayDate) {
		this.dayDate = dayDate;
	}

	/* roomRateCode */
	private List<Long> roomRateCode;
	public List<Long> getRoomRateCode() {
		return roomRateCode;
	}
	public void setRoomRateCode(List<Long> roomRateCode) {
		this.roomRateCode = roomRateCode;
	}

}

