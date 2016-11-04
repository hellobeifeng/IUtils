### IUtils 摘要

一个JavaScript编写的工具方法集合，目前包含字符串操作，格式化工具类，还包含如下知识点

- jsdoc 标签和文档生成
- cnpm 版本发布自动化脚本
- mocha 单元测试

会持续更新~

### 如何使用
	npm install

	var StringUtil = require('@IModules/IUtils').stringUtil;
	
	var resultParams = {
		id: '001',
		type: 'offline'
	}
	var resultUrl = StringUtil.buildUrlWithParams('http://www.example.com', resultParams);
	// http://www.example.com?id=001&type=offline
	