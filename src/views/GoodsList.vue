<template>
  <div class="hello">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur" @click="defaultsortGoods">默认</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods" v-bind:class="{'sort-up':sortFlag}">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby" @click.stop="showFilterPop">筛选</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter" id="filter" v-bind:class="{'filterby-show':filterBy==true}">
            <dl class="filter-price">
              <dt>价格区间:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceCheck=='all'}">选择价格</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceCheck==index}">￥ {{item.startPrice}} - {{item.endPrice}}元</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="20">
              <img src="/static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <nav-footer></nav-footer>

  </div>
</template>

<script>
  import './../assets/css/base.css'
 /* import './../assets/css/nav-bread.css'*/
/*  import './../assets/css/nav-header.css'*/
 /* import './../assets/css/nav-footer.css'*/
  import './../assets/css/goods-list.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import axios from 'axios'
  /*var express = require('express')
  var app = express();
  const router = express.Router();*/
  export default {
   // name: 'HelloWorld',
    data () {
      return {
        goodsList: [],
        page:1,
        pageSize:5,
        sortFlag:true,
        busy:false,
        loading:false,
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'100.00'
          },
          {
            startPrice:'100.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          },
          {
            startPrice:'2000.00',
            endPrice:'3000.00'
          },
          {
            startPrice:'3000.00',
            endPrice:'6000.00'
          }
        ],
        priceCheck:'all',
        filterBy:false,
        overLayFlag:false
      }
    },
     components:{
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted(){
      this.getGoodsList();
    },
    methods:{
      getGoodsList(flag){
        var param = {
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1
        }
        axios.get('http://localhost:3000/goods',{
          params:param
        }).then((result)=>{
          this.loading = false;
           var data=result.data.result;
          console.log(result);
        if(result.data.status == "1"){
           if(flag){
               this.goodsList = this.goodsList.concat(data.list);
                if(data.count == 0){//没有数据
                    this.busy = true;
                }else{
                  this.busy = false;
                }
             }else{
               this.goodsList=data.list;
             }
          }else{
            this.goodsList= [];
          }

        })
      },
      setPriceFilter(index){
        this.priceCheck=index;
      },
      showFilterPop(){
        this.filterBy=true;
        this.overLayFlag=true;
      },
      closePop(){
        this.filterBy=false;
        this.overLayFlag=false;
      },
      sortGoods(){
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      defaultsortGoods(){
        this.sortFlag = true;
        this.page = 1;
        this.getGoodsList();
      },
     // 滚动加载函数
        loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 500)
        },
    }
  }
</script>


