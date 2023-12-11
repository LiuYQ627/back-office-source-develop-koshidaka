<style src="@/resource/static/css/CommonDesign/utils.css"></style>
<style src="@/resource/static/css/PresetMaster/presetCopy.css"></style>
<script type="text/javascript" src="@/resource/static/js/PresetMaster/presetCopyDialog.js" />

<template>
  <div>
    <common-dialog
      v-model="displayed"
      title="企画コピー"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    >
      <div
        id="baseTable"
        style="overflow-y: auto; height: auto">
        <table class="conversionTable">
          <!-- コピー元企画 -->
          <tr>
            <th>{{ "コピー元企画" }}</th>
            <td class="pulldownCellStyle">
              <select
                class="pulldownStyle"
                v-model="selectedPlanCode"
              >
                <option
                  v-for="(item, index) in plans"
                  :key="index"
                  :value="item.planningCode"
                >
                  {{ item.catalogName }}
                </option>
              </select>
              <div class="pulldownArrow"/>
            </td>
          </tr>

          <!-- 企画コード -->
          <tr>
            <th>{{ "企画コード" }}</th>
            <td>
              <input
                id="planningCode"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="planningCode"
                maxlength="2"
                @input="planningCodeInputRegulation"
                @keyup.enter="onEnterPlanCode"
              >
            </td>
          </tr>
        </table>
      </div>
    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
