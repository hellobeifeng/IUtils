/**
 * 字符串处理工具类
 * @constructor
 */
var StringUtil = function(){};

/**
 * 将参数拼接到url后，返回新的url
 * @param   {String}  url     拼接参数前的url
 * @param   {Object}  params  需要被拼接的参数字典
 * @return  {String}          拼接参数后的url
 */
StringUtil.buildUrlWithParams = function(url, params) {
  url = url || "";
  if (params) {
    for(var key in params) {
      if (url.indexOf('?') < 0) {
        url += ('?' + key + '=' + encodeURI(params[key]));
      } else {
        url += ('&' + key + '=' + encodeURI(params[key]));
      }
    }
  }
  return url;
};

/**
 * 将字符串的某一段替换为*
 * @param {String} text    替换前的字符串
 * @param {Number} start   替换的起始位置
 * @param {Number} end     替换的结束位置
 * @returns {String} 替换后的字符串
 */
StringUtil.replaceByStar = function (text, start, end) {
  text += "";
  if (!text) {
    return '--';
  }
  start = start < 0 ? 0 : start;
  start = start >= text.length ? text.length - 1 : start;
  end = end < 0 ? 0 : end;
  end = end >= text.length ? text.length - 1 : end;
  var pre = text.substr(0, start);
  var after = text.substr(end);
  var middle = text.substr(0, end - start).replace(/[0-9]/g, '*');
  return pre + middle + after;
};

module.exports = exports = StringUtil;