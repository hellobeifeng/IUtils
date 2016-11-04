var StringUtil = require('./StringUtil');
/**
 * 日期、金额等格式化工具类
 * @constructor
 */
var FormatUtil = function(){};



/**
 * @description                 隐藏中间位数，如130986456132564568格式化后为130***********4568
 * @param {String} value        格式化前的手机号
 * @returns {String}            格式化后的手机号
 *
 * @example
 * // returns 130***********4568
 * formatUtil.formatID(130986456132564568)
 */
FormatUtil.formatID = function (value) {
  return FormatUtil.formatMobile(value);
};
/**
 * @description                 隐藏中间位数，如15010059281格式化后为150****9281
 * @param {String} value        格式化前的手机号
 * @returns {String}            格式化后的手机号
 *
 * @example
 * // returns 150****9281
 * formatUtil.formatMobile(15010059281)
 */
FormatUtil.formatMobile = function (value) {
  var mobile = value + "";
  if (!mobile || mobile.length < 4) {
    return mobile;
  }
  return StringUtil.replaceByStar(mobile, 3, mobile.length - 4);
};

/**
 * 格式化金额，根据参数保留一定的位数
 * @param {Number} s        格式化前的金额
 * @param {Number} n        要保留的位数
 * @param {String} replace  金额为空或NaN时的默认显示
 * @returns {*}
 */
FormatUtil.formatMoney = function (s, n, replace) {
  replace = replace || '--';
  if(!s){
    return replace;
  }
  if (isNaN(s)) {
    return replace;
  }
  var isNegtive = false;
  if(s < 0) {
    isNegtive = true;
    s = s * -1;
  }
  try {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    r = r ? '.' + r : '';
    var result =  t.split("").reverse().join("") + r;
    if(isNegtive) {
      result = '-' + result;
    }
    return result;
  }
  catch (e) {
    return replace;
  }
};

/**
 * @private
 */
FormatUtil.formatWan = function (s) {
  s = s / 10000;
  return FormatUtil.formatMoney(s, 0);
};
/**
 * @private
 */
FormatUtil.formatYi = function (s) {
  s = s / 100000000;
  return FormatUtil.formatMoney(s, 0);
};
/**
 * 格式化金额，带单位
 * @param money
 * @returns {string}
 */
FormatUtil.moneyUnit = function(money) {
  if (parseInt(money) < 10000) {
    return FormatUtil.formatMoney(money, 0) + '元'
  } else if (parseInt(money) < 100000000) {
    return FormatUtil.formatWan(money) + '万元'
  } else {
    return FormatUtil.formatYi(money) + '亿元'
  }
};
/**
 * 按照yyyy-MM-dd格式格式化日期
 * @param {int} date 毫秒数
 * @returns {String}
 *
 * @example
 * // return 2015-02-04
 * formatUtil.formatDate(1426545645644)
 */
FormatUtil.formatDate = function (date) {
  return FormatUtil.formatTime(date, 'yyyy-MM-dd');
},
/**
 * 按照yyyy.MM.dd格式格式化日期
 * @param {int} date 毫秒数
 * @returns {String}
 *
 * @example
 * // returns 2015.02.04
 * formatUtil.formatDate(1426545645644)
 */
FormatUtil.formatDateByDot = function (date) {
  return FormatUtil.formatTime(date, 'yyyy.MM.dd');
};
/**
 * 按照MM.dd格式格式化日期
 * @param {int} date 毫秒数
 * @returns {String}
 *
 * @example
 * // returns 02.04
 * formatUtil.formatDate(1426545645644)
 */
FormatUtil.formatDateByDotWithoutYear = function (date) {
  return FormatUtil.formatTime(date, 'MM.dd')
},
/**
 * 格式化时间
 * @param {int}  date  毫秒数
 * @param {String}  fmt   格式，默认为yyyy-MM-dd hh:mm:ss
 * @returns {String} 格式化的结果
 *
 * @example
 * // returns 2015-02-04 14:25:36
 * formatUtil.formatDate(1426545645644)
 */
FormatUtil.formatTime =  function (date, fmt) {
  if (!date) {
    return '--';
  }
  if (typeof date == 'string') {
    date = parseInt(date);
  }
  date = new Date(date);
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  var o = {
    "M+": date.getMonth() + 1,                    //月份
    "d+": date.getDate(),                         //日
    "h+": date.getHours(),                        //小时
    "m+": date.getMinutes(),                      //分
    "s+": date.getSeconds(),                      //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),  //季度
    "S": date.getMilliseconds()                   //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

  if (fmt.indexOf('0') == 0) {
    fmt = fmt.substr(1);
  }
  return fmt;
};

module.exports = exports = FormatUtil;