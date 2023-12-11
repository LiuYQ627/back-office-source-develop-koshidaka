package com.ttss.prementenance.model;

import lombok.Data;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230314 litie(Neusoft)     G002.00.0  issue課題#1649を対応します.
 */

@Data
public class PostEJournalSaveRequestModel {

	public PostEJournalSaveRequestModel() {
	}

	private String saveData;
}
