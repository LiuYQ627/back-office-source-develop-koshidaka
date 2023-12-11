package com.ttss.prementenance.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
* Top画面&API.
*
* @author
* @version 1.0.0
*/
@RestController
@RequestMapping("Top")
public class TopController {

//  @Autowired
//  private TopService topService;
  
  @Autowired
  private SessionUtil sessionUtil;

//  @Autowired
//  private MessageSource messageSource;
//
//  @Autowired
//  private ApiContext apiContext;

  @Autowired
  public TopController() {
//    this.topService = new TopService();
  }

//  /**
//   * メニューアイテムマスタ検索処理.
//   * 
//   * @param reqParamModel リクエスト内容
//   * @param request HttpServletのリクエスト(FWが自動で設定)
//   * @return メニューアイテムマスタ検索処理＋αレスポンス
//   */
//  @CrossOrigin
//  @RequestMapping("/TopPage")
//  @ResponseBody
//  public GetTopPageResponseModel topPage(GetTopPageRequestModel reqParamModel,
//      HttpServletRequest request) {
//
//	  // 呼ばれないが今後必要になるかも
//    // セッションよりユーザ情報の取得
//    var session = this.sessionUtil.getActiveLoginUser(request);
//    if (session == null) {
//      // セッションよりユーザ情報が取得できなかった場合は、セッション切れのポップアップを表示
//      var responseModel = new GetTopPageResponseModel();
//      responseModel.setResult(ApiUtil.getSessionError());
//      return responseModel;
//    }
//
//    // 正常時
//    // メニューアイテムマスタ検索
//    String businessCd = session.getBusinessUnitCdStr();
//    String accessToken = session.getWso2ApiToken();
//    GetTopPageResponseModel responseModel =
//        topService.getTopPage(reqParamModel, messageSource, apiContext, businessCd, accessToken);

//    responseModel.setApprovalFlag(session.getValidApprovalFlg());
//    responseModel.setRoleCode(session.getRole());
//    GetTopPageResponseModel responseModel = new GetTopPageResponseModel();
//    return responseModel;
//  }

  /**
   * セッション情報の存在チェックを行う.
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return セッション情報の状態
   */
  @CrossOrigin
  @RequestMapping("/CheckSession")
  public ApiCommonResponseModel checkSession(HttpServletRequest request) {
    // セッションよりユーザ情報の取得
    var session = this.sessionUtil.getActiveLoginUser(request);
    if (session == null) {
      // セッションが存在しない場合
      return ApiUtil.getSessionError();
    }
    ApiCommonResponseModel result = new ApiCommonResponseModel();
    result.setApi(0);
    result.setCode(0);
    result.setMs(0);

    return result;
  }
}
