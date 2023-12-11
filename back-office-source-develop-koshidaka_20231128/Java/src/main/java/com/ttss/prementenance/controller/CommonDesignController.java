package com.ttss.prementenance.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.AuthRequestModel;
import com.ttss.prementenance.model.ConfigurationsModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListResponseModel;
import com.ttss.prementenance.model.GetHelpPdfNameResponseModel;
import com.ttss.prementenance.model.GetHelpPdfRequestModel;
import com.ttss.prementenance.model.GetHelpPdfResponseModel;
import com.ttss.prementenance.model.GetStoreGroupResponseModel;
import com.ttss.prementenance.model.GetStoreSearchRequestModel;
import com.ttss.prementenance.model.GetUserDataResponseModel;
import com.ttss.prementenance.model.UserAuthModel;
import com.ttss.prementenance.model.UserDataModel;
import com.ttss.prementenance.service.CommonDesignService;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.OauthContext;
import com.ttss.prementenance.utils.OauthUtil;
import com.ttss.prementenance.utils.SessionBeans;
import com.ttss.prementenance.utils.SessionUtil;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230214 xu.jh(Neusoft)    G001.00.0  issue課題#1054を対応します.
 * 20230302 xu.jh(Neusoft)    G002.00.0  issue課題#1038を対応します.
 * 20230419 bai.ry(Neusoft)   G003.00.0  issue課題#1607を対応します.
 * 20230614 wangchunmei(Neusoft)   G004.00.0  issue課題#1639を対応します.
 * 20230629 wangchunmei(Neusoft)   G005.00.0  issue課題#1867を対応します.
 * 20230630 qinshh(Neusoft)   G006.00.0  issue課題#1647を対応します.
 */
/**
* 機能概要：共通デザイン&API.
*
* @author 
* @version 1.0.0
*/

@RestController
@RequestMapping("CommonDesign")
public class CommonDesignController {
  
  @Autowired
  private CommonDesignService commonDesignService;

  @Autowired
  private ConfigurationsService configurationsService;
  
  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  private SessionUtil sessionUtil;
  
  @Autowired
  private OauthContext authContext;
  
  @Value("${business_cd_in_unfixed}")
  private String businessCdInUnfixed;

  /**
   * ヘッダーに表示するユーザ情報の取得.
   *
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return ユーザ情報
   */
  @GetMapping
  @RequestMapping("/Header")
  @CrossOrigin
  // G005.00.0 Update-Start
  // public UserDataModel getHeaderDate(HttpServletRequest request) {
  public GetUserDataResponseModel getHeaderDate(HttpServletRequest request) {
    // G005.00.0 Update-End
    // セッションよりユーザ情報の取得
    var loginUser = this.sessionUtil.getActiveLoginUser(request);
    // G005.00.0 Add-Start
    var responseModel = new GetUserDataResponseModel();
    ApiCommonResponseModel apiCommonResponseModel = new ApiCommonResponseModel();
    if(loginUser == null){
      apiCommonResponseModel.setCode(-90);
      responseModel.setResult(apiCommonResponseModel);
      return responseModel;
    }
    // G005.00.0 Add-End

    // セッションからユーザ情報を取得できた場合は、ユーザ情報を設定。取得できなかった場合は空文字を設定(ログイン画面を考慮)
    var userId = "";
    userId = loginUser == null ? "" : loginUser.getUserId();
    var userName = "";
    userName = loginUser == null ? "" : loginUser.getUserName();
    var businessUnitName = "";
    businessUnitName = loginUser == null ? "" : loginUser.getBusinessUnitName();
    var businessUnitCdStr = "";
    businessUnitCdStr = loginUser == null ? "" : loginUser.getBusinessUnitCdStr();
    var belongStoreCd = "";
    belongStoreCd = loginUser == null ? "" : loginUser.getBelongStoreCd();
    var belongStoreName = "";
    belongStoreName = loginUser == null ? "" : loginUser.getAffiliationStoreName();
    var applicationVersion = "";
    applicationVersion = loginUser == null ? "" : loginUser.getApplicationVersion();
    short headquartersAuthority = 0;
    headquartersAuthority = loginUser == null ? 0 : loginUser.getHeadquartersAuthority();
    // G002.00.0 Update-start
//    List<Integer> chargeStoreCds = new ArrayList<Integer>();
    List<String> chargeStoreCds = new ArrayList<String>();
    // G002.00.0 Update-start
    chargeStoreCds = loginUser == null ? null : loginUser.getChargeStoreCds();
    short roleCd = 0;
    roleCd = loginUser == null ? 1 : loginUser.getRole();
    // G001.00.0 Add-start
    var permissions = "";
    permissions = loginUser == null ? "" : loginUser.getPERMISSION_LIST_STRING();
    // G001.00.0 Add-end
    UserDataModel userModel = new UserDataModel();
    userModel.setUserCode(userId);
    userModel.setUserName(userName);
    userModel.setBusinessUnitCdStr(businessUnitCdStr);
    userModel.setBusinessUnitName(businessUnitName);
    userModel.setBelongStoreCd(belongStoreCd);
    userModel.setBelongStoreName(belongStoreName);
    userModel.setApplicationVersion(applicationVersion);
    userModel.setHeadquartersAuthority(headquartersAuthority);
    userModel.setChargeStoreCds(chargeStoreCds);
    userModel.setRoleCd(roleCd);
    // G001.00.0 Add-start
    userModel.setPermissions(permissions);
    // G001.00.0 Add-end
    
    // KSD V001.000 AS
    // 保守権限の状態をセット
    userModel.setIsCloudposAdmin(loginUser.getIsCloudposAdmin());
    // KSD V001.000 AE
    
    // G006.00.0 Delete-Start
    // return userModel;
    // G005.00.0 Delete-End
    // G005.00.0 Add-Start
    responseModel.setUserDataModel(userModel);
    apiCommonResponseModel.setCode(0);
    responseModel.setResult(apiCommonResponseModel);
    return responseModel;
    // G005.00.0 Add-End

  }

  /**
   * ユーザの権限取得.
   *
   * @param reqBodyModel リクエスト内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return セッションから取得したユーザの各種ボタン権限を取得
   */
  @CrossOrigin
  @RequestMapping("/Auth")
  @ResponseBody
  public UserAuthModel createUserAuth(AuthRequestModel reqBodyModel, HttpServletRequest request) {

    // ここでセッションから各種権限を取得する
//    MenuitemInfoModel itemModel;
    
    UserAuthModel userAuth = new UserAuthModel();
    ApiCommonResponseModel result = new ApiCommonResponseModel();
    // セッションよりユーザ情報の取得
    var session = this.sessionUtil.getActiveLoginUser(request);
    if (session == null) {
        // セッションが存在しない場合
        result.setCode(0);
    } else {
        result.setCode(-99);
    }
    // ロールチェックはしない
    
//    try {
//      itemModel = (MenuitemInfoModel) session.getItemModelMaps(reqBodyModel.getWindowsId());
//    } catch (Exception e) {
//      LogUtil.printRuntimeErrorLog(e);
//      var responseModel = new UserAuthModel();
//      responseModel.setResult(ApiUtil.getSessionError());
//      return responseModel;
//    }
//    
//    short role = session.getRole();
//    UserAuthModel userAuth = new UserAuthModel();
//    ApiCommonResponseModel result = new ApiCommonResponseModel();
//    try {
//
//      switch (role) {
//        case 1:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel1() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel1() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level1() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level1() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel1() == 0);
//          break;
//
//        case 2:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel2() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel2() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level2() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level2() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel2() == 0);
//          break;
//
//        case 3:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel3() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel3() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level3() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level3() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel3() == 0);
//          break;
//
//        case 4:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel4() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel4() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level4() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level4() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel4() == 0);
//          break;
//
//        case 5:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel5() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel5() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level5() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level5() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel5() == 0);
//          break;
//
//        case 6:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel6() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel6() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level6() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level6() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel6() == 0);
//          break;
//
//        case 7:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel7() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel7() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level7() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level7() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel7() == 0);
//          break;
//
//        case 8:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel8() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel8() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level8() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level8() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel8() == 0);
//          break;
//
//        case 9:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel9() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel9() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level9() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level9() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel9() == 0);
//          break;
//
//        case 10:
//          userAuth.setDeleteAuth(itemModel.getDeleteLevel10() == 0);
//          userAuth.setModifyAuth(itemModel.getModifyLevel10() == 0);
//          userAuth.setOther1Auth(itemModel.getOther1Level10() == 0);
//          userAuth.setOther2Auth(itemModel.getOther2Level10() == 0);
//          userAuth.setRegisterAuth(itemModel.getRegisterLevel10() == 0);
//          break;
//        default:
//          break;
//      }
//
//      userAuth.setApprovalFlg(session.getValidApprovalFlg() == 1);
//      result.setCode(0);
//    } catch (Exception e) {
//      result.setCode(-99);
//    }

    // 正常時
    // ロールマスタ検索
    userAuth.setResult(result);
    return userAuth;
  }
  
  /**
   * 店舗マスタ検索処理.
   *
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @param model リクエスト内容
   * @return 店舗マスタ検索＋αレスポンス
   */
  @CrossOrigin
  @GetMapping("/stores")
  @ResponseBody
  public GetConfigurationsNodesListResponseModel storeSearch(HttpServletRequest request,
      GetStoreSearchRequestModel model, HttpServletResponse response) {
    
    var responseModel = new GetConfigurationsNodesListResponseModel();
    var loginUser = this.sessionUtil.getActiveLoginUser(request);
    if (loginUser == null) {
      responseModel.setResult(ApiUtil.getSessionError());
      return responseModel;
    }

    // G006.00.0 Delete-Start
    // G004.00.0 Add-Start
//    short headquartersAuthority = loginUser.getHeadquartersAuthority();
//    if(headquartersAuthority == 0){
//      MessageSourceUtil messageResourseUtil = new MessageSourceUtil(messageSource);
//      responseModel.setResult(ApiUtil.createExceptionResponseModel(
//              messageResourseUtil.getMessage("O00004.E008"), -99, new Exception()));
//      return responseModel;
//    }
    // G006.00.0 Delete-End
    return this.getStore(loginUser, model, responseModel, response);
    // G004.00.0 Add-End
    // G004.00.0 Delete-Start
//    String businessCd = loginUser.getBusinessUnitCdStr();
//    String accessToken = loginUser.getWso2ApiToken();
//    String ELERAToken = loginUser.getELERAToken();
////    short headquartersAuthority = loginUser.getHeadquartersAuthority();
////    String belongStoreCd = loginUser.getBelongStoreCd();
////    List<Integer> chargeStroeCds = loginUser.getChargeStoreCds();
//
//    // 正常時
//    // 店舗マスタ検索
//    var reqModel = new GetConfigurationsNodesListRequestModel();
//    reqModel.getRequestModel().setChangePlanName("");
//    reqModel.getRequestModel().setFilter("ALL");
//    reqModel.getRequestModel().setBatchSize(Integer.valueOf(0));
//    reqModel.getRequestModel().setExcludeFields(true);
//    reqModel.getRequestModel().setNodeNames(businessCd);
//    var resModel = configurationsService.getNodesList(reqModel, messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//
//    if (resModel.getResult().getCode() == 2) {
//        responseModel.getResult().setCode(2);
//        return responseModel;
//
//    } else if (resModel.getResult().getCode() != 0) {
//        // エラーメッセージをセット
//        int intcode = resModel.getResult().getCode().intValue();
//        responseModel.getResult().setCode(Integer.valueOf(intcode));
//        responseModel.getResult()
//            .setErrorMessageMap(resModel.getResult().getErrorMessageMap());
//        return responseModel;
//    }
//    responseModel.setResult(resModel.getResult());
//    // G002.00.0 Add-start
//    List<String> chargeStoreCds = loginUser.getChargeStoreCds();
//    // G002.00.0 Add-end
//    // 該当店舗のみで絞り込む
//    responseModel.setResponseModel(new ArrayList<ConfigurationsModel>());
//    for (var i = 0; i < resModel.getResponseModel().size(); i++) {
//    	// 一致する企業のみ
//		var configurationsModel = resModel.getResponseModel().get(i);
//		if (!configurationsModel.getParentName().equals(businessCd) || configurationsModel.getChangePlan() != null) {
//			continue;
//		}
////        // G002.00.0 Add-start
////        if(!model.getIsAllStoreMaster() && !loginUser.getIsCloudposAdmin()){
////          for(int j = 0; j < chargeStoreCds.size(); j++) {
////            if(configurationsModel.getName().equals(chargeStoreCds.get(j))) {
////              responseModel.getResponseModel().add(configurationsModel);
////            }
////          }
////        } else {
////          responseModel.getResponseModel().add(configurationsModel);
////        }
////        // G002.00.0 Add-end
//      // G002.00.0,G003.00.0 Update-start
//      if(!model.getIsAllStoreMaster() && !loginUser.getIsCloudposAdmin()){
//        if (loginUser.getHeadquartersAuthority()==1) {
//          for (int j = 0; j < chargeStoreCds.size(); j++) {
//            if (configurationsModel.getName().equals(chargeStoreCds.get(j))) {
//              responseModel.getResponseModel().add(configurationsModel);
//            }
//          }
//        }else {
//          responseModel.getResponseModel().add(configurationsModel);
//        }
//      } else {
//        responseModel.getResponseModel().add(configurationsModel);
//      }
//      // G002.00.0,G003.00.0 Update-end
//    }
//    // 絞り込み結果無しの場合
//    if (responseModel.getResponseModel().size() == 0) {
//          responseModel.getResult().setCode(2);
//          return responseModel;
//    }
//
//    // セッションのトークン情報の上書き
//    if (resModel.getResult().getWSO2Token() != null
//    		&& resModel.getResult().getELERAToken() != null) {
//  	    loginUser.setWso2ApiToken(resModel.getResult().getWSO2Token());
//  	    loginUser.setELERAToken(resModel.getResult().getELERAToken());
//        // ユーザ情報をセッション管理用リポジトリに追加
//        var sessionId = sessionUtil.saveUserToRepository(loginUser);
//        // レスポンスのヘッダーにセッションID用のCookieをセットする
//        response = sessionUtil.setCookie(response, sessionId);
//    }
//
//    return responseModel;
////    return commonDesignService.getStores(messageSource, apiContext, businessCd, accessToken, ELERAToken,
////        headquartersAuthority, belongStoreCd, chargeStroeCds, model);
    // G004.00.0 Delete-End
  }
  // G004.00.0 Add-Start
  /**
   * 店舗マスタ検索処理.
   *
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @param model リクエスト内容
   * @return 店舗マスタ検索＋αレスポンス
   */
  @CrossOrigin
  @GetMapping("/storesNoAuth")
  @ResponseBody
  public GetConfigurationsNodesListResponseModel storeSearchNoAuth(HttpServletRequest request,
                                                             GetStoreSearchRequestModel model, HttpServletResponse response) {

    var responseModel = new GetConfigurationsNodesListResponseModel();
    var loginUser = this.sessionUtil.getActiveLoginUser(request);
    if (loginUser == null) {
      responseModel.setResult(ApiUtil.getSessionError());
      return responseModel;
    }
    return this.getStore(loginUser, model, responseModel, response);
  }

  private GetConfigurationsNodesListResponseModel getStore(SessionBeans loginUser,
                                                           GetStoreSearchRequestModel model,
                                                           GetConfigurationsNodesListResponseModel responseModel,
                                                           HttpServletResponse response){
    String businessCd = loginUser.getBusinessUnitCdStr();
    String accessToken = loginUser.getWso2ApiToken();
    String ELERAToken = loginUser.getELERAToken();

    // 正常時
    // 店舗マスタ検索
    var reqModel = new GetConfigurationsNodesListRequestModel();
    reqModel.getRequestModel().setChangePlanName("");
    reqModel.getRequestModel().setFilter("ALL");
    reqModel.getRequestModel().setBatchSize(Integer.valueOf(0));
    reqModel.getRequestModel().setExcludeFields(true);
    reqModel.getRequestModel().setNodeNames(businessCd);
    var resModel = configurationsService.getNodesList(reqModel, messageSource, apiContext, accessToken, ELERAToken,
            loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

    if (resModel.getResult().getCode() == 2) {
      responseModel.getResult().setCode(2);
      return responseModel;

    } else if (resModel.getResult().getCode() != 0) {
      // エラーメッセージをセット
      int intcode = resModel.getResult().getCode().intValue();
      responseModel.getResult().setCode(Integer.valueOf(intcode));
      responseModel.getResult()
              .setErrorMessageMap(resModel.getResult().getErrorMessageMap());
      return responseModel;
    }
    responseModel.setResult(resModel.getResult());
    List<String> chargeStoreCds = loginUser.getChargeStoreCds();
    // 該当店舗のみで絞り込む
    responseModel.setResponseModel(new ArrayList<ConfigurationsModel>());
    for (var i = 0; i < resModel.getResponseModel().size(); i++) {
      // 一致する企業のみ
      var configurationsModel = resModel.getResponseModel().get(i);
      if (!configurationsModel.getParentName().equals(businessCd) || configurationsModel.getChangePlan() != null) {
        continue;
      }
      if(!model.getIsAllStoreMaster() && !loginUser.getIsCloudposAdmin()){
        if (loginUser.getHeadquartersAuthority()==1) {
          for (int j = 0; j < chargeStoreCds.size(); j++) {
            if (configurationsModel.getName().equals(chargeStoreCds.get(j))) {
              responseModel.getResponseModel().add(configurationsModel);
            }
          }
        }else {
          responseModel.getResponseModel().add(configurationsModel);
        }
      } else {
        responseModel.getResponseModel().add(configurationsModel);
      }
    }
    // 絞り込み結果無しの場合
    if (responseModel.getResponseModel().size() == 0) {
      responseModel.getResult().setCode(2);
      return responseModel;
    }

    // セッションのトークン情報の上書き
    if (resModel.getResult().getWSO2Token() != null
            && resModel.getResult().getELERAToken() != null) {
      loginUser.setWso2ApiToken(resModel.getResult().getWSO2Token());
      loginUser.setELERAToken(resModel.getResult().getELERAToken());
      // ユーザ情報をセッション管理用リポジトリに追加
      var sessionId = sessionUtil.saveUserToRepository(loginUser);
      // レスポンスのヘッダーにセッションID用のCookieをセットする
      response = sessionUtil.setCookie(response, sessionId);
    }

    return responseModel;
  }
  // G004.00.0 Add-End
  /**
   * 店舗グループマスタ検索処理.
   *
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 店舗グループマスタ検索＋αレスポンス
   */
  @CrossOrigin
  @GetMapping("/storegroups")
  @ResponseBody
  public GetStoreGroupResponseModel storeGroupSearch(HttpServletRequest request) {

    var loginUser = this.sessionUtil.getActiveLoginUser(request);
    if (loginUser == null) {
      GetStoreGroupResponseModel responseModel = new GetStoreGroupResponseModel();
      responseModel.setResult(ApiUtil.getSessionError());
      return responseModel;
    }

    String businessCd = loginUser.getBusinessUnitCdStr();
    String accessToken = loginUser.getWso2ApiToken();
    String ELERAToken = loginUser.getELERAToken();

    // 正常時
    // 店舗マスタ検索
    return commonDesignService.getStoreGroups(messageSource, apiContext, businessCd, accessToken, ELERAToken);
  }
  
  /**
   * ヘルプ用PDFファイル取得処理.
   *
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @param model リクエスト内容
   * @return ヘルプ用PDFファイルのURL
   */
  @CrossOrigin
  @GetMapping("/Helppdf")
  @ResponseBody
  public GetHelpPdfResponseModel createHelpPdf(HttpServletRequest request,
          GetHelpPdfRequestModel model) {
      
    String accessToken;
    String businessCd;
    String ELERAToken;
    GetHelpPdfResponseModel responseModel = new GetHelpPdfResponseModel();

    String helpPdfSearchName = model.getHelpPdfSearchName();
    // ログイン以外の画面の場合
    if (!helpPdfSearchName.equals("O00001")) {
      var loginUser = this.sessionUtil.getActiveLoginUser(request);
      if (loginUser == null) {

        responseModel.setResult(ApiUtil.getSessionError());
        return responseModel;
      }
      businessCd = loginUser.getBusinessUnitCdStr();
      accessToken = loginUser.getWso2ApiToken();
      ELERAToken = loginUser.getELERAToken();

    //　ログイン画面の場合
    } else {
      businessCd = businessCdInUnfixed;
      try {
        accessToken = oauth();
        ELERAToken = "";
      } catch (Exception e) {
        // アクセストークン取得時にExceptionが発生したらエラーとして処理する
        var messageResourseUtil = new MessageSourceUtil(messageSource);
        responseModel.setResult(ApiUtil
              .createExceptionResponseModel(messageResourseUtil.getMessage("O00004.E006"), -10, e));
        return responseModel;
      }
    }
    // 受け取った画面名からファイル名を検索
    GetHelpPdfNameResponseModel sendmodel =
        commonDesignService.getHelpPdfResponseModel(helpPdfSearchName);

    // 正常時
    return commonDesignService.getHelpPdf(sendmodel,
        messageSource, apiContext, businessCd, accessToken, ELERAToken);
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
}
