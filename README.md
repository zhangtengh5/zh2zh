# zh2zh
NodeJS + express + swig + ueditor + 线上部署 
ssh -A -p 22 root@192.168.1.248
###授予权限
```
chmod a+x s.sh
```
###vi
```
i ->可编辑
:wq -> 保存退出
:q -> 直接退出
:q! -> 强制退出
dd ->命令模式 删除一行
```
###查看文件
```
more filename //分屏
cat filename
```
### pwd
```
pwd 返回当前目录
```
### copy
```
cp file 路径
```
### move
```
mv filename newfilename
```

###环境变量
```
source /ect/profile 生成命令
```

###开机启动
```
/etc/ more rc.local
```

###解压/压缩
```
tar -xzvf 解压包
tar -xzf 解压包省略过程
tar -czvf 压缩
```

###删除 先备份
```
mv  filename filename.bak.时间
rm -fr filename  
```

###查看目录
```
ls -lh
```
###查看硬盘
```
df -h
```
###目录
```
/usr/local 
/opt/

/opt/data //数据库日志
```

### network innerface
address IP地址
netmask 255.255.255.0 子网掩码
gateway 网关 192.168.1.1

### window

dir
mkdir 
rmdir /s /q 目录