/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230301   dingxin(Neusoft) G001.00.0  issue課題#715を対応します.
 */
package com.ttss.prementenance.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.AccessAuthorityBussinessListModel;
import com.ttss.prementenance.model.AccessAuthorityBussinessModel;
import com.ttss.prementenance.model.AccessAuthorityChangeplanModel;
import com.ttss.prementenance.model.AccessAuthorityDisplayNameResponseModel;
import com.ttss.prementenance.model.AccessAuthorityModel;
import com.ttss.prementenance.model.AccessAuthorityPermissionsResponseModel;
import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupFaxNoOrder;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupNameOrder;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupPostNoOrder;
import com.ttss.prementenance.model.CorporateInfoUpdateRequestModel.GroupTelNoOrder;
import com.ttss.prementenance.model.GetAccessAuthorityRequestModel;
import com.ttss.prementenance.model.GetAccessAuthorityResponseModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.model.PostPermissionsRequestModel;
import com.ttss.prementenance.model.PutAccessAuthorityCsvRequestRcvModel;
import com.ttss.prementenance.model.PutAccessAuthorityEditRequestRcvModel;
import com.ttss.prementenance.model.PutAccessAuthorityRequestRcvModel;
import com.ttss.prementenance.model.PutAccessAuthorityResponseModel;
import com.ttss.prementenance.service.AuthorizationService;
import com.ttss.prementenance.service.ChangePlanService;
import com.ttss.prementenance.service.PermissionsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

import io.micrometer.core.instrument.util.StringUtils;

// ==============================================================================
// 機能概要：アクセス権限登録画面&API
// 作成者：
// 作成年月日：2020/12/02
// 備考：
// ==============================================================================

/**
 * アクセス権限登録画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("AccessAuthorityRegistration")
public class AccessAuthorityRegistrationController {

	@Autowired
	private AuthorizationService authorizationService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	public AccessAuthorityRegistrationController() {
	}

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	private PermissionsService permissionsService;

	@Autowired
	private ChangePlanService changePlanService;

	/**
	 * データクリアテーブル取得処理.
	 *
	 * @param model リクエスト内容
	 * @param request HttpServletのリクエスト
	 * @return データクリアテーブル取得処理＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/AccessAuthorityTable")
	@ResponseBody
	public GetAccessAuthorityResponseModel accessAuthorityTable(
			GetAccessAuthorityRequestModel model, HttpServletRequest request) {
		var responseModel = new GetAccessAuthorityResponseModel();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		String businessCd = loginUser.getBusinessUnitCdStr();

		// データ検索
		GetAccessAuthorityRequestModel requestModel = new GetAccessAuthorityRequestModel();

		String query = "";
		for (int i = 0; i < 9; i++) {
			query += businessCd + "_" + (i + 1) + ",";
		}
		query = query.substring(0, query.length() - 1);

		responseModel = permissionsService.getList(requestModel, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), query);

		if (responseModel != null && responseModel.getResponseModel() != null) {
			if (responseModel.getResponseModel().size() > 0) {
				List<String> tables = new ArrayList<String>();
				tables.add("");
				for (int i = 0; i < responseModel.getResponseModel().size(); i++) {
					tables.add(responseModel.getResponseModel().get(i).getDisplayName()
							.getDefaultValue());

					// 機能ごとの権限設定配列を作成
					AccessAuthorityBussinessModel bussinessModel = new AccessAuthorityBussinessModel();
					List<AccessAuthorityBussinessListModel> businessMenuList = new ArrayList<AccessAuthorityBussinessListModel>();
					// KSD V001.000 DS 追加業務のアクセス権取得追加
					// for (int j = 0; j < 18; j++) {
					// KSD V001.000 DE 追加業務のアクセス権取得追加
					// KSD V001.000 AS 追加業務のアクセス権取得追加
					for (int j = 0; j < 47; j++) {
					// KSD V001.000 AE 追加業務のアクセス権取得追加
						AccessAuthorityBussinessListModel menuList = new AccessAuthorityBussinessListModel();
						menuList.setS(false);
						menuList.setR(false);
						menuList.setD(false);
						menuList.setO1(false);
						menuList.setO2(false);
						businessMenuList.add(menuList);
					}
					bussinessModel.setBusinessMenuList(businessMenuList);
					responseModel.getResponseModel().get(i).setBussinessList(bussinessModel);

					// 権限毎に分解
					if (responseModel.getResponseModel().get(i).getPermissions() != null
							&& responseModel.getResponseModel().get(i).getPermissions()
									.size() > 0) {
						for (int j = 0; j < responseModel.getResponseModel().get(i).getPermissions()
								.size(); j++) {
							// KSD V001.000 M 記載順を、確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
							//                但し、表示行数により格納する配列位置を合わせる必要がある為、ここは表示順になる。
							// ■売上管理
							// 1行目
							// POSレポート出力：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_REPORT_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(0).setS(true);
							}
							// POSレポート出力：その他１（PDF出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_REPORT_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(0).setO1(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 2行目
							// 監査レポート出力：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_AUDIT_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(1).setS(true);
							}
							// 監査レポート出力：その他１（PDF出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_AUDIT_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(1).setO1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							// 3行目
							// 電子ジャーナル：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_JOURNAL_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(2).setS(true);
							}
							// 電子ジャーナル：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_JOURNAL_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(2).setR(true);
							}

							// ■ユーザ管理
							// 4行目
							// ユーザマスタ登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_USER_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(3).setS(true);
							}
							// ユーザマスタ登録：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_USER_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(3).setD(true);
							}
							// ユーザマスタ登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_USER_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(3).setR(true);
							}
							// ユーザマスタ登録：その他１（PWロック）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_USER_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(3).setO1(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 5行目
							// 従業員コード印字：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_EMPLOYEE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(4).setS(true);
							}
							// 従業員コード印字：その他１（PDF出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_EMPLOYEE_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(4).setO1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							// 6行目
							// アクセス権限登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ACCESS_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(5).setS(true);
							}
							// アクセス権限登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ACCESS_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(5).setR(true);
							}
							// アクセス権限登録：その他１（CSV入力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ACCESS_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(5).setO1(true);
							}
							// アクセス権限登録：その他２（CSV出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ACCESS_OTHER_2")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(5).setO2(true);
							}

							// ■店舗管理
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 7行目
							// 店舗グループ１登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_GRP1_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(6).setS(true);
							}
							// 店舗グループ１登録：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_GRP1_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(6).setD(true);
							}
							// 店舗グループ１登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_GRP1_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(6).setR(true);
							}
							// 8行目
							// 店舗グループ２登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_GRP2_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(7).setS(true);
							}
							// 店舗グループ２登録：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_GRP2_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(7).setD(true);
							}
							// 店舗グループ２登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_GRP2_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(7).setR(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							// 9行目
							// 店舗マスタ登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(8).setS(true);
							}
							// 店舗マスタ登録：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(8).setD(true);
							}
							// 店舗マスタ登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(8).setR(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 10行目
							// 店舗マスタコピー：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_COPY_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(9).setS(true);
							}
							// 店舗マスタコピー：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_COPY_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(9).setD(true);
							}
							// 店舗マスタコピー：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_COPY_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(9).setR(true);
							}
							// 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_COPY_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(9).setO1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加

							// ■端末管理
							// 11行目
							// 端末設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DEVICE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(10).setS(true);
							}
							// 端末設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DEVICE_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(10).setD(true);
							}
							// 端末設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DEVICE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(10).setR(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 12行目
							// 金種設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DENOMINATION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(11).setS(true);
							}
							// 金種設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DENOMINATION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(11).setR(true);
							}
							// 金種設定：その他１（ｺﾋﾟｰ実行）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DENOMINATION_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(11).setO1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							// 13行目
							// 状態管理：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STATUS_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(12).setS(true);
							}

							// ■商品構成管理
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 14行目
							// 商品分類階層設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRODUCT_DIVISIONS_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(13).setS(true);
							}
							// 商品分類階層設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRODUCT_DIVISIONS_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(13).setR(true);
							}
							// 15行目
							// 商品構成マスタ登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CATALOG_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(14).setS(true);
							}
							// 商品構成マスタ登録：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CATALOG_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(14).setD(true);
							}
							// 商品構成マスタ登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CATALOG_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(14).setR(true);
							}
							// 商品構成マスタ登録：その他１（CSV入力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CATALOG_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(14).setO1(true);
							}
							// 商品構成マスタ登録：その他２（CSV出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CATALOG_OTHER_2")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(14).setO2(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							// 16行目
							// 商品マスタ登録：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ITEM_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(15).setS(true);
							}
							// 商品マスタ登録：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ITEM_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(15).setD(true);
							}
							// 商品マスタ登録：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ITEM_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(15).setR(true);
							}
							// 商品マスタ登録：その他１（CSV入力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ITEM_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(15).setO1(true);
							}
							// 商品マスタ登録：その他２（CSV出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ITEM_OTHER_2")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(15).setO2(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 17行目
							// 飲食オーダーガイダンス設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RESTAURANT_SCP_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(16).setS(true);
							}
							// 飲食オーダーガイダンス設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RESTAURANT_SCP_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(16).setD(true);
							}
							// 飲食オーダーガイダンス設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RESTAURANT_SCP_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(16).setR(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							// 18行目
							// プリセットマスタ：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRESET_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(17).setS(true);
							}
							// プリセットマスタ：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRESET_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(17).setD(true);
							}
							// プリセットマスタ：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRESET_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(17).setR(true);
							}
							// プリセットマスタ：その他１（企画ｺﾋﾟｰ）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRESET_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(17).setO1(true);
							}
							// プリセットマスタ：その他２（運用確認）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRESET_OTHER_2")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(17).setO2(true);
							}

							// ■売価変更
							// 19行目
							// 売価変更：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRICE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(18).setS(true);
							}
							// 売価変更：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRICE_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(18).setD(true);
							}
							// 売価変更：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRICE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(18).setR(true);
							}
							// 売価変更：その他１（出力）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_PRICE_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(18).setO1(true);
							}

							// ■クラウドPOS運用管理
							// 20行目
							// バーコードフラグ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_BARCODE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(19).setS(true);
							}
							// バーコードフラグ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_BARCODE_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(19).setD(true);
							}
							// バーコードフラグ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_BARCODE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(19).setR(true);
							}
							// 21行目
							// 取引別名称設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TRANSACTION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(20).setS(true);
							}
							// 取引別名称設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TRANSACTION_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(20).setD(true);
							}
							// 取引別名称設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TRANSACTION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(20).setR(true);
							}
							// 22行目
							// 収入印紙一括納付設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_REVENUE_STAMP_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(21).setS(true);
							}
							// 収入印紙一括納付設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_REVENUE_STAMP_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(21).setD(true);
							}
							// 収入印紙一括納付設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_REVENUE_STAMP_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(21).setR(true);
							}
							// 23行目
							// 運用設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_OPERATION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(22).setS(true);
							}
							// 運用設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_OPERATION_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(22).setD(true);
							}
							// 運用設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_OPERATION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(22).setR(true);
							}
							// 24行目
							// 店別運用設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_OPERATION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(23).setS(true);
							}
							// 店別運用設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_OPERATION_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(23).setD(true);
							}
							// 店別運用設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_STORE_OPERATION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(23).setR(true);
							}
							// 25行目
							// レシート設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RECEIPT_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(24).setS(true);
							}
							// レシート設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RECEIPT_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(24).setD(true);
							}
							// レシート設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RECEIPT_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(24).setR(true);
							}
							// レシート設定：その他１（企画ｺﾋﾟｰ）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RECEIPT_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(24).setO1(true);
							}
							// レシート設定：その他２（企画確認）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RECEIPT_OTHER_2")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(24).setO2(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// 26行目
							// 税率設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TAX_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(25).setS(true);
							}
							// 税率設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TAX_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(25).setD(true);
							}
							// 税率設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TAX_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(25).setR(true);
							}
							// 27行目
							// 時間帯設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TIME_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(26).setS(true);
							}
							// 時間帯設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TIME_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(26).setD(true);
							}
							// 時間帯設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TIME_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(26).setR(true);
							}
							// 28行目
							// OES連携名称設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RESTAURANT_CONNECTNAME_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(27).setS(true);
							}
							// OES連携名称設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_RESTAURANT_CONNECTNAME_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(27).setR(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加

							// ■クラウドPOS店舗運用設定
							// 29行目
							// 操作ボタン設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_OPERATION_BTN_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(28).setS(true);
							}
							// 操作ボタン設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_OPERATION_BTN_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(28).setR(true);
							}
							// 30行目
							// 締めボタン設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TIGHTENING_BTN_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(29).setS(true);
							}
							// 締めボタン設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TIGHTENING_BTN_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(29).setD(true);
							}
							// 締めボタン設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TIGHTENING_BTN_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(29).setR(true);
							}

							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// ■全店共通設定
							// 31行目
							// 機材マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_EQUIPMENT_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(30).setS(true);
							}
							// 機材マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_EQUIPMENT_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(30).setD(true);
							}
							// 機材マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_EQUIPMENT_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(30).setR(true);
							}
							// 32行目
							// 機種設備マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_MODEL_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(31).setS(true);
							}
							// 機種設備マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_MODEL_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(31).setD(true);
							}
							// 機種設備マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_MODEL_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(31).setR(true);
							}
							// 33行目
							// 年齢区分マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_AGE_DIVISION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(32).setS(true);
							}
							// 年齢区分マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_AGE_DIVISION_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(32).setD(true);
							}
							// 年齢区分マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_AGE_DIVISION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(32).setR(true);
							}
							// 34行目
							// 会員ランクマスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_MEMBER_RANK_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(33).setS(true);
							}
							// 会員ランクマスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_MEMBER_RANK_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(33).setD(true);
							}
							// 会員ランクマスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_MEMBER_RANK_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(33).setR(true);
							}

							// ■店舗固有設備設定
							// 35行目
							// 部屋情報マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(34).setS(true);
							}
							// 部屋情報マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(34).setD(true);
							}
							// 部屋情報マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(34).setR(true);
							}
							// 36行目
							// 部屋関連情報マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_RELATION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(35).setS(true);
							}
							// 部屋関連情報マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_RELATION_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(35).setD(true);
							}
							// 部屋関連情報マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_RELATION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(35).setR(true);
							}
							// 37行目
							// 部屋情報サブ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_SUB_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(36).setS(true);
							}
							// 部屋情報サブ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_SUB_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(36).setR(true);
							}
							// 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOM_SUB_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(36).setO1(true);
							}
							// 38行目
							// コード決済通信マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CODEPAY_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(37).setS(true);
							}
							// コード決済通信マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CODEPAY_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(37).setR(true);
							}
							// 39行目
							// 料金表表示マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TARIFF_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(38).setS(true);
							}
							// 料金表表示マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TARIFF_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(38).setD(true);
							}
							// 料金表表示マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TARIFF_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(38).setR(true);
							}

							// ■店舗固有POS設定
							// 40行目
							// 券種マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TICKET_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(39).setS(true);
							}
							// 券種マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TICKET_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(39).setD(true);
							}
							// 券種マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_TICKET_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(39).setR(true);
							}
							// 41行目
							// コンプライアンス情報マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_COMPLIANCE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(40).setS(true);
							}
							// コンプライアンス情報マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_COMPLIANCE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(40).setR(true);
							}
							// 42行目
							// セルフPOSマスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_SELFPOS_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(41).setS(true);
							}
							// セルフPOSマスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_SELFPOS_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(41).setR(true);
							}

							// ■店舗固有料金設定
							// 43行目
							// 曜日区分マスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_WEEKDAY_DIVISION_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(42).setS(true);
							}
							// 曜日区分マスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_WEEKDAY_DIVISION_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(42).setD(true);
							}
							// 曜日区分マスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_WEEKDAY_DIVISION_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(42).setR(true);
							}
							// 44行目
							// カレンダーマスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CALENDER_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(43).setS(true);
							}
							// カレンダーマスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_CALENDER_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(43).setR(true);
							}
							// 45行目
							// コース料金設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_COURSE_RATE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(44).setS(true);
							}
							// コース料金設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_COURSE_RATE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(44).setR(true);
							}
							// コース料金設定：その他１（ｺﾋﾟｰ）
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_COURSE_RATE_OTHER_1")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(44).setO1(true);
							}
							// 46行目
							// オプションマスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DRINKCOURCE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(45).setS(true);
							}
							// オプションマスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DRINKCOURCE_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(45).setD(true);
							}
							// オプションマスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_DRINKCOURCE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(45).setR(true);
							}
							// 47行目
							// コースマスタ設定：起動
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOMCOURCE_EXECUTE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(46).setS(true);
							}
							// コースマスタ設定：削除
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOMCOURCE_DELETE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(46).setD(true);
							}
							// コースマスタ設定：保存
							if (responseModel.getResponseModel().get(i).getPermissions().get(j)
									.getName().equals("CLOUDPOS_ROOMCOURCE_UPDATE")) {
								responseModel.getResponseModel().get(i).getBussinessList()
										.getBusinessMenuList().get(46).setR(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
						}
					}
				}
				responseModel.setTables(tables);
			}
		}

		// G001.00.0 Delete-Start
		// ステータスコード
//		var responseResult = new ApiCommonResponseModel();
//		responseResult.setCode(0);
//		responseModel.setResult(responseResult);
		// G001.00.0 Delete-End

		return responseModel;
	}

	/**
	 * アクセス権限更新処理.
	 *
	 * @param corporates リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/AccessInfoRegist")
	@ResponseBody
	public PutAccessAuthorityResponseModel accessInfoRegist(
			@RequestBody @Validated({ Default.class, GroupNameOrder.class, GroupPostNoOrder.class,
					GroupTelNoOrder.class,
					GroupFaxNoOrder.class }) PutAccessAuthorityRequestRcvModel req,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutAccessAuthorityResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel = new PutAccessAuthorityResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		// String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		String nodeId = loginUser.getBusinessUnitCdStr();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		// 新規の処理(名称：企業コード＋ユーザーID＋タイムスタンプ)
		changePlanNameUnitCdStr = loginUser.getBusinessUnitCdStr() + loginUser.getUserId() + timeStamp;

		postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
		postChangePlanRequestModel.setStatus("Draft");

		var postChangePlanResponseModel = new PostChangePlanResponseModel();
		postChangePlanResponseModel = changePlanService.postChangePlan(postChangePlanRequestModel,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (postChangePlanResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanResponseModel.getResult().getELERAToken() != null) {
			accessToken = postChangePlanResponseModel.getResult().getWSO2Token();
			ELERAToken = postChangePlanResponseModel.getResult().getELERAToken();
		}

		if (postChangePlanResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postChangePlanResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// 現在のデータを取得
		// CS #1123
		// 権限名称
		String roleName = req.getName();
		//String roleName = req.getAuthorityName();
		// CE #1123
		// displayNameを取得するためにAPI呼出し
		GetAccessAuthorityRequestModel requestModel = new GetAccessAuthorityRequestModel();
		GetAccessAuthorityResponseModel resModel = permissionsService.getList(requestModel, messageSource, apiContext,
				accessToken,
				ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord(),
				roleName);
		// BODYのbaseを作成
		var postAccessBodyModel = new PostPermissionsRequestModel();
		// CS #1123
		//postAccessBodyModel.getRequestModel().setName(resModel.getResponseModel().get(0).getName());
		//postAccessBodyModel.getRequestModel()
		//		.setDisplayName(resModel.getResponseModel().get(0).getDisplayName());
		postAccessBodyModel.getRequestModel().setName(roleName);
		postAccessBodyModel.getRequestModel()
				.setDisplayName(resModel.getResponseModel().get(0).getDisplayName());
		// CE #1123

		AccessAuthorityChangeplanModel changePlanModel = new AccessAuthorityChangeplanModel();
		changePlanModel.setDeleted(false);
		changePlanModel.setName(changePlanNameUnitCdStr);
		postAccessBodyModel.getRequestModel().setChangePlan(changePlanModel);

		List<AccessAuthorityPermissionsResponseModel> permissions = new ArrayList<AccessAuthorityPermissionsResponseModel>();

		// Permissionの登録
		// KSD V001.000 M 記載順を、確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
		// ■ユーザ管理
		// ユーザマスタ登録：起動
		if (req.isCloudposUserExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_USER_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// ユーザマスタ登録：削除
		if (req.isCloudposUserDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_USER_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// ユーザマスタ登録：保存
		if (req.isCloudposUserUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_USER_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// ユーザマスタ登録：その他１（PWロック）
		if (req.isCloudposUserOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_USER_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 従業員コード印字：起動
		if (req.isCloudposEmployeeExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_EMPLOYEE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 従業員コード印字：その他１（PDF出力）
		if (req.isCloudposEmployeeOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_EMPLOYEE_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加
		// アクセス権限登録：起動
		if (req.isCloudposAccessExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ACCESS_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// アクセス権限登録：保存
		if (req.isCloudposAccessUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ACCESS_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// アクセス権限登録：その他１（CSV入力）
		if (req.isCloudposAccessOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ACCESS_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// アクセス権限登録：その他２（CSV出力）
		if (req.isCloudposAccessOther2()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ACCESS_OTHER_2");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■店舗管理
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 店舗グループ１登録：起動
		if (req.isCloudposGrp1Execute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_GRP1_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗グループ１登録：削除
		if (req.isCloudposGrp1Delete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_GRP1_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗グループ１登録：保存
		if (req.isCloudposGrp1Update()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_GRP1_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗グループ２登録：起動
		if (req.isCloudposGrp2Execute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_GRP2_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗グループ２登録：削除
		if (req.isCloudposGrp2Delete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_GRP2_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗グループ２登録：保存
		if (req.isCloudposGrp2Update()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_GRP2_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加
		// 店舗マスタ登録：起動
		if (req.isCloudposStoreExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗マスタ登録：削除
		if (req.isCloudposStoreDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗マスタ登録：保存
		if (req.isCloudposStoreUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 店舗マスタコピー：起動
		if (req.isCloudposStoreCcpyExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_COPY_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗マスタコピー：削除
		if (req.isCloudposStoreCcpyDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_COPY_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗マスタコピー：保存
		if (req.isCloudposStoreCcpyUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_COPY_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
		if (req.isCloudposStoreCcpyOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_COPY_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加

		// ■端末管理
		// 端末設定：起動
		if (req.isCloudposDeviceExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DEVICE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 端末設定：削除
		if (req.isCloudposDeviceDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DEVICE_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 端末設定：保存
		if (req.isCloudposDeviceUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DEVICE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 金種設定：起動
		if (req.isCloudposDenominationExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DENOMINATION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 金種設定：保存
		if (req.isCloudposDenominationUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DENOMINATION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 金種設定：その他１（ｺﾋﾟｰ実行）
		if (req.isCloudposDenominationOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DENOMINATION_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加
		// 状態管理：起動
		if (req.isCloudposStatusExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STATUS_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■監査
		// 電子ジャーナル：起動
		if (req.isCloudposJournalExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_JOURNAL_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 電子ジャーナル：保存
		if (req.isCloudposJournalUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_JOURNAL_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		//// 電子ジャーナル：その他１（PDF出力）
		//if (req.isCloudposJournalOther1()) {
		//	AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
		//	model.setName("CLOUDPOS_JOURNAL_OTHER_1");
		//	permissions.add(model);
		//	postAccessBodyModel.getRequestModel().setPermissions(permissions);
		//}
		// POSレポート出力：起動
		if (req.isCloudposReportExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_REPORT_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// POSレポート出力：その他１（PDF出力）
		if (req.isCloudposReportOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_REPORT_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 監査レポート出力：起動
		if (req.isCloudposAuditExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_AUDIT_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 監査レポート出力：その他１（PDF出力）
		if (req.isCloudposAuditOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_AUDIT_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加

		// ■商品構成
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 商品分類階層設定：起動
		if (req.isCloudposProductDivisionsExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRODUCT_DIVISIONS_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品分類階層設定：保存
		if (req.isCloudposProductDivisionsUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRODUCT_DIVISIONS_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品構成マスタ登録：起動
		if (req.isCloudposCatalogExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CATALOG_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品構成マスタ登録：削除
		if (req.isCloudposCatalogDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CATALOG_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品構成マスタ登録：保存
		if (req.isCloudposCatalogUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CATALOG_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品構成マスタ登録：その他１（CSV入力）
		if (req.isCloudposCatalogOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CATALOG_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品構成マスタ登録：その他２（CSV出力）
		if (req.isCloudposCatalogOther2()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CATALOG_OTHER_2");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加
		// 商品マスタ登録：起動
		if (req.isCloudposItemExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ITEM_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品マスタ登録：削除
		if (req.isCloudposItemDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ITEM_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品マスタ登録：保存
		if (req.isCloudposItemUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ITEM_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品マスタ登録：その他１（CSV入力）
		if (req.isCloudposItemOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ITEM_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 商品マスタ登録：その他２（CSV出力）
		if (req.isCloudposItemOther2()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ITEM_OTHER_2");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 飲食オーダーガイダンス設定：起動
		if (req.isCloudposRestaurantScpExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RESTAURANT_SCP_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 飲食オーダーガイダンス設定：削除
		if (req.isCloudposRestaurantScpDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RESTAURANT_SCP_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 飲食オーダーガイダンス設定：保存
		if (req.isCloudposRestaurantScpUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RESTAURANT_SCP_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加
		// プリセットマスタ：起動
		if (req.isCloudposPresetExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRESET_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// プリセットマスタ：削除
		if (req.isCloudposPresetDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRESET_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// プリセットマスタ：保存
		if (req.isCloudposPresetUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRESET_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// プリセットマスタ：その他１（企画ｺﾋﾟｰ）
		if (req.isCloudposPresetOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRESET_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// プリセットマスタ：その他２（運用確認）
		if (req.isCloudposPresetOther2()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRESET_OTHER_2");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■売価変更
		// 売価変更：起動
		if (req.isCloudposPriceExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRICE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 売価変更：削除
		if (req.isCloudposPriceDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRICE_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 売価変更：保存
		if (req.isCloudposPriceUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRICE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 売価変更：その他１（出力）
		if (req.isCloudposPriceOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_PRICE_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■クラウドPOS運用設定
		// バーコードフラグ設定：起動
		if (req.isCloudposBarcodeExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_BARCODE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// バーコードフラグ設定：削除
		if (req.isCloudposBarcodeDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_BARCODE_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// バーコードフラグ設定：保存
		if (req.isCloudposBarcodeUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_BARCODE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 取引別名称設定：起動
		if (req.isCloudposTransactionExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TRANSACTION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 取引別名称設定：削除
		if (req.isCloudposTransactionDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TRANSACTION_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 取引別名称設定：保存
		if (req.isCloudposTransactionUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TRANSACTION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 収入印紙一括納付設定：起動
		if (req.isCloudposRevenueStampExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_REVENUE_STAMP_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 収入印紙一括納付設定：削除
		if (req.isCloudposRevenueStampDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_REVENUE_STAMP_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 収入印紙一括納付設定：保存
		if (req.isCloudposRevenueStampUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_REVENUE_STAMP_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 運用設定：起動
		if (req.isCloudposOperationExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_OPERATION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 運用設定：削除
		if (req.isCloudposOperationDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_OPERATION_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 運用設定：保存
		if (req.isCloudposOperationUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_OPERATION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店別運用設定：起動
		if (req.isCloudposStoreOperationExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_OPERATION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店別運用設定：削除
		if (req.isCloudposStoreOperationDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_OPERATION_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 店別運用設定：保存
		if (req.isCloudposStoreOperationUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_STORE_OPERATION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// レシート設定：起動
		if (req.isCloudposReceiptExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RECEIPT_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// レシート設定：削除
		if (req.isCloudposReceiptDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RECEIPT_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// レシート設定：保存
		if (req.isCloudposReceiptUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RECEIPT_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// レシート設定：その他１（企画ｺﾋﾟｰ）
		if (req.isCloudposReceiptOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RECEIPT_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// レシート設定：その他２（企画確認）
		if (req.isCloudposReceiptOther2()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RECEIPT_OTHER_2");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// 税率設定：起動
		if (req.isCloudposTaxExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TAX_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 税率設定：削除
		if (req.isCloudposTaxDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TAX_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 税率設定：保存
		if (req.isCloudposTaxUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TAX_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 時間帯設定：起動
		if (req.isCloudposTimeExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TIME_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 時間帯設定：削除
		if (req.isCloudposTimeDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TIME_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 時間帯設定：保存
		if (req.isCloudposTimeUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TIME_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// OES連携名称設定：起動
		if (req.isCloudposRestaurantConnectnameExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RESTAURANT_CONNECTNAME_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// OES連携名称設定：保存
		if (req.isCloudposRestaurantConnectnameUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_RESTAURANT_CONNECTNAME_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加

		// ■クラウドPOS店舗運用設定
		// 操作ボタン設定：起動
		if (req.isCloudposOperationBtnExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_OPERATION_BTN_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 操作ボタン設定：保存
		if (req.isCloudposOperationBtnUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_OPERATION_BTN_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 締めボタン設定：起動
		if (req.isCloudposTighteningBtnExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TIGHTENING_BTN_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 締めボタン設定：削除
		if (req.isCloudposTighteningBtnDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TIGHTENING_BTN_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 締めボタン設定：保存
		if (req.isCloudposTighteningBtnUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TIGHTENING_BTN_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// KSD V001.000 AS 追加業務のアクセス権取得追加
		// ■全店共通設定
		// 機材マスタ設定：起動
		if (req.isCloudposEquipmentExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_EQUIPMENT_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 機材マスタ設定：削除
		if (req.isCloudposEquipmentDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_EQUIPMENT_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 機材マスタ設定：保存
		if (req.isCloudposEquipmentUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_EQUIPMENT_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 機種設備マスタ設定：起動
		if (req.isCloudposModelExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_MODEL_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 機種設備マスタ設定：削除
		if (req.isCloudposModelDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_MODEL_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 機種設備マスタ設定：保存
		if (req.isCloudposModelUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_MODEL_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 年齢区分マスタ設定：起動
		if (req.isCloudposAgeDivisionExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_AGE_DIVISION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 年齢区分マスタ設定：削除
		if (req.isCloudposAgeDivisionDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_AGE_DIVISION_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 年齢区分マスタ設定：保存
		if (req.isCloudposAgeDivisionUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_AGE_DIVISION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 会員ランクマスタ設定：起動
		if (req.isCloudposMemberRankExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_MEMBER_RANK_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 会員ランクマスタ設定：削除
		if (req.isCloudposMemberRankDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_MEMBER_RANK_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 会員ランクマスタ設定：保存
		if (req.isCloudposMemberRankUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_MEMBER_RANK_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■店舗固有設備設定
		// 部屋情報マスタ設定：起動
		if (req.isCloudposRoomExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋情報マスタ設定：削除
		if (req.isCloudposRoomDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋情報マスタ設定：保存
		if (req.isCloudposRoomUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋関連情報マスタ設定：起動
		if (req.isCloudposRoomRelationExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_RELATION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋関連情報マスタ設定：削除
		if (req.isCloudposRoomRelationDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_RELATION_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋関連情報マスタ設定：保存
		if (req.isCloudposRoomRelationUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_RELATION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋情報サブ設定：起動
		if (req.isCloudposRoomSubExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_SUB_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋情報サブ設定：保存
		if (req.isCloudposRoomSubUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_SUB_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
		if (req.isCloudposRoomSubOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOM_SUB_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コード決済通信マスタ設定：起動
		if (req.isCloudposCodepayExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CODEPAY_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コード決済通信マスタ設定：保存
		if (req.isCloudposCodepayUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CODEPAY_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 料金表表示マスタ設定：起動
		if (req.isCloudposTariffExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TARIFF_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 料金表表示マスタ設定：削除
		if (req.isCloudposTariffDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TARIFF_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 料金表表示マスタ設定：保存
		if (req.isCloudposTariffUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TARIFF_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■店舗固有POS設定
		// 券種マスタ設定：起動
		if (req.isCloudposTicketExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TICKET_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 券種マスタ設定：削除
		if (req.isCloudposTicketDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TICKET_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 券種マスタ設定：保存
		if (req.isCloudposTicketUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_TICKET_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コンプライアンス情報マスタ設定：起動
		if (req.isCloudposComplianceExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_COMPLIANCE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コンプライアンス情報マスタ設定：保存
		if (req.isCloudposComplianceUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_COMPLIANCE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// セルフPOSマスタ設定：起動
		if (req.isCloudposSelfposExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_SELFPOS_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// セルフPOSマスタ設定：保存
		if (req.isCloudposSelfposUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_SELFPOS_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}

		// ■店舗固有料金設定
		// 曜日区分マスタ設定：起動
		if (req.isCloudposWeekdayDivisionExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_WEEKDAY_DIVISION_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 曜日区分マスタ設定：削除
		if (req.isCloudposWeekdayDivisionDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_WEEKDAY_DIVISION_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// 曜日区分マスタ設定：保存
		if (req.isCloudposWeekdayDivisionUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_WEEKDAY_DIVISION_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// カレンダーマスタ設定：起動
		if (req.isCloudposCalenderExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CALENDER_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// カレンダーマスタ設定：保存
		if (req.isCloudposCalenderUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_CALENDER_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コース料金設定：起動
		if (req.isCloudposCourseRateExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_COURSE_RATE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コース料金設定：保存
		if (req.isCloudposCourseRateUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_COURSE_RATE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コース料金設定：その他１（ｺﾋﾟｰ）
		if (req.isCloudposCourseRateOther1()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_COURSE_RATE_OTHER_1");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// オプションマスタ設定：起動
		if (req.isCloudposDrinkCourseExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DRINKCOURCE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// オプションマスタ設定：削除
		if (req.isCloudposDrinkCourseDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DRINKCOURCE_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// オプションマスタ設定：保存
		if (req.isCloudposDrinkCourseUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_DRINKCOURCE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コースマスタ設定：起動
		if (req.isCloudposRoomCourseExecute()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOMCOURCE_EXECUTE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コースマスタ設定：削除
		if (req.isCloudposRoomCourseDelete()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOMCOURCE_DELETE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// コースマスタ設定：保存
		if (req.isCloudposRoomCourseUpdate()) {
			AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
			model.setName("CLOUDPOS_ROOMCOURCE_UPDATE");
			permissions.add(model);
			postAccessBodyModel.getRequestModel().setPermissions(permissions);
		}
		// KSD V001.000 AE 追加業務のアクセス権取得追加

		// permissions/{roleName}/{changePlanName}
		var postPermissionsResponseModel = permissionsService.postRoleName(postAccessBodyModel,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), roleName, changePlanNameUnitCdStr);

		// トークン情報の上書き
		if (postPermissionsResponseModel.getResult().getWSO2Token() != null
				&& postPermissionsResponseModel.getResult().getELERAToken() != null) {
			accessToken = postPermissionsResponseModel.getResult().getWSO2Token();
			ELERAToken = postPermissionsResponseModel.getResult().getELERAToken();
		}

		if (postPermissionsResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postPermissionsResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postPermissionsResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// changeplans/records(Pending)
		postChangePlanRequestModel
				.setName(postChangePlanResponseModel.getResponseModel().getName());
		postChangePlanRequestModel
				.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
		postChangePlanRequestModel.setStatus("Pending");
		postChangePlanRequestModel
				.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());

		var postChangePlanPendingResponseModel = changePlanService.postChangePlan(
				postChangePlanRequestModel, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
			accessToken = postChangePlanPendingResponseModel.getResult().getWSO2Token();
			ELERAToken = postChangePlanPendingResponseModel.getResult().getELERAToken();
		}

		if (postChangePlanPendingResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// changeplans/execute
		var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (executeResponseModel.getResult().getCode() != 0) {
			// 失敗
			int intcode = executeResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(executeResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// ここまで到達出来たら正常
		responseModel.getResult().setCode(0);

		// セッションのトークン情報の上書き
		if (executeResponseModel.getResult().getWSO2Token() != null
				&& executeResponseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(executeResponseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(executeResponseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return responseModel;
	}

	/**
	 * アクセス権限更新処理.
	 *
	 * @param corporates リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/Csv")
	@ResponseBody
	public PutAccessAuthorityResponseModel accessInfoCsv(
			@RequestBody @Validated({ Default.class, GroupNameOrder.class, GroupPostNoOrder.class,
					GroupTelNoOrder.class,
					GroupFaxNoOrder.class }) PutAccessAuthorityCsvRequestRcvModel req,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutAccessAuthorityResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel = new PutAccessAuthorityResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		// String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// AS #1112
		// changeplans/records(draft)
		var postChangePlanRequestModel = new PostChangePlanRequestModel();
		String nodeId = loginUser.getBusinessUnitCdStr();
		String changePlanNameUnitCdStr = "";

		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = date.format(new Date());
		// 新規の処理(名称：企業コード＋ユーザーID＋タイムスタンプ)
		changePlanNameUnitCdStr = loginUser.getBusinessUnitCdStr() + loginUser.getUserId() + timeStamp;

		postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
		postChangePlanRequestModel.setStatus("Draft");

		var postChangePlanResponseModel = new PostChangePlanResponseModel();
		postChangePlanResponseModel = changePlanService.postChangePlan(postChangePlanRequestModel,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (postChangePlanResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanResponseModel.getResult().getELERAToken() != null) {
			accessToken = postChangePlanResponseModel.getResult().getWSO2Token();
			ELERAToken = postChangePlanResponseModel.getResult().getELERAToken();
		}

		if (postChangePlanResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postChangePlanResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}
		// AE #1112
		// 9個の権限を設定（無い場合は削除するので、必ず9回実行する）
		for (int i = 0; i < 9; i++) {
			// DS #1112
			/*
			// changeplans/records(draft)
			var postChangePlanRequestModel = new PostChangePlanRequestModel();
			String nodeId = loginUser.getBusinessUnitCdStr();
			String changePlanNameUnitCdStr = "";

			SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
			String timeStamp = date.format(new Date());
			// 新規の処理(名称：企業コード＋ユーザーID＋タイムスタンプ)
			changePlanNameUnitCdStr = loginUser.getBusinessUnitCdStr() + loginUser.getUserId() + timeStamp;

			postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
			postChangePlanRequestModel.setStatus("Draft");

			var postChangePlanResponseModel = new PostChangePlanResponseModel();
			postChangePlanResponseModel = changePlanService.postChangePlan(postChangePlanRequestModel,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (postChangePlanResponseModel.getResult().getWSO2Token() != null
					&& postChangePlanResponseModel.getResult().getELERAToken() != null) {
				accessToken = postChangePlanResponseModel.getResult().getWSO2Token();
				ELERAToken = postChangePlanResponseModel.getResult().getELERAToken();
			}

			if (postChangePlanResponseModel.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						postChangePlanResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}
			*/
			// DE #1112

			// 現在のデータを取得
			String roleName = loginUser.getBusinessUnitCdStr() + "_" + (i + 1);
			GetAccessAuthorityRequestModel requestModel = new GetAccessAuthorityRequestModel();
			GetAccessAuthorityResponseModel resModel = permissionsService.getList(requestModel, messageSource,
					apiContext,
					accessToken,
					ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord(),
					roleName);

			// BODYのbaseを作成
			// 現在のデータが取れない場合には、RoleNameを設定する
			var postAccessBodyModel = new PostPermissionsRequestModel();
			if (resModel.getResponseModel().size() > 0) {
				postAccessBodyModel.getRequestModel().setName(resModel.getResponseModel().get(0).getName());
				postAccessBodyModel.getRequestModel()
						.setDisplayName(resModel.getResponseModel().get(0).getDisplayName());
			} else {
				AccessAuthorityModel reqModel = new AccessAuthorityModel();
				postAccessBodyModel.setRequestModel(reqModel);
				postAccessBodyModel.getRequestModel().setName(roleName);
				AccessAuthorityDisplayNameResponseModel displayModel = new AccessAuthorityDisplayNameResponseModel();
				displayModel.setDefaultValue(roleName);
				postAccessBodyModel.getRequestModel()
						.setDisplayName(displayModel);
			}

			AccessAuthorityChangeplanModel changePlanModel = new AccessAuthorityChangeplanModel();
			changePlanModel.setDeleted(false);
			changePlanModel.setName(changePlanNameUnitCdStr);
			postAccessBodyModel.getRequestModel().setChangePlan(changePlanModel);

			List<AccessAuthorityPermissionsResponseModel> permissions = new ArrayList<AccessAuthorityPermissionsResponseModel>();

			// Permissionの登録
			// 空ならば削除実行
			int delFlg = 0;
			String permissionName = "";
			List<String> authorityList = new ArrayList<String>();
			switch (i) {
			case 0:
				if (req.getAuthorityName1() != null) {
					permissionName = req.getAuthorityName1();
				}
				authorityList = req.getAuthorityList1();
				if (req.getAuthorityList1().size() == 0) {
					delFlg = 1;
				}
				break;
			case 1:
				if (req.getAuthorityName2() != null) {
					permissionName = req.getAuthorityName2();
				}
				authorityList = req.getAuthorityList2();
				if (req.getAuthorityList2().size() == 0) {
					delFlg = 1;
				}
				break;
			case 2:
				if (req.getAuthorityName3() != null) {
					permissionName = req.getAuthorityName3();
				}
				authorityList = req.getAuthorityList3();
				if (req.getAuthorityList3().size() == 0) {
					delFlg = 1;
				}
				break;
			case 3:
				if (req.getAuthorityName4() != null) {
					permissionName = req.getAuthorityName4();
				}
				authorityList = req.getAuthorityList4();
				if (req.getAuthorityList4().size() == 0) {
					delFlg = 1;
				}
				break;
			case 4:
				if (req.getAuthorityName5() != null) {
					permissionName = req.getAuthorityName5();
				}
				authorityList = req.getAuthorityList5();
				if (req.getAuthorityList5().size() == 0) {
					delFlg = 1;
				}
				break;
			case 5:
				if (req.getAuthorityName6() != null) {
					permissionName = req.getAuthorityName6();
				}
				authorityList = req.getAuthorityList6();
				if (req.getAuthorityList6().size() == 0) {
					delFlg = 1;
				}
				break;
			case 6:
				if (req.getAuthorityName1() != null) {
					permissionName = req.getAuthorityName7();
				}
				authorityList = req.getAuthorityList7();
				if (req.getAuthorityList7().size() == 0) {
					delFlg = 1;
				}
				break;
			case 7:
				if (req.getAuthorityName1() != null) {
					permissionName = req.getAuthorityName8();
				}
				authorityList = req.getAuthorityList8();
				if (req.getAuthorityList8().size() == 0) {
					delFlg = 1;
				}
				break;
			case 8:
				if (req.getAuthorityName1() != null) {
					permissionName = req.getAuthorityName9();
				}
				authorityList = req.getAuthorityList9();
				if (req.getAuthorityList9().size() == 0) {
					delFlg = 1;
				}
				break;
			}

			// 配列を分解してPermissionsに登録
			for (String one : authorityList) {
				AccessAuthorityPermissionsResponseModel model = new AccessAuthorityPermissionsResponseModel();
				model.setName(one);
				permissions.add(model);
			}
			postAccessBodyModel.getRequestModel().setPermissions(permissions);

			// 名称設定
			if (postAccessBodyModel.getRequestModel().getDisplayName() == null) {
				AccessAuthorityDisplayNameResponseModel displayName = new AccessAuthorityDisplayNameResponseModel();
				displayName.setDefaultValue(permissionName);
				postAccessBodyModel.getRequestModel().setDisplayName(displayName);
			} else {
				postAccessBodyModel.getRequestModel().getDisplayName().setDefaultValue(permissionName);
			}

			// 削除
			if (delFlg == 1) {
				// permissions/{roleName}/{changePlanName}
				postAccessBodyModel.getRequestModel().getChangePlan().setDeleted(true);
				var postPermissionsResponseModel = permissionsService.deleteRoleName(postAccessBodyModel,
						messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
						loginUser.getPassWord(), roleName, changePlanNameUnitCdStr);

				// トークン情報の上書き
				if (postPermissionsResponseModel.getResult().getWSO2Token() != null
						&& postPermissionsResponseModel.getResult().getELERAToken() != null) {
					accessToken = postPermissionsResponseModel.getResult().getWSO2Token();
					ELERAToken = postPermissionsResponseModel.getResult().getELERAToken();
				}

				if (postPermissionsResponseModel.getResult().getCode() != 0) {
					// エラーメッセージをセット
					int intcode = postPermissionsResponseModel.getResult().getCode().intValue();
					responseModel.getResult().setCode(Integer.valueOf(intcode));
					responseModel.getResult().setErrorMessageMap(
							postPermissionsResponseModel.getResult().getErrorMessageMap());
					return responseModel;
				}
			} else {
				// permissions/{roleName}/{changePlanName}
				var postPermissionsResponseModel = permissionsService.postRoleName(postAccessBodyModel,
						messageSource, apiContext, accessToken, ELERAToken,
						loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
						loginUser.getPassWord(), roleName, changePlanNameUnitCdStr);

				// トークン情報の上書き
				if (postPermissionsResponseModel.getResult().getWSO2Token() != null
						&& postPermissionsResponseModel.getResult().getELERAToken() != null) {
					accessToken = postPermissionsResponseModel.getResult().getWSO2Token();
					ELERAToken = postPermissionsResponseModel.getResult().getELERAToken();
				}

				if (postPermissionsResponseModel.getResult().getCode() != 0) {
					// エラーメッセージをセット
					int intcode = postPermissionsResponseModel.getResult().getCode().intValue();
					responseModel.getResult().setCode(Integer.valueOf(intcode));
					responseModel.getResult().setErrorMessageMap(
							postPermissionsResponseModel.getResult().getErrorMessageMap());
					return responseModel;
				}
			}

			// DS #1112
			/*
			// changeplans/records(Pending)
			postChangePlanRequestModel
					.setName(postChangePlanResponseModel.getResponseModel().getName());
			postChangePlanRequestModel
					.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
			postChangePlanRequestModel.setStatus("Pending");
			postChangePlanRequestModel
					.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());

			var postChangePlanPendingResponseModel = changePlanService.postChangePlan(
					postChangePlanRequestModel, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
					&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
				accessToken = postChangePlanPendingResponseModel.getResult().getWSO2Token();
				ELERAToken = postChangePlanPendingResponseModel.getResult().getELERAToken();
			}

			if (postChangePlanPendingResponseModel.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// changeplans/execute
			var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			if (executeResponseModel.getResult().getCode() != 0) {
				// 失敗
				int intcode = executeResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(executeResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}
			// セッションのトークン情報の上書き
			if (executeResponseModel.getResult().getWSO2Token() != null
					&& executeResponseModel.getResult().getELERAToken() != null) {
				loginUser.setWso2ApiToken(executeResponseModel.getResult().getWSO2Token());
				loginUser.setELERAToken(executeResponseModel.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}
			*/
			// DE #1112
		}

		// AS #1112
		// changeplans/records(Pending)
		postChangePlanRequestModel
				.setName(postChangePlanResponseModel.getResponseModel().getName());
		postChangePlanRequestModel
				.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
		postChangePlanRequestModel.setStatus("Pending");
		postChangePlanRequestModel
				.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());

		var postChangePlanPendingResponseModel = changePlanService.postChangePlan(
				postChangePlanRequestModel, messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// トークン情報の上書き
		if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
				&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
			accessToken = postChangePlanPendingResponseModel.getResult().getWSO2Token();
			ELERAToken = postChangePlanPendingResponseModel.getResult().getELERAToken();
		}

		if (postChangePlanPendingResponseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(
					postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}

		// changeplans/execute
		var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (executeResponseModel.getResult().getCode() != 0) {
			// 失敗
			int intcode = executeResponseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(executeResponseModel.getResult().getErrorMessageMap());
			return responseModel;
		}
		// セッションのトークン情報の上書き
		if (executeResponseModel.getResult().getWSO2Token() != null
				&& executeResponseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(executeResponseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(executeResponseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		// AE #1112
		
		// ここまで到達出来たら正常
		responseModel.getResult().setCode(0);

		return responseModel;
	}

	/**
	 * アクセス権限更新処理.
	 *
	 * @param corporates リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 企業マスタ更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/Edit")
	@ResponseBody
	public PutAccessAuthorityResponseModel accessInfoEdit(
			@RequestBody @Validated({ Default.class, GroupNameOrder.class, GroupPostNoOrder.class,
					GroupTelNoOrder.class,
					GroupFaxNoOrder.class }) PutAccessAuthorityEditRequestRcvModel req,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PutAccessAuthorityResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel = new PutAccessAuthorityResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		// String businessCd = loginUser.getBusinessUnitCdStr();
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 該当の名称のアイテムを探す
		String roleName = "";
		// データ検索
		GetAccessAuthorityRequestModel reqList = new GetAccessAuthorityRequestModel();
		String businessCd = loginUser.getBusinessUnitCdStr();
		String query = "";
		for (int i = 0; i < 9; i++) {
			query += businessCd + "_" + (i + 1) + ",";
		}
		query = query.substring(0, query.length() - 1);
		var nameList = permissionsService.getList(reqList, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), query);

		if (nameList != null && nameList.getResponseModel() != null) {
			if (nameList.getResponseModel().size() > 0) {
				for (AccessAuthorityModel one : nameList.getResponseModel()) {
					if (one.getDisplayName().getDefaultValue().equals(req.getAuthorityOldName())) {
						roleName = one.getName();
					}
				}
			}
		}

		if (roleName != null && StringUtils.isNotEmpty(roleName)) {
			// changeplans/records(draft)
			var postChangePlanRequestModel = new PostChangePlanRequestModel();
			String nodeId = loginUser.getBusinessUnitCdStr();
			String changePlanNameUnitCdStr = "";

			SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
			String timeStamp = date.format(new Date());
			// 新規の処理(名称：企業コード＋ユーザーID＋タイムスタンプ)
			changePlanNameUnitCdStr = loginUser.getBusinessUnitCdStr() + loginUser.getUserId() + timeStamp;

			postChangePlanRequestModel.setName(changePlanNameUnitCdStr);
			postChangePlanRequestModel.setStatus("Draft");

			var postChangePlanResponseModel = new PostChangePlanResponseModel();
			postChangePlanResponseModel = changePlanService.postChangePlan(postChangePlanRequestModel,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (postChangePlanResponseModel.getResult().getWSO2Token() != null
					&& postChangePlanResponseModel.getResult().getELERAToken() != null) {
				accessToken = postChangePlanResponseModel.getResult().getWSO2Token();
				ELERAToken = postChangePlanResponseModel.getResult().getELERAToken();
			}

			if (postChangePlanResponseModel.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postChangePlanResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						postChangePlanResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// 現在のデータを取得
			GetAccessAuthorityRequestModel requestModel = new GetAccessAuthorityRequestModel();
			GetAccessAuthorityResponseModel resModel = permissionsService.getList(requestModel, messageSource,
					apiContext,
					accessToken,
					ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord(),
					roleName);
			// BODYのbaseを作成
			var postAccessBodyModel = new PostPermissionsRequestModel();
			postAccessBodyModel.setRequestModel(resModel.getResponseModel().get(0));
			// 新しい名前に変更する
			postAccessBodyModel.getRequestModel().getDisplayName().setDefaultValue(req.getAuthorityName());

			AccessAuthorityChangeplanModel changePlanModel = new AccessAuthorityChangeplanModel();
			changePlanModel.setDeleted(false);
			changePlanModel.setName(changePlanNameUnitCdStr);
			postAccessBodyModel.getRequestModel().setChangePlan(changePlanModel);

			// permissions/{roleName}/{changePlanName}
			var postPermissionsResponseModel = permissionsService.postRoleName(postAccessBodyModel,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord(), roleName, changePlanNameUnitCdStr);

			// トークン情報の上書き
			if (postPermissionsResponseModel.getResult().getWSO2Token() != null
					&& postPermissionsResponseModel.getResult().getELERAToken() != null) {
				accessToken = postPermissionsResponseModel.getResult().getWSO2Token();
				ELERAToken = postPermissionsResponseModel.getResult().getELERAToken();
			}

			if (postPermissionsResponseModel.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postPermissionsResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						postPermissionsResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// changeplans/records(Pending)
			postChangePlanRequestModel
					.setName(postChangePlanResponseModel.getResponseModel().getName());
			postChangePlanRequestModel
					.setVersion(postChangePlanResponseModel.getResponseModel().getVersion());
			postChangePlanRequestModel.setStatus("Pending");
			postChangePlanRequestModel
					.setNotes(postChangePlanResponseModel.getResponseModel().getNotes());

			var postChangePlanPendingResponseModel = changePlanService.postChangePlan(
					postChangePlanRequestModel, messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

			// トークン情報の上書き
			if (postChangePlanPendingResponseModel.getResult().getWSO2Token() != null
					&& postChangePlanPendingResponseModel.getResult().getELERAToken() != null) {
				accessToken = postChangePlanPendingResponseModel.getResult().getWSO2Token();
				ELERAToken = postChangePlanPendingResponseModel.getResult().getELERAToken();
			}

			if (postChangePlanPendingResponseModel.getResult().getCode() != 0) {
				// エラーメッセージをセット
				int intcode = postChangePlanPendingResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult().setErrorMessageMap(
						postChangePlanPendingResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// changeplans/execute
			var executeResponseModel = changePlanService.postChangePlanExecute(changePlanNameUnitCdStr,
					messageSource, apiContext, accessToken, ELERAToken,
					loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			if (executeResponseModel.getResult().getCode() != 0) {
				// 失敗
				int intcode = executeResponseModel.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(executeResponseModel.getResult().getErrorMessageMap());
				return responseModel;
			}

			// ここまで到達出来たら正常
			responseModel.getResult().setCode(0);

			// セッションのトークン情報の上書き
			if (executeResponseModel.getResult().getWSO2Token() != null
					&& executeResponseModel.getResult().getELERAToken() != null) {
				loginUser.setWso2ApiToken(executeResponseModel.getResult().getWSO2Token());
				loginUser.setELERAToken(executeResponseModel.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}
		}

		return responseModel;
	}

}
