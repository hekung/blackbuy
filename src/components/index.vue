<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key='item.id'>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>

                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="ele in item.subcates" :key='ele.id'>
                                                {{ele.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd v-for="ele in item.subcates" :key='ele.id'>
                                                <a href="/goods/43.html">{{ele.title}}</a>
        
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705" style="height: 341px;">
                       <el-carousel :interval="4000" type="card">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                  <img :src="item.img_url" alt="" style="width:100%;">
                             </el-carousel-item>
                         </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in toplist" :key='item.id'>
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | shortTime}}</span>
                                </div>
                            </li>
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section"  v-for="item in messageList" :key='item. level1cateid'>
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <!-- <a href="/goods/43.html">手机通讯</a> -->
                    <a href="/goods/43.html" v-for="ele in item.level2catelist" :key='ele.subcateid'>{{ele.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for='elee in item.datas' :key='elee.artID'>
                            <!-- <a ：href="#/site/goodsinfo/87" class=""> -->
                            <router-link :to="'/detail/'+elee.artID">
                                 <div class="img-box">
                                    <img :src="elee.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{elee.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{elee.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{elee.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{elee.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                               
                            <!-- </a> -->
                        </li>
                      
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
// 导入 axios
export default {
  name: 'index',
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      messageList: []
    }
  },
  created() {
    this.$axios
      .get('http://111.230.232.110:8899/site/goods/gettopdata/goods')
      .then(response => {
        console.log(response);
        this.catelist = response.data.message.catelist
        this.sliderlist = response.data.message.sliderlist
        this.toplist = response.data.message.toplist
      })
    this.$axios
      .get('http://111.230.232.110:8899/site/goods/getgoodsgroup')
      .then(response => {
        console.log(response)
        this.messageList = response.data.message
        
      })
  },
  
}
</script>
<style>
</style>