<template>
  <div class="hello">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby">筛选</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter" id="filter">
            <dl class="filter-price">
              <dt>价格区间:</dt>
              <dd><a href="javascript:void(0)">选择价格</a></dd>
              <dd>
                <a href="javascript:void(0)">￥ 0 - 100 元</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'/static/'+item.productImage" alt=""></a>
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
          </div>
        </div>
      </div>
    </div>
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
  export default {
   // name: 'HelloWorld',
    data () {
      return {
        goodsList: [{
          "productId":"10001",
          "productName":"小米空气净化器 2",
          "salePrice":"699",
          "productImage":"小米空气净化器 2.jpg"
        }]
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread
    }
  }
</script>


