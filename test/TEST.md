Create the hello htmlapp
=======================

```
curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" -d '{"name":"b_helloapp","accountId":"'$ACCOUNTID'","verbs":["select","insert","update","delete"]}' $SERVER/$ACCOUNTID/s/grant_bucket

echo "<htlm><body><h1>Hello World</h1></body></html>" > hello.html
echo 'init = function() { console.log("init function");};' > hello.js
echo 'body {background: rgba(234, 159, 195, 0.8);}' > hello.css

curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" -d @hello.html $SERVER/$ACCOUNTID/b_helloapp\$hello.html
curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" -d @hello.css $SERVER/$ACCOUNTID/b_helloapp\$hello.css
curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" -d @hello.js $SERVER/$ACCOUNTID/b_helloapp\$hello.js

curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" $SERVER/$ACCOUNTID/b_helloapp\$hello.html
curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" $SERVER/$ACCOUNTID/b_helloapp\$hello.css
curl -H "user: $ACCOUNTID" -H "password: $PASSWORD" $SERVER/$ACCOUNTID/b_helloapp\$hello.js

rm hello.*
```
