package com.ttss.prementenance.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.AccessAuthorityPermissionsResponseModel;
import com.ttss.prementenance.model.GetAccessAuthorityRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.PostAuthorizationLoginRequestModel;
import com.ttss.prementenance.model.PostAuthorizationLoginResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRetrieveRequestModel;
import com.ttss.prementenance.model.PutPwUpdateRequestBodyModel;
import com.ttss.prementenance.model.PutPwUpdateRequestParamModel;
import com.ttss.prementenance.model.PutUserLoginRequestBodyModel;
import com.ttss.prementenance.model.PutUserLoginRequestParamModel;
import com.ttss.prementenance.request.PostConfigurationsCommonDisplayRequestModel;
import com.ttss.prementenance.response.PostConfigurationsCommonDisplayResponseModel;
import com.ttss.prementenance.service.AuthorizationService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.PermissionsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.OauthContext;
import com.ttss.prementenance.utils.OauthUtil;
import com.ttss.prementenance.utils.SessionBeans;
import com.ttss.prementenance.utils.SessionUtil;

import io.micrometer.core.instrument.util.StringUtils;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221216 tianxh(Neusoft)    G001.00.0  issue課題#809を対応します.
 * 20230214 xu.jh(Neusoft)    G002.00.0  issue課題#1054を対応します.
 * 20230302 xu.jh(Neusoft)    G003.00.0  issue課題#1038を対応します.
 */


/**
 * ログイン画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("Login")
public class LoginController {

	@Autowired
	private AuthorizationService authorizationService;

	@Autowired
	private ConfigurationsService configurationsService;

	@Autowired
	private PermissionsService permissionsService;

	// @Autowired
	// private SystemOptionsService systemOptionsService;

	// @Autowired
	// private TopService topService;

	// @Autowired
	// private UserMasterService userMasterService;

	// @Autowired
	// private CorporateMasterService corporateMasterService;

	// @Autowired
	// private StoreMasterService storeMasterService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private OauthContext authContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Value("${business_cd_in_unfixed}")
	private String businessCdInUnfixed;

	// KSD V001.000 AS
	@Value("${tempUserName}")
	private String login_tempUserName;

	@Value("${tempPassword}")
	private String login_tempPassword;
	// KSD V001.000 AE

	@Autowired
	public LoginController() {
	}

	/**
	 * ログイン.
	 *
	 * @param reqParamModel リクエストパラメータ内容
	 * @param reqBodyModel リクエストボディ内容
	 * @param errors バリデーションエラー内容
	 * @param response HttpServletのレスポンス(FWが自動で設定)
	 * @return ログイン＋αレスポンス
	 * @throws IOException APIレスポンス結果をモデルクラスに変換エラー
	 * @throws InterruptedException API接続時のスレッド割込みエラー
	 */
	@CrossOrigin
	@PutMapping("/UserLogin")
	@ResponseBody
	public PostAuthorizationLoginResponseModel userLogin(
			@Validated PutUserLoginRequestParamModel reqParamModel,
			@RequestBody @Validated PutUserLoginRequestBodyModel reqBodyModel, Errors errors,
			HttpServletResponse response,
			@RequestParam("businessUnitCdStr") String businessUnitCdStr)
			throws IOException, InterruptedException {

		var responseModel = new PostAuthorizationLoginResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		String accessToken;
		try {
			accessToken = oauth();
		} catch (Exception e) {
			// アクセストークン取得時にExceptionが発生したらエラーとして処理する
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E001"), -10, e));
			return responseModel;
		}
		// 正常時
		// ログイン
		var requestModel = new PostAuthorizationLoginRequestModel();
		requestModel.getRequestModel().setUsername(businessUnitCdStr + reqBodyModel.getLoginInfo().getUserId());
		requestModel.getRequestModel().setPassword(reqBodyModel.getLoginInfo().getInputPassword());
		responseModel = authorizationService.postLogin(requestModel, messageSource, apiContext,
				accessToken, "");

		var ELERAToken = responseModel.getELERAToken();

		// パスワード有効期限切れの場合は以下処理は実施しない
		// ログインできたらユーザに関する情報を取得する
		if (responseModel.getResult().getCode() == 0) {
			// ユーザ情報取得
			var userRetrieveReq = new PostAuthorizationUsersRetrieveRequestModel();
			userRetrieveReq.getRequestModel().setUsername(businessUnitCdStr + reqBodyModel.getLoginInfo().getUserId());
			var userRetrieveRes = authorizationService.postUsersRetrieve(userRetrieveReq,
					messageSource, apiContext, accessToken, ELERAToken,
					reqBodyModel.getLoginInfo().getUserId(),
					reqBodyModel.getLoginInfo().getInputPassword());
			if (userRetrieveRes.getResult().getCode() == 2) {
				// ユーザなしエラー
				int intcode = userRetrieveRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));

				MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
				map.add("global", messageResourseUtil.getMessage("O00001.E002"));
				responseModel.getResult().setErrorMessageMap(map);

				return responseModel;

			} else if (userRetrieveRes.getResult().getCode() != 0) {
				int intcode = userRetrieveRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(userRetrieveRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// // ロール取得
			// var userRolesReq = new PostAuthorizationUsersRolesRetrieveRequestModel();
			// userRolesReq.getRequestModel().setUserId(userRetrieveRes.getResponseModel().getId());
			// var userRolesRes = authorizationService.postUsersRolesRetrieve(userRolesReq,
			// messageSource,
			// apiContext, accessToken,ELERAToken);
			// if (userRolesRes.getResult().getCode() != 0) {
			// int intcode = userRolesRes.getResult().getCode().intValue();
			// responseModel.getResult().setCode(Integer.valueOf(intcode));
			// responseModel.getResult()
			// .setErrorMessageMap(userRolesRes.getResult().getErrorMessageMap());
			// return responseModel;
			// }
			// var nodeId = userRolesRes.getResponseModel().get(0).getNodeId();
			// for (var i = 0; i < userRolesRes.getResponseModel().size(); i++) {
			// if (userRolesRes.getResponseModel().get(i).getNodeId().length() > 15) {
			// // 15文字以上だと店舗なのでそのnodeを利用
			// break;
			// }
			// }
			// var storeNodeId = "";
			// if (nodeId.length() <= 15) {
			// // SYSTEMのみ
			// corporateNodeId = nodeId;
			// } else {
			// corporateNodeId = nodeId.substring(0,15);
			// storeNodeId = nodeId;
			// }

			var corporateNodeId = "";
			corporateNodeId = businessUnitCdStr;

			// 企業（構成）
			var corporateNodesReq = new GetConfigurationsNodesNodeIdRequestModel();
			var corporateRes = configurationsService.getNodesNodeId(corporateNodesReq,
					corporateNodeId, messageSource, apiContext, accessToken, ELERAToken,
					reqBodyModel.getLoginInfo().getUserId(),
					reqBodyModel.getLoginInfo().getInputPassword());
			if (corporateRes.getResult().getCode() == 2) {
				// データ無し
				int intcode = corporateRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				// responseModel.getResult()
				// .setErrorMessageMap(corporateRes.getResult().getErrorMessageMap());

				MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
				map.add("global", messageResourseUtil.getMessage("O00001.E003"));
				responseModel.getResult().setErrorMessageMap(map);

				return responseModel;
			} else if (corporateRes.getResult().getCode() != 0) {
				int intcode = corporateRes.getResult().getCode().intValue();
				responseModel.getResult().setCode(Integer.valueOf(intcode));
				responseModel.getResult()
						.setErrorMessageMap(corporateRes.getResult().getErrorMessageMap());
				return responseModel;
			}

			// 店舗情報格納
			var storeNodesReq = new GetConfigurationsNodesNodeIdRequestModel();
			var storeRes = new GetConfigurationsNodesNodeIdResponseModel();
			String storeNodeId = corporateNodeId;
			if (userRetrieveRes.getResponseModel().getHomeNodeId() != null) {
				storeNodeId = userRetrieveRes.getResponseModel().getHomeNodeId();
			}
			if (storeNodeId.length() > 0) {
				storeRes = configurationsService.getNodesNodeId(storeNodesReq, storeNodeId,
						messageSource, apiContext, accessToken, ELERAToken,
						reqBodyModel.getLoginInfo().getUserId(),
						reqBodyModel.getLoginInfo().getInputPassword());
				if (storeRes.getResult().getCode() != 0) {
					int intcode = storeRes.getResult().getCode().intValue();
					responseModel.getResult().setCode(Integer.valueOf(intcode));
					responseModel.getResult()
							.setErrorMessageMap(storeRes.getResult().getErrorMessageMap());
					return responseModel;
				}
			}

			// セッションも必要なものだけ格納する

			// 情報取得全部成功
			var session = new SessionBeans();
			session.setUserId(reqBodyModel.getLoginInfo().getUserId());
			session.setUserName(userRetrieveRes.getResponseModel().getFirstName());
			session.setBusinessUnitCdStr(corporateNodeId);
			// STGデータだとnull落ちするので対策
			if (corporateRes.getResponseModel().getDisplayName() != null) {
				session.setBusinessUnitName(
						corporateRes.getResponseModel().getDisplayName().getDefaultValue());
			}
			session.setNodeId(corporateNodeId);
			session.setWso2ApiToken(accessToken);
			session.setELERAToken(responseModel.getELERAToken());
			session.setPassWord(reqBodyModel.getLoginInfo().getInputPassword());
			session.setApplicationVersion(apiContext.getAppVersion());

			// 店舗情報設定
			if (storeRes.getResponseModel() != null) {
				session.setBelongStoreCd(storeNodeId);
				session.setAffiliationStoreName(storeRes.getResponseModel().getName());
			}

			// 本部権限設定
			if (userRetrieveRes.getResponseModel().isHeadquartersPermission()) {
				session.setHeadquartersAuthority((short) 1);
				if (corporateRes.getResponseModel().getDisplayName() != null
						&& corporateRes.getResponseModel().getDisplayName().getDefaultValue() != null) {
					session.setBusinessUnitName(corporateRes.getResponseModel().getDisplayName().getDefaultValue());
				}
				session.setBelongStoreCd(null);
				session.setAffiliationStoreName(null);
			} else {
				session.setHeadquartersAuthority((short) 0);
				if (corporateRes.getResponseModel().getDisplayName() != null
						&& corporateRes.getResponseModel().getDisplayName().getDefaultValue() != null) {
					session.setBusinessUnitName(corporateRes.getResponseModel().getDisplayName().getDefaultValue());
				}
				session.setBelongStoreCd(storeNodeId.substring(storeNodeId.length() - 6));
				if (storeRes.getResponseModel().getDisplayName() != null
						&& storeRes.getResponseModel().getDisplayName().getDefaultValue() != null) {
					session.setAffiliationStoreName(storeRes.getResponseModel().getDisplayName().getDefaultValue());
				}
			}
			// G003.00.0 Add-start
			if (userRetrieveRes.getResponseModel().getResponsibleStores() != null) {
				session.setChargeStoreCds(userRetrieveRes.getResponseModel().getResponsibleStores());
			}
            // G003.00.0 Add-end
// KSD V001.000 20230822 AS 初期化（店舗マスタ検索でNullPointerで落ちるため）
			session.setIsCloudposAdmin(false);
// KSD V001.000 20230822 AE
			// アクセス権限を取得する
			if (userRetrieveRes.getResponseModel().getAccessAuthority() != null
					&& StringUtils.isNotEmpty(userRetrieveRes.getResponseModel().getAccessAuthority())) {
				// G003.00.0 Add-start
				if(userRetrieveRes.getResponseModel().getAccessAuthority().equals("CLOUDPOS_ADMIN")) {
					session.setIsCloudposAdmin(true);
				} else {
					session.setIsCloudposAdmin(false);
				}
				// G003.00.0 Add-end
				// 一旦初期化
				// KSD V001.000 M 記載順を、確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
				// ■ユーザ管理
				session.setCLOUDPOS_USER_EXECUTE(false);					// ユーザマスタ登録：起動
				session.setCLOUDPOS_USER_DELETE(false);						// ユーザマスタ登録：削除
				session.setCLOUDPOS_USER_UPDATE(false);						// ユーザマスタ登録：保存
				session.setCLOUDPOS_USER_OTHER_1(false);					// ユーザマスタ登録：その他１（PWロック）
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_EMPLOYEE_EXECUTE(false);				// 従業員コード印字：起動
				session.setCLOUDPOS_EMPLOYEE_OTHER_1(false);				// 従業員コード印字：その他１（PDF出力）
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				session.setCLOUDPOS_ACCESS_EXECUTE(false);					// アクセス権限登録：起動
				session.setCLOUDPOS_ACCESS_UPDATE(false);					// アクセス権限登録：保存
				session.setCLOUDPOS_ACCESS_OTHER_1(false);					// アクセス権限登録：その他１（CSV入力）
				session.setCLOUDPOS_ACCESS_OTHER_2(false);					// アクセス権限登録：その他２（CSV出力）
				// ■店舗管理
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_GRP1_EXECUTE(false);					// 店舗グループ１登録：起動
				session.setCLOUDPOS_GRP1_DELETE(false);						// 店舗グループ１登録：削除
				session.setCLOUDPOS_GRP1_UPDATE(false);						// 店舗グループ１登録：保存
				session.setCLOUDPOS_GRP2_EXECUTE(false);					// 店舗グループ２登録：起動
				session.setCLOUDPOS_GRP2_DELETE(false);						// 店舗グループ２登録：削除
				session.setCLOUDPOS_GRP2_UPDATE(false);						// 店舗グループ２登録：保存
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				session.setCLOUDPOS_STORE_EXECUTE(false);					// 店舗マスタ登録：起動
				session.setCLOUDPOS_STORE_DELETE(false);					// 店舗マスタ登録：削除
				session.setCLOUDPOS_STORE_UPDATE(false);					// 店舗マスタ登録：保存
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_STORE_COPY_EXECUTE(false);				// 店舗マスタコピー：起動
				session.setCLOUDPOS_STORE_COPY_DELETE(false);				// 店舗マスタコピー：削除
				session.setCLOUDPOS_STORE_COPY_UPDATE(false);				// 店舗マスタコピー：保存
				session.setCLOUDPOS_STORE_COPY_OTHER_1(false);				// 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				// ■端末管理
				session.setCLOUDPOS_DEVICE_EXECUTE(false);					// 端末設定：起動
				session.setCLOUDPOS_DEVICE_DELETE(false);					// 端末設定：削除
				session.setCLOUDPOS_DEVICE_UPDATE(false);					// 端末設定：保存
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_DENOMINATION_EXECUTE(false);			// 金種設定：起動
				session.setCLOUDPOS_DENOMINATION_UPDATE(false);				// 金種設定：削除
				session.setCLOUDPOS_DENOMINATION_OTHER_1(false);			// 金種設定：その他１（ｺﾋﾟｰ実行）
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				session.setCLOUDPOS_STATUS_EXECUTE(false);					// 状態管理：起動
				// ■監査
				session.setCLOUDPOS_JOURNAL_EXECUTE(false);					// 電子ジャーナル：起動
				session.setCLOUDPOS_JOURNAL_UPDATE(false);					// 電子ジャーナル：保存
				session.setCLOUDPOS_JOURNAL_OTHER_1(false);					// 電子ジャーナル：その他１（PDF出力）
				session.setCLOUDPOS_REPORT_EXECUTE(false);					// POSレポート出力：起動
				session.setCLOUDPOS_REPORT_OTHER_1(false);					// POSレポート出力：その他１（PDF出力）
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_AUDIT_EXECUTE(false);					// 監査レポート出力：起動
				session.setCLOUDPOS_AUDIT_OTHER_1(false);					// 監査レポート出力：その他１（PDF出力）
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				// ■商品構成
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_PRODUCT_DIVISIONS_EXECUTE(false);		// 商品分類階層設定：起動
				session.setCLOUDPOS_PRODUCT_DIVISIONS_UPDATE(false);		// 商品分類階層設定：保存
				session.setCLOUDPOS_CATALOG_EXECUTE(false);					// 商品構成マスタ登録：起動
				session.setCLOUDPOS_CATALOG_DELETE(false);					// 商品構成マスタ登録：削除
				session.setCLOUDPOS_CATALOG_UPDATE(false);					// 商品構成マスタ登録：保存
				session.setCLOUDPOS_CATALOG_OTHER_1(false);					// 商品構成マスタ登録：その他１（CSV入力）
				session.setCLOUDPOS_CATALOG_OTHER_2(false);					// 商品構成マスタ登録：その他２（CSV出力）
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				session.setCLOUDPOS_ITEM_EXECUTE(false);					// 商品マスタ登録：起動
				session.setCLOUDPOS_ITEM_DELETE(false);						// 商品マスタ登録：削除
				session.setCLOUDPOS_ITEM_UPDATE(false);						// 商品マスタ登録：保存
				session.setCLOUDPOS_ITEM_OTHER_1(false);					// 商品マスタ登録：その他１（CSV入力）
				session.setCLOUDPOS_ITEM_OTHER_2(false);					// 商品マスタ登録：その他２（CSV出力）
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_RESTAURANT_SCP_EXECUTE(false);			// 飲食オーダーガイダンス設定：起動
				session.setCLOUDPOS_RESTAURANT_SCP_DELETE(false);			// 飲食オーダーガイダンス設定：削除
				session.setCLOUDPOS_RESTAURANT_SCP_UPDATE(false);			// 飲食オーダーガイダンス設定：保存
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				session.setCLOUDPOS_PRESET_EXECUTE(false);					// プリセットマスタ：起動
				session.setCLOUDPOS_PRESET_DELETE(false);					// プリセットマスタ：削除
				session.setCLOUDPOS_PRESET_UPDATE(false);					// プリセットマスタ：保存
				session.setCLOUDPOS_PRESET_OTHER_1(false);					// プリセットマスタ：その他１（企画ｺﾋﾟｰ）
				session.setCLOUDPOS_PRESET_OTHER_2(false);					// プリセットマスタ：その他２（運用確認）
				// ■売価変更
				session.setCLOUDPOS_PRICE_EXECUTE(false);					// 売価変更：起動
				session.setCLOUDPOS_PRICE_DELETE(false);					// 売価変更：削除
				session.setCLOUDPOS_PRICE_UPDATE(false);					// 売価変更：保存
				session.setCLOUDPOS_PRICE_OTHER_1(false);					// 売価変更：その他１（出力）
				// ■クラウドPOS運用設定
				session.setCLOUDPOS_BARCODE_EXECUTE(false);					// バーコードフラグ設定：起動
				session.setCLOUDPOS_BARCODE_DELETE(false);					// バーコードフラグ設定：削除
				session.setCLOUDPOS_BARCODE_UPDATE(false);					// バーコードフラグ設定：保存
				session.setCLOUDPOS_TRANSACTION_EXECUTE(false);				// 取引別名称設定：起動
				session.setCLOUDPOS_TRANSACTION_DELETE(false);				// 取引別名称設定：削除
				session.setCLOUDPOS_TRANSACTION_UPDATE(false);				// 取引別名称設定：保存
				session.setCLOUDPOS_REVENUE_STAMP_EXECUTE(false);			// 収入印紙一括納付設定：起動
				session.setCLOUDPOS_REVENUE_STAMP_DELETE(false);			// 収入印紙一括納付設定：削除
				session.setCLOUDPOS_REVENUE_STAMP_UPDATE(false);			// 収入印紙一括納付設定：保存
				session.setCLOUDPOS_OPERATION_EXECUTE(false);				// 運用設定：起動
				session.setCLOUDPOS_OPERATION_DELETE(false);				// 運用設定：削除
				session.setCLOUDPOS_OPERATION_UPDATE(false);				// 運用設定：保存
				session.setCLOUDPOS_STORE_OPERATION_EXECUTE(false);			// 店別運用設定：起動
				session.setCLOUDPOS_STORE_OPERATION_DELETE(false);			// 店別運用設定：削除
				session.setCLOUDPOS_STORE_OPERATION_UPDATE(false);			// 店別運用設定：保存
				session.setCLOUDPOS_RECEIPT_EXECUTE(false);					// レシート設定：起動
				session.setCLOUDPOS_RECEIPT_DELETE(false);					// レシート設定：削除
				session.setCLOUDPOS_RECEIPT_UPDATE(false);					// レシート設定：保存
				session.setCLOUDPOS_RECEIPT_OTHER_1(false);					// レシート設定：その他１（企画ｺﾋﾟｰ）
				session.setCLOUDPOS_RECEIPT_OTHER_2(false);					// レシート設定：その他２（企画確認）
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				session.setCLOUDPOS_TAX_EXECUTE(false);						// 税率設定：起動
				session.setCLOUDPOS_TAX_DELETE(false);						// 税率設定：削除
				session.setCLOUDPOS_TAX_UPDATE(false);						// 税率設定：保存
				session.setCLOUDPOS_TIME_EXECUTE(false);					// 時間帯設定：起動
				session.setCLOUDPOS_TIME_DELETE(false);						// 時間帯設定：削除
				session.setCLOUDPOS_TIME_UPDATE(false);						// 時間帯設定：保存
				session.setCLOUDPOS_RESTAURANT_CONNECTNAME_EXECUTE(false);	// OES連携名称設定：起動
				session.setCLOUDPOS_RESTAURANT_CONNECTNAME_UPDATE(false);	// OES連携名称設定：保存
				// KSD V001.000 AE 追加業務のアクセス権取得追加
				// ■クラウドPOS店舗運用設定
				session.setCLOUDPOS_OPERATION_BTN_EXECUTE(false);			// 操作ボタン設定：起動
				session.setCLOUDPOS_OPERATION_BTN_UPDATE(false);			// 操作ボタン設定：保存
				session.setCLOUDPOS_TIGHTENING_BTN_EXECUTE(false);			// 締めボタン設定：起動
				session.setCLOUDPOS_TIGHTENING_BTN_DELETE(false);			// 締めボタン設定：削除
				session.setCLOUDPOS_TIGHTENING_BTN_UPDATE(false);			// 締めボタン設定：保存
				// KSD V001.000 AS 追加業務のアクセス権取得追加
				// ■全店共通設定
				session.setCLOUDPOS_EQUIPMENT_EXECUTE(false);				// 機材マスタ設定：起動
				session.setCLOUDPOS_EQUIPMENT_DELETE(false);				// 機材マスタ設定：削除
				session.setCLOUDPOS_EQUIPMENT_UPDATE(false);				// 機材マスタ設定：保存
				session.setCLOUDPOS_MODEL_EXECUTE(false);					// 機種設備マスタ設定：起動
				session.setCLOUDPOS_MODEL_DELETE(false);					// 機種設備マスタ設定：削除
				session.setCLOUDPOS_MODEL_UPDATE(false);					// 機種設備マスタ設定：保存
				session.setCLOUDPOS_AGE_DIVISION_EXECUTE(false);			// 年齢区分マスタ設定：起動
				session.setCLOUDPOS_AGE_DIVISION_DELETE(false);				// 年齢区分マスタ設定：削除
				session.setCLOUDPOS_AGE_DIVISION_UPDATE(false);				// 年齢区分マスタ設定：保存
				session.setCLOUDPOS_MEMBER_RANK_EXECUTE(false);				// 会員ランクマスタ設定：起動
				session.setCLOUDPOS_MEMBER_RANK_DELETE(false);				// 会員ランクマスタ設定：削除
				session.setCLOUDPOS_MEMBER_RANK_UPDATE(false);				// 会員ランクマスタ設定：保存
				// ■店舗固有設備設定
				session.setCLOUDPOS_ROOM_EXECUTE(false);					// 部屋情報マスタ設定：起動
				session.setCLOUDPOS_ROOM_DELETE(false);						// 部屋情報マスタ設定：削除
				session.setCLOUDPOS_ROOM_UPDATE(false);						// 部屋情報マスタ設定：保存
				session.setCLOUDPOS_ROOM_RELATION_EXECUTE(false);			// 部屋関連情報マスタ設定：起動
				session.setCLOUDPOS_ROOM_RELATION_DELETE(false);			// 部屋関連情報マスタ設定：削除
				session.setCLOUDPOS_ROOM_RELATION_UPDATE(false);			// 部屋関連情報マスタ設定：保存
				session.setCLOUDPOS_ROOM_SUB_EXECUTE(false);				// 部屋情報サブ設定：起動
				session.setCLOUDPOS_ROOM_SUB_UPDATE(false);					// 部屋情報サブ設定：保存
				session.setCLOUDPOS_ROOM_SUB_OTHER_1(false);				// 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
				session.setCLOUDPOS_CODEPAY_EXECUTE(false);					// コード決済通信マスタ設定：起動
				session.setCLOUDPOS_CODEPAY_UPDATE(false);					// コード決済通信マスタ設定：保存
				session.setCLOUDPOS_TARIFF_EXECUTE(false);					// 料金表表示マスタ設定：起動
				session.setCLOUDPOS_TARIFF_DELETE(false);					// 料金表表示マスタ設定：削除
				session.setCLOUDPOS_TARIFF_UPDATE(false);					// 料金表表示マスタ設定：保存
				// ■店舗固有POS設定
				session.setCLOUDPOS_TICKET_EXECUTE(false);					// 券種マスタ設定：起動
				session.setCLOUDPOS_TICKET_DELETE(false);					// 券種マスタ設定：削除
				session.setCLOUDPOS_TICKET_UPDATE(false);					// 券種マスタ設定：保存
				session.setCLOUDPOS_COMPLIANCE_EXECUTE(false);				// コンプライアンス情報マスタ設定：起動
				session.setCLOUDPOS_COMPLIANCE_UPDATE(false);				// コンプライアンス情報マスタ設定：保存
				session.setCLOUDPOS_SELFPOS_EXECUTE(false);					// セルフPOSマスタ設定：起動
				session.setCLOUDPOS_SELFPOS_UPDATE(false);					// セルフPOSマスタ設定：保存
				// ■店舗固有料金設定
				session.setCLOUDPOS_WEEKDAY_DIVISION_EXECUTE(false);		// 曜日区分マスタ設定：起動
				session.setCLOUDPOS_WEEKDAY_DIVISION_DELETE(false);			// 曜日区分マスタ設定：削除
				session.setCLOUDPOS_WEEKDAY_DIVISION_UPDATE(false);			// 曜日区分マスタ設定：保存
				session.setCLOUDPOS_CALENDER_EXECUTE(false);				// カレンダーマスタ設定：起動
				session.setCLOUDPOS_CALENDER_UPDATE(false);					// カレンダーマスタ設定：保存
				session.setCLOUDPOS_COURSE_RATE_EXECUTE(false);				// コース料金設定：起動
				session.setCLOUDPOS_COURSE_RATE_UPDATE(false);				// コース料金設定：保存
				session.setCLOUDPOS_COURSE_RATE_OTHER_1(false);				// コース料金設定：その他１（ｺﾋﾟｰ）
				session.setCLOUDPOS_DRINKCOURCE_EXECUTE(false);				// オプションマスタ設定：起動
				session.setCLOUDPOS_DRINKCOURCE_DELETE(false);				// オプションマスタ設定：削除
				session.setCLOUDPOS_DRINKCOURCE_UPDATE(false);				// オプションマスタ設定：保存
				session.setCLOUDPOS_ROOMCOURCE_EXECUTE(false);				// コースマスタ設定：起動
				session.setCLOUDPOS_ROOMCOURCE_DELETE(false);				// コースマスタ設定：削除
				session.setCLOUDPOS_ROOMCOURCE_UPDATE(false);				// コースマスタ設定：保存
				// KSD V001.000 AE 追加業務のアクセス権取得追加

				// データ検索
				GetAccessAuthorityRequestModel permissionsReqModel = new GetAccessAuthorityRequestModel();

				String query = userRetrieveRes.getResponseModel().getAccessAuthority();

				var permissionsModel = permissionsService.getList(permissionsReqModel, messageSource, apiContext,
						accessToken, ELERAToken, corporateNodeId + reqBodyModel.getLoginInfo().getUserId(),
						reqBodyModel.getLoginInfo().getInputPassword(), query);

				if (permissionsModel != null && permissionsModel.getResponseModel() != null) {
					if (permissionsModel.getResponseModel().get(0).getPermissions() != null
							&& permissionsModel.getResponseModel().get(0).getPermissions().size() > 0) {
						// G002.00.0 Add-start
						List<String> permissionList = new ArrayList<>();
						// G002.00.0 Add-end
						for (AccessAuthorityPermissionsResponseModel permission : permissionsModel.getResponseModel()
								.get(0).getPermissions()) {
							// KSD V001.000 M 記載順を確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
							// ■ユーザ管理
							if (permission.equals("CLOUDPOS_USER_EXECUTE ")) {
								// ユーザマスタ登録：起動
								session.setCLOUDPOS_USER_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_USER_DELETE ")) {
								// ユーザマスタ登録：削除
								session.setCLOUDPOS_USER_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_USER_UPDATE ")) {
								// ユーザマスタ登録：保存
								session.setCLOUDPOS_USER_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_USER_OTHER_1 ")) {
								// ユーザマスタ登録：その他１（PWロック）
								session.setCLOUDPOS_USER_OTHER_1(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_EMPLOYEE_EXECUTE ")) {
								// 従業員コード印字：起動
								session.setCLOUDPOS_EMPLOYEE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_EMPLOYEE_OTHER_1 ")) {
								// 従業員コード印字：その他１（PDF出力）
								session.setCLOUDPOS_EMPLOYEE_OTHER_1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_ACCESS_EXECUTE ")) {
								// アクセス権限登録：起動
								session.setCLOUDPOS_ACCESS_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_ACCESS_UPDATE ")) {
								// アクセス権限登録：保存
								session.setCLOUDPOS_ACCESS_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_ACCESS_OTHER_1 ")) {
								// アクセス権限登録：その他１（CSV入力）
								session.setCLOUDPOS_ACCESS_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_ACCESS_OTHER_2 ")) {
								// アクセス権限登録：その他２（CSV出力）
								session.setCLOUDPOS_ACCESS_OTHER_2(true);
							}

							// ■店舗管理
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_GRP1_EXECUTE ")) {
								// 店舗グループ１登録：起動
								session.setCLOUDPOS_GRP1_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_GRP1_DELETE ")) {
								// 店舗グループ１登録：削除
								session.setCLOUDPOS_GRP1_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_GRP1_UPDATE ")) {
								// 店舗グループ１登録：保存
								session.setCLOUDPOS_GRP1_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_GRP2_EXECUTE ")) {
								// 店舗グループ２登録：起動
								session.setCLOUDPOS_GRP2_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_GRP2_DELETE ")) {
								// 店舗グループ２登録：削除
								session.setCLOUDPOS_GRP2_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_GRP2_UPDATE ")) {
								// 店舗グループ２登録：保存
								session.setCLOUDPOS_GRP2_UPDATE(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_STORE_EXECUTE ")) {
								// 店舗マスタ登録：起動
								session.setCLOUDPOS_STORE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_DELETE ")) {
								// 店舗マスタ登録：削除
								session.setCLOUDPOS_STORE_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_UPDATE ")) {
								// 店舗マスタ登録：保存
								session.setCLOUDPOS_STORE_UPDATE(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_STORE_COPY_EXECUTE ")) {
								// 店舗マスタコピー：起動
								session.setCLOUDPOS_STORE_COPY_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_COPY_DELETE ")) {
								// 店舗マスタコピー：削除
								session.setCLOUDPOS_STORE_COPY_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_COPY_UPDATE ")) {
								// 店舗マスタコピー：保存
								session.setCLOUDPOS_STORE_COPY_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_COPY_OTHER_1 ")) {
								// 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
								session.setCLOUDPOS_STORE_COPY_OTHER_1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加

							// ■端末管理
							if (permission.equals("CLOUDPOS_DEVICE_EXECUTE ")) {
								// 端末設定：起動
								session.setCLOUDPOS_DEVICE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_DEVICE_DELETE ")) {
								// 端末設定：削除
								session.setCLOUDPOS_DEVICE_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_DEVICE_UPDATE ")) {
								// 端末設定：保存
								session.setCLOUDPOS_DEVICE_UPDATE(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_DENOMINATION_EXECUTE ")) {
								// 金種設定：起動
								session.setCLOUDPOS_DENOMINATION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_DENOMINATION_UPDATE ")) {
								// 金種設定：削除
								session.setCLOUDPOS_DENOMINATION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_DENOMINATION_OTHER_1 ")) {
								// 金種設定：その他１（ｺﾋﾟｰ実行）
								session.setCLOUDPOS_DENOMINATION_OTHER_1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_STATUS_EXECUTE ")) {
								// 状態管理：起動
								session.setCLOUDPOS_STATUS_EXECUTE(true);
							}

							// ■監査
							if (permission.equals("CLOUDPOS_JOURNAL_EXECUTE ")) {
								// 電子ジャーナル：起動
								session.setCLOUDPOS_JOURNAL_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_JOURNAL_UPDATE ")) {
								// 電子ジャーナル：保存
								session.setCLOUDPOS_JOURNAL_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_JOURNAL_OTHER_1 ")) {
								// 電子ジャーナル：その他１（PDF出力）
								session.setCLOUDPOS_JOURNAL_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_REPORT_EXECUTE ")) {
								// POSレポート出力：起動
								session.setCLOUDPOS_REPORT_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_REPORT_OTHER_1 ")) {
								// POSレポート出力：その他１（PDF出力）
								session.setCLOUDPOS_REPORT_OTHER_1(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_AUDIT_EXECUTE ")) {
								// 監査レポート出力：起動
								session.setCLOUDPOS_AUDIT_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_AUDIT_OTHER_1 ")) {
								// 監査レポート出力：その他１（PDF出力）
								session.setCLOUDPOS_AUDIT_OTHER_1(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加

							// ■商品構成
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_PRODUCT_DIVISIONS_EXECUTE ")) {
								// 商品分類階層設定：起動
								session.setCLOUDPOS_PRODUCT_DIVISIONS_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_PRODUCT_DIVISIONS_UPDATE ")) {
								// 商品分類階層設定：保存
								session.setCLOUDPOS_PRODUCT_DIVISIONS_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_CATALOG_EXECUTE ")) {
								// 商品構成マスタ登録：起動
								session.setCLOUDPOS_CATALOG_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_CATALOG_DELETE ")) {
								// 商品構成マスタ登録：削除
								session.setCLOUDPOS_CATALOG_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_CATALOG_UPDATE ")) {
								// 商品構成マスタ登録：保存
								session.setCLOUDPOS_CATALOG_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_CATALOG_OTHER_1 ")) {
								// 商品構成マスタ登録：その他１（CSV入力）
								session.setCLOUDPOS_CATALOG_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_CATALOG_OTHER_2 ")) {
								// 商品構成マスタ登録：その他２（CSV出力）
								session.setCLOUDPOS_CATALOG_OTHER_2(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_ITEM_EXECUTE ")) {
								// 商品マスタ登録：起動
								session.setCLOUDPOS_ITEM_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_ITEM_DELETE ")) {
								// 商品マスタ登録：削除
								session.setCLOUDPOS_ITEM_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_ITEM_UPDATE ")) {
								// 商品マスタ登録：保存
								session.setCLOUDPOS_ITEM_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_ITEM_OTHER_1 ")) {
								// 商品マスタ登録：その他１（CSV入力）
								session.setCLOUDPOS_ITEM_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_ITEM_OTHER_2 ")) {
								// 商品マスタ登録：その他２（CSV出力）
								session.setCLOUDPOS_ITEM_OTHER_2(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_RESTAURANT_SCP_EXECUTE ")) {
								// 飲食オーダーガイダンス設定：起動
								session.setCLOUDPOS_RESTAURANT_SCP_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_RESTAURANT_SCP_DELETE ")) {
								// 飲食オーダーガイダンス設定：削除
								session.setCLOUDPOS_RESTAURANT_SCP_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_RESTAURANT_SCP_UPDATE ")) {
								// 飲食オーダーガイダンス設定：保存
								session.setCLOUDPOS_RESTAURANT_SCP_UPDATE(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_PRESET_EXECUTE ")) {
								// プリセットマスタ：起動
								session.setCLOUDPOS_PRESET_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_PRESET_DELETE ")) {
								// プリセットマスタ：削除
								session.setCLOUDPOS_PRESET_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_PRESET_UPDATE ")) {
								// プリセットマスタ：保存
								session.setCLOUDPOS_PRESET_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_PRESET_OTHER_1 ")) {
								// プリセットマスタ：その他１（企画ｺﾋﾟｰ）
								session.setCLOUDPOS_PRESET_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_PRESET_OTHER_2 ")) {
								// プリセットマスタ：その他２（運用確認）
								session.setCLOUDPOS_PRESET_OTHER_2(true);
							}

							// ■売価変更
							if (permission.equals("CLOUDPOS_PRICE_EXECUTE ")) {
								// 売価変更：起動
								session.setCLOUDPOS_PRICE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_PRICE_DELETE ")) {
								// 売価変更：削除
								session.setCLOUDPOS_PRICE_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_PRICE_UPDATE ")) {
								// 売価変更：保存
								session.setCLOUDPOS_PRICE_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_PRICE_OTHER_1 ")) {
								// 売価変更：その他１（出力）
								session.setCLOUDPOS_PRICE_OTHER_1(true);
							}

							// ■クラウドPOS運用設定
							if (permission.equals("CLOUDPOS_BARCODE_EXECUTE ")) {
								// バーコードフラグ設定：起動
								session.setCLOUDPOS_BARCODE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_BARCODE_DELETE ")) {
								// バーコードフラグ設定：削除
								session.setCLOUDPOS_BARCODE_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_BARCODE_UPDATE ")) {
								// バーコードフラグ設定：保存
								session.setCLOUDPOS_BARCODE_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_TRANSACTION_EXECUTE ")) {
								// 取引別名称設定：起動
								session.setCLOUDPOS_TRANSACTION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_TRANSACTION_DELETE ")) {
								// 取引別名称設定：削除
								session.setCLOUDPOS_TRANSACTION_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_TRANSACTION_UPDATE ")) {
								// 取引別名称設定：保存
								session.setCLOUDPOS_TRANSACTION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_REVENUE_STAMP_EXECUTE ")) {
								// 収入印紙一括納付設定：起動
								session.setCLOUDPOS_REVENUE_STAMP_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_REVENUE_STAMP_DELETE ")) {
								// 収入印紙一括納付設定：削除
								session.setCLOUDPOS_REVENUE_STAMP_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_REVENUE_STAMP_UPDATE ")) {
								// 収入印紙一括納付設定：保存
								session.setCLOUDPOS_REVENUE_STAMP_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_OPERATION_EXECUTE ")) {
								// 運用設定：起動
								session.setCLOUDPOS_OPERATION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_OPERATION_DELETE ")) {
								// 運用設定：削除
								session.setCLOUDPOS_OPERATION_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_OPERATION_UPDATE ")) {
								// 運用設定：保存
								session.setCLOUDPOS_OPERATION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_OPERATION_EXECUTE ")) {
								// 店別運用設定：起動
								session.setCLOUDPOS_STORE_OPERATION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_OPERATION_DELETE ")) {
								// 店別運用設定：削除
								session.setCLOUDPOS_STORE_OPERATION_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_STORE_OPERATION_UPDATE ")) {
								// 店別運用設定：保存
								session.setCLOUDPOS_STORE_OPERATION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_RECEIPT_EXECUTE ")) {
								// レシート設定：起動
								session.setCLOUDPOS_RECEIPT_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_RECEIPT_DELETE ")) {
								// レシート設定：削除
								session.setCLOUDPOS_RECEIPT_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_RECEIPT_UPDATE ")) {
								// レシート設定：保存
								session.setCLOUDPOS_RECEIPT_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_RECEIPT_OTHER_1 ")) {
								// レシート設定：その他１（企画ｺﾋﾟｰ）
								session.setCLOUDPOS_RECEIPT_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_RECEIPT_OTHER_2 ")) {
								// レシート設定：その他２（企画確認）
								session.setCLOUDPOS_RECEIPT_OTHER_2(true);
							}
							// KSD V001.000 AS 追加業務のアクセス権取得追加
							if (permission.equals("CLOUDPOS_TAX_EXECUTE ")) {
								// 税率設定：起動
								session.setCLOUDPOS_TAX_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_TAX_DELETE ")) {
								// 税率設定：削除
								session.setCLOUDPOS_TAX_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_TAX_UPDATE ")) {
								// 税率設定：保存
								session.setCLOUDPOS_TAX_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_TIME_EXECUTE ")) {
								// 時間帯設定：起動
								session.setCLOUDPOS_TIME_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_TIME_DELETE ")) {
								// 時間帯設定：削除
								session.setCLOUDPOS_TIME_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_TIME_UPDATE ")) {
								// 時間帯設定：保存
								session.setCLOUDPOS_TIME_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_RESTAURANT_CONNECTNAME_EXECUTE ")) {
								// OES連携名称設定：起動
								session.setCLOUDPOS_RESTAURANT_CONNECTNAME_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_RESTAURANT_CONNECTNAME_UPDATE ")) {
								// OES連携名称設定：保存
								session.setCLOUDPOS_RESTAURANT_CONNECTNAME_UPDATE(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加

							// ■クラウドPOS店舗運用設定
							if (permission.equals("CLOUDPOS_OPERATION_BTN_EXECUTE ")) {
								// 操作ボタン設定：起動
								session.setCLOUDPOS_OPERATION_BTN_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_OPERATION_BTN_UPDATE ")) {
								// 操作ボタン設定：保存
								session.setCLOUDPOS_OPERATION_BTN_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_TIGHTENING_BTN_EXECUTE ")) {
								// 締めボタン設定：起動
								session.setCLOUDPOS_TIGHTENING_BTN_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_TIGHTENING_BTN_DELETE ")) {
								// 締めボタン設定：削除
								session.setCLOUDPOS_TIGHTENING_BTN_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_TIGHTENING_BTN_UPDATE ")) {
								// 締めボタン設定：保存
								session.setCLOUDPOS_TIGHTENING_BTN_UPDATE(true);
							}

							// KSD V001.000 AS 追加業務のアクセス権取得追加
							// ■全店共通設定
							if (permission.equals("CLOUDPOS_EQUIPMENT_EXECUTE ")) {
								// 機材マスタ設定：起動
								session.setCLOUDPOS_EQUIPMENT_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_EQUIPMENT_DELETE ")) {
								// 機材マスタ設定：削除
								session.setCLOUDPOS_EQUIPMENT_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_EQUIPMENT_UPDATE ")) {
								// 機材マスタ設定：保存
								session.setCLOUDPOS_EQUIPMENT_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_MODEL_EXECUTE ")) {
								// 機種設備マスタ設定：起動
								session.setCLOUDPOS_MODEL_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_MODEL_DELETE ")) {
								// 機種設備マスタ設定：削除
								session.setCLOUDPOS_MODEL_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_MODEL_UPDATE ")) {
								// 機種設備マスタ設定：保存
								session.setCLOUDPOS_MODEL_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_AGE_DIVISION_EXECUTE ")) {
								// 年齢区分マスタ設定：起動
								session.setCLOUDPOS_AGE_DIVISION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_AGE_DIVISION_DELETE ")) {
								// 年齢区分マスタ設定：削除
								session.setCLOUDPOS_AGE_DIVISION_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_AGE_DIVISION_UPDATE ")) {
								// 年齢区分マスタ設定：保存
								session.setCLOUDPOS_AGE_DIVISION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_MEMBER_RANK_EXECUTE ")) {
								// 会員ランクマスタ設定：起動
								session.setCLOUDPOS_MEMBER_RANK_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_MEMBER_RANK_DELETE ")) {
								// 会員ランクマスタ設定：削除
								session.setCLOUDPOS_MEMBER_RANK_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_MEMBER_RANK_UPDATE ")) {
								// 会員ランクマスタ設定：保存
								session.setCLOUDPOS_MEMBER_RANK_UPDATE(true);
							}

							// ■店舗固有設備設定
							if (permission.equals("CLOUDPOS_ROOM_EXECUTE ")) {
								// 部屋情報マスタ設定：起動
								session.setCLOUDPOS_ROOM_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_DELETE ")) {
								// 部屋情報マスタ設定：削除
								session.setCLOUDPOS_ROOM_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_UPDATE ")) {
								// 部屋情報マスタ設定：保存
								session.setCLOUDPOS_ROOM_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_RELATION_EXECUTE ")) {
								// 部屋関連情報マスタ設定：起動
								session.setCLOUDPOS_ROOM_RELATION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_RELATION_DELETE ")) {
								// 部屋関連情報マスタ設定：削除
								session.setCLOUDPOS_ROOM_RELATION_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_RELATION_UPDATE ")) {
								// 部屋関連情報マスタ設定：保存
								session.setCLOUDPOS_ROOM_RELATION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_SUB_EXECUTE ")) {
								// 部屋情報サブ設定：起動
								session.setCLOUDPOS_ROOM_SUB_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_SUB_UPDATE ")) {
								// 部屋情報サブ設定：保存
								session.setCLOUDPOS_ROOM_SUB_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_ROOM_SUB_OTHER_1 ")) {
								// 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
								session.setCLOUDPOS_ROOM_SUB_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_CODEPAY_EXECUTE ")) {
								// コード決済通信マスタ設定：起動
								session.setCLOUDPOS_CODEPAY_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_CODEPAY_UPDATE ")) {
								// コード決済通信マスタ設定：保存
								session.setCLOUDPOS_CODEPAY_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_TARIFF_EXECUTE ")) {
								// 料金表表示マスタ設定：起動
								session.setCLOUDPOS_TARIFF_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_TARIFF_DELETE ")) {
								// 料金表表示マスタ設定：削除
								session.setCLOUDPOS_TARIFF_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_TARIFF_UPDATE ")) {
								// 料金表表示マスタ設定：保存
								session.setCLOUDPOS_TARIFF_UPDATE(true);
							}

							// ■店舗固有POS設定
							if (permission.equals("CLOUDPOS_TICKET_EXECUTE ")) {
								// 券種マスタ設定：起動
								session.setCLOUDPOS_TICKET_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_TICKET_DELETE ")) {
								// 券種マスタ設定：削除
								session.setCLOUDPOS_TICKET_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_TICKET_UPDATE ")) {
								// 券種マスタ設定：保存
								session.setCLOUDPOS_TICKET_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_COMPLIANCE_EXECUTE ")) {
								// コンプライアンス情報マスタ設定：起動
								session.setCLOUDPOS_COMPLIANCE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_COMPLIANCE_UPDATE ")) {
								// コンプライアンス情報マスタ設定：保存
								session.setCLOUDPOS_COMPLIANCE_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_SELFPOS_EXECUTE ")) {
								// セルフPOSマスタ設定：起動
								session.setCLOUDPOS_SELFPOS_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_SELFPOS_UPDATE ")) {
								// セルフPOSマスタ設定：保存
								session.setCLOUDPOS_SELFPOS_UPDATE(true);
							}

							// ■店舗固有料金設定
							if (permission.equals("CLOUDPOS_WEEKDAY_DIVISION_EXECUTE ")) {
								// 曜日区分マスタ設定：起動
								session.setCLOUDPOS_WEEKDAY_DIVISION_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_WEEKDAY_DIVISION_DELETE ")) {
								// 曜日区分マスタ設定：削除
								session.setCLOUDPOS_WEEKDAY_DIVISION_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_WEEKDAY_DIVISION_UPDATE ")) {
								// 曜日区分マスタ設定：保存
								session.setCLOUDPOS_WEEKDAY_DIVISION_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_CALENDER_EXECUTE ")) {
								// カレンダーマスタ設定：起動
								session.setCLOUDPOS_CALENDER_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_CALENDER_UPDATE ")) {
								// カレンダーマスタ設定：保存
								session.setCLOUDPOS_CALENDER_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_COURSE_RATE_EXECUTE ")) {
								// コース料金設定：起動
								session.setCLOUDPOS_COURSE_RATE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_COURSE_RATE_UPDATE ")) {
								// コース料金設定：保存
								session.setCLOUDPOS_COURSE_RATE_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_COURSE_RATE_OTHER_1 ")) {
								// コース料金設定：その他１（ｺﾋﾟｰ）
								session.setCLOUDPOS_COURSE_RATE_OTHER_1(true);
							}
							if (permission.equals("CLOUDPOS_DRINKCOURCE_EXECUTE ")) {
								// オプションマスタ設定：起動
								session.setCLOUDPOS_DRINKCOURCE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_DRINKCOURCE_DELETE ")) {
								// オプションマスタ設定：削除
								session.setCLOUDPOS_DRINKCOURCE_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_DRINKCOURCE_UPDATE ")) {
								// オプションマスタ設定：保存
								session.setCLOUDPOS_DRINKCOURCE_UPDATE(true);
							}
							if (permission.equals("CLOUDPOS_ROOMCOURCE_EXECUTE ")) {
								// コースマスタ設定：起動
								session.setCLOUDPOS_ROOMCOURCE_EXECUTE(true);
							}
							if (permission.equals("CLOUDPOS_ROOMCOURCE_DELETE ")) {
								// コースマスタ設定：削除
								session.setCLOUDPOS_ROOMCOURCE_DELETE(true);
							}
							if (permission.equals("CLOUDPOS_ROOMCOURCE_UPDATE ")) {
								// コースマスタ設定：保存
								session.setCLOUDPOS_ROOMCOURCE_UPDATE(true);
							}
							// KSD V001.000 AE 追加業務のアクセス権取得追加

                            // G002.00.0 Add-start
							permissionList.add(permission.getName());
							// G002.00.0 Add-end
						}
						 // G002.00.0 Add-start
						session.setPERMISSION_LIST_STRING(permissionList.toString());
						// G002.00.0 Add-end
					}
				}
			}
// KSD V001.000 20230822 AS
			else
			{
				ApiUtil.setLogData("Non Authority Information");
			}
// KSD V001.000 20230822 AS

			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(session);

			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 認証失敗（-90)
		if (responseModel.getResult().getCode() == -90)

		{
			// エラーで10回以上の場合はアカウントのロック
			if (reqBodyModel.getLoginInfo().getErrorCnt() > 9) {
				// TODO
				// アカウントのロックの実行（ユーザー登録でAPI仕様が分かる？）
			}

		}

		return responseModel;
	}

	/**
	 * パスワード更新.
	 *
	 * @param reqParamModel リクエストパラメータ内容
	 * @param reqBodyModel リクエストボディ内容
	 * @param errors バリデーションエラー内容
	 * @return パスワード更新＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/PwUpdate")
	@ResponseBody
	public PostAuthorizationLoginResponseModel pwUpdate(PutPwUpdateRequestParamModel reqParamModel,
			@RequestBody @Validated PutPwUpdateRequestBodyModel reqBodyModel, Errors errors) {

		var responseModel = new PostAuthorizationLoginResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken;
		try {
			accessToken = oauth();
		} catch (Exception e) {
			// アクセストークン取得時にExceptionが発生したらエラーとして処理する
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E004"), -10, e));
			return responseModel;
		}

		// 要変更：すでに認証済み
		// パスワード更新
		var requestModel = new PostAuthorizationLoginRequestModel();
		requestModel.getRequestModel().setUsername(reqParamModel.getUserId());
		requestModel.getRequestModel().setPassword(reqBodyModel.getPassInfo().getPasswordOld());
		requestModel.getRequestModel().setNewPassword(reqBodyModel.getPassInfo().getPassword());
		// G001.00.0 Update-Start
//		return responseModel = authorizationService.postLogin(requestModel, messageSource,
//				apiContext, accessToken, "");
		return responseModel = authorizationService.postPwUpdate(requestModel, messageSource,
				apiContext, accessToken, "");
		// G001.00.0 Update-End

	}

	/**
	 * ログアウト処理 セッション情報を削除する.
	 *
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 */
	@CrossOrigin
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request) {
		sessionUtil.deleteSession(request);
		return;
	}

	/**
	 * 認証処理.
	 *
	 * @return トークン
	 * @throws IOException 入出力エラー
	 * @throws InterruptedException スレッド割込みエラー
	 */
	private String oauth() throws IOException, InterruptedException {
		OauthUtil oauthUtile = new OauthUtil();
		return oauthUtile.createOauthToken(authContext);
	}

	// /**
	// * ログイン画面表示.
	// *
	// * @return 共通表示情報＋αレスポンス
	// * @throws IOException APIレスポンス結果をモデルクラスに変換エラー
	// * @throws InterruptedException API接続時のスレッド割込みエラー
	// */
	// @CrossOrigin
	// @GetMapping("/GetCommonDisplay")
	// @ResponseBody
	// public GetCommonDisplayResponseModel getCommonDisplay() {
	//
	// String accessToken;
	// try {
	// accessToken = oauth();
	// } catch (Exception e) {
	// // アクセストークン取得時にExceptionが発生したらエラーとして処理する
	// GetCommonDisplayResponseModel responseModel = new GetCommonDisplayResponseModel();
	// var messageResourseUtil = new MessageSourceUtil(messageSource);
	// responseModel.setResult(ApiUtil
	// .createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E021"), -30, e));
	// return responseModel;
	// }
	// // 正常時
	// // 共通表示情報マスタ検索
	// short clientType = 1;
	// GetCommonDisplayRequestModel reqParamModel = new GetCommonDisplayRequestModel();
	// reqParamModel.setDisplayClientType(clientType); // クライアント種別(1固定)
	// reqParamModel.setDisplayScene("login"); // 表示シーン("login"固定)
	// reqParamModel.setDisplayKey(null); // 表示キー(""固定)
	// String businessCd = businessCdInUnfixed;
	// return loginService.getCommonDisplay(reqParamModel, messageSource, apiContext, businessCd,
	// accessToken, "");
	// }

	// KSD V001.000 AS
	/**
	 * 最新ニュース、メンテナンスのお知らせ表示.
	 *
	 * @return 共通表示情報＋αレスポンス
	 * @throws IOException APIレスポンス結果をモデルクラスに変換エラー
	 * @throws InterruptedException API接続時のスレッド割込みエラー
	 */
	@CrossOrigin
	@GetMapping("/GetCommonDisplay")
	@ResponseBody
	public PostConfigurationsCommonDisplayResponseModel getCommonDisplay() {

		var responseModel = new PostConfigurationsCommonDisplayResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		String accessToken;
		try {
			accessToken = oauth();
		} catch (Exception e) {
			// アクセストークン取得時にExceptionが発生したらエラーとして処理する
			responseModel.setResult(ApiUtil
			.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E021"), -30, e));
			return responseModel;
		}

		// 決め打ちユーザーでログイン（ELERAトークンを取得する為）
		String tempUsername = login_tempUserName; // "999999999999999tabletpos";
		String tempPassword = login_tempPassword; //"tabletpo$21122021";
		var responseLoginModel = new PostAuthorizationLoginResponseModel();
		var requestLoginModel = new PostAuthorizationLoginRequestModel();
		requestLoginModel.getRequestModel().setUsername(tempUsername);
		requestLoginModel.getRequestModel().setPassword(tempPassword);
		responseLoginModel = authorizationService.postLogin(requestLoginModel, messageSource, apiContext, accessToken, "");
		var ELERAToken = responseLoginModel.getELERAToken();

		// Configurations情報 取得（GET /configurations/nodes/CLOUDPOS）
		var reqModel = new PostConfigurationsCommonDisplayRequestModel();
		responseModel = configurationsService.getCommonDisplay(reqModel, messageSource, apiContext, accessToken, ELERAToken, tempUsername, tempPassword);

		// レスポンスコード = 2:データなし
		if (responseModel.getResult().getCode() == 2) {
			return responseModel;
		// レスポンスコード = 0:正常 以外
		} else if (responseModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = responseModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult().setErrorMessageMap(responseModel.getResult().getErrorMessageMap());
			return responseModel;
		}
		return responseModel;
	}
	// KSD V001.000 AE
}
