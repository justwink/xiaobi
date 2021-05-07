/*
 * @Date: 2021-01-16 11:57:39
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-30 16:49:18
 * @Description: 主题色
 */
import colour from '@Styles/color';

export const light = {
	bg: colour.whitef7,
	panelBg: colour.white,
	boldFont: colour.black15,
	sidebarShadow: colour.shadowDark,
	sidebar: colour.white,
	increase: colour.red,
	decrease: colour.green,
	bannerDesc: colour.grey93,
	bannerHover: colour.whitef7,
	tabFont: colour.grey8f,
	tabFontHover: colour.blue,
	tabTip: colour.white,
	tabTipBg: colour.black85,
	tableHead: colour.grey93,
	tableSort: colour.blue,
	tdTitle: colour.black15,
	tdDesc: colour.grey93,
	tdType: colour.whitedd,
	tdBorder: colour.whitef8,
	tdHover: colour.bluef6,
	rateFont: colour.white,
	volumeFont: colour.blue26,
	volumeBg: colour.bluef0,

	title: colour.grey53,
	titleBorder: colour.whitef8,
	desc: colour.whitecc,
	ratio: colour.grey,
	ratioBg: colour.whiteee,
	ratioActive: colour.white,
	ratioActiveBg: colour.blue00,
	ratioBgHover: colour.whitee0,
	ratioActiveBgHover: colour.blue41,

	tabBorder: colour.whitef8,
	newsItemTitle: colour.black15,
	newsItemDesc: colour.grey93,
	newsItemAvatar: colour.whitee0,
	newsItemTime: colour.grey93,
	newsItemTime2: colour.blue,

	searchIcon: colour.grey8f,
	searchEmpty: colour.grey8f,

	tradeHeadDesc: colour.grey93,
	tradeBlack: colour.black15,

	loading: colour.whitef0,
	loadingFore: colour.whitede,
	error: colour.grey,
	caret: colour.blue26,
};

export const lightReverse = {
	...light,
	increase: colour.green,
	decrease: colour.red,
};

export const dark = {
	bg: colour.black0a,
	panelBg: colour.black151e,
	boldFont: colour.whited4,
	sidebarShadow: colour.shadowDark,
	sidebar: colour.blue1a,
	increase: colour.rede2,
	decrease: colour.green0b,
	bannerDesc: colour.grey51,
	bannerHover: colour.black0a,
	tabFont: colour.whitecf,
	tabFontHover: colour.blue3d,
	tabTip: colour.white,
	tabTipBg: colour.black85,
	tableHead: colour.grey99,
	tableSort: colour.blue3d,
	tdTitle: colour.whited4,
	tdDesc: colour.grey51,
	tdType: colour.whitedd,
	tdBorder: colour.grey,
	tdHover: colour.black0c,
	rateFont: colour.white,
	volumeFont: colour.blue26,
	volumeBg: colour.bluef0,

	title: colour.whitecc,
	titleBorder: colour.grey,
	desc: colour.grey66,
	ratio: colour.grey,
	ratioBg: colour.whiteee,
	ratioActive: colour.white,
	ratioActiveBg: colour.blue00,
	ratioBgHover: colour.whitee0,
	ratioActiveBgHover: colour.blue41,

	tabBorder: colour.grey,
	newsItemTitle: colour.whited4,
	newsItemDesc: colour.grey99,
	newsItemAvatar: colour.whitee0,
	newsItemTime: colour.grey99,
	newsItemTime2: colour.blue41,

	loading: colour.blue21,
	loadingFore: colour.blue31,
};

export const darkReverse = {
	...dark,
	increase: colour.green0b,
	decrease: colour.rede2,
};
