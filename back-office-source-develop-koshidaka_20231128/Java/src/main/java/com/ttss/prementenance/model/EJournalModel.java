package com.ttss.prementenance.model;

import java.util.ArrayList;

import lombok.Data;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221220 litie(Neusoft)     G001.00.0  issue課題#835を対応します.
 */


/**
 * Devices共通 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EJournalModel {
	public EJournalModel() {}

	/**
	 * size
	 */
	private Number size;
	/**
	 * sizeゲッター
	 *
	 * @return size
	 */
	public Number getSize() {
		return size;
	}
	/**
	 * sizeセッター
	 *
	 * @param size size
	 */
	public void setSize(Number size) {
		this.size = size;
	}
	
	/**
	 * limit
	 */
	private Number limit;
	/**
	 * limitゲッター
	 *
	 * @return size
	 */
	public Number getLimit() {
		return limit;
	}
	/**
	 * limitセッター
	 *
	 * @param limit limit
	 */
	public void setLize(Number limit) {
		this.limit = limit;
	}
	
	/**
	 * limit
	 */
	private ArrayList<EJournalDataModel> data;
	/**
	 * limitゲッター
	 *
	 * @return size
	 */
	public ArrayList<EJournalDataModel> getData() {
		return data;
	}
	/**
	 * limitセッター
	 *
	 * @param limit limit
	 */
	public void setData(ArrayList<EJournalDataModel> data) {
		this.data = data;
	}
	
	
	// G001.00.0 Update-Start
	// class EJournalDataModel {
	static class EJournalDataModel {
	// G001.00.0 Update-End
		public EJournalDataModel() {}
		
	
		// G001.00.0 Update-Start
		// private Number id;
		// public Number getId() {
		// 	return id;
		// }
		// public void setId(Number id) {
		// 	this.id = id;
		// }
		private String id;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		// G001.00.0 Update-End
		
		private String createTimestamp;
		public String getCreateTimestamp() {
			return createTimestamp;
		}
		public void setCreateTimestamp(String createTimestamp) {
			this.createTimestamp = createTimestamp;
		}
		
		private String lastModifiedTimestamp;
		public String getLastModifiedTimestamp() {
			return lastModifiedTimestamp;
		}
		public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
			this.lastModifiedTimestamp = lastModifiedTimestamp;
		}
		
		private Number version;
		public Number getVersion() {
			return version;
		}
		public void setVersion(Number version) {
			this.version = version;
		}
		
		// G001.00.0 Update-Start
		// private String lastModifiedUserId;
		// public String getLastModifiedUserId() {
		// 	return lastModifiedUserId;
		// }
		// public void setLastModifiedUserId(String lastModifiedUserId) {
		// 	this.lastModifiedUserId = lastModifiedUserId;
		// }
		// 
		// private Boolean isSystem;
		// public Boolean getIsSystem() {
		// 	return isSystem;
		// }
		// public void setIsSystem(Boolean isSystem) {
		// 	this.isSystem = isSystem;
		// }
		private Number total;
		public Number getTotal() {
			return total;
		}
		public void setTotal(Number total) {
			this.total = total;
		}
		// G001.00.0 Update-End
		
		private String businessDate;
		public String getBusinessDate() {
			return businessDate;
		}
		// G001.00.0 Update-Start
		// public void setBusinessDate(String isSystem) {
		public void setBusinessDate(String businessDate) {
		// G001.00.0 Update-End
			this.businessDate = businessDate;
		}
		
		private String businessTime;
		public String getBusinessTime() {
			return businessTime;
		}
		// G001.00.0 Update-Start
		// public void setBusinessTime(String isSystem) {
		public void setBusinessTime(String businessTime) {
		// G001.00.0 Update-End
			this.businessTime = businessTime;
		}
		
		private String nodeId;
		public String getNodeId() {
			return nodeId;
		}
		public void setNodeId(String nodeId) {
			this.nodeId = nodeId;
		}
		
		private String endpointId;
		public String getEndpointId() {
			return endpointId;
		}
		public void setEndpointId(String endpointId) {
			this.endpointId = endpointId;
		}
		
		private String transactionNo;
		public String getTransactionNo() {
			return transactionNo;
		}
		public void setTransactionNo(String transactionNo) {
			this.transactionNo = transactionNo;
		}
		
		private String type;
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		
		private String formattedOutput;
		public String getFormattedOutput() {
			return formattedOutput;
		}
		public void setFormattedOutput(String formattedOutput) {
			this.formattedOutput = formattedOutput;
		}
	}
}

