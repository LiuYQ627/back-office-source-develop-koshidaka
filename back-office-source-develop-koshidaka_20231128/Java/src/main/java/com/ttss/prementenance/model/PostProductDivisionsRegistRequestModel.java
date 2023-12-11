package com.ttss.prementenance.model;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotEmpty;
import lombok.Data;

/**
* 商品分類階層設定更新 リクエストボディ データモデル.
*
* @author 
* @version 
*/
@Data
public class PostProductDivisionsRegistRequestModel {

	public PostProductDivisionsRegistRequestModel() {
	}

	/**
	 * nodeId
	 */
	@NotEmpty
	private String nodeId;
	/**
	 * nodeIdゲッター
	 *
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * nodeIdセッター
	 *
	 * @param nodeId nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 商品分類階層設定情報.
	 */
	@NotNull
	@Valid
	private List<ProductDivisionsInfoUpdateRequestModel> value;
	/**
	 * 商品分類階層設定情報ゲッター.
	 *
	 * @return 商品分類階層設定情報
	 */
	public List<ProductDivisionsInfoUpdateRequestModel> getValue() {
		return value;
	}
	/**
	 * 商品分類階層設定情報セッター.
	 *
	 * @param value 商品分類階層設定情報
	 */
	public void setValue(List<ProductDivisionsInfoUpdateRequestModel> value) {
		this.value = value;
	}

}
