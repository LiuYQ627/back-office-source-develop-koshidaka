package com.ttss.prementenance.model;

import lombok.Data;

/**
* POSレポート出力 モデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class PosReportItemModel {
	public PosReportItemModel() {
	}

	/**
	 * code
	 */
	private String code;

	/**
	 * codeゲッター.
	 *
	 * @return code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * codeセッター.
	 *
	 * @param code
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * name
	 */
	private String name;

	/**
	 * nameゲッター.
	 *
	 * @return name
	 */
	public String getName() {
		return name;
	}

	/**
	 * nameセッター.
	 *
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * hourZoneNumber
	 */
	private Number hourZoneNumber;

	/**
	 * hourZoneNumberゲッター.
	 *
	 * @return hourZoneNumber
	 */
	public Number getHourZoneNumber() {
		return hourZoneNumber;
	}

	/**
	 * hourZoneNumberセッター.
	 *
	 * @param hourZoneNumber
	 */
	public void setHourZoneNumber(Number hourZoneNumber) {
		this.hourZoneNumber = hourZoneNumber;
	}

	/**
	 * customerCount
	 */
	private Number customerCount;

	/**
	 * customerCountゲッター.
	 *
	 * @return customerCount
	 */
	public Number getCustomerCount() {
		return customerCount;
	}

	/**
	 * customerCountセッター.
	 *
	 * @param customerCount
	 */
	public void setCustomerCount(Number customerCount) {
		this.customerCount = customerCount;
	}

	/**
	 * itemQuantity
	 */
	private Number itemQuantity;

	/**
	 * itemQuantityゲッター.
	 *
	 * @return itemQuantity
	 */
	public Number getItemQuantity() {
		return itemQuantity;
	}

	/**
	 * itemQuantityセッター.
	 *
	 * @param itemQuantity
	 */
	public void setItemQuantity(Number itemQuantity) {
		this.itemQuantity = itemQuantity;
	}
	
	// AS #982
	/**
	 * occurrence
	 */
	private Number occurrence;
	/**
	 * occurrenceゲッター.
	 *
	 * @param itemQuantity
	 */
	public Number getOccurrence() {
		return occurrence;
	}
	/**
	 * occurrenceセッター.
	 *
	 * @param itemQuantity
	 */
	public void setOccurrence(Number occurrence) {
		this.occurrence = occurrence;
	}
	// AE #982

	/**
	 * customerCount
	 */
	private Number amount;

	/**
	 * amountゲッター.
	 *
	 * @return amount
	 */
	public Number getAmount() {
		return amount;
	}

	/**
	 * itemQuantityセッター.
	 *
	 * @param itemQuantity
	 */
	public void setAmount(Number amount) {
		this.amount = amount;
	}

}
