#!/bin/bash
# 安装依赖
npm install
# 执行单元测试
npm test

# 获取版本号
version=`cat package.json | grep version | awk -F \" '{print $4}'`

# tag 参数则直接发布，否则为snapshot版本
if [ "$2"x = "tag"x ]; then
    cnpm publish
else
    # 将版本号后面增加snapshot后缀
    oldVersion=$version
    version=$oldVersion-snapshot
    # 更改package.json中的version值
    sed -i s/$oldVersion/$version/g package.json
    # 所以如果存在对应的snapshot版本，则unpublish（由于cnpm发布重复的版本不会覆盖，只会报错）
    cnpm unpublish @IModules/$1/@$version
    # 发布snapshot版本
    cnpm publish
    # 恢复package.json
    sed -i s/$version/$oldVersion/g package.json
fi

# 生成jsdoc
jsdoc -c jsdoc.json
# jsdoc文档目录
source=./out/*
# 分发目录
dist=/var/jsdoc/$1/$version/
# 避免文件夹不存在，强制创建
mkdir -vp $dist
# 将jsdoc文档发布到分发目录
cp -R -f $source $dist