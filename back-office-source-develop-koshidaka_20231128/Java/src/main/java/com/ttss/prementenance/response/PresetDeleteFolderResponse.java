/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221230  tianxh(Neusoft)  G001.00.0  issue課題#1169を対応します.
 */
package com.ttss.prementenance.response;

import java.util.List;
import java.util.Map;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * S3バケット削除
 * <p>
 * サンプル：
 * 
 * <pre>
{
    "errors": [
        {
            "errorLevel": "Error",
            "errorType": "GENERAL",
            "error": "S3_FOLDER_NOT_EXISTS"
        }
    ],
    "additionalRequestInformation": {},
    "timestamp": "2022-12-30T06:19:26.508Z",
    "status": 412,
    "path": "",
    "message": "Folder with name {FOLDER_NAME} does not exists.",
    "messageVariables": {
        "FOLDER_NAME": "test_folder"
    },
    "origin": "ttec-presets"
}
 * </pre>
 */
@Data
public class PresetDeleteFolderResponse {
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
    private ErrorResponse error;

    @Data
    public static class ErrorResponse {
        private List<Map<String, String>> errors;

        private int status;

        private String message;

        private Map<String, Object> messageVariables;

        public String getFormatedMessage() {
            if (messageVariables.isEmpty()) {
                return message;
            }

            String msg = new String(message);
            for (var kv : messageVariables.entrySet()) {
                msg = msg.replace("{" + kv.getKey() + "}", String.valueOf(kv.getValue()));
            }
            return msg;
        }

        public boolean isFolderNotExistError() {
            return (412 == status
                    && errors != null
                    && errors.size() == 1
                    && "S3_FOLDER_NOT_EXISTS".equals(errors.get(0).get("error")));
        }
    }
}
