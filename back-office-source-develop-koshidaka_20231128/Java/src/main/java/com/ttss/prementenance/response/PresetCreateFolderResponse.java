/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230117 litie(Neusoft)     G001.00.0  issue課題#1088を対応します.
 */

package com.ttss.prementenance.response;

import java.util.List;
import java.util.Map;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * S3バケットに商品プリセット画像を保存する企業フォルダを作成
 * <p>
 * サンプル：
 * 
 * <pre>
{
    "errors": [
        {
            "errorLevel": "Error",
            "errorType": "GENERAL",
            "error": "FOLDER_EXISTS"
        }
    ],
    "additionalRequestInformation": {},
    "timestamp": "2023-01-17T06:57:45.736Z",
    "status": 412,
    "path": "",
    "message": "Folder with name {FOLDER_NAME} already exists.",
    "messageVariables": {
        "FOLDER_NAME": "000000000000101"
    },
    "origin": "ttec-presets"
}
 * </pre>
 */
@Data
public class PresetCreateFolderResponse {
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

		public boolean isFolderExistsError() {
			return (412 == status
					&& errors != null
					&& errors.size() == 1
					&& "FOLDER_EXISTS".equals(errors.get(0).get("error")));
		}
	}
}
