package com.ttss.prementenance.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221213 duyouwei(Neusoft)  G001.00.0  issue課題#1150を対応します.
 * 20230629  wangchunmei(Neusoft)  G002.00.0  issue課題#1451を対応します.
 * 20230630  wangchunmei(Neusoft)  G003.00.0  issue課題#1424を対応します.
 * 20231009  wupsh(Neusoft)    G004.00.0  issue課題#1546#note_720551を対応します.
 */


/**
 * 構成情報 データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationsDetailModel {
	public ConfigurationsDetailModel() {
	}

	/**
	 * 価格一覧.
	 */
	@JsonProperty("PRICE_LISTS")
	private ConfigurationsPriceListsModel PRICE_LISTS;

	/**
	 * 価格一覧ゲッター.
	 *
	 * @return 価格一覧
	 */
	@JsonProperty("PRICE_LISTS")
	public ConfigurationsPriceListsModel getPRICE_LISTS() {
		return PRICE_LISTS;
	}

	/**
	 * 価格一覧セッター.
	 *
	 * @param price_Lists 価格一覧
	 */
	@JsonProperty("PRICE_LISTS")
	public void setPRICE_LISTS(ConfigurationsPriceListsModel PRICE_LISTS) {
		this.PRICE_LISTS = PRICE_LISTS;
	}

	/**
	 * 目録.
	 */
	@JsonProperty("CATALOG")
	private ConfigurationsCatalogModel CATALOG;

	/**
	 * 目録ゲッター.
	 *
	 * @return 目録
	 */
	@JsonProperty("CATALOG")
	public ConfigurationsCatalogModel getCATALOG() {
		return CATALOG;
	}

	/**
	 * 目録セッター.
	 *
	 * @param CATALOG 目録
	 */
	@JsonProperty("CATALOG")
	public void setCATALOG(ConfigurationsCatalogModel CATALOG) {
		this.CATALOG = CATALOG;
	}

	/**
	 * POS注文金額割引.
	 */
	@JsonProperty("PosOrderAmountOff")
	private ConfigurationsPosOrderModel PosOrderAmountOff;

	/**
	 * POS注文金額割引ゲッター.
	 *
	 * @return POS注文金額割引
	 */
	@JsonProperty("PosOrderAmountOff")
	public ConfigurationsPosOrderModel getPosOrderAmountOff() {
		return PosOrderAmountOff;
	}

	/**
	 * POS注文金額割引セッター.
	 *
	 * @param PosOrderAmountOff POS注文金額割引
	 */
	@JsonProperty("PosOrderAmountOff")
	public void setPosOrderAmountOff(ConfigurationsPosOrderModel PosOrderAmountOff) {
		this.PosOrderAmountOff = PosOrderAmountOff;
	}

	/**
	 * POS注文金額割引率.
	 */
	@JsonProperty("PosOrderPercentOff")
	private ConfigurationsPosOrderModel PosOrderPercentOff;

	/**
	 * POS注文金額割引率ゲッター.
	 *
	 * @return POS注文金額割引率
	 */
	@JsonProperty("PosOrderPercentOff")
	public ConfigurationsPosOrderModel getPosOrderPercentOff() {
		return PosOrderPercentOff;
	}

	/**
	 * POS注文金額割引率セッター.
	 *
	 * @param PosOrderPercentOff POS注文金額割引率
	 */
	@JsonProperty("PosOrderPercentOff")
	public void setPosOrderPercentOff(ConfigurationsPosOrderModel PosOrderPercentOff) {
		this.PosOrderPercentOff = PosOrderPercentOff;
	}

	/**
	 * 税情報.
	 */
	@JsonProperty("OFFLINE_TAX_RATES")
	private ConfigurationsPosOrderTaxModel OFFLINE_TAX_RATES;

	/**
	 * 税情報ゲッター.
	 *
	 * @return 税情報
	 */
	@JsonProperty("OFFLINE_TAX_RATES")
	public ConfigurationsPosOrderTaxModel getOFFLINE_TAX_RATES() {
		return OFFLINE_TAX_RATES;
	}

	/**
	 * 税情報セッター.
	 *
	 * @param OFFLINE_TAX_RATES 税情報
	 */
	@JsonProperty("OFFLINE_TAX_RATES")
	public void setOFFLINE_TAX_RATES(ConfigurationsPosOrderTaxModel OFFLINE_TAX_RATES) {
		this.OFFLINE_TAX_RATES = OFFLINE_TAX_RATES;
	}

	/**
	 *
	 */
	@JsonProperty("PROMOTION_SETS")
	private ConfigurationsPriceListsModel PROMOTION_SETS;

	/**
	 * ゲッター.
	 *
	 * @return
	 */
	@JsonProperty("PROMOTION_SETS")
	public ConfigurationsPriceListsModel getPROMOTION_SETS() {
		return PROMOTION_SETS;
	}

	/**
	 * セッター.
	 *
	 * @param PROMOTION_SETS
	 */
	@JsonProperty("PROMOTION_SETS")
	public void setPROMOTION_SETS(ConfigurationsPriceListsModel PROMOTION_SETS) {
		this.PROMOTION_SETS = PROMOTION_SETS;
	}

	/**
	 * BUSINESS_DAY_START_TIME
	 */
	//    @JsonProperty("BUSINESS_DAY_START_TIME")
	//    private ConfigurationsBusinessDayTimeModel BUSINESS_DAY_START_TIME;

	/**
	 * BUSINESS_DAY_START_TIMEゲッター.
	 *
	 * @return
	 */
	//    @JsonProperty("BUSINESS_DAY_START_TIME")
	//    public ConfigurationsBusinessDayTimeModel getBUSINESS_DAY_START_TIME() {
	//        return BUSINESS_DAY_START_TIME;
	//    }

	/**
	 * BUSINESS_DAY_START_TIMEセッター.
	 *
	 * @param BUSINESS_DAY_START_TIME
	 */
	//    @JsonProperty("BUSINESS_DAY_START_TIME")
	//    public void setBUSINESS_DAY_START_TIME(
	//            ConfigurationsBusinessDayTimeModel BUSINESS_DAY_START_TIME) {
	//        this.BUSINESS_DAY_START_TIME = BUSINESS_DAY_START_TIME;
	//    }

	/**
	 * BUSINESS_DAY_HARD_END_TIME
	 */
	@JsonProperty("BUSINESS_DAY_HARD_END_TIME")
	private ConfigurationsBusinessDayTimeModel BUSINESS_DAY_HARD_END_TIME;

	/**
	 * BUSINESS_DAY_HARD_END_TIMEゲッター.
	 *
	 * @return
	 */
	@JsonProperty("BUSINESS_DAY_HARD_END_TIME")
	public ConfigurationsBusinessDayTimeModel getBUSINESS_DAY_HARD_END_TIME() {
		return BUSINESS_DAY_HARD_END_TIME;
	}

	/**
	 * BUSINESS_DAY_HARD_END_TIMEセッター.
	 *
	 * @param BUSINESS_DAY_HARD_END_TIME
	 */
	@JsonProperty("BUSINESS_DAY_HARD_END_TIME")
	public void setBUSINESS_DAY_HARD_END_TIME(
			ConfigurationsBusinessDayTimeModel BUSINESS_DAY_HARD_END_TIME) {
		this.BUSINESS_DAY_HARD_END_TIME = BUSINESS_DAY_HARD_END_TIME;
	}

	/**
	 * BUSINESS_DAY_SOFT_END_TIME
	 */
	@JsonProperty("BUSINESS_DAY_SOFT_END_TIME")
	private ConfigurationsBusinessDayTimeModel BUSINESS_DAY_SOFT_END_TIME;

	/**
	 * BUSINESS_DAY_SOFT_END_TIMEゲッター.
	 *
	 * @return
	 */
	@JsonProperty("BUSINESS_DAY_SOFT_END_TIME")
	public ConfigurationsBusinessDayTimeModel getBUSINESS_DAY_SOFT_END_TIME() {
		return BUSINESS_DAY_SOFT_END_TIME;
	}

	/**
	 * BUSINESS_DAY_SOFT_END_TIMEセッター.
	 *
	 * @param BUSINESS_DAY_SOFT_END_TIME
	 */
	@JsonProperty("BUSINESS_DAY_SOFT_END_TIME")
	public void setBUSINESS_DAY_SOFT_END_TIME(
			ConfigurationsBusinessDayTimeModel BUSINESS_DAY_SOFT_END_TIME) {
		this.BUSINESS_DAY_SOFT_END_TIME = BUSINESS_DAY_SOFT_END_TIME;
	}

	/**
	 * CONTRACT_PERIOD
	 */
	@JsonProperty("CONTRACT_PERIOD")
	private ConfigurationsContractPeriodModel CONTRACT_PERIOD;

	/**
	 * CONTRACT_PERIODゲッター.
	 *
	 * @return
	 */
	@JsonProperty("CONTRACT_PERIOD")
	public ConfigurationsContractPeriodModel getCONTRACT_PERIOD() {
		return CONTRACT_PERIOD;
	}

	/**
	 * CONTRACT_PERIODセッター.
	 *
	 * @param BUSINESS_DAY_SOFT_END_TIME
	 */
	@JsonProperty("CONTRACT_PERIOD")
	public void setCONTRACT_PERIOD(ConfigurationsContractPeriodModel CONTRACT_PERIOD) {
		this.CONTRACT_PERIOD = CONTRACT_PERIOD;
	}

	/**
	 * CONTRACT_PERIOD
	 */
	@JsonProperty("LOCALE")
	private ConfigurationsLocaleModel LOCALE;

	/**
	 * CONTRACT_PERIOD
	 */
	@JsonProperty("TIMEZONE")
	private ConfigurationsTimezoneModel TIMEZONE;

	/**
	 * SYSTEM_OPTION_BARCODE
	 */
	@JsonProperty("SYSTEM_OPTION_BARCODE")
	private Map<String, Object> SYSTEM_OPTION_BARCODE;

	/**
	 * SYSTEM_OPTION_BARCODEゲッター.
	 *
	 * @return
	 */
	@JsonProperty("SYSTEM_OPTION_BARCODE")
	public Map<String, Object> getSYSTEM_OPTION_BARCODE() {
		return SYSTEM_OPTION_BARCODE;
	}

	/**
	 * SYSTEM_OPTION_BARCODEセッター.
	 *
	 * @param SYSTEM_OPTION_BARCODE
	 */
	@JsonProperty("SYSTEM_OPTION_BARCODE")
	public void setSYSTEM_OPTION_BARCODE(Map<String, Object> SYSTEM_OPTION_BARCODE) {
		this.SYSTEM_OPTION_BARCODE = SYSTEM_OPTION_BARCODE;
	}

	/**
	 * BARCODE_CONVERSION
	 */
	@JsonProperty("BARCODE_CONVERSION")
	private Map<String, Object> BARCODE_CONVERSION;

	/**
	 * BARCODE_CONVERSIONゲッター.
	 *
	 * @return
	 */
	@JsonProperty("BARCODE_CONVERSION")
	public Map<String, Object> getBARCODE_CONVERSION() {
		return BARCODE_CONVERSION;
	}

	/**
	 * BARCODE_CONVERSIONセッター.
	 *
	 * @param BARCODE_CONVERSION
	 */
	@JsonProperty("BARCODE_CONVERSION")
	public void setBARCODE_CONVERSION(Map<String, Object> BARCODE_CONVERSION) {
		this.BARCODE_CONVERSION = BARCODE_CONVERSION;
	}

	/**
	 * BARCODE_FLAG
	 */
	@JsonProperty("BARCODE_FLAG")
	private Map<String, Object> BARCODE_FLAG;

	/**
	 * BARCODE_FLAGゲッター.
	 *
	 * @return
	 */
	@JsonProperty("BARCODE_FLAG")
	public Map<String, Object> getBARCODE_FLAG() {
		return BARCODE_FLAG;
	}

	/**
	 * BARCODE_FLAGセッター.
	 *
	 * @param BARCODE_FLAG
	 */
	@JsonProperty("BARCODE_FLAG")
	public void setBARCODE_FLAG(Map<String, Object> BARCODE_FLAG) {
		this.BARCODE_FLAG = BARCODE_FLAG;
	}

	/**
	 * REVENUE_STAMP_SETTINGS
	 */
	@JsonProperty("REVENUE_STAMP_SETTINGS")
	private Map<String, Object> REVENUE_STAMP_SETTINGS;

	/**
	 * REVENUE_STAMP_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("REVENUE_STAMP_SETTINGS")
	public Map<String, Object> getREVENUE_STAMP_SETTINGS() {
		return REVENUE_STAMP_SETTINGS;
	}

	/**
	 * REVENUE_STAMP_SETTINGSセッター.
	 *
	 * @param REVENUE_STAMP_SETTINGS
	 */
	@JsonProperty("REVENUE_STAMP_SETTINGS")
	public void setREVENUE_STAMP_SETTINGS(Map<String, Object> REVENUE_STAMP_SETTINGS) {
		this.REVENUE_STAMP_SETTINGS = REVENUE_STAMP_SETTINGS;
	}

	/**
	 * REVENUE_STAMP_SETTINGS
	 */
	@JsonProperty("REVENUE_STAMP_CONFIGURATION")
	private Map<String, Object> REVENUE_STAMP_CONFIGURATION;

	/**
	 * REVENUE_STAMP_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("REVENUE_STAMP_CONFIGURATION")
	public Map<String, Object> getREVENUE_STAMP_CONFIGURATION() {
		return REVENUE_STAMP_CONFIGURATION;
	}

	/**
	 * REVENUE_STAMP_SETTINGSセッター.
	 *
	 * @param REVENUE_STAMP_SETTINGS
	 */
	@JsonProperty("REVENUE_STAMP_CONFIGURATION")
	public void setREVENUE_STAMP_CONFIGURATION(Map<String, Object> REVENUE_STAMP_CONFIGURATION) {
		this.REVENUE_STAMP_CONFIGURATION = REVENUE_STAMP_CONFIGURATION;
	}

	/**
	 * NAME_TRANSACTION_SETTINGS
	 */
	@JsonProperty("NAME_TRANSACTION_SETTINGS")
	private Map<String, Object> NAME_TRANSACTION_SETTINGS;

	/**
	 * NAME_TRANSACTION_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("NAME_TRANSACTION_SETTINGS")
	public Map<String, Object> getNAME_TRANSACTION_SETTINGS() {
		return NAME_TRANSACTION_SETTINGS;
	}

	/**
	 * NAME_TRANSACTION_SETTINGSセッター.
	 *
	 * @param NAME_TRANSACTION_SETTINGS
	 */
	@JsonProperty("NAME_TRANSACTION_SETTINGS")
	public void setNAME_TRANSACTION_SETTINGS(Map<String, Object> NAME_TRANSACTION_SETTINGS) {
		this.NAME_TRANSACTION_SETTINGS = NAME_TRANSACTION_SETTINGS;
	}

	/**
	 * BUSINESS_DAY_START_TIME_MAP
	 */
	@JsonProperty("BUSINESS_DAY_START_TIME")
	private Map<String, Object> BUSINESS_DAY_START_TIME_MAP;

	/**
	 * BUSINESS_DAY_START_TIME_MAPゲッター.
	 *
	 * @return
	 */
	@JsonProperty("BUSINESS_DAY_START_TIME")
	public Map<String, Object> getBUSINESS_DAY_START_TIME_MAP() {
		return BUSINESS_DAY_START_TIME_MAP;
	}

	/**
	 * BUSINESS_DAY_START_TIMEセッター.
	 *
	 * @param BUSINESS_DAY_START_TIME
	 */
	@JsonProperty("BUSINESS_DAY_START_TIME")
	public void setBUSINESS_DAY_START_TIME_MAP(Map<String, Object> BUSINESS_DAY_START_TIME_MAP) {
		this.BUSINESS_DAY_START_TIME_MAP = BUSINESS_DAY_START_TIME_MAP;
	}

	/**
	 * BUSINESS_DAY_START_TIME_MAP
	 */
	@JsonProperty("STORE_OPERATIONS_SETTINGS")
	private Map<String, Object> STORE_OPERATIONS_SETTINGS;

	/**
	 * BUSINESS_DAY_START_TIME_MAPゲッター.
	 *
	 * @return
	 */
	@JsonProperty("STORE_OPERATIONS_SETTINGS")
	public Map<String, Object> getSTORE_OPERATIONS_SETTINGS() {
		return STORE_OPERATIONS_SETTINGS;
	}

	/**
	 * BUSINESS_DAY_START_TIMEセッター.
	 *
	 * @param BUSINESS_DAY_START_TIME
	 */
	@JsonProperty("STORE_OPERATIONS_SETTINGS")
	public void setSTORE_OPERATIONS_SETTINGS(Map<String, Object> STORE_OPERATIONS_SETTINGS) {
		this.STORE_OPERATIONS_SETTINGS = STORE_OPERATIONS_SETTINGS;
	}

	/**
	 * DRAWER_MENU_SETTINGS
	 */
	@JsonProperty("DRAWER_MENU_SETTINGS")
	private Map<String, Object> DRAWER_MENU_SETTINGS;

	/**
	 * DRAWER_MENU_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("DRAWER_MENU_SETTINGS")
	public Map<String, Object> getDRAWER_MENU_SETTINGS() {
		return DRAWER_MENU_SETTINGS;
	}

	/**
	 * DRAWER_MENU_SETTINGSセッター.
	 *
	 * @param DRAWER_MENU_SETTINGS
	 */
	@JsonProperty("DRAWER_MENU_SETTINGS")
	public void setDRAWER_MENU_SETTINGS(Map<String, Object> DRAWER_MENU_SETTINGS) {
		this.DRAWER_MENU_SETTINGS = DRAWER_MENU_SETTINGS;
	}

	/**
	 * ITEM_DETAILS_SETTINGS
	 */
	@JsonProperty("ITEM_DETAILS_SETTINGS")
	private Map<String, Object> ITEM_DETAILS_SETTINGS;

	/**
	 * ITEM_DETAILS_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("ITEM_DETAILS_SETTINGS")
	public Map<String, Object> getITEM_DETAILS_SETTINGS() {
		return ITEM_DETAILS_SETTINGS;
	}

	/**
	 * ITEM_DETAILS_SETTINGSセッター.
	 *
	 * @param ITEM_DETAILS_SETTINGS
	 */
	@JsonProperty("ITEM_DETAILS_SETTINGS")
	public void setITEM_DETAILS_SETTINGS(Map<String, Object> ITEM_DETAILS_SETTINGS) {
		this.ITEM_DETAILS_SETTINGS = ITEM_DETAILS_SETTINGS;
	}

	/**
	 * ACCOUNTING_SETTINGS
	 */
	@JsonProperty("ACCOUNTING_SETTINGS")
	private Map<String, Object> ACCOUNTING_SETTINGS;

	/**
	 * ACCOUNTING_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("ACCOUNTING_SETTINGS")
	public Map<String, Object> getACCOUNTING_SETTINGS() {
		return ACCOUNTING_SETTINGS;
	}

	/**
	 * ACCOUNTING_SETTINGSセッター.
	 *
	 * @param ACCOUNTING_SETTINGS
	 */
	@JsonProperty("ACCOUNTING_SETTINGS")
	public void setACCOUNTING_SETTINGS(Map<String, Object> ACCOUNTING_SETTINGS) {
		this.ACCOUNTING_SETTINGS = ACCOUNTING_SETTINGS;
	}

	/**
	 * OPERATIONS_SETTINGS
	 */
	@JsonProperty("OPERATIONS_SETTINGS")
	private Map<String, Object> OPERATIONS_SETTINGS;

	/**
	 * OPERATIONS_SETTINGSゲッター.
	 *
	 * @return
	 */
	@JsonProperty("OPERATIONS_SETTINGS")
	public Map<String, Object> getOPERATIONS_SETTINGS() {
		return OPERATIONS_SETTINGS;
	}

	/**
	 * OPERATIONS_SETTINGSセッター.
	 *
	 * @param OPERATIONS_SETTINGS
	 */
	@JsonProperty("OPERATIONS_SETTINGS")
	public void setOPERATIONS_SETTINGS(Map<String, Object> OPERATIONS_SETTINGS) {
		this.OPERATIONS_SETTINGS = OPERATIONS_SETTINGS;
	}

	/**
	 * CREDIT
	 */
	@JsonProperty("CREDIT")
	private Map<String, Object> CREDIT;

	/**
	 * MC_STORED_VALUE
	 */
	@JsonProperty("MC_STORED_VALUE")
	private Map<String, Object> MC_STORED_VALUE;

	/**
	 * PERSONAL_CHECK
	 */
	@JsonProperty("PERSONAL_CHECK")
	private Map<String, Object> PERSONAL_CHECK;

	/**
	 * DEBIT
	 */
	@JsonProperty("DEBIT")
	private Map<String, Object> DEBIT;

	/**
	 * ONLINE_WIC
	 */
	@JsonProperty("ONLINE_WIC")
	private Map<String, Object> ONLINE_WIC;

	/**
	 * MC_DEBIT
	 */
	@JsonProperty("MC_DEBIT")
	private Map<String, Object> MC_DEBIT;

	/**
	 * SMARTCARD_WIC
	 */
	@JsonProperty("SMARTCARD_WIC")
	private Map<String, Object> SMARTCARD_WIC;

	/**
	 * CORPORATE_CHECK
	 */
	@JsonProperty("CORPORATE_CHECK")
	private Map<String, Object> CORPORATE_CHECK;

	/**
	 * AMEX_STORED_VALUE
	 */
	@JsonProperty("AMEX_STORED_VALUE")
	private Map<String, Object> AMEX_STORED_VALUE;

	/**
	 * VISA_PREPAID
	 */
	@JsonProperty("VISA_PREPAID")
	private Map<String, Object> VISA_PREPAID;

	/**
	 * EBT_CASH
	 */
	@JsonProperty("EBT_CASH")
	private Map<String, Object> EBT_CASH;

	/**
	 * AMEX_DEBIT
	 */
	@JsonProperty("AMEX_DEBIT")
	private Map<String, Object> AMEX_DEBIT;

	/**
	 * GIFT_CARD
	 */
	@JsonProperty("GIFT_CARD")
	private Map<String, Object> GIFT_CARD;

	/**
	 * MC_CREDIT
	 */
	@JsonProperty("MC_CREDIT")
	private Map<String, Object> MC_CREDIT;

	/**
	 * VISA_DEBIT
	 */
	@JsonProperty("VISA_DEBIT")
	private Map<String, Object> VISA_DEBIT;

	/**
	 * CASH_JPY
	 */
	@JsonProperty("CASH_JPY")
	private Map<String, Object> CASH_JPY;

	/**
	 * PAYMENT_01
	 */
	@JsonProperty("PAYMENT_01")
	private Map<String, Object> PAYMENT_01;

	/**
	 * PAYMENT_01
	 */
	@JsonProperty("PAYMENT_02")
	private Map<String, Object> PAYMENT_02;

	/**
	 * PAYMENT_01
	 */
	@JsonProperty("PAYMENT_03")
	private Map<String, Object> PAYMENT_03;

	/**
	 * PAYMENT_01
	 */
	@JsonProperty("PAYMENT_04")
	private Map<String, Object> PAYMENT_04;

	/**
	 * PAYMENT_01
	 */
	@JsonProperty("PAYMENT_05")
	private Map<String, Object> PAYMENT_05;

	// G001.00.0 Add-Start
	/**
	 * PAYMENT_06
	 */
	@JsonProperty("PAYMENT_06")
	private Map<String, Object> PAYMENT_06;

	/**
	 * PAYMENT_07
	 */
	@JsonProperty("PAYMENT_07")
	private Map<String, Object> PAYMENT_07;

	/**
	 * PAYMENT_08
	 */
	@JsonProperty("PAYMENT_08")
	private Map<String, Object> PAYMENT_08;

	/**
	 * PAYMENT_09
	 */
	@JsonProperty("PAYMENT_09")
	private Map<String, Object> PAYMENT_09;

	/**
	 * PAYMENT_10
	 */
	@JsonProperty("PAYMENT_10")
	private Map<String, Object> PAYMENT_10;

	/**
	 * PAYMENT_11
	 */
	@JsonProperty("PAYMENT_11")
	private Map<String, Object> PAYMENT_11;

	/**
	 * PAYMENT_12
	 */
	@JsonProperty("PAYMENT_12")
	private Map<String, Object> PAYMENT_12;

	/**
	 * PAYMENT_13
	 */
	@JsonProperty("PAYMENT_13")
	private Map<String, Object> PAYMENT_13;

	/**
	 * PAYMENT_14
	 */
	@JsonProperty("PAYMENT_14")
	private Map<String, Object> PAYMENT_14;

	/**
	 * PAYMENT_15
	 */
	@JsonProperty("PAYMENT_15")
	private Map<String, Object> PAYMENT_15;

	/**
	 * PAYMENT_16
	 */
	@JsonProperty("PAYMENT_16")
	private Map<String, Object> PAYMENT_16;

	/**
	 * PAYMENT_17
	 */
	@JsonProperty("PAYMENT_17")
	private Map<String, Object> PAYMENT_17;

	/**
	 * PAYMENT_18
	 */
	@JsonProperty("PAYMENT_18")
	private Map<String, Object> PAYMENT_18;

	/**
	 * PAYMENT_19
	 */
	@JsonProperty("PAYMENT_19")
	private Map<String, Object> PAYMENT_19;

	/**
	 * PAYMENT_20
	 */
	@JsonProperty("PAYMENT_20")
	private Map<String, Object> PAYMENT_20;

	/**
	 * PAYMENT_21
	 */
	@JsonProperty("PAYMENT_21")
	private Map<String, Object> PAYMENT_21;

	/**
	 * PAYMENT_22
	 */
	@JsonProperty("PAYMENT_22")
	private Map<String, Object> PAYMENT_22;

	/**
	 * PAYMENT_23
	 */
	@JsonProperty("PAYMENT_23")
	private Map<String, Object> PAYMENT_23;

	/**
	 * PAYMENT_24
	 */
	@JsonProperty("PAYMENT_24")
	private Map<String, Object> PAYMENT_24;

	/**
	 * PAYMENT_25
	 */
	@JsonProperty("PAYMENT_25")
	private Map<String, Object> PAYMENT_25;

	/**
	 * PAYMENT_26
	 */
	@JsonProperty("PAYMENT_26")
	private Map<String, Object> PAYMENT_26;

	/**
	 * PAYMENT_27
	 */
	@JsonProperty("PAYMENT_27")
	private Map<String, Object> PAYMENT_27;

	/**
	 * PAYMENT_28
	 */
	@JsonProperty("PAYMENT_28")
	private Map<String, Object> PAYMENT_28;

	/**
	 * PAYMENT_29
	 */
	@JsonProperty("PAYMENT_29")
	private Map<String, Object> PAYMENT_29;

	/**
	 * PAYMENT_30
	 */
	@JsonProperty("PAYMENT_30")
	private Map<String, Object> PAYMENT_30;

	/**
	 * PAYMENT_31
	 */
	@JsonProperty("PAYMENT_31")
	private Map<String, Object> PAYMENT_31;

	/**
	 * PAYMENT_32
	 */
	@JsonProperty("PAYMENT_32")
	private Map<String, Object> PAYMENT_32;

	/**
	 * PAYMENT_33
	 */
	@JsonProperty("PAYMENT_33")
	private Map<String, Object> PAYMENT_33;

	/**
	 * PAYMENT_34
	 */
	@JsonProperty("PAYMENT_34")
	private Map<String, Object> PAYMENT_34;

	/**
	 * PAYMENT_35
	 */
	@JsonProperty("PAYMENT_35")
	private Map<String, Object> PAYMENT_35;

	/**
	 * PAYMENT_36
	 */
	@JsonProperty("PAYMENT_36")
	private Map<String, Object> PAYMENT_36;

	/**
	 * PAYMENT_37
	 */
	@JsonProperty("PAYMENT_37")
	private Map<String, Object> PAYMENT_37;

	/**
	 * PAYMENT_38
	 */
	@JsonProperty("PAYMENT_38")
	private Map<String, Object> PAYMENT_38;

	/**
	 * PAYMENT_39
	 */
	@JsonProperty("PAYMENT_39")
	private Map<String, Object> PAYMENT_39;

	/**
	 * PAYMENT_40
	 */
	@JsonProperty("PAYMENT_40")
	private Map<String, Object> PAYMENT_40;

	/**
	 * PAYMENT_41
	 */
	@JsonProperty("PAYMENT_41")
	private Map<String, Object> PAYMENT_41;

	/**
	 * PAYMENT_42
	 */
	@JsonProperty("PAYMENT_42")
	private Map<String, Object> PAYMENT_42;

	/**
	 * PAYMENT_43
	 */
	@JsonProperty("PAYMENT_43")
	private Map<String, Object> PAYMENT_43;

	/**
	 * PAYMENT_44
	 */
	@JsonProperty("PAYMENT_44")
	private Map<String, Object> PAYMENT_44;

	/**
	 * PAYMENT_45
	 */
	@JsonProperty("PAYMENT_45")
	private Map<String, Object> PAYMENT_45;

	/**
	 * PAYMENT_46
	 */
	@JsonProperty("PAYMENT_46")
	private Map<String, Object> PAYMENT_46;

	/**
	 * PAYMENT_47
	 */
	@JsonProperty("PAYMENT_47")
	private Map<String, Object> PAYMENT_47;

	/**
	 * PAYMENT_48
	 */
	@JsonProperty("PAYMENT_48")
	private Map<String, Object> PAYMENT_48;

	/**
	 * PAYMENT_49
	 */
	@JsonProperty("PAYMENT_49")
	private Map<String, Object> PAYMENT_49;

	/**
	 * PAYMENT_50
	 */
	@JsonProperty("PAYMENT_50")
	private Map<String, Object> PAYMENT_50;

	/**
	 * PAYMENT_51
	 */
	@JsonProperty("PAYMENT_51")
	private Map<String, Object> PAYMENT_51;

	/**
	 * PAYMENT_52
	 */
	@JsonProperty("PAYMENT_52")
	private Map<String, Object> PAYMENT_52;

	/**
	 * PAYMENT_53
	 */
	@JsonProperty("PAYMENT_53")
	private Map<String, Object> PAYMENT_53;

	/**
	 * PAYMENT_54
	 */
	@JsonProperty("PAYMENT_54")
	private Map<String, Object> PAYMENT_54;

	/**
	 * PAYMENT_55
	 */
	@JsonProperty("PAYMENT_55")
	private Map<String, Object> PAYMENT_55;

	/**
	 * PAYMENT_56
	 */
	@JsonProperty("PAYMENT_56")
	private Map<String, Object> PAYMENT_56;

	/**
	 * PAYMENT_57
	 */
	@JsonProperty("PAYMENT_57")
	private Map<String, Object> PAYMENT_57;

	/**
	 * PAYMENT_58
	 */
	@JsonProperty("PAYMENT_58")
	private Map<String, Object> PAYMENT_58;

	/**
	 * PAYMENT_59
	 */
	@JsonProperty("PAYMENT_59")
	private Map<String, Object> PAYMENT_59;

	/**
	 * PAYMENT_60
	 */
	@JsonProperty("PAYMENT_60")
	private Map<String, Object> PAYMENT_60;

	/**
	 * PAYMENT_61
	 */
	@JsonProperty("PAYMENT_61")
	private Map<String, Object> PAYMENT_61;

	/**
	 * PAYMENT_62
	 */
	@JsonProperty("PAYMENT_62")
	private Map<String, Object> PAYMENT_62;

	/**
	 * PAYMENT_63
	 */
	@JsonProperty("PAYMENT_63")
	private Map<String, Object> PAYMENT_63;

	/**
	 * PAYMENT_64
	 */
	@JsonProperty("PAYMENT_64")
	private Map<String, Object> PAYMENT_64;

	/**
	 * PAYMENT_65
	 */
	@JsonProperty("PAYMENT_65")
	private Map<String, Object> PAYMENT_65;

	/**
	 * PAYMENT_66
	 */
	@JsonProperty("PAYMENT_66")
	private Map<String, Object> PAYMENT_66;

	/**
	 * PAYMENT_67
	 */
	@JsonProperty("PAYMENT_67")
	private Map<String, Object> PAYMENT_67;

	/**
	 * PAYMENT_68
	 */
	@JsonProperty("PAYMENT_68")
	private Map<String, Object> PAYMENT_68;

	/**
	 * PAYMENT_69
	 */
	@JsonProperty("PAYMENT_69")
	private Map<String, Object> PAYMENT_69;

	/**
	 * PAYMENT_70
	 */
	@JsonProperty("PAYMENT_70")
	private Map<String, Object> PAYMENT_70;

	/**
	 * PAYMENT_71
	 */
	@JsonProperty("PAYMENT_71")
	private Map<String, Object> PAYMENT_71;

	/**
	 * PAYMENT_72
	 */
	@JsonProperty("PAYMENT_72")
	private Map<String, Object> PAYMENT_72;

	/**
	 * PAYMENT_73
	 */
	@JsonProperty("PAYMENT_73")
	private Map<String, Object> PAYMENT_73;

	/**
	 * PAYMENT_74
	 */
	@JsonProperty("PAYMENT_74")
	private Map<String, Object> PAYMENT_74;

	/**
	 * PAYMENT_75
	 */
	@JsonProperty("PAYMENT_75")
	private Map<String, Object> PAYMENT_75;

	/**
	 * PAYMENT_76
	 */
	@JsonProperty("PAYMENT_76")
	private Map<String, Object> PAYMENT_76;

	/**
	 * PAYMENT_77
	 */
	@JsonProperty("PAYMENT_77")
	private Map<String, Object> PAYMENT_77;

	/**
	 * PAYMENT_78
	 */
	@JsonProperty("PAYMENT_78")
	private Map<String, Object> PAYMENT_78;

	/**
	 * PAYMENT_79
	 */
	@JsonProperty("PAYMENT_79")
	private Map<String, Object> PAYMENT_79;

	/**
	 * PAYMENT_80
	 */
	@JsonProperty("PAYMENT_80")
	private Map<String, Object> PAYMENT_80;

	/**
	 * PAYMENT_81
	 */
	@JsonProperty("PAYMENT_81")
	private Map<String, Object> PAYMENT_81;

	/**
	 * PAYMENT_82
	 */
	@JsonProperty("PAYMENT_82")
	private Map<String, Object> PAYMENT_82;

	/**
	 * PAYMENT_83
	 */
	@JsonProperty("PAYMENT_83")
	private Map<String, Object> PAYMENT_83;

	/**
	 * PAYMENT_84
	 */
	@JsonProperty("PAYMENT_84")
	private Map<String, Object> PAYMENT_84;

	/**
	 * PAYMENT_85
	 */
	@JsonProperty("PAYMENT_85")
	private Map<String, Object> PAYMENT_85;

	/**
	 * PAYMENT_86
	 */
	@JsonProperty("PAYMENT_86")
	private Map<String, Object> PAYMENT_86;

	/**
	 * PAYMENT_87
	 */
	@JsonProperty("PAYMENT_87")
	private Map<String, Object> PAYMENT_87;

	/**
	 * PAYMENT_88
	 */
	@JsonProperty("PAYMENT_88")
	private Map<String, Object> PAYMENT_88;

	/**
	 * PAYMENT_89
	 */
	@JsonProperty("PAYMENT_89")
	private Map<String, Object> PAYMENT_89;

	/**
	 * PAYMENT_90
	 */
	@JsonProperty("PAYMENT_90")
	private Map<String, Object> PAYMENT_90;

	/**
	 * PAYMENT_91
	 */
	@JsonProperty("PAYMENT_91")
	private Map<String, Object> PAYMENT_91;

	/**
	 * PAYMENT_92
	 */
	@JsonProperty("PAYMENT_92")
	private Map<String, Object> PAYMENT_92;

	/**
	 * PAYMENT_93
	 */
	@JsonProperty("PAYMENT_93")
	private Map<String, Object> PAYMENT_93;

	/**
	 * PAYMENT_94
	 */
	@JsonProperty("PAYMENT_94")
	private Map<String, Object> PAYMENT_94;

	/**
	 * PAYMENT_95
	 */
	@JsonProperty("PAYMENT_95")
	private Map<String, Object> PAYMENT_95;

	/**
	 * PAYMENT_96
	 */
	@JsonProperty("PAYMENT_96")
	private Map<String, Object> PAYMENT_96;

	/**
	 * PAYMENT_97
	 */
	@JsonProperty("PAYMENT_97")
	private Map<String, Object> PAYMENT_97;

	/**
	 * PAYMENT_98
	 */
	@JsonProperty("PAYMENT_98")
	private Map<String, Object> PAYMENT_98;

	/**
	 * PAYMENT_99
	 */
	@JsonProperty("PAYMENT_99")
	private Map<String, Object> PAYMENT_99;
	// G001.00.0 Add-End
	// G002.00.0 Add-Start
	@JsonProperty("PAYMENT_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_SEQUENCE_NO;
	// G002.00.0 Add-End
	// G003.00.0 Add-Start
	/**
	 * PAYMENT_01_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_01_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_01_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_02_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_02_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_02_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_03_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_03_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_03_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_04_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_04_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_04_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_05_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_05_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_05_SUB_SEQUENCE_NO;

	// G001.00.0 Add-Start
	/**
	 * PAYMENT_06_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_06_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_06_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_07_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_07_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_07_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_08_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_08_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_08_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_09_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_09_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_09_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_10_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_10_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_10_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_11_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_11_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_11_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_12_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_12_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_12_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_13_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_13_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_13_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_14_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_14_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_14_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_15_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_15_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_15_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_16_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_16_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_16_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_17_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_17_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_17_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_18_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_18_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_18_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_19_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_19_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_19_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_20_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_20_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_20_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_21_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_21_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_21_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_22_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_22_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_22_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_23_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_23_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_23_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_24_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_24_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_24_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_25_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_25_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_25_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_26_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_26_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_26_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_27_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_27_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_27_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_28_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_28_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_28_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_29_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_29_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_29_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_30_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_30_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_30_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_31_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_31_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_31_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_32_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_32_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_32_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_33_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_33_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_33_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_34_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_34_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_34_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_35_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_35_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_35_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_36_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_36_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_36_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_37_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_37_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_37_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_38_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_38_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_38_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_39_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_39_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_39_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_40_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_40_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_40_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_41_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_41_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_41_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_42_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_42_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_42_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_43_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_43_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_43_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_44_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_44_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_44_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_45_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_45_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_45_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_46_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_46_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_46_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_47_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_47_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_47_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_48_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_48_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_48_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_49_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_49_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_49_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_50_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_50_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_50_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_51_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_51_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_51_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_52_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_52_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_52_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_53_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_53_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_53_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_54_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_54_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_54_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_55_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_55_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_55_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_56_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_56_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_56_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_57_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_57_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_57_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_58_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_58_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_58_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_59_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_59_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_59_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_60_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_60_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_60_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_61_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_61_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_61_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_62_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_62_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_62_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_63_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_63_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_63_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_64_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_64_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_64_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_65_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_65_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_65_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_66_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_66_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_66_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_67_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_67_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_67_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_68_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_68_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_68_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_69_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_69_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_69_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_70_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_70_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_70_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_71_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_71_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_71_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_72_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_72_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_72_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_73_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_73_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_73_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_74_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_74_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_74_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_75_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_75_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_75_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_76_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_76_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_76_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_77_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_77_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_77_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_78_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_78_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_78_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_79_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_79_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_79_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_80_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_80_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_80_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_81_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_81_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_81_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_82_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_82_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_82_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_83_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_83_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_83_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_84_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_84_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_84_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_85_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_85_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_85_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_86_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_86_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_86_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_87_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_87_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_87_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_88_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_88_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_88_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_89_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_89_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_89_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_90_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_90_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_90_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_91_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_91_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_91_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_92_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_92_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_92_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_93_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_93_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_93_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_94_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_94_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_94_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_95_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_95_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_95_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_96_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_96_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_96_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_97_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_97_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_97_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_98_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_98_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_98_SUB_SEQUENCE_NO;

	/**
	 * PAYMENT_99_SUB_SEQUENCE_NO
	 */
	@JsonProperty("PAYMENT_99_SUB_SEQUENCE_NO")
	private Map<String, Object> PAYMENT_99_SUB_SEQUENCE_NO;
	// G003.00.0 Add-End
	/**
	 * AMEX_CREDIT
	 */
	@JsonProperty("AMEX_CREDIT")
	private Map<String, Object> AMEX_CREDIT;

	/**
	 * DEPOSIT_REFUND_VOUCHER
	 */
	@JsonProperty("DEPOSIT_REFUND_VOUCHER")
	private Map<String, Object> DEPOSIT_REFUND_VOUCHER;

	/**
	 * DISCOVER_CREDIT
	 */
	@JsonProperty("DISCOVER_CREDIT")
	private Map<String, Object> DISCOVER_CREDIT;

	/**
	 * MANUFACTURER_COUPON
	 */
	@JsonProperty("MANUFACTURER_COUPON")
	private Map<String, Object> MANUFACTURER_COUPON;

	/**
	 * EBT_FOOD
	 */
	@JsonProperty("EBT_FOOD")
	private Map<String, Object> EBT_FOOD;

	/**
	 * DISCOVER_DEBIT
	 */
	@JsonProperty("DISCOVER_DEBIT")
	private Map<String, Object> DISCOVER_DEBIT;

	/**
	 * VISA_CREDIT
	 */
	@JsonProperty("VISA_CREDIT")
	private Map<String, Object> VISA_CREDIT;

	/**
	 * DISCOVER_STORED_VALUE
	 */
	@JsonProperty("DISCOVER_STORED_VALUE")
	private Map<String, Object> DISCOVER_STORED_VALUE;
	// G004.00.0 Add-Start
	@JsonProperty("MAX_LOGIN_ATTEMPTS")
	private Map<String, Object> MAX_LOGIN_ATTEMPTS;
	// G004.00.0 Add-End

	// KSD V001.000 AS
	/**
	 * CODEPAY_PROPERTY_SETTINGS
	 */
	@JsonProperty("CODEPAY_PROPERTY_SETTINGS")
	private Map<String, Object> CODEPAY_PROPERTY_SETTINGS;

	/**
	 * CODEPAY_ALARMMESSAGE_SETTINGS
	 */
	@JsonProperty("CODEPAY_ALARMMESSAGE_SETTINGS")
	private Map<String, Object> CODEPAY_ALARMMESSAGE_SETTINGS;
	
	/**
	 * STORE_GROUP_1
	 */
	@JsonProperty("STORE_GROUP_1")
	private Map<String, Object> STORE_GROUP_1;

	/**
	 * STORE_GROUP_2
	 */
	@JsonProperty("STORE_GROUP_2")
	private Map<String, Object> STORE_GROUP_2;

	/**
	 * SELF_OPTION_SETTINGS
	 */
	@JsonProperty("SELF_OPTION_SETTINGS")
	private Map<String, Object> SELF_OPTION_SETTINGS;

	/**
	 * SELF_TIMER_SETTINGS
	 */
	@JsonProperty("SELF_TIMER_SETTINGS")
	private Map<String, Object> SELF_TIMER_SETTINGS;
	
	/**
	 * SELF_PAYMENT_SETTINGS
	 */
	@JsonProperty("SELF_PAYMENT_SETTINGS")
	private Map<String, Object> SELF_PAYMENT_SETTINGS;

	/**
	 * SELF_MESSAGE_SETTINGS
	 */
	@JsonProperty("SELF_MESSAGE_SETTINGS")
	private Map<String, Object> SELF_MESSAGE_SETTINGS;

	/**
	 * SELF_ELEMENTFILE_SETTINGS
	 */
	@JsonProperty("SELF_ELEMENTFILE_SETTINGS")
	private Map<String, Object> SELF_ELEMENTFILE_SETTINGS;

// KSD V001.000 20231002 AS
	/**
	 * CUSTOMER_OPTION_SETTINGS
	 */
	@JsonProperty("CUSTOMER_OPTION_SETTINGS")
	private Map<String, Object> CUSTOMER_OPTION_SETTINGS;
	/**
	 * CUSTOMER_FILE_SETTINGS
	 */
	@JsonProperty("CUSTOMER_FILE_SETTINGS")
	private Map<String, Object> CUSTOMER_FILE_SETTINGS;
// KSD V001.000 20231002 AE
	
	
	/**
	 * COUPON_USAGE_SETTINGS
	 */
	@JsonProperty("COUPON_USAGE_SETTINGS")
	private Map<String, Object> COUPON_USAGE_SETTINGS;

	/**
	 * 商品分類階層設定情報.
	 */
	@JsonProperty("PRODUCT_DIVISIONS")
	private ConfigurationsProductDivisionsModel PRODUCT_DIVISIONS;

	/**
	 * 商品分類階層設定情報ゲッター.
	 *
	 * @return 商品分類階層設定情報
	 */
	@JsonProperty("PRODUCT_DIVISIONS")
	public ConfigurationsProductDivisionsModel getPRODUCT_DIVISIONS() {
		return PRODUCT_DIVISIONS;
	}

	/**
	 * 商品分類階層設定情報セッター.
	 *
	 * @param PRODUCT_DIVISIONS 商品分類階層設定情報
	 */
	@JsonProperty("PRODUCT_DIVISIONS")
	public void setPRODUCT_DIVISIONS(ConfigurationsProductDivisionsModel PRODUCT_DIVISIONS) {
		this.PRODUCT_DIVISIONS = PRODUCT_DIVISIONS;
	}

	/**
	 * NAME_DISPLAY_PRINT_SETTING
	 */
	@JsonProperty("NAME_DISPLAY_PRINT_SETTING")
	private Map<String, Object> NAME_DISPLAY_PRINT_SETTING;

	/**
	 * UNPAID_DELETE_REASON_CODE_VALUES
	 */
	@JsonProperty("UNPAID_DELETE_REASON_CODE_VALUES")
	private Map<String, Object> UNPAID_DELETE_REASON_CODE_VALUES;
	
	/**
	 * DISCOVER_STORED_VALUE
	 */
	@JsonProperty("SELF_PRICINGTABLE_DEFAULT_SETTINGS")
	private Map<String, Object> SELF_PRICINGTABLE_DEFAULT_SETTINGS;

	/**
	 * SELF_PRICINGTABLE
	 */
	@JsonProperty("SELF_PRICINGTABLE")
	private Map<String, Object> SELF_PRICINGTABLE;
	// KSD V001.000 AE

// KSD V001.000 AS 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合
	/**
	 * TAX_SETS
	 */
	@JsonProperty("TAX_SETS")
	private ConfigurationsTaxSetsModel TAX_SETS;

	/**
	 * TAX_SETSゲッター.
	 *
	 * @return TAX_SETS
	 */
	@JsonProperty("TAX_SETS")
	public ConfigurationsTaxSetsModel getTAX_SETS() {
		return TAX_SETS;
	}

	/**
	 * TAX_SETSセッター.
	 *
	 * @param TAX_SETS
	 */
	@JsonProperty("TAX_SETS")
	public void setTAX_SETS(ConfigurationsTaxSetsModel TAX_SETS) {
		this.TAX_SETS = TAX_SETS;
	}
// KSD V001.000 AE 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合

}
