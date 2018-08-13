var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //数据库连接组件
var Goods = require('../models/goods');
mongoose.connect("mongodb://127.0.0.1:27017/vue_shop_db", {auto_reconnect: true});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //f分页查询
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err, doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'1',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
//非分页接口查询
  /*Goods.find({},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'1',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })*/
});

module.exports = router;
