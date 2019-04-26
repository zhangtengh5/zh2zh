//supervisor –harmony app


本地
//mongoexport -h localhost:27017 -d ztpc -c news -o E:\pc_node\mongoexport\news.json --type json
//mongoexport -h localhost:27017 -d ztpc -c users -o E:\pc_node\mongoexport\users.json --type json
mongoimport -h localhost:27017 -d ztpc -c news --file E:\pc_node\mongoexport\news.json --type json
mongoimport -h localhost:27017 -d ztpc -c users --file E:\pc_node\mongoexport\users.json --type json
服务器
//mongoimport -h 0.0.0.0:27017 -d ztpc -c news --file /ztServer/mongoexport/news.json --type json
//mongoimport -h 0.0.0.0:27017 -d ztpc -c users --file /ztServer/mongoexport/users.json --type json
本地服务器
//mongoimport -h 0.0.0.0:27017 -d ztpc -c news --file /webServer/ZT_PC/mongoexport/news.json --type json
//mongoimport -h 0.0.0.0:27017 -d ztpc -c users --file /webServer/ZT_PC/mongoexport/users.json --type json

//nginx

解压目录 /server/complie/nginx-v1.13.7/nginx-1.13.7
安装 ./configure --prefix=/server/runtime/nginx/1.13.7
安装目录 /server/runtime/nginx/1.13.7

运行目录 /server/daemon/nginx/1.13.7/80
./up.sh 开启
./down.sh 中断
ps -ef | grep nginx

mongodb
/server/complie/mongodb-linux-x86_64-v3.4.5/mongodb-linux-x86_64-3.4.5
安装目录 /server/runtime/mongodb/bin
数据目录 /server/data/zh2zh/mongodb/data
        /server/data/zh2zh/mongodb/logs
        /server/data/zh2zh/mongodb/logs/mongod.log
        /server/data/zh2zh/mongodb/mongodb.conf

/server/runtime/mongodb/bin/mongod --dbpath=/server/data/zh2zh/mongodb/data --logpath=/server/data/zh2zh/mongodb/logs/mongod.log --fork --logappend

export PATH=/server/runtime/mongodb/bin:$PATH

mongod --config /server/data/zh2zh/mongodb/mongodb.conf

mongoimport -h 0.0.0.0:27017 -d ztpc -c news --file /server/app/mongoexport/news.json --type json
mongoimport -h 0.0.0.0:27017 -d ztpc -c users --file /server/app/mongoexport/users.json --type json

/etc/init.d/nginx
/etc/rc.d/rc.local
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile

### widow下运行
net start MongoDB
net stop MongoDB
services.msc