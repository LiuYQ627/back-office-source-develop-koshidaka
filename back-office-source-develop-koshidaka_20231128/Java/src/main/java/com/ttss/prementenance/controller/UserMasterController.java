package com.ttss.prementenance.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.AuthorizationPosOperationPermissionRequestModel;
import com.ttss.prementenance.model.AuthorizationUsersQueryResponseModel;
import com.ttss.prementenance.model.ChargeStoreCdModel;
import com.ttss.prementenance.model.GetAccessAuthorityRequestModel;
import com.ttss.prementenance.model.GetAccessAuthorityResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.GetStoreResponseModel;
import com.ttss.prementenance.model.GetUserRequestModel;
import com.ttss.prementenance.model.PasswordLockUserListModel;
import com.ttss.prementenance.model.PasswordLockUserModel;
import com.ttss.prementenance.model.PasswordUnLockUserListModel;
import com.ttss.prementenance.model.PasswordUnLockUserModel;
import com.ttss.prementenance.model.PostAuthorizationUsersDeleteUserRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersDeleteUserResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersQueryRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersQueryResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRetrieveRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRetrieveResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesRetrieveRequestModel;
import com.ttss.prementenance.model.PutUserRequestModel;
import com.ttss.prementenance.model.PutUserResponseModel;
import com.ttss.prementenance.model.UserAccessModel;
import com.ttss.prementenance.model.UserUpdateInfoModel;
import com.ttss.prementenance.model.UserUpdateInfoModel.GroupNameOrder;
import com.ttss.prementenance.service.AuthorizationService;
import com.ttss.prementenance.service.AuthorizationService.DeleteRolesRequestModel;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.service.PermissionsService;
import com.ttss.prementenance.service.ReservationService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

import io.micrometer.core.instrument.util.StringUtils;

// ==============================================================================
// 機能概要：ユーザマスタ画面&API
// 作成者：
// 作成年月日：2020/12/02
// 備考：
// ==============================================================================

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230109 litie(Neusoft)     G001.00.0  issue課題#1232を対応します.
 * 20230306 litie(Neusoft)     G002.00.0  issue課題#1531を対応します.
 * 20230417 qinshh(Neusoft)    G003.00.0  issue課題#1559を対応します.
 * 20230417 qinshh(Neusoft)    G003.00.0  issue課題#1462を対応します.
 * 20230420 wangchunmei(Neusoft)    G004.00.0  issue課題#1490を対応します.
 * 20230609 wangchunmei(Neusoft)    G005.00.0  issue課題#1672を対応します.
 * 20230628 wangchunmei(Neusoft)     G006.00.0  issue課題alp#3498を対応します.
 * 20231009 wupsh(Neusoft)     G007.00.0  issue課題#1546#note_720551を対応します.
 */

/**
 * ユーザマスタ画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("UserMaster")
public class UserMasterController {

	@Autowired
	private AuthorizationService authorizationService;

	@Autowired
	private ConfigurationsService configurationsService;

	@Autowired
	private PermissionsService permissionsService;

	// G001.00.0 Update-Start
	@Autowired
	private ReservationService reservationService;
	// G001.00.0 Update-End

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	public UserMasterController() {
	}

	@Autowired
	private SessionUtil sessionUtil;

	/**
	 * ユーザマスタ検索処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return ユーザマスタ検索処理＋αレスポンス
	 */
	@CrossOrigin
	@RequestMapping("/UserQuery")
	@ResponseBody
	public PostAuthorizationUsersQueryResponseModel userQuery(@Validated GetUserRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostAuthorizationUsersQueryResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// 店舗一覧を取得する
		var requestModel = new GetConfigurationsNodesListRequestModel();
		requestModel.getRequestModel().setChangePlanName("");
		requestModel.getRequestModel().setFilter("ALL");
		requestModel.getRequestModel().setBatchSize((int) 0);
		requestModel.getRequestModel().setExcludeFields(true);
		requestModel.getRequestModel().setNodeNames(loginUser.getBusinessUnitCdStr());

		// 店舗マスタ検索
		var nodesListModel = configurationsService.getNodesList(requestModel, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (nodesListModel.getResult().getCode() == 2) {
			responseModel.getResult().setCode(2);
			return responseModel;

		} else if (nodesListModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = nodesListModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(nodesListModel.getResult().getErrorMessageMap());
			return responseModel;
		}
		responseModel.setResult(nodesListModel.getResult());

		List<String> nodes = new ArrayList<>();
		// 企業IDを追加する
		nodes.add(loginUser.getBusinessUnitCdStr());

		for (var i = 0; i < nodesListModel.getResponseModel().size(); i++) {
			// 一致する企業のみ
			var configurationsModel = nodesListModel.getResponseModel().get(i);
			if (configurationsModel.getChangePlan() != null) {
				// 変更計画中なのでとはず
				continue;
			} else if (configurationsModel.getParentName() == null) {
				// nullなので飛ばす
				continue;
			} else if (!configurationsModel.getParentName().equals(loginUser.getBusinessUnitCdStr())) {
				continue;
			} else {
				if (configurationsModel.getName() != null) {
					nodes.add(configurationsModel.getName());
				}
			}
		}
		// 絞り込み結果無しの場合
		if (nodes.size() == 0) {
			//			responseModel.getResult().setCode(2);
			//			return responseModel;
		}

		// ユーザマスタ検索
		var userQueryReq = new PostAuthorizationUsersQueryRequestModel();
		if (model.getUserId() != null) {
			userQueryReq.getRequestModel().setUsername(model.getUserId());
		} else if (model.getName() != null) {
			userQueryReq.getRequestModel().setUsername(model.getName());
		}
		if (nodes.size() != 0) {
			userQueryReq.getRequestModel().setNodes(nodes);
		}
		responseModel = authorizationService.postUsersQuery(userQueryReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// for (int i = 0; i < responseModel.getResponseModel().size(); i++) {
		// // 月に化かしておく
		// Long passMonth =
		// responseModel.getResponseModel().get(i).getUserRecord().getPasswordExpirationDays() / 30;
		// responseModel.getResponseModel().get(i).getUserRecord().setPasswordExpirationDays(passMonth);
		// }

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return responseModel;
	}

	/**
	 * ユーザマスタ取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return ユーザマスタ検索処理＋αレスポンス
	 */
	@CrossOrigin
	@RequestMapping("/UserSearch")
	@ResponseBody
	public PostAuthorizationUsersRetrieveResponseModel userSearch(
			@Validated GetUserRequestModel model, Errors errors, HttpServletRequest request,
			HttpServletResponse response) {

		var responseModel = new PostAuthorizationUsersRetrieveResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// ユーザマスタ検索
		var userQueryReq = new PostAuthorizationUsersRetrieveRequestModel();
		if (model.getUserId() != null) {
			// ダイレクトの場合
			if (model.getUserId().length() < 15) {
				userQueryReq.getRequestModel().setUsername(loginUser.getBusinessUnitCdStr() + model.getUserId());
			} else {
				userQueryReq.getRequestModel().setUsername(model.getUserId());
			}
		} else if (model.getName() != null) {
			userQueryReq.getRequestModel().setUsername(model.getName());
		}
		responseModel = authorizationService.postUsersRetrieve(userQueryReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (responseModel.getResult().getCode() == 0) {
			// 月に化かしておく
			if (responseModel.getResponseModel().getPasswordExpirationDays() == null) {
				// ない場合は0ヵ月
				responseModel.getResponseModel().setPasswordExpirationDays(Long.valueOf(0));
				responseModel.getResponseModel().setPasswordExpirationDate(Long.valueOf(0));
			} else {
				Long passMonth = responseModel.getResponseModel().getPasswordExpirationDays() / 30;
				if (passMonth > 99) {
					// オーバー分は99ヵ月にしておく
					passMonth = Long.valueOf(99);
				}
				responseModel.getResponseModel().setPasswordExpirationDays(passMonth);
				responseModel.getResponseModel().setPasswordExpirationDate(passMonth);
			}
		}

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// step1
		// if (responseModel.getResponseModel().getPosOperationPermission() != null) {
		// if (responseModel.getResponseModel().getPosOperationPermission().isAmountOff()) {
		// responseModel.getResponseModel().setAmountOff(1);
		// }
		// }

		// アクセス権限リスト
		List<UserAccessModel> accessList = new ArrayList<UserAccessModel>();
		for (int i = 0; i < 10; i++) {
			UserAccessModel userAccessModel = new UserAccessModel();
			userAccessModel.setAccessAuthority(loginUser.getBusinessUnitCdStr() + "_" + (i + 1));
			userAccessModel.setDisplayName("アクセス権限" + (i + 1));
			accessList.add(userAccessModel);
		}
		responseModel.getResponseModel().setUserAccessModelList(accessList);

		// 店舗情報の取得
		if (responseModel.getResponseModel().getHomeNodeId() != null) {
			GetConfigurationsNodesNodeIdResponseModel storeInfo = getStoreInfo(request,
					responseModel.getResponseModel().getHomeNodeId());
			if (storeInfo.getResponseModel().getDisplayName() != null) {
				responseModel.getResponseModel()
						.setBelongStoreText(storeInfo.getResponseModel().getDisplayName().getDefaultValue());
			}
		}
		// 担当店舗の取得
		if (responseModel.getResponseModel().getResponsibleStores() != null
				&& responseModel.getResponseModel().getResponsibleStores().size() > 0) {
			int cnt = 0;
			for (String one : responseModel.getResponseModel().getResponsibleStores()) {
				cnt++;
			}
			responseModel.getResponseModel().setChargeCdText(String.valueOf(cnt) + "店舗");

		}

		return responseModel;
	}

	/**
	 * 店舗情報取得
	 * @param request
	 * @param nodeId
	 * @return
	 */
	private GetConfigurationsNodesNodeIdResponseModel getStoreInfo(HttpServletRequest request, String nodeId) {
		var responseModel = new GetStoreResponseModel();
		responseModel.setResult(new ApiCommonResponseModel());

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		String businessCd = nodeId;
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var requestModel = new GetConfigurationsNodesNodeIdRequestModel();
		responseModel.setResult(new ApiCommonResponseModel());
		// 正常時
		// 店舗マスタ検索
		return configurationsService.getNodesNodeId(requestModel, businessCd,
				messageSource, apiContext, accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());
	}

	/**
	 * ユーザマスタ更新処理.
	 *
	 * @param reqBodyModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return ユーザマスタ更新処理＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/UserInfoRegist")
	@ResponseBody
	public PutUserResponseModel userInfoRegist(
			@RequestBody @Validated({ Default.class,
					GroupNameOrder.class }) PutUserRequestModel reqBodyModel,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		boolean isvaliderr = false; // バリデーションエラー発生フラグ(パスワードと担当店舗情報以外)
		boolean ispasserr = false; // パスワードバリデーションエラー発生フラグ
		PutUserResponseModel responseModel = new PutUserResponseModel();
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>(); // パスワードのバリデーションエラーメッセージで使用

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// ValidationMessages.property からメッセージを持ってくるための記述
		ReloadableResourceBundleMessageSource validationMessageSource = new ReloadableResourceBundleMessageSource();
		validationMessageSource.setBasename("classpath:/ValidationMessages");
		validationMessageSource.setDefaultEncoding("UTF-8");

		// バリデーションエラーチェック
		if (errors.hasErrors()) {
			// バリデーションエラー時
			isvaliderr = true;
		}

		// パスワード変更有無の確認
		List<UserUpdateInfoModel> users = reqBodyModel.getUsers();
		boolean changeFlg = false;
		// G005.00.0 Add-Start
		boolean posPasswordChangeFlg = false;
		// G005.00.0 Add-End
		for (int idx = 0; idx < users.size(); idx++) {
			if (users.get(idx).getPasswordUpdateFlg() == 1) {
				changeFlg = true;
				// G005.00.0 Delete-Start
//				break;
				// G005.00.0 Delete-End
			}
			// G005.00.0 Add-Start
			if (users.get(idx).getPosPasswordUpdateFlg() == 1) {
				posPasswordChangeFlg = true;
			}
			// G005.00.0 Add-End
		}

		// パスワード変更あり？
		if (changeFlg) {
			// パスワードのバリデーションチェック
			MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);
			for (int idx = 0; idx < users.size(); idx++) {
				if (users.get(idx).getPasswordUpdateFlg() == 1) {
					String strPassword = users.get(idx).getPassword();
					// 必須チェック
					if (strPassword == null || strPassword == "") {
						map.add(String.format("users[%d].password", idx),
								messageResourseUtil.getMessage("VALIDA.NOTEMPTY", null));
						ispasserr = true;
					// G001.00.0 Update-Start
					// } else if (strPassword.length() < 8 || strPassword.length() > 15) {
					// 	// 桁数チェック
					// 	map.add(String.format("users[%d].password", idx), messageResourseUtil
					// 			.getMessage("VALIDA.PASSWORD.RANGE", new String[] { "8" }));
					// 	ispasserr = true;
						continue;
					// G001.00.0 Update-End
					}
					// G001.00.0 Update-Start
					// 運用設定の取得
					int passwordMin = 8;
					int passwordMax = 15;
					int passwordRule = 0;
					var reservationDateQueryRes = reservationService.getConfigurationDetailRecursive(
							loginUser.getBusinessUnitCdStr(), messageSource,
							apiContext,
							accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
							loginUser.getPassWord());
					if (reservationDateQueryRes.getResponseModel() != null) {
						var operationsSettings = (LinkedHashMap) reservationDateQueryRes.getResponseModel()
								.getConfigurations().get("OPERATIONS_SETTINGS");
						if (operationsSettings != null) {
							var config = (LinkedHashMap) operationsSettings.get("value");
							var passwordMinObj = config.get("passwordMin");
							if (passwordMinObj != null) {
								if (passwordMinObj instanceof String) {
									if (StringUtils.isNotEmpty((String) passwordMinObj)) {
										passwordMin = Integer.parseInt((String) passwordMinObj);
									}
								} else if (passwordMinObj instanceof Integer) {
									passwordMin = (Integer) passwordMinObj;
								}
							}
							var passwordMaxObj = config.get("passwordMax");
							if (passwordMaxObj != null) {
								if (passwordMaxObj instanceof String) {
									if (StringUtils.isNotEmpty((String) passwordMaxObj)) {
										passwordMax = Integer.parseInt((String) passwordMaxObj);
									}
								} else if (passwordMaxObj instanceof Integer) {
									passwordMax = (Integer) passwordMaxObj;
								}
							}
							passwordRule = (int) config.get("passwordRule");
						}
					}
					// 桁数チェック
					if (strPassword.length() < passwordMin || strPassword.length() > passwordMax) {
						if (passwordMin == passwordMax) {
							map.add(String.format("users[%d].password", idx), messageResourseUtil
									.getMessage("VALIDA.PASSWORD.SIZE",
											new String[] { String.valueOf(passwordMin) }));
						} else {
							map.add(String.format("users[%d].password", idx), messageResourseUtil
									.getMessage("VALIDA.PASSWORD.RANGE",
											new String[] { String.valueOf(passwordMin), String.valueOf(passwordMax) }));
						}
						ispasserr = true;
						continue;
					}
					// 
					String errorMsg = this.matchesPassword(passwordRule, strPassword);
					if (errorMsg != null) {
						map.add(String.format("users[%d].password", idx), errorMsg);
						ispasserr = true;
						continue;
					}
					// G001.00.0 Update-End
				}
			}
		}

		// G001.00.0 Update-Start
		MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);
		// 必須入力項目の空チェックを実施
		// ・担当店舗
		// KSD V001.000 AS
		var smlStoreCode = "";
		var smlStoreCodeIndex = 0;
		// KSD V001.000 AE
		for (int idx = 0; idx < users.size(); idx++) {
			var user = users.get(idx);
			if (user.getHeadquartersPermission() == 1) { // 本部権限"あり"の場合
				if (user.getChargeStoreCds() == null || user.getChargeStoreCds().isEmpty()) {
					map.add(String.format("users[%d].chargeStoreCds", idx),
							messageResourseUtil.getMessage("VALIDA.NOTEMPTY", null));
				// KSD V001.000 AS
				} else {
					for (int strCnt = 0; strCnt < user.getChargeStoreCds().size(); strCnt++) {
						int strCdSize = user.getChargeStoreCds().get(strCnt).getChargeStoreCd().length();
						var tempStrCode = user.getChargeStoreCds().get(strCnt).getChargeStoreCd().substring(strCdSize-5, strCdSize);
						if(strCnt == 0) {
							smlStoreCode = tempStrCode;
						} else if (Integer.valueOf(tempStrCode) < Integer.valueOf(smlStoreCode)){
							smlStoreCode = tempStrCode;
							smlStoreCodeIndex = strCnt;
						} else {
							continue;
						}
						
					}
				// KSD V001.000 AE
				}
			}
		}

		// 必須入力項目の空チェックを実施
		// ・所属店舗
		// POSパスワードのチェック
		for (int idx = 0; idx < users.size(); idx++) {
			var user = users.get(idx);
			if (user.getHeadquartersPermission() != 1) { // 本部権限"なし"の場合
				// 必須入力項目の空チェックを実施
				// ・所属店舗
				if (user.getBelongStoreCd() == null || StringUtils.isEmpty(user.getBelongStoreCd())) {
					map.add(String.format("users[%d].belongStoreCd", idx),
							messageResourseUtil.getMessage("VALIDA.NOTEMPTY", null));
					// G004.00.0 Delete-Start
					// continue;
					// G004.00.0 Delete-End

				}
			// KSD V001.000 AS
			}
			// KSD V001.000 AE
				// G005.00.0 Add-Start
				if(posPasswordChangeFlg){
					// G005.00.0 Add-End
					// 新規登録の場合 or POSパスワードが変更された場合、POSパスワードのチェックを行う
					var posPassword = user.getPosPassword();
					// G003.00.0 Delete-Start
					// if (user.getMode() == 1 || (posPassword != null && StringUtils.isNotEmpty(posPassword))) {
					// G003.00.0 Delete-End
					// 店別運用設定から情報を取得する
					boolean passwordInput = true;
					int passwordRule = 0;
					// KSD V001.000 AS
					var storeCd = user.getHeadquartersPermission() != 1 ? user.getBelongStoreCd() : user.getChargeStoreCds().get(smlStoreCodeIndex).getChargeStoreCd();
					// KSD V001.000 AE
					// KSD V001.000 DS
					// var reservationDateQueryRes = reservationService.getConfigurationDetail(user.getBelongStoreCd(),
					// 			messageSource,
					// 			apiContext,
					// 			accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					// 			loginUser.getPassWord());
					// KSD V001.000 DE
					// KSD V001.000 AS
					var reservationDateQueryRes = reservationService.getConfigurationDetail(storeCd,
							messageSource,
							apiContext,
							accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
							loginUser.getPassWord());
					// KSD V001.000 AE
					if (reservationDateQueryRes.getResponseModel() != null) {
						var storeOperationsSettings = (LinkedHashMap) reservationDateQueryRes.getResponseModel()
								.getConfigurations().get("STORE_OPERATIONS_SETTINGS");
						if (storeOperationsSettings != null) {
							var config = (LinkedHashMap) storeOperationsSettings.get("value");
							passwordInput = (boolean) config.get("passwordInput");
							passwordRule = (int) config.get("passwordRule");
						}
					}
					// POSパスワードのチェック
					if (passwordInput || (posPassword != null && StringUtils.isNotEmpty(posPassword))) {
						if (posPassword == null) {
							posPassword = "";
						}
						String errorMsg = this.matchesPassword(passwordRule, posPassword);
						if (errorMsg != null) {
							map.add(String.format("users[%d].posPassword", idx), errorMsg);
							// G004.00.0 Delete-Start
							// continue;
							// G004.00.0 Delete-End
						}

					}
				// G005.00.0 Add-Start
				}
				// G005.00.0 Add-End
				// G003.00.0 Delete-Start
				// }
				// G003.00.0 Delete-End
				// G004.00.0 Add-Start
				var posUserName = user.getPosUserName();
				if(StringUtils.isEmpty(posUserName)){
					map.add(String.format("users[%d].posUserName", idx),
							messageResourseUtil.getMessage("VALIDA.NOTEMPTY", null));
				}
				var posPrintingName = user.getPosPrintingName();
				if(StringUtils.isEmpty(posPrintingName)){
					map.add(String.format("users[%d].posPrintingName", idx),
							messageResourseUtil.getMessage("VALIDA.NOTEMPTY", null));
				}
				// G004.00.0 Add-End
			// KSD V001.000 DS
			// }
			// KSD V001.000 DE
		}
		// G001.00.0 Update-End

		// バリデーションチェックの結果エラーがあればレスポンス作成
		if (isvaliderr) {
			// 通常のバリデーションエラー発生時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
		}

		// G001.00.0 Update-Start
		// // パスワードのバリデーションエラーがあればエラーメッセージ追加
		// if (ispasserr) {
		// 	if (isvaliderr) {
		// 		responseModel.getResult().addErrorMessageMap(map);
		// 	} else {
		// 		responseModel.setResult(ApiUtil.createValidationErrorModelfromMap(map));
		// 	}
		// }

		// if (isvaliderr || ispasserr) {
		// 	return responseModel;
		// }
		// エラーメッセージ追加
		if (!map.isEmpty()) {
			if (responseModel.getResult() != null) {
				responseModel.getResult().addErrorMessageMap(map);
			} else {
				responseModel.setResult(ApiUtil.createValidationErrorModelfromMap(map));
			}
		}

		if (isvaliderr || ispasserr || !map.isEmpty()) {
			return responseModel;
		}
		// G001.00.0 Update-End

		// 更新パラメータを設定
		var userReq = new PostAuthorizationUsersRequestModel();

		userReq.getRequestModel().setUsername(reqBodyModel.getUsers().get(0).getUserId());
		userReq.getRequestModel().setFirstName(reqBodyModel.getUsers().get(0).getName());
		userReq.getRequestModel().setLastName(reqBodyModel.getUsers().get(0).getName());
		userReq.getRequestModel().setBirthdate("1900-01-01");
		userReq.getRequestModel().setAddress(null); // 使わないので塗りつぶしておく
		userReq.getRequestModel().setRightHanded(true);
		userReq.getRequestModel().setUsingSystemTimeout(false);
		userReq.getRequestModel().setLocale("ja-JP");
		if (reqBodyModel.getUsers().get(0).getHeadquartersPermission() == 1) {
			userReq.getRequestModel().setHeadquartersPermission(true);
		} else {
			userReq.getRequestModel().setHeadquartersPermission(false);
		}

		// 本部権限での制御（あり⇒担当店舗/なし⇒所属店舗）
		if (userReq.getRequestModel().isHeadquartersPermission()) {
			// 本部権限
			// 所属店舗
			userReq.getRequestModel()
					.setHomeNodeId(null);
			// 対象店舗
			ArrayList<String> chargeStores = new ArrayList<>();
			for (ChargeStoreCdModel one : reqBodyModel.getUsers().get(0).getChargeStoreCds()) {
				chargeStores.add(String.valueOf(one.getChargeStoreCd()));
			}
			userReq.getRequestModel().setResponsibleStores(chargeStores);
			// KSD V001.000 DS
			// userReq.getRequestModel().setPosUserName(null);
			// userReq.getRequestModel().setPosPassword(null);
			// userReq.getRequestModel().setPosPrintingName(null);
			// KSD V001.000 DE
		} else {
			// 本部権限なし
			// 所属店舗
			userReq.getRequestModel()
					.setHomeNodeId(reqBodyModel.getUsers().get(0).getBelongStoreCd());
			// 対象店舗
			userReq.getRequestModel().setResponsibleStores(null);
		// KSD V001.000 AS
		}
		// KSD V001.000 DS
			userReq.getRequestModel().setPosUserName(reqBodyModel.getUsers().get(0).getPosUserName());
			// G005.00.0 Update-Start
//			if (reqBodyModel.getUsers().get(0).getPosPassword() != null
//					&& StringUtils.isNotEmpty(reqBodyModel.getUsers().get(0).getPosPassword())) {
			if (posPasswordChangeFlg && reqBodyModel.getUsers().get(0).getPosPassword() != null
					&& StringUtils.isNotEmpty(reqBodyModel.getUsers().get(0).getPosPassword())) {
			// G005.00.0 Update-End
				userReq.getRequestModel()
						.setPosPassword(reqBodyModel.getUsers().get(0).getPosPassword());
			}
			if (reqBodyModel.getUsers().get(0).getPosPrintingName() != null) {
				userReq.getRequestModel()
						.setPosPrintingName(reqBodyModel.getUsers().get(0).getPosPrintingName());
			}
		// KSD V001.000 DS
		// }
		// KSD V001.000 DE

		// パスワード変更
		if (changeFlg) {
			// パスワード変更
			userReq.getRequestModel().setPassword(reqBodyModel.getUsers().get(0).getPassword());

			// 現在ミリ秒
			long nowSec = new Date().getTime();
			userReq.getRequestModel().setPasswordSetTS(nowSec);
			// G006.00.0 Add-Start
		} else {
			userReq.getRequestModel().setPasswordSetTS(reqBodyModel.getUsers().get(0).getPasswordSetTS());
			// G006.00.0 Add-End
		}

		// パスワード有効期限設定
		if (reqBodyModel.getUsers().get(0).getPasswordExpirationDate() == 99) {
			userReq.getRequestModel().setPasswordExpirationDays(Long.valueOf(36600));
		} else {
			userReq.getRequestModel().setPasswordExpirationDays(
					(long) reqBodyModel.getUsers().get(0).getPasswordExpirationDate() * 30);
		}

		// Authorities
		var hmap = new HashMap<String, String>();
		hmap.put("*", "rw");
		// userReq.getRequestModel().getAuthorities().setAsterisk("rw");
		userReq.getRequestModel().setAuthorities(hmap);

		if (reqBodyModel.getUsers().get(0).getMode() == 1) {
			// 新規

			// usernameは企業IDを先頭にセットする
			userReq.getRequestModel().setUsername(
					loginUser.getBusinessUnitCdStr() + userReq.getRequestModel().getUsername());
		} else {
			// 更新では使用しない
			// id
			userReq.getRequestModel().setId(reqBodyModel.getUsers().get(0).getId());
			// vertion
			userReq.getRequestModel().setVersion(reqBodyModel.getUsers().get(0).getVersion());
		}

		// step1
		if (userReq.getRequestModel().getPosOperationPermission() == null) {
			userReq.getRequestModel().setPosOperationPermission(
					new AuthorizationPosOperationPermissionRequestModel());
		}

		// アクセス権限登録
		String permissionId = "";
		if (reqBodyModel.getUsers().get(0).getAccessAuthority() != null
				&& StringUtils.isNotEmpty(reqBodyModel.getUsers().get(0).getAccessAuthority())) {
			// 名前から本体を特定する
			// データ検索
			GetAccessAuthorityRequestModel requestModel = new GetAccessAuthorityRequestModel();

			String query = "";
			for (int i = 0; i < 10; i++) {
				query += loginUser.getBusinessUnitCdStr() + "_" + (i + 1) + ",";
			}
			query = query.substring(0, query.length() - 1);

			var permissionsModel = new GetAccessAuthorityResponseModel();
			permissionsModel = permissionsService.getList(requestModel, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord(), query);

			if (permissionsModel != null && permissionsModel.getResponseModel() != null) {
				if (permissionsModel.getResponseModel().size() > 0) {
					List<String> tables = new ArrayList<String>();
					tables.add("");
					for (int i = 0; i < permissionsModel.getResponseModel().size(); i++) {
						//						if (reqBodyModel.getUsers().get(0).getAccessAuthority()
						//								.equals(permissionsModel.getResponseModel().get(i).getDisplayName()
						//										.getDefaultValue())) {
						//							permissionId = permissionsModel.getResponseModel().get(i).getName();
						//						}
						if (reqBodyModel.getUsers().get(0).getAccessAuthority()
								.equals(permissionsModel.getResponseModel().get(i).getName())) {
							permissionId = permissionsModel.getResponseModel().get(i).getName();
						}
					}
				}
			}

			if (!permissionId.equals("")) {
				userReq.getRequestModel().setAccessAuthority(permissionId);
			}
		}

		// 本部権限なしの場合のみ
		// KSD V001.000 DS
		// if (!userReq.getRequestModel().isHeadquartersPermission()) {
		// KSD V001.000 DE
			if (reqBodyModel.getUsers().get(0).getAmountOff() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setAmountOff(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setAmountOff(false);
			}
			if (reqBodyModel.getUsers().get(0).getPercentOff() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setPercentOff(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setPercentOff(false);
			}
			if (reqBodyModel.getUsers().get(0).getSalesChange() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setSalesChange(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setSalesChange(false);
			}
			if (reqBodyModel.getUsers().get(0).getCancellation() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setCancellation(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setCancellation(false);
			}
			if (reqBodyModel.getUsers().get(0).getDeposit() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setDeposit(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setDeposit(false);
			}
			if (reqBodyModel.getUsers().get(0).getWithdrawal() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setWithdrawal(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setWithdrawal(false);
			}
			if (reqBodyModel.getUsers().get(0).getChangeReserve() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setChangeReserve(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setChangeReserve(false);
			}
			if (reqBodyModel.getUsers().get(0).getReport() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setReport(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setReport(false);
			}
			if (reqBodyModel.getUsers().get(0).getTransactionSearch() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setTransactionSearch(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setTransactionSearch(false);
			}
			if (reqBodyModel.getUsers().get(0).getRegisterMinus() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setRegisterMinus(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setRegisterMinus(false);
			}
			if (reqBodyModel.getUsers().get(0).getReturnValue() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setReturnValue(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setReturnValue(false);
			}
			if (reqBodyModel.getUsers().get(0).getAudit() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setAudit(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setAudit(false);
			}
			if (reqBodyModel.getUsers().get(0).getCalculate() == 1) {
				userReq.getRequestModel().getPosOperationPermission().setCalculate(true);
			} else {
				userReq.getRequestModel().getPosOperationPermission().setCalculate(false);
			}
			if (reqBodyModel.getUsers().get(0).getUsername() != null) {
				// userReq.getRequestModel().setUsername(reqBodyModel.getUsers().get(0).getUsername());
			}
			// KSD V001.000 AS
			userReq.getRequestModel().getPosOperationPermission().setExchange(
				reqBodyModel.getUsers().get(0).getExchange() == 1);
			userReq.getRequestModel().getPosOperationPermission().setChangeMachineInventoryCheck(
				reqBodyModel.getUsers().get(0).getChangeMachineInventoryCheck() == 1);
			userReq.getRequestModel().getPosOperationPermission().setChangeMachineRemaining(
				reqBodyModel.getUsers().get(0).getChangeMachineRemaining() == 1);
			userReq.getRequestModel().getPosOperationPermission().setChangeMachineConnectDisconnect(
					reqBodyModel.getUsers().get(0).getChangeMachineConnectDisconnect() == 1);
			userReq.getRequestModel().getPosOperationPermission().setAmountInput(
					reqBodyModel.getUsers().get(0).getAmountInput() == 1);
			userReq.getRequestModel().getPosOperationPermission().setOesProg(
					reqBodyModel.getUsers().get(0).getOesProg() == 1);
			userReq.getRequestModel().getPosOperationPermission().setOesSet(
					reqBodyModel.getUsers().get(0).getOesSet() == 1);
			userReq.getRequestModel().getPosOperationPermission().setPartCorrcet(
					reqBodyModel.getUsers().get(0).getPartCorrcet() == 1);
			userReq.getRequestModel().getPosOperationPermission().setTendCorrcet(
					reqBodyModel.getUsers().get(0).getTendCorrcet() == 1);
			userReq.getRequestModel().getPosOperationPermission().setUnpaidDelete(
					reqBodyModel.getUsers().get(0).getUnpaidDelete() == 1);
			userReq.getRequestModel().getPosOperationPermission().setOesTime(
					reqBodyModel.getUsers().get(0).getOesTime() == 1);
			// KSD V001.000 AE
		// KSD V001.000 DS
		// }
		// KSD V001.000 DE

		// 正常時
		// ユーザマスタ更新
		var userRes = authorizationService.postUsers(userReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// トークン情報の上書き
		if (userRes.getResult().getWSO2Token() != null
				&& userRes.getResult().getELERAToken() != null) {
			accessToken = userRes.getResult().getWSO2Token();
			ELERAToken = userRes.getResult().getELERAToken();
		}

		if (userRes.getResult().getCode() != 0) {
			// 失敗
			responseModel.setResult(userRes.getResult());
			return responseModel;
		}

		// G002.00.0 Update-Start
		//		if (reqBodyModel.getUsers().get(0).getMode() == 1) {
		//			// 新規はロールも登録
		// 更新の場合、ロール削除
		if (reqBodyModel.getUsers().get(0).getMode() != 1) {
			// ロール取得
			var rolesReq = new PostAuthorizationUsersRolesRetrieveRequestModel();
			rolesReq.getRequestModel().setUserId(userRes.getResponseModel().getId());
			var rolesRes = authorizationService.postUsersRolesRetrieve(rolesReq, validationMessageSource, apiContext,
					accessToken, ELERAToken);

			// トークン情報の上書き
			if (rolesRes.getResult().getWSO2Token() != null
					&& rolesRes.getResult().getELERAToken() != null) {
				accessToken = rolesRes.getResult().getWSO2Token();
				ELERAToken = rolesRes.getResult().getELERAToken();
			}

			if (rolesRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(rolesRes.getResult());
				return responseModel;
			}

			// ロール削除
			if (rolesRes.getResponseModel() != null) {
				for (var role : rolesRes.getResponseModel()) {
					var deleteRoleReq = new DeleteRolesRequestModel();
					deleteRoleReq.setUserId(role.getUserId());
					deleteRoleReq.setNodeId(role.getNodeId());
					var deleteRoleRes = authorizationService.postUsersDeleteRoles(deleteRoleReq,
							validationMessageSource, apiContext, accessToken, ELERAToken, ELERAToken, permissionId);

					// トークン情報の上書き
					if (deleteRoleRes.getResult().getWSO2Token() != null
							&& deleteRoleRes.getResult().getELERAToken() != null) {
						accessToken = deleteRoleRes.getResult().getWSO2Token();
						ELERAToken = deleteRoleRes.getResult().getELERAToken();
					}

					if (deleteRoleRes.getResult().getCode() != 0) {
						// 失敗
						responseModel.setResult(deleteRoleRes.getResult());
						return responseModel;
					}
				}
			}
		}

		// ロール登録
		// G002.00.0 Update-End
			// ※STEP0ではSYSTEMと所属店舗で２回設定します。
			// SYSTEMロール時：false、所属店舗ロール時：true

			var userRolesReq = new PostAuthorizationUsersRolesRequestModel();

			userRolesReq.getRequestModel().setRoles(new ArrayList<String>());
			userRolesReq.getRequestModel().getRoles().add("ADMIN");
			userRolesReq.getRequestModel().getRoles().add("POS_CASHIER");
			userRolesReq.getRequestModel().getRoles().add("POS_MANAGER");
			userRolesReq.getRequestModel().setUserId(userRes.getResponseModel().getId());
			userRolesReq.getRequestModel().setHomeStore(false);
			userRolesReq.getRequestModel().setNodeId("SYSTEM");

			var userRolesRes = authorizationService.postUsersRoles(userRolesReq, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRolesRes.getResult().getWSO2Token() != null
					&& userRolesRes.getResult().getELERAToken() != null) {
				accessToken = userRolesRes.getResult().getWSO2Token();
				ELERAToken = userRolesRes.getResult().getELERAToken();
			}

			if (userRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRolesRes.getResult());
				return responseModel;
			}

			// 店舗ロールはhomeStoreを変更して登録
			// 本部権限での制御（あり⇒15桁/なし⇒21桁）
			if (userReq.getRequestModel().isHeadquartersPermission()) {
				userRolesReq.getRequestModel().setNodeId(loginUser.getBusinessUnitCdStr());
			} else {
				userRolesReq.getRequestModel().setNodeId(reqBodyModel.getUsers().get(0).getBelongStoreCd());
			}
			userRolesReq.getRequestModel().setHomeStore(true);
			userRolesRes = authorizationService.postUsersRoles(userRolesReq, messageSource,
					apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());
			responseModel.setResult(userRolesRes.getResult());

			// セッションのトークン情報の上書き
			if (userRolesRes.getResult().getWSO2Token() != null
					&& userRolesRes.getResult().getELERAToken() != null) {
				loginUser.setWso2ApiToken(userRolesRes.getResult().getWSO2Token());
				loginUser.setELERAToken(userRolesRes.getResult().getELERAToken());
				// ユーザ情報をセッション管理用リポジトリに追加
				var sessionId = sessionUtil.saveUserToRepository(loginUser);
				// レスポンスのヘッダーにセッションID用のCookieをセットする
				response = sessionUtil.setCookie(response, sessionId);
			}

			return responseModel;
		// G002.00.0 Update-Start
		//		} else {
		//			responseModel.setResult(userRes.getResult());
		//
		//			// セッションのトークン情報の上書き
		//			if (userRes.getResult().getWSO2Token() != null
		//					&& userRes.getResult().getELERAToken() != null) {
		//				loginUser.setWso2ApiToken(userRes.getResult().getWSO2Token());
		//				loginUser.setELERAToken(userRes.getResult().getELERAToken());
		//				// ユーザ情報をセッション管理用リポジトリに追加
		//				var sessionId = sessionUtil.saveUserToRepository(loginUser);
		//				// レスポンスのヘッダーにセッションID用のCookieをセットする
		//				response = sessionUtil.setCookie(response, sessionId);
		//			}
		//
		//			return responseModel;
		//		}
		// G002.00.0 Update-End
	}

	// G001.00.0 Update-Start
	/**
	 * パスワードのチェックを行う
	 * 
	 * @param passwordRule パスワードのルール
	 * @param password パスワード
	 * @return エラーメッセージ
	 */
	private String matchesPassword(int passwordRule, String password) {
		String errorMsg = null;
		MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);
		final var regexEnUpper = "A-Z";
		final var regexEnLower = "a-z";
		final var regexNumber = "0-9";
		final var regexSymbol = "!@#$%^*()_+\\[\\]{}|-";
		final var regexAll = regexEnUpper + regexEnLower + regexNumber + regexSymbol;
		switch (passwordRule) {
		case 0:
			if (!Pattern.matches("^(?=.*[" + regexEnUpper + regexEnLower + "])(?=.*[" + regexNumber
					+ "])[" + regexAll + "]+$", password)) {
				errorMsg = messageResourseUtil.getMessage("VALIDA.PASSWORD.1.ALPHANUMERIC_MIXED", null);
			}
			break;
		case 1:
			if (!Pattern.matches("^(?=.*[" + regexEnUpper + "])(?=.*[" + regexEnLower + "])(?=.*["
					+ regexNumber + "])[" + regexAll + "]+$", password)) {
				errorMsg = messageResourseUtil.getMessage(
						"VALIDA.PASSWORD.2.ALPHABETICAL_SMALL_AND_LARGE_NUMBER_MIXED", null);
			}
			break;
		case 2:
			if (!Pattern.matches(
					"^(?=.*[" + regexEnUpper + regexEnLower + regexNumber + "])[" + regexAll + "]+$",
					password)) {
				errorMsg = messageResourseUtil.getMessage(
						"VALIDA.PASSWORD.3.ALPHABETICAL_SMALL_AND_LARGE_NUMBER_SYMBOL", null);
			}
			break;
		case 3:
			if (!Pattern.matches(
					"^(?=.*[" + regexEnUpper + "])(?=.*[" + regexEnLower + "])(?=.*[" + regexNumber
							+ "])(?=.*[" + regexSymbol + "])[" + regexAll + "]+$",
					password)) {
				errorMsg = messageResourseUtil.getMessage("VALIDA.PASSWORD.4.NUMBER_OR_ALPHABETICAL_ONLY",
						null);
			}
			break;
		default:
			if (!Pattern.matches("^(?=.*[" + regexEnUpper + regexEnLower + "])(?=.*[" + regexNumber
					+ "])[" + regexAll + "]+$", password)) {
				errorMsg = messageResourseUtil.getMessage("VALIDA.PASSWORD.1.ALPHANUMERIC_MIXED", null);
			}
		}
		return errorMsg;
	}
	// G001.00.0 Update-End

	/**
	 * ユーザマスタ削除処理.
	 *
	 * @param userId リクエスト内容(ユーザID)
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return ユーザマスタ削除＋αレスポンス
	 */
	@CrossOrigin
	@DeleteMapping("/UserInfoDeleted/{userId}")
	public PostAuthorizationUsersDeleteUserResponseModel storeInfoDelete(
			@PathVariable String userId, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new PostAuthorizationUsersDeleteUserResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		// 正常時
		// ユーザマスタ削除
		var userQueryReq = new PostAuthorizationUsersDeleteUserRequestModel();
		userQueryReq.getRequestModel().setUsername(userId);
		// return authorizationService.postUsersDeleteUser(userQueryReq, messageSource, apiContext,
		// accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		responseModel = authorizationService.postUsersDeleteUser(userQueryReq, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		// G003.00.0 Add-Start
		String loginUserId = loginUser.getBusinessUnitCdStr() + loginUser.getUserId();
		if (responseModel.getResult().getCode() == 0 && userId.equals(loginUserId)) {

			responseModel.getResult().setCode(-98);
		}
		// G003.00.0 Add-End
		return responseModel;
	}

	/**
	 * 税率一覧の取得.
	 *
	 * <br>
	 *
	 * 本来は tax マイクロサービスから取得するが API が未実装なので, STEP0 では仮措置として nodes configurations から読み取る.
	 *
	 * @see https://tccloud2.toshiba.co.jp/tec/gitlab/soshinkai-ngp/cloud-pos/application/smartphone-pos-cloudpos/-/issues/160
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 税率一覧＋αレスポンス
	 */
	@CrossOrigin
	@GetMapping("/AccessList")
	@ResponseBody
	public PostAuthorizationUsersRetrieveResponseModel getAccessList(
			@Validated GetUserRequestModel model, Errors errors, HttpServletRequest request,
			HttpServletResponse response) {
		var responseModel = new PostAuthorizationUsersRetrieveResponseModel();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// データ検索
		GetAccessAuthorityRequestModel requestModel = new GetAccessAuthorityRequestModel();

		String query = "";
		for (int i = 0; i < 9; i++) {
			query += loginUser.getBusinessUnitCdStr() + "_" + (i + 1) + ",";
		}
		query = query.substring(0, query.length() - 1);

		GetAccessAuthorityResponseModel permmisionsList = permissionsService.getList(requestModel, messageSource,
				apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord(), query);

		// 権限リストの作成
		List<UserAccessModel> accessList = new ArrayList<UserAccessModel>();
		if (permmisionsList != null && permmisionsList.getResponseModel() != null) {
			if (permmisionsList.getResponseModel().size() > 0) {
				for (int i = 0; i < permmisionsList.getResponseModel().size(); i++) {
					UserAccessModel userAccessModel = new UserAccessModel();
					userAccessModel.setAccessAuthority(permmisionsList.getResponseModel().get(i).getName());
					userAccessModel.setDisplayName(
							permmisionsList.getResponseModel().get(i).getDisplayName().getDefaultValue());
					accessList.add(userAccessModel);
				}
			}
		}
		responseModel.getResponseModel().setUserAccessModelList(accessList);

		// セッションのトークン情報の上書き
		if (accessToken != null && ELERAToken != null) {
			loginUser.setWso2ApiToken(accessToken);
			loginUser.setELERAToken(ELERAToken);
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		// 正常
		responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
	}

	/**
	* アカウントロックユーザ取得処理.
	*
	* @param model リクエスト内容
	* @param request HttpServletのリクエスト(FWが自動で設定)
	* @return アカウントロックユーザ取得処理＋αレスポンス
	*/
	@CrossOrigin
	@RequestMapping("/PwLockOutList")
	@ResponseBody
	public PasswordLockUserListModel pwLockOutList(
			@Validated GetUserRequestModel model, Errors errors, HttpServletRequest request,
			HttpServletResponse response) {

		var responseModel = new PasswordLockUserListModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// 店舗一覧を取得する
		var requestModel = new GetConfigurationsNodesListRequestModel();
		requestModel.getRequestModel().setChangePlanName("");
		requestModel.getRequestModel().setFilter("ALL");
		requestModel.getRequestModel().setBatchSize((int) 0);
		requestModel.getRequestModel().setExcludeFields(true);
		requestModel.getRequestModel().setNodeNames(loginUser.getBusinessUnitCdStr());

		// 店舗マスタ検索
		var nodesListModel = configurationsService.getNodesList(requestModel, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		if (nodesListModel.getResult().getCode() == 2) {
			responseModel.getResult().setCode(2);
			return responseModel;

		} else if (nodesListModel.getResult().getCode() != 0) {
			// エラーメッセージをセット
			int intcode = nodesListModel.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
					.setErrorMessageMap(nodesListModel.getResult().getErrorMessageMap());
			return responseModel;
		}
		responseModel.setResult(nodesListModel.getResult());

		List<String> nodes = new ArrayList<>();
		// 企業IDを追加する
		nodes.add(loginUser.getBusinessUnitCdStr());

		for (var i = 0; i < nodesListModel.getResponseModel().size(); i++) {
			// 一致する企業のみ
			var configurationsModel = nodesListModel.getResponseModel().get(i);
			if (configurationsModel.getChangePlan() != null) {
				// 変更計画中なのでとはず
				continue;
			} else if (configurationsModel.getParentName() == null) {
				// nullなので飛ばす
				continue;
			} else if (!configurationsModel.getParentName().equals(loginUser.getBusinessUnitCdStr())) {
				continue;
			} else {
				if (configurationsModel.getName() != null) {
					nodes.add(configurationsModel.getName());
				}
			}
		}
		// 絞り込み結果無しの場合
		if (nodes.size() == 0) {
			//			responseModel.getResult().setCode(2);
			//			return responseModel;
		}

		// ユーザマスタ検索
		var userQueryReq = new PostAuthorizationUsersQueryRequestModel();
		if (model.getUserId() != null) {
			userQueryReq.getRequestModel().setUsername(model.getUserId());
		} else if (model.getName() != null) {
			userQueryReq.getRequestModel().setUsername(model.getName());
		}
		if (nodes.size() != 0) {
			userQueryReq.getRequestModel().setNodes(nodes);
		}
		PostAuthorizationUsersQueryResponseModel dataModel = authorizationService.postUsersQuery(userQueryReq,
				messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null
				&& responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		// G007.00.0 Update-Start
		GetConfigurationsNodesNodeIdResponseModel storeInfo = getStoreInfo(request,
				loginUser.getBusinessUnitCdStr());
		Integer attemps = 9;
		if (storeInfo.getResponseModel().getConfigurations() != null) {
			 Map<String, Object> maxLoginAttemps = storeInfo.getResponseModel().getConfigurations().getMAX_LOGIN_ATTEMPTS();
				if (maxLoginAttemps != null) {;
					attemps =  Integer.valueOf(String.valueOf(maxLoginAttemps.get("value")));
				}
		}

		// レスポンスの本体に格納
		if (dataModel.getResponseModel().size() > 0) {
			List<PasswordLockUserModel> userInfos = new ArrayList<PasswordLockUserModel>();
			for (AuthorizationUsersQueryResponseModel one : dataModel.getResponseModel()) {
//				if (one.getUserRecord().getPasswordErrorCount() != null
//						&& one.getUserRecord().getPasswordErrorCount() > 9) {
					if (one.getUserRecord().getPasswordErrorCount() != null
							&& one.getUserRecord().getPasswordErrorCount() >= attemps) {
						// G007.00.0 Update-End
					if (one.getNodeRoles().get(0).getUserId() != null) {
						PasswordLockUserModel data = new PasswordLockUserModel();
						if (one.getUserRecord().getUsername().length() > 15) {
							data.setUserId(one.getUserRecord().getUsername());
						} else {
							data.setUserId(one.getUserRecord().getUsername());
						}
						if (one.getUserRecord().getLastName() != null && one.getUserRecord().getFirstName() != null) {
							data.setName(one.getUserRecord().getFirstName());
						}
						userInfos.add(data);
					}
				}
			}
			responseModel.setUserInfos(userInfos);
		}

		return responseModel;
	}

	/**
	* ロック解除処理.
	*
	* @param reqBodyModel リクエスト内容
	* @param request HttpServletのリクエスト(FWが自動で設定)
	* @return ユーザマスタ更新処理＋αレスポンス
	*/
	@CrossOrigin
	@PutMapping("/PwUnLock")
	@ResponseBody
	public PutUserResponseModel pwUnLock(
			@RequestBody @Validated({ Default.class,
					GroupNameOrder.class }) PasswordUnLockUserListModel reqBodyModel,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {

		PutUserResponseModel responseModel = new PutUserResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		//対象のユーザー分ループ
		for (PasswordUnLockUserModel one : reqBodyModel.getUserStatuses()) {
			String accessToken = loginUser.getWso2ApiToken();
			String ELERAToken = loginUser.getELERAToken();

			// ユーザマスタ検索
			var userQueryReq = new PostAuthorizationUsersRetrieveRequestModel();
			userQueryReq.getRequestModel().setUsername(one.getUserId());
			var userInfo = authorizationService.postUsersRetrieve(userQueryReq, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// 更新用のモデルに置き換える
			var userReq = new PostAuthorizationUsersRequestModel();
			userReq.setRequestModel(userInfo.getResponseModel());

			// パスワードリセット
			userReq.getRequestModel().setPasswordErrorCount(0);

			// 正常時
			// ユーザマスタ更新
			var userRes = authorizationService.postUsers(userReq, messageSource, apiContext,
					accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
					loginUser.getPassWord());

			// トークン情報の上書き
			if (userRes.getResult().getWSO2Token() != null
					&& userRes.getResult().getELERAToken() != null) {
				accessToken = userRes.getResult().getWSO2Token();
				ELERAToken = userRes.getResult().getELERAToken();
			}

			if (userRes.getResult().getCode() != 0) {
				// 失敗
				responseModel.setResult(userRes.getResult());
				return responseModel;
			}
		}

		// ここまで到達出来たら正常
		ApiCommonResponseModel result = new ApiCommonResponseModel();
		result.setCode(0);
		responseModel.setResult(result);

		return responseModel;
	}

}
