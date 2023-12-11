package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
 * Restaurants情報照会リクエストKyes データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class RestaurantsQueryKyesRequestModel {
	public RestaurantsQueryKyesRequestModel() {}

	/* nodeId */
	private List<String> nodeId;
	public List<String> getNodeId() {
		return nodeId;
	}
	public void setNodeId(List<String> nodeId) {
		this.nodeId = nodeId;
	}

	/* indexNo */
	private List<Long> indexNo;
	public List<Long> getIndexNo() {
		return indexNo;
	}
	public void setIndexNo(List<Long> indexNo) {
		this.indexNo = indexNo;
	}
	
	/* memberRankNo */
	private List<Long> memberRankNo;
	public List<Long> getMemberRankNo() {
		return memberRankNo;
	}
	public void setMemberRankNo(List<Long> memberRankNo) {
		this.memberRankNo = memberRankNo;
	}

	/* memberRankName */
	private List<String> memberRankName;
	public List<String> getMemberRankName() {
		return memberRankName;
	}
	public void setMemberRankName(List<String> memberRankName) {
		this.nodeId = memberRankName;
	}
	/* code */
	private List<Long> code;
	public List<Long> getCode() {
		return code;
	}
	public void setCode(List<Long> code) {
		this.code = code;
	}

	/* ticketNo */
	private List<Long> ticketNo;
	public List<Long> getTicketNo() {
		return ticketNo;
	}
	public void setTicketNo(List<Long> ticketNo) {
		this.ticketNo = ticketNo;
	}

	/* ageDivisionCode */
	private List<Long> ageDivisionCode;
	public List<Long> getAgeDivisionCode() {
		return ageDivisionCode;
	}
	public void setAgeDivisionCode(List<Long> ageDivisionCode) {
		this.ageDivisionCode = ageDivisionCode;
	}
	
	/* floorNo */
	private List<Long> floorNo;
	public List<Long> getFloorNo() {
		return floorNo;
	}
	public void setFloorNo(List<Long> floorNo) {
		this.floorNo = floorNo;
	}
	
	/* tableNo */
	private List<String> tableNo;
	public List<String> getTableNo() {
		return tableNo;
	}
	public void setTableNo(List<String> tableNo) {
		this.tableNo = tableNo;
	}
	
	/* tblNo */
	private List<String> tblNo;
	public List<String> getTblNo() {
		return tblNo;
	}
	public void setTblNo(List<String> tblNo) {
		this.tblNo = tblNo;
	}
	
	
	
	
}

