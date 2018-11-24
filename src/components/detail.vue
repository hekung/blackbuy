<template>
    <div>
         <BackTop></BackTop>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount"  :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                 <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;"  @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"  @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                             </Affix>
                            
                            <div class="tab-content entry" v-show='tabIndex==0' v-html="goodsinfo.content">
                
                            </div>
                            <div class="tab-content" v-show='tabIndex==1'>
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalCommentCount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for='item in commentList' :key='item.id'>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | formatTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        <!-- <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li> -->
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;" >
                                         <!-- iview的分頁組件 -->
                                         <Page
                                            v-if='totalCommentCount>0'
                                            :current='1'
                                            @on-change='pageChange' 
                                            @on-page-size-change='pageSizeChange'
                                            :total="totalCommentCount" 
                                            show-sizer 
                                            show-elevator 
                                            show-total 
                                            size="small" 
                                            placement='top' 
                                            :page-size-opts='[5,10,15,20,25,30]' 
                                            :page-size='pageSize'/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in hotgoodList' :key ='item.id'>
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <!-- <img :src="item.img_url"> -->
                                            <!-- </a> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | formatTime }}</span>
                                        </div>
                                    </li>
                                    <!-- <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/91" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200214471783.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/91" class="">尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/92" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200225107390.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/92" class="">联想（Lenovo） G510AM 15.6英寸笔记本电脑</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/93" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/201504200341260763.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/93" class="">Apple iMac MF883CH/A 21.5英寸一体机电脑</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/94" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200239192345.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/94" class="">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/97" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200258403759.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/97" class="">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/102" class="">
                                                <img src="http://39.108.135.214:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/102" class="">Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣</a>
                                            <span>2017-09-13</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/103" class="">
                                                <img src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/103" class="">骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫衣</a>
                                            <span>2017-09-26</span>
                                        </div>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'detail',
  data: function() {
    return {
      goodsinfo: {},
      hotgoodList: [],
      imgList: [],
      buyCount: 1,
      tabIndex: 0,
      commentList: [],
      artID: '',
      totalCommentCount: 0,
      pageIndex: 1,
      pageSize: 10
    }
  },
  methods: {
    initData() {
      
      this.artID = this.$route.params.artID
      let that = this
      this.$axios
        .get('http://111.230.232.110:8899/site/goods/getgoodsinfo/' +this.artID)
        .then(response => {
        //   console.log(response)
          this.goodsinfo = response.data.message.goodsinfo
          this.hotgoodList = response.data.message.hotgoodslist
          this.imgList = response.data.message.imgList
        }).then(response=>{
            this.pageIndex = 1
            this.pageSize = 10
            this.queryComment(1,10)
        })
            
         
    },
    queryComment(pageIndex,pageSize) {
        this.$axios
        .get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID}?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        .then(response => {
          console.log(response)
          this.commentList = response.data.message
          this.totalCommentCount = response.data.totalcount
        })
    },
    pageChange(pageIndex) {
        console.log(pageIndex)
        this.pageIndex = pageIndex
        this.queryComment(this.pageIndex,this.pageSize)
    },
    pageSizeChange(pageSize) {
        this.pageSize = pageSize
        this.queryComment(this.pageIndex,this.pageSize)
    }
  },
  beforeCreate() {
      this.totalCommentCount = 0
  },
  created() {
    this.initData()
  },
  watch: {
    $route(newVal, oldVal) {
      this.initData()
    }
  }
}
</script>
<style lang="">
</style>