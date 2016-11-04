// 文档:http://chaijs.com/api/bdd/
var chai = require("chai");
var should = require('chai').should();

var format = require('./index').formatUtil;
var StringUtil = require('./index').stringUtil;

/**
 * StringUtil
 */

describe('测试StringUtil', function(){
  it('should well build url with params', function() {
    return StringUtil.buildUrlWithParams('http://www.baidu.com/?s=1', {b:2,a:3}).should.to.equal('http://www.baidu.com/?s=1&b=2&a=3');
  });

  it('should well build url with params if params is null', function() {
    return StringUtil.buildUrlWithParams('http://www.baidu.com/?s=1').should.to.equal('http://www.baidu.com/?s=1');
  });
});

/**
 * 格式化金额
 */
describe('测试格式化金额', function(){
  it('should well format null', function(){
    return format.formatMoney(null).should.to.equal('--');
  });

  it('should well format undefinde', function(){
    return format.formatMoney(undefined).should.to.equal('--');
  });

  it('should well format NaN', function(){
    return format.formatMoney('abc').should.to.equal('--');
  });

  it('should well format int numbers with default float limit 2', function(){
    return format.formatMoney(123456).should.to.equal('123,456.00');
  });

  it('should well format negvite numbers', function(){
    return format.formatMoney(-123456).should.to.equal('-123,456.00');
  });

  it('should well format float numbers with default float limit 2', function(){
    return format.formatMoney(123456.025).should.to.equal('123,456.02');
  });

  it('should well format by float limit less than input', function(){
    return format.formatMoney(123456.025, 1).should.to.equal('123,456.0');
  });

  it('should well format by float limit more than input', function(){
    return format.formatMoney(123456.025, 4).should.to.equal('123,456.0250');
  });
  // 带单位
  it('should well format money with unit', function(){
    return format.moneyUnit(1000).should.to.equal('1,000元');
  });

  it('should well format money with unit', function(){
    return format.moneyUnit(100000).should.to.equal('10万元');
  });

  it('should well format money with unit', function(){
    return format.moneyUnit(1000000000).should.to.equal('10亿元');
  });

});


/**
 * 格式化日期
 */
describe('测试格式化日期时间', function(){
  it('should well format date', function(){
    return format.formatDate(1463399090000).should.to.equal('2016-05-16');
  });

  it('should well format time', function(){
    return format.formatTime(1463399090000).should.to.equal('2016-05-16 19:44:50');
  });

  it('should well format time if input is string', function(){
    return format.formatTime('1463399090000').should.to.equal('2016-05-16 19:44:50');
  });

  it('should well format date with out year', function(){
    return format.formatDateByDotWithoutYear(new Date(1463399090000)).should.to.equal('5.16');
  });

  it('should well format date by dot', function(){
    return format.formatDateByDot(new Date(1463399090000)).should.to.equal('2016.05.16');
  });
});

/**
 * 格式化其他
 */
describe('测试其他', function(){
  it('should well format idNo replace by start', function(){
    it('should well format mobile replace by star', function(){
      return format.formatID('130986456132564568').should.to.equal('130***********4568');
    });
  });

  it('should well format mobile replace by start', function(){
    return format.formatMobile('15010052654').should.to.equal('150****2654');
  });
});