package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * アクセス権限更新 リクエストボディ データモデル.
 *
 * @author TSS 岩崎 由佳子
 * @version 1.0.0
 */
@Data
public class PutAccessAuthorityRequestRcvModel {
	private int authority;
	private String name;
	private String authorityName;

	// KSD V001.000 M 記載順を、確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
	// ■ユーザ管理
	private boolean cloudposUserExecute;					// ユーザマスタ登録：起動
	private boolean cloudposUserDelete;						// ユーザマスタ登録：削除
	private boolean cloudposUserUpdate;						// ユーザマスタ登録：保存
	private boolean cloudposUserOther1;						// ユーザマスタ登録：その他１（PWロック）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposEmployeeExecute;				// 従業員コード印字：起動
	private boolean cloudposEmployeeOther1;					// 従業員コード印字：その他１（PDF出力）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean cloudposAccessExecute;					// アクセス権限登録：起動
	private boolean cloudposAccessUpdate;					// アクセス権限登録：保存
	private boolean cloudposAccessOther1;					// アクセス権限登録：その他１（CSV入力）
	private boolean cloudposAccessOther2;					// アクセス権限登録：その他２（CSV出力）
	// ■店舗管理
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposGrp1Execute;					// 店舗グループ１登録：起動
	private boolean cloudposGrp1Delete;						// 店舗グループ１登録：削除
	private boolean cloudposGrp1Update;						// 店舗グループ１登録：保存
	private boolean cloudposGrp2Execute;					// 店舗グループ２登録：起動
	private boolean cloudposGrp2Delete;						// 店舗グループ２登録：削除
	private boolean cloudposGrp2Update;						// 店舗グループ２登録：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean cloudposStoreExecute;					// 店舗マスタ登録：起動
	private boolean cloudposStoreDelete;					// 店舗マスタ登録：削除
	private boolean cloudposStoreUpdate;					// 店舗マスタ登録：保存
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposStoreCcpyExecute;				// 店舗マスタコピー：起動
	private boolean cloudposStoreCcpyDelete;				// 店舗マスタコピー：削除
	private boolean cloudposStoreCcpyUpdate;				// 店舗マスタコピー：保存
	private boolean cloudposStoreCcpyOther1;				// 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// ■端末管理
	private boolean cloudposDeviceExecute;					// 端末設定：起動
	private boolean cloudposDeviceDelete;					// 端末設定：削除
	private boolean cloudposDeviceUpdate;					// 端末設定：保存
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposDenominationExecute;			// 金種設定：起動
	private boolean cloudposDenominationUpdate;				// 金種設定：保存
	private boolean cloudposDenominationOther1;				// 金種設定：その他１（ｺﾋﾟｰ実行）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean cloudposStatusExecute;					// 状態管理：起動
	// ■監査
	private boolean cloudposJournalExecute;					// 電子ジャーナル：起動
	private boolean cloudposJournalUpdate;					// 電子ジャーナル：保存
	private boolean cloudposJournalOther1;					// 電子ジャーナル：その他１（PDF出力）
	private boolean cloudposReportExecute;					// POSレポート出力：起動
	private boolean cloudposReportOther1;					// POSレポート出力：その他１（PDF出力）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposAuditExecute;					// 監査レポート出力：起動
	private boolean cloudposAuditOther1;					// 監査レポート出力：その他１（PDF出力）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// ■商品構成
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposProductDivisionsExecute;		// 商品分類階層設定：起動
	private boolean cloudposProductDivisionsUpdate;			// 商品分類階層設定：保存
	private boolean cloudposCatalogExecute;					// 商品構成マスタ登録：起動
	private boolean cloudposCatalogDelete;					// 商品構成マスタ登録：削除
	private boolean cloudposCatalogUpdate;					// 商品構成マスタ登録：保存
	private boolean cloudposCatalogOther1;					// 商品構成マスタ登録：その他１（CSV入力）
	private boolean cloudposCatalogOther2;					// 商品構成マスタ登録：その他２（CSV出力）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean cloudposItemExecute;					// 商品マスタ登録：起動
	private boolean cloudposItemDelete;						// 商品マスタ登録：削除
	private boolean cloudposItemUpdate;						// 商品マスタ登録：保存
	private boolean cloudposItemOther1;						// 商品マスタ登録：その他１（CSV入力）
	private boolean cloudposItemOther2;						// 商品マスタ登録：その他２（CSV出力）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposRestaurantScpExecute;			// 飲食オーダーガイダンス設定：起動
	private boolean cloudposRestaurantScpDelete;			// 飲食オーダーガイダンス設定：削除
	private boolean cloudposRestaurantScpUpdate;			// 飲食オーダーガイダンス設定：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean cloudposPresetExecute;					// プリセットマスタ：起動
	private boolean cloudposPresetDelete;					// プリセットマスタ：削除
	private boolean cloudposPresetUpdate;					// プリセットマスタ：保存
	private boolean cloudposPresetOther1;					// プリセットマスタ：その他１（企画ｺﾋﾟｰ）
	private boolean cloudposPresetOther2;					// プリセットマスタ：その他２（運用確認）
	// ■売価変更
	private boolean cloudposPriceExecute;					// 売価変更：起動
	private boolean cloudposPriceDelete;					// 売価変更：削除
	private boolean cloudposPriceUpdate;					// 売価変更：保存
	private boolean cloudposPriceOther1;					// 売価変更：その他１（出力）
	// ■クラウドPOS運用設定
	private boolean cloudposBarcodeExecute;					// バーコードフラグ設定：起動
	private boolean cloudposBarcodeDelete;					// バーコードフラグ設定：削除
	private boolean cloudposBarcodeUpdate;					// バーコードフラグ設定：保存
	private boolean cloudposTransactionExecute;				// 取引別名称設定：起動
	private boolean cloudposTransactionDelete;				// 取引別名称設定：削除
	private boolean cloudposTransactionUpdate;				// 取引別名称設定：保存
	private boolean cloudposRevenueStampExecute;			// 収入印紙一括納付設定：起動
	private boolean cloudposRevenueStampDelete;				// 収入印紙一括納付設定：削除
	private boolean cloudposRevenueStampUpdate;				// 収入印紙一括納付設定：保存
	private boolean cloudposOperationExecute;				// 運用設定：起動
	private boolean cloudposOperationDelete;				// 運用設定：削除
	private boolean cloudposOperationUpdate;				// 運用設定：保存
	private boolean cloudposStoreOperationExecute;			// 店別運用設定：起動
	private boolean cloudposStoreOperationDelete;			// 店別運用設定：削除
	private boolean cloudposStoreOperationUpdate;			// 店別運用設定：保存
	private boolean cloudposReceiptExecute;					// レシート設定：起動
	private boolean cloudposReceiptDelete;					// レシート設定：削除
	private boolean cloudposReceiptUpdate;					// レシート設定：保存
	private boolean cloudposReceiptOther1;					// レシート設定：その他１（企画ｺﾋﾟｰ）
	private boolean cloudposReceiptOther2;					// レシート設定：その他２（企画確認）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean cloudposTaxExecute;						// 税率設定：起動
	private boolean cloudposTaxDelete;						// 税率設定：削除
	private boolean cloudposTaxUpdate;						// 税率設定：保存
	private boolean cloudposTimeExecute;					// 時間帯設定：起動
	private boolean cloudposTimeDelete;						// 時間帯設定：削除
	private boolean cloudposTimeUpdate;						// 時間帯設定：保存
	private boolean cloudposRestaurantConnectnameExecute;	// OES連携名称設定：起動
	private boolean cloudposRestaurantConnectnameUpdate;	// OES連携名称設定：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// ■クラウドPOS店舗運用設定
	private boolean cloudposOperationBtnExecute;			// 操作ボタン設定：起動
	private boolean cloudposOperationBtnUpdate;				// 操作ボタン設定：保存
	private boolean cloudposTighteningBtnExecute;			// 締めボタン設定：起動
	private boolean cloudposTighteningBtnDelete;			// 締めボタン設定：削除
	private boolean cloudposTighteningBtnUpdate;			// 締めボタン設定：保存
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	// ■全店共通設定
	private boolean cloudposEquipmentExecute;				// 機材マスタ設定：起動
	private boolean cloudposEquipmentDelete;				// 機材マスタ設定：削除
	private boolean cloudposEquipmentUpdate;				// 機材マスタ設定：保存
	private boolean cloudposModelExecute;					// 機種設備マスタ設定：起動
	private boolean cloudposModelDelete;					// 機種設備マスタ設定：削除
	private boolean cloudposModelUpdate;					// 機種設備マスタ設定：保存
	private boolean cloudposAgeDivisionExecute;				// 年齢区分マスタ設定：起動
	private boolean cloudposAgeDivisionDelete;				// 年齢区分マスタ設定：削除
	private boolean cloudposAgeDivisionUpdate;				// 年齢区分マスタ設定：保存
	private boolean cloudposMemberRankExecute;				// 会員ランクマスタ設定：起動
	private boolean cloudposMemberRankDelete;				// 会員ランクマスタ設定：削除
	private boolean cloudposMemberRankUpdate;				// 会員ランクマスタ設定：保存
	// ■店舗固有設備設定
	private boolean cloudposRoomExecute;					// 部屋情報マスタ設定：起動
	private boolean cloudposRoomDelete;						// 部屋情報マスタ設定：削除
	private boolean cloudposRoomUpdate;						// 部屋情報マスタ設定：保存
	private boolean cloudposRoomRelationExecute;			// 部屋関連情報マスタ設定：起動
	private boolean cloudposRoomRelationDelete;				// 部屋関連情報マスタ設定：削除
	private boolean cloudposRoomRelationUpdate;				// 部屋関連情報マスタ設定：保存
	private boolean cloudposRoomSubExecute;					// 部屋情報サブ設定：起動
	private boolean cloudposRoomSubUpdate;					// 部屋情報サブ設定：保存
	private boolean cloudposRoomSubOther1;					// 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
	private boolean cloudposCodepayExecute;					// コード決済通信マスタ設定：起動
	private boolean cloudposCodepayUpdate;					// コード決済通信マスタ設定：保存
	private boolean cloudposTariffExecute;					// 料金表表示マスタ設定：起動
	private boolean cloudposTariffDelete;					// 料金表表示マスタ設定：削除
	private boolean cloudposTariffUpdate;					// 料金表表示マスタ設定：保存
	// ■店舗固有POS設定
	private boolean cloudposTicketExecute;					// 券種マスタ設定：起動
	private boolean cloudposTicketDelete;					// 券種マスタ設定：削除
	private boolean cloudposTicketUpdate;					// 券種マスタ設定：保存
	private boolean cloudposComplianceExecute;				// コンプライアンス情報マスタ設定：起動
	private boolean cloudposComplianceUpdate;				// コンプライアンス情報マスタ設定：保存
	private boolean cloudposSelfposExecute;					// セルフPOSマスタ設定：起動
	private boolean cloudposSelfposUpdate;					// セルフPOSマスタ設定：保存
	// ■店舗固有料金設定
	private boolean cloudposWeekdayDivisionExecute;			// 曜日区分マスタ設定：起動
	private boolean cloudposWeekdayDivisionDelete;			// 曜日区分マスタ設定：削除
	private boolean cloudposWeekdayDivisionUpdate;			// 曜日区分マスタ設定：保存
	private boolean cloudposCalenderExecute;				// カレンダーマスタ設定：起動
	private boolean cloudposCalenderUpdate;					// カレンダーマスタ設定：保存
	private boolean cloudposCourseRateExecute;				// コース料金設定：起動
	private boolean cloudposCourseRateUpdate;				// コース料金設定：保存
	private boolean cloudposCourseRateOther1;				// コース料金設定：その他１（ｺﾋﾟｰ）
	private boolean cloudposDrinkCourseExecute;				// オプションマスタ設定：起動
	private boolean cloudposDrinkCourseDelete;				// オプションマスタ設定：削除
	private boolean cloudposDrinkCourseUpdate;				// オプションマスタ設定：保存
	private boolean cloudposRoomCourseExecute;				// コースマスタ設定：起動
	private boolean cloudposRoomCourseDelete;				// コースマスタ設定：削除
	private boolean cloudposRoomCourseUpdate;				// コースマスタ設定：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加

	private List<AccessAuthorityBussinessListCheckedModel> businessMenuList;
}

