var redis= require("redis");
var client = redis.createClient();
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('connect',function(err){
	if(err) console.log("not able to connect");
	console.log("connected");
});

client.RPUSH("myval","one",redis.print);

// connect, close,get client 
// redis lists
//append
//remove
//get 

//redis sets
exports.writeahash=function(val,list,id){
	client.hset("list","id","val",function(err,reply){
		if(err) console.log(err);
		else console.log(reply)
	})
}
exports.deleteafield=function(id,list){
	client.hdel("list","id",function(err,data){
		if(err)console.log(err);
		else console.log(data);
	})
}
exports.readfield=function(id,mylist){
	client.hget("mylist","id",function(err,data){
		if(err) console.log(err);
		else console.log(data);
	})
}

//read multiple field values at same time use hmget
exports.read=function(id1,id2,list){
	client.hmget("list","id1","id2",function(err,result){
		if(err) console.log(err);
		else console.log(result);
	})
	}

//increment
client.incrementavalue=function(value,field,mylist){
	client.hincrby("mylist","field",value,function(err,data){
		if(err) console.log(err);
		console.log(data);
	})
}

exports.redispromise = function(field,mylist){

return client.getAsync('mylist','field').then(function(res) {
    console.log(res); // 
});}


client.quit();


