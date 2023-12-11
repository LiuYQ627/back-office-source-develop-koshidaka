<!-- KSD V001.000 AS -->
<style src="./../../static/css/CalendarSettings/calendarSettings.css"></style>
<script type="text/javascript" src="./../../static/js/CalendarSettings/calendarSettings.js"></script>

<template>
  <v-container class="calendar-page-container-body calendar-page">
    <v-row no-gutters class="calendar-condition-row">
      <form-group-layout
        :title="$t(`C00212.S001`)"
        fixedHeader
        :headerWidth="146"
      >
        <store-select
          ref="selectStoreDialog"
          v-model="targetStoreCodes"
          :confirmProceed="isDraft"
          hasCodeName
          headquartersAuthorityCheckEnable
          @change="changedStore"
          @click="storeClicked"
        />
      </form-group-layout>
    </v-row>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              fab
              text
              small
              @click="prev"
              :tabindex="0"
              :class="`${isDisableNavigateCalendar.prev || !targetStoreCodes.length || isDisableCalendarAction || isDisableCalendarButtonAction ? 'calendar-page-btn-disabled' : 'left-navigation'}`"
              :disabled="isDisableNavigateCalendar.prev || !targetStoreCodes.length || isDisableCalendarAction || isDisableCalendarButtonAction"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-toolbar-title class="calendar-page-title" style="width: 160px;">
              {{ calendarTitle }}
            </v-toolbar-title>
            <v-btn
              fab
              text
              small
              @click="next"
              :tabindex="0"
              :class="`${isDisableNavigateCalendar.next || !targetStoreCodes.length || isDisableCalendarAction || isDisableCalendarButtonAction ? 'calendar-page-btn-disabled' : 'right-navigation'}`"
              :disabled="isDisableNavigateCalendar.next || !targetStoreCodes.length || isDisableCalendarAction || isDisableCalendarButtonAction"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet>
          <v-calendar
            ref="calendar"
            class="calendar-page"
            v-model="focus"
            :weekday-format="weekDayName"
            :events="events"
            :type="type"
            @change="hasChange"
          >
          <template v-slot:day="{ month, day, outside, year, date, past, present, future }">
            <div v-if="!outside"
              :style="{
                height: '100%',
                cursor: `${ future && isCursorEnabled ||
                  present && isCursorEnabled ? 'pointer': 'default'}`,
                background: `${retrieveCalendarWeekdayDivisionQuery( day, date, month, year) && isNewLoad
                  ? retrieveCalendarWeekdayDivisionQuery( day, date, month, year).backColorCode
                  : ''}`,
              }"
              @click="updateCalendarWeekdayCode({ month, day, year, date, past })"
              :class="`${isActiveCalendarCard(day, month, year) && isNewLoad ? 'calendar-page-active-card' : ''}`"
              :tabindex="future && isTabIndexEnabled ||
                  present && isTabIndexEnabled ? 0 : null"
              >
              <div :class="`calendar-page-day pt-2 pl-2 pr-2 ${past ? 'calendar-page-day-past' : ''}`">
                {{ day }}
              </div>
              <div
                :class="`calendar-page-desc pb-2 pl-2 pr-2 ${past ? 'calendar-page-desc-past' : ''}`"
                :style="{
                color: `${retrieveCalendarWeekdayDivisionQuery( day, date, month, year) && !past && isNewLoad
                  ? retrieveCalendarWeekdayDivisionQuery( day, date, month, year).textColorCode
                  : ''}`,
              }"
                >
                {{
                  retrieveCalendarWeekdayDivisionQuery( day, date, month, year) && isNewLoad
                  ? checkEmptyName(
                      retrieveCalendarWeekdayDivisionQuery( day, date, month, year), $t("C00212.S011"), 'shortName'
                    )
                  : ''
                }}
              </div>
            </div>
          </template>
          </v-calendar>
        </v-sheet>
        <v-sheet>
          <div class="weekday-division-button-group mt-30">
            <v-row no-gutters>
              <v-col class="d-flex pl-1 pt-1 weekday-division-button-group-title">{{ $t("C00212.S012") }}</v-col>
            </v-row>
            <v-row no-gutters class="weekday-division-button-group-container">
              <v-row no-gutters class="w-100 weekday-division-button-group-grid-container" v-if="isNewLoad">
                <v-col class="weekday-division-button-group-container-col pa-1" v-for="(row, index) in calendarWeekdayDivisionQueryResult" :key="`button-${index}`">
                  <v-btn
                    :disabled="!targetStoreCodes.length || isDisableCalendarButtonAction || isDisableCalendarAction"
                    :style="{
                      width: '99%',
                      fontSize: '18px',
                      minHeight: '45px',
                      padding: '5px',
                      background: `${row.backColorCode}`, color: `${row.textColorCode}`,
                      border: `${activeWeekdayDivision === row.weekdayCode ? '2px solid #000' : '0'}`
                    }
                    "
                    :tabIndex="0"
                    @click="setActiveWeekdayDivision(row)"
                  >
                    {{
                      checkEmptyName(
                        row, $t("C00212.S013"), 'longName'
                      )
                    }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-row>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button
          @close="backToMenu"
          @fixed="confirm"
          :isfixedBtn="disabledFixedBtn"
          class ="maintButton"/>
      </v-col>
    </v-row>
    <popup ref="pop"/>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
