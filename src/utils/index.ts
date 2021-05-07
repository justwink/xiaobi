import { DefaultObject, IndexCoinOrigin, IndexCoinData } from '@InterFace/index';
import { dark, light, lightReverse, darkReverse } from '@Styles/theme';

type FormatCoin = (data: IndexCoinOrigin) => IndexCoinData | null;

type FormatCoinList = (data: DefaultObject) => { [key: string]: IndexCoinData[] };

type ConcatData<T> = (newArr: T[], oldArr: T[]) => T[];

type MatchCoinData<T, P extends keyof T> = (keys: string[], list: T[], key: P) => T[];

type UniqueData<T, P extends keyof T> = (arr: T[], key: P) => T[];

type ConvertCNUnit = (origin: string | number) => string | number;

// 币种过滤
export const coinTypeFilter = (s: string) => {
	const coinTypeReg = /(.*)(usdt|btc|husd|eth|ht|alts)$/;
	const valid = coinTypeReg.exec(s);

	return valid;
};

// 解析币种symbol 归类
export const formatCoinCategory: FormatCoinList = (data) => {
	const itemList = Object.values(data);

	const result = itemList.reduce((synthesis, item) => {
		const { s } = item;
		const valid = coinTypeFilter(s);

		if (valid) {
			const [_, __, k] = valid;
			const key = k.toLocaleUpperCase();
			const res = formatCoin(item);

			if (!synthesis[key]) {
				synthesis[key] = [];
			}
			synthesis[key].push(res);
		}
		return synthesis;
	}, {});

	return result;
};

// 格式化coin
export const formatCoin: FormatCoin = (data) => {
	const { a, h, l, o, r, s, v, c, co } = data;
	const valid = coinTypeFilter(s);

	if (valid) {
		const [_, name, k] = valid;
		const key = k.toLocaleUpperCase();

		return {
			amount: convertNumber(a),
			open: convertNumber(o),
			high: convertNumber(h),
			low: convertNumber(l),
			rate: convertNumber(r),
			symbol: name.toLocaleUpperCase(),
			value: convertNumber(v),
			count: convertNumber(co),
			close: convertNumber(c),
			type: key,
		};
	}

	return null;
};

// 更新合并数据
export const concatData: ConcatData<DefaultObject> = (newArr, oldArr) => {
	if (newArr.length >= oldArr.length) {
		return newArr;
	}

	const result = oldArr.map((item) => {
		const curr = newArr.find((v) => v.symbol === item.symbol);

		return curr ? curr : item;
	});

	return result;
};

// 科学计数方式转正常
export const convertNumber: (num: number) => string | number = (num) => {
	if (isNaN(num)) {
		return num;
	}

	const str = '' + num;
	if (!/e/i.test(str)) {
		return num;
	}

	return num.toFixed(18).replace(/\.?0+$/, '');
};

// 传入所需币种，返回相应数据
export const matchCoinData: MatchCoinData<IndexCoinData, keyof IndexCoinData> = (keys, list, key) => {
	const keysMap: any = keys.reduce((o, k) => ({ ...o, [k]: key }), {});

	return list.filter((v) => keysMap[v[key] || '']);
};

// 传入一个对象数组及判断的属性名，返回去重数据
export const uniqueData: UniqueData<IndexCoinData, keyof IndexCoinData> = (arr, key) => {
	const map = new Map();
	const res = [];

	for (let i = 0, len = arr.length; i < len; i++) {
		const item = arr[i];
		const k = item[key];
		if (!map.has(k)) {
			res.push(item);
			map.set(k, 1);
		}
	}

	return res;
};

// 中文单位数据换算
export const convertCNUnit: ConvertCNUnit = (origin) => {
	const ori = Number(origin);
	if (ori < 1) {
		return Number(ori.toFixed(10));
	} else if (ori < 10) {
		return Number(ori.toFixed(6));
	} else if (ori < 1000) {
		return Number(ori.toFixed(4));
	} else if (ori < 1000000) {
		return Number(ori.toFixed(2));
	} else if (ori < 100000000) {
		return Number((ori / 10000).toFixed(2)) + '万';
	} else {
		return Number((ori / 100000000).toFixed(2)) + '亿';
	}
};

// 获取主题
export const matchTheme = ({ theme, crease }: DefaultObject) => {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (!theme) {
		return crease ? light : lightReverse;
	} else if (theme === 1) {
		return crease ? dark : darkReverse;
	} else {
		return isDark ? (crease ? dark : darkReverse) : crease ? light : lightReverse;
	}
};

// 时间转换
export const formatTime = (ts: number | string, cFormat?: string) => {
	if (typeof ts === 'string' && /^[0-9]+$/.test(ts)) {
		ts = parseInt(ts);
	}
	if (typeof ts === 'number' && ts.toString().length === 10) {
		ts = ts * 1000;
	}

	const date = new Date(ts);

	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
	const formatObj: DefaultObject = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	};
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key];
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value];
		}
		return value.toString().padStart(2, '0');
	});
	return time_str;
};

// 获取数组指定字段最大值
export const findArrMax = (arr: any[], field: string) => {
	const temp = arr.slice(0);
	const result = temp.sort((a, b) => b[field] - a[field]);
	const max = +result[0][field];
	const min = +result[result.length - 1][field];

	return {
		max,
		min,
	};
};
