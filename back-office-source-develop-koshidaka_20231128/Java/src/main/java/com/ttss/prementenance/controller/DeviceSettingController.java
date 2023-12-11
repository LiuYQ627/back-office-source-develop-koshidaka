package com.ttss.prementenance.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.ttss.prementenance.model.DeleteDevicesResponseModel;
import com.ttss.prementenance.model.DeleteTerminalManagementRequestModel;
import com.ttss.prementenance.model.GetDevicesResponseModel;
import com.ttss.prementenance.model.GetTerminalManagementRequestModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestBodyModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestParamModel;
import com.ttss.prementenance.model.PostDevicesQueryResponseModel;
import com.ttss.prementenance.model.PostDevicesRequestModel;
import com.ttss.prementenance.model.PostDevicesResponseModel;
import com.ttss.prementenance.model.PutTerminalManagementRequestModel;
import com.ttss.prementenance.model.TerminalManagementUpdateInfoModel.GroupNameOrder;
import com.ttss.prementenance.service.DevicesService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 端末設定画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("DeviceSetting")
public class DeviceSettingController {

    @Autowired
    private DevicesService devicesService;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private ApiContext apiContext;

    @Autowired
    private SessionUtil sessionUtil;

    @Autowired
    public DeviceSettingController() {}


    /**
     * 端末管理マスタ検索処理.
     * 
     * @param model リクエスト内容
     * @param errors バリデーションエラー内容
     * @param request HttpServletのリクエスト(FWが自動で設定)
     * @return 端末管理マスタ取得＋αレスポンス
     */
    @CrossOrigin
    @GetMapping("/TerminalQuery")
    @ResponseBody
    public PostDevicesQueryResponseModel terminalQuery(
            @Validated GetTerminalManagementRequestModel model, Errors errors,
            HttpServletRequest request, HttpServletResponse response) {

        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            var responseModel = new PostDevicesQueryResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        if (errors.hasErrors()) {
            // バリデーションエラー時
            var responseModel = new PostDevicesQueryResponseModel();
            responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
            return responseModel;
        }

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        // 端末管理マスタ検索
        // デバイス情報照会
        var paramReq = new PostDevicesQueryRequestParamModel();
        var bodyReq = new PostDevicesQueryRequestBodyModel();

        if (model.getStoreCd() != null) {
            var nodeIdList = new ArrayList<String>();
            nodeIdList.add(model.getStoreCd());
            bodyReq.getRequestModel().getKeys().setNodeId(nodeIdList);
        }
        paramReq.getRequestModel().setOrderBy("name");
        paramReq.getRequestModel().setAscending(true);
        paramReq.getRequestModel().setStartIndex(0);
		// CS #1358
        //paramReq.getRequestModel().setBatchSize(Long.valueOf(10));
        paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		// CE #1358
        var deviceQueryRes =
                devicesService.postDevicesQuery(paramReq, bodyReq, messageSource, apiContext,
                        accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

        // セッションのトークン情報の上書き
        if (deviceQueryRes.getResult().getWSO2Token() != null
                && deviceQueryRes.getResult().getELERAToken() != null) {

            loginUser.setWso2ApiToken(deviceQueryRes.getResult().getWSO2Token());
            loginUser.setELERAToken(deviceQueryRes.getResult().getELERAToken());
            // ユーザ情報をセッション管理用リポジトリに追加
            var sessionId = sessionUtil.saveUserToRepository(loginUser);
            // レスポンスのヘッダーにセッションID用のCookieをセットする
            response = sessionUtil.setCookie(response, sessionId);
        }

        return deviceQueryRes;
    }

    /**
     * 端末管理マスタ取得処理.
     * 
     * @param model リクエスト内容
     * @param errors バリデーションエラー内容
     * @param request HttpServletのリクエスト(FWが自動で設定)
     * @return 端末管理マスタ取得＋αレスポンス
     */
    @CrossOrigin
    @GetMapping("/TerminalSearch")
    @ResponseBody
    public GetDevicesResponseModel terminalSearch(
            @Validated GetTerminalManagementRequestModel model, Errors errors,
            HttpServletRequest request, HttpServletResponse response) {

        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            var responseModel = new GetDevicesResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        if (errors.hasErrors()) {
            // バリデーションエラー時
            var responseModel = new GetDevicesResponseModel();
            responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
            return responseModel;
        }

        if (model.getClientId() == null) {
            // 何もしない
        } else if (model.getClientId().isEmpty()) {
            // バリデーションエラーとする
            var responseModel = new GetDevicesResponseModel();
            var messageResourseUtil = new MessageSourceUtil(messageSource);
            responseModel.setResult(ApiUtil.createValidationErrorModelWhenDelete("clientId",
                    messageResourseUtil.getMessage("VALIDA.STRSIZE", new String[] {"1", "4"})));
            return responseModel;
        } else {
            Integer clientId;
            clientId = Integer.parseInt(model.getClientId());
            if (clientId == 0) {
                // バリデーションエラーとする
                var responseModel = new GetDevicesResponseModel();
                var messageResourseUtil = new MessageSourceUtil(messageSource);
                responseModel.setResult(
                        ApiUtil.createValidationErrorModelWhenDelete("clientId", messageResourseUtil
                                .getMessage("VALIDA.NUMSIZE", new String[] {"1", "9999"})));
                return responseModel;
            }
        }

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        // 端末管理マスタ検索
        var deviceId = model.getStoreCd() + model.getClientId();
        var deviceRes = devicesService.getDevices(deviceId, messageSource, apiContext, accessToken,
                ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

        // セッションのトークン情報の上書き
        if (deviceRes.getResult().getWSO2Token() != null
                && deviceRes.getResult().getELERAToken() != null) {

            loginUser.setWso2ApiToken(deviceRes.getResult().getWSO2Token());
            loginUser.setELERAToken(deviceRes.getResult().getELERAToken());
            // ユーザ情報をセッション管理用リポジトリに追加
            var sessionId = sessionUtil.saveUserToRepository(loginUser);
            // レスポンスのヘッダーにセッションID用のCookieをセットする
            response = sessionUtil.setCookie(response, sessionId);
        }

        return deviceRes;
    }

    /**
     * 端末管理マスタ更新処理.
     *
     * @param reqBodyModel リクエスト内容
     * @param errors バリデーションエラー内容
     * @param request HttpServletのリクエスト(FWが自動で設定)
     * @return 端末管理マスタ更新＋αレスポンス
     */
    @CrossOrigin
    @PutMapping("/TerminalInfoRegist")
    @ResponseBody
    public PostDevicesResponseModel terminalInfoRegist(
            @RequestBody @Validated({Default.class,
                    GroupNameOrder.class}) PutTerminalManagementRequestModel reqBodyModel,
            Errors errors, HttpServletRequest request, HttpServletResponse response) {

        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            var responseModel = new PostDevicesResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        if (errors.hasErrors()) {
            // バリデーションエラー時
            var responseModel = new PostDevicesResponseModel();
            responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
            return responseModel;
        }

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        // 端末管理マスタ更新
        var reqModel = new PostDevicesRequestModel();
        reqModel.getRequestModel().setNodeId(reqBodyModel.getTerminalInfos().get(0).getStoreCd());
        reqModel.getRequestModel()
                .setEndpointId(reqBodyModel.getTerminalInfos().get(0).getClientId());
        reqModel.getRequestModel()
                .setTerminalType(reqBodyModel.getTerminalInfos().get(0).getTerminalType());
        // reqModel.getRequestModel().setName(reqBodyModel.getTerminalInfos().get(0).getName());
        // 企業コード(15桁) + 店舗コード(6桁) + 端末コード(4桁)をデバイスIDとして設定
        reqModel.getRequestModel().setName(reqBodyModel.getTerminalInfos().get(0).getStoreCd()
                + reqBodyModel.getTerminalInfos().get(0).getClientId());
        reqModel.getRequestModel().setLocale("ja-JP");
        reqModel.getRequestModel().setUiTheme("tgcpDesktopMock");
        reqModel.getRequestModel().setDeviceName(reqBodyModel.getTerminalInfos().get(0).getName());
        var storeCdLen = reqBodyModel.getTerminalInfos().get(0).getStoreCd().length();
        // 画面の店舗コードの値が、企業コード(15桁) + 店舗コード(6桁)で取得出来る為、
        // 末尾6桁の店舗コードを取得
        reqModel.getRequestModel().setStoreCode(
                reqBodyModel.getTerminalInfos().get(0).getStoreCd().substring(storeCdLen - 6));
        if (reqBodyModel.getTerminalInfos().get(0).getMode() != 1) {
            // 更新の場合のみversionを追加
            reqModel.getRequestModel()
                    .setVersion(reqBodyModel.getTerminalInfos().get(0).getVersion());
        }
        // KSD V001.000 AS
        reqModel.getRequestModel().setMoneyTypeSettings(reqBodyModel.getTerminalInfos().get(0).getMoneyTypeSettings());
        // KSD V001.000 AE

        var deviceRes = devicesService.postDevices(reqModel, messageSource, apiContext, accessToken,
                ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

        // セッションのトークン情報の上書き
        if (deviceRes.getResult().getWSO2Token() != null
                && deviceRes.getResult().getELERAToken() != null) {

            loginUser.setWso2ApiToken(deviceRes.getResult().getWSO2Token());
            loginUser.setELERAToken(deviceRes.getResult().getELERAToken());
            // ユーザ情報をセッション管理用リポジトリに追加
            var sessionId = sessionUtil.saveUserToRepository(loginUser);
            // レスポンスのヘッダーにセッションID用のCookieをセットする
            response = sessionUtil.setCookie(response, sessionId);
        }

        return deviceRes;
    }

    /**
     * 端末管理マスタ削除処理.
     * 
     * @param reqBodyModel リクエスト内容
     * @param request HttpServletのリクエスト(FWが自動で設定)
     * @return 端末管理マスタ削除＋αレスポンス
     */
    @CrossOrigin
    @DeleteMapping("/TerminalInfoDeleted")
    public DeleteDevicesResponseModel terminalInfoDelete(
            @RequestBody DeleteTerminalManagementRequestModel reqBodyModel,
            HttpServletRequest request, HttpServletResponse response) {

        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            var responseModel = new DeleteDevicesResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        // 端末管理マスタ削除
        var deviceId = reqBodyModel.getStoreCd() + reqBodyModel.getClientId();
        var deviceRes = devicesService.deleteDevices(deviceId, messageSource, apiContext,
                accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

        // セッションのトークン情報の上書き
        if (deviceRes.getResult().getWSO2Token() != null
                && deviceRes.getResult().getELERAToken() != null) {

            loginUser.setWso2ApiToken(deviceRes.getResult().getWSO2Token());
            loginUser.setELERAToken(deviceRes.getResult().getELERAToken());
            // ユーザ情報をセッション管理用リポジトリに追加
            var sessionId = sessionUtil.saveUserToRepository(loginUser);
            // レスポンスのヘッダーにセッションID用のCookieをセットする
            response = sessionUtil.setCookie(response, sessionId);
        }

        return deviceRes;
    }
}
