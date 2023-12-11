// KSD V001.000 AS
package com.ttss.prementenance.model;

import javax.validation.constraints.NotNull;

import lombok.Data;

/**
 * 店舗マスタコピー処理の要求モデルを表します.
 * @author N.G.Gordo(AWS)
 * @version 1.0.0
 */
@Data
public class PostStoreMasterCopyRequestModel {
	public PostStoreMasterCopyRequestModel() {
		
	}
	
	/**
	 * コピー元店舗のID（ノードID）です。
	 */
	@NotNull
	private String snodeId;

	/**
	 * コピー先店舗のID（ノードID）です。
	 */
	@NotNull
	private String dnodeId;

	/**
	 * 更新方法を示す整数値です。
	 * 1: 追加のみ
	 * 2: 追加と更新
	 * 3: 元データ削除して追加
	 */
	@NotNull
	private int updateMode;

	/**
	 * 商品マスタの更新フラグです。
	 */
	@NotNull
	private boolean catalogsFlg;

	/**
	 * 売価変更マスタ更新フラグです。
	 */
	@NotNull
	private boolean pricelistsFlg;

	/**
	 * バーコードフラグ設定更新フラグです。
	 */
	@NotNull
	private boolean barcodeFlg;

	/**
	 * 取引別名称設定更新フラグです。
	 */
	@NotNull
	private boolean tranNameFlg;

	/**
	 * 収入印紙一括納付設定更新フラグです。
	 */
	@NotNull
	private boolean stampFlg;

	/**
	 * 店舗運用設定更新フラグです。
	 */
	@NotNull
	private boolean storeOpeFlg;

	/**
	 * 時間帯設定更新フラグです。
	 */
	@NotNull
	private boolean hourzoneFlg;

	/**
	 * 金種設定更新フラグです。
	 */
	@NotNull
	private boolean devicesFlg;

	/**
	 * 操作ボタン設定更新フラグです。
	 */
	@NotNull
	private boolean opBtnFlg;

	/**
	 * 締めボタン設定更新フラグです。
	 */
	@NotNull
	private boolean payBtnFlg;

	/**
	 * 商品分類階層設定更新フラグです。
	 */
	@NotNull
	private boolean prdDivFlg;

//KSD V001.000 20231114 DS
	/**
	 * テーブル設定更新フラグです。
	 */
//	@NotNull
//	private boolean restTblFlg;

	/**
	 * OES機器アドレス設定更新フラグです。
	 */
//	@NotNull
//	private boolean restSysFixFlg;

	/**
	 * システム管理可変マスタ更新フラグです。
	 */
//	@NotNull
//	private boolean restSysChgFlg;
//KSD V001.000 20231114 DE

	/**
	 * 券種マスタ更新フラグです。
	 */
	@NotNull
	private boolean ticketFlg;

	/**
	 * 曜日区分マスタ更新フラグです。
	 */
	@NotNull
	private boolean weekdayDivFlg;

	/**
	 * カレンダマスタ更新フラグです。
	 */
	@NotNull
	private boolean calendarFlg;

	/**
	 * ルームコースマスタ更新フラグです。
	 */
	@NotNull
	private boolean roomcourseFlg;

	/**
	 * ドリンクコースマスタ更新フラグです。
	 */
	@NotNull
	private boolean drinkcourseFlg;

	/**
	 * ルームコース料金マスタ更新フラグです。
	 */
	@NotNull
	private boolean roomRateFlg;

	/**
	 * 部屋関連情報更新フラグです。
	 */
	@NotNull
	private boolean roomRelationFlg;

	/**
	 * 部屋情報更新フラグです。
	 */
	@NotNull
	private boolean roomFlg;

	/**
	 * 部屋情報サブ更新フラグです。
	 */
	@NotNull
	private boolean roomsubFlg;

	/**
	 * コンプライアンス情報マスタ更新フラグです。
	 */
	@NotNull
	private boolean complianceFlg;

	/**
	 * 飲食システム管理固定マスタ更新フラグです。
	 */
	@NotNull
	private boolean restmcSysFixFlg;

	/**
	 * 飲食システム管理可変マスタ更新フラグです。
	 */
	@NotNull
	private boolean restmcSysChgFlg;

	/**
	 * 飲食SCPマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmcFscpFlg;

	/**
	 * 飲食情報部マスタ更新フラグです。
	 */
	@NotNull
	private boolean restmcFhinpFlg;

	/**
	 * 飲食フロアマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmcFfloorFlg;

	/**
	 * 飲食テーブルマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmcFtblFlg;

	/**
	 * 飲食ディッシュアップマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmpDishupFlg;

	/**
	 * 飲食POSシステムオプションマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmpPossysopFlg;

	/**
	 * 飲食OESシステムオプションマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmoOessysopFlg;

	/**
	 * 飲食KCPシステムオプションマスタ(KCP単位)更新フラグです。
	 */
	@NotNull
	private boolean restmoKcpsysopFlg;

	/**
	 * 飲食KDシステムオプションマスタ(KD単位)更新フラグです。
	 */
	@NotNull
	private boolean restmoKdsysopFlg;

	/**
	 * 飲食CCPフォーマットマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmoFccpFlg;

	/**
	 * 飲食KPフォーマットマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmoFkpFlg;

	/**
	 * 飲食STNエラーメッセージマスタ更新フラグです。
	 */
	@NotNull
	private boolean restmoFnerrmFlg;

//KSD V001.000 20231114 DS
	/**
	 * 飲食定番メニューマスタ更新フラグです。
	 */
//	@NotNull
//	private boolean restmoFuteibFlg;
//KSD V001.000 20231114 DE

//KSD V001.000 20231114 AS
//	@NotNull
//	private boolean 	restmoFuteibFlg;
	
	@NotNull
	private boolean     restmoFkcpsepFlg;
	
	@NotNull
	private boolean     restmcFkkbFlg;
	
	@NotNull
	private boolean     restmoSgosysopFlg;
	
	@NotNull
	private boolean     recpImageFlg;
	
	@NotNull
	private boolean     recpSettingFlg;
	
	@NotNull
	private boolean     restmpShopFlg;
//KSD V001.000 20231114 AE

}
// KSD V001.000 AE
