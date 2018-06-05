<template>
  <div class='nav' :style='{"width": navWidth + "px"}'>
    <div class="switchBtn" :class='switchFlag ? "el-icon-d-arrow-left": "el-icon-d-arrow-right"' @click='switchNav(switchFlag)'></div>
    <ul class='navBox' v-if="content">
      <li v-for='(list,index) in navLists' :key='index'>
        <div class="navFather clearfix" @click.stop='changeNav(0,index,0,list.path)' :class='[{"active": list.isActive}]'>
          <i v-if="icon!=index"><img :src="list.imgUrl">1</i>
          <i v-if="icon==index"><img :src="list.iconUrl">2</i>
          <!-- <h5 v-show='switchFlag'>{{list.name}}</h5> -->
          <h5 :class='{"disapear": !switchFlag}'>{{list.name}}</h5>
          <span v-if='list.children.length != 0' :class='[{"el-icon-arrow-down": list.isShow},{"el-icon-arrow-right": !list.isShow},{"disapear": !switchFlag}]'></span>
        </div>
        <ul v-if='list.children.length != 0' v-show='list.isShow' style='height: auto;'>
          <li v-for='(data,ind) in list.children' :key='ind' class='navSon' @click.stop='changeNav(1,index,ind,data.path)' :class='[{"active": data.isActive},{"disapear": !switchFlag}]'>
            <h5 @click='toView(data.path)'>{{data.name}}</h5>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navWidth: 200,
      switchFlag: true,
      content: true,
      icon: '',
      navLists: [
        {
          name: "总览",
          path: "/yw/general",
          imgUrl: "/static/img/copy2x.png",
          iconUrl: "/static/img/copy12x.png",
          children: [],
          isActive: false,
          isShow: true
        },
        {
          name: "报警",
          path: "",
          imgUrl: "/static/img/jingcopy@2x.png",
          iconUrl: "/static/img/jinggao.png",
          isActive: false,
          isShow: true,
          children: [
            {
              name: "AI报警",
              path: "/yw/aiAlert",
              isActive: false
            },
            {
              name: "站端报警",
              path: "/yw/stationAlert",
              isActive: false
            }
          ]
        },
        {
          name: "运行",
          path: "",
          imgUrl: "/static/img/yunxing1 (1).png",
          iconUrl: "/static/img/yunxing2.png",
          isActive: false,
          isShow: true,
          children: [
            {
              name: "能效",
              path: "/yw/nengxiao",
              isActive: false
            },
            {
              name: "实时能流",
              path: "/yw/nengliu",
              isActive: false
            },
            {
              name: "产耗能",
              path: "/yw/chanhaoneng",
              isActive: false
            }
          ]
        },
        {
          name: "设备",
          path: "/yw/equipment",
          imgUrl: "/static/img/Shape Copy@2x.png",
          iconUrl: "/static/img/Shape@2x.png",
          children: [],
          isActive: false,
          isShow: true
        },
        {
          name: "单站",
          path: "/yw/stationlists",
          imgUrl: "/static/img/dd.png",
          iconUrl: "/static/img/dd1.png",
          children: [],
          isActive: false,
          isShow: true
        },
        {
          name: "设置",
          path: "",
          imgUrl: "/static/img/shezhi (1).png",
          iconUrl: "/static/img/shezhi (2).png",
          isActive: false,
          isShow: true,
          children: [
            {
              name: "报警分级",
              path: "/yw/baojingfenji",
              isActive: false
            },
            {
              name: "报警分流",
              path: "/yw/baojingfenliu",
              isActive: false
            },
            {
              name: "诊断分流",
              path: "/yw/zhenduanfenliu",
              isActive: false
            }
          ]
        },
        {
          name: "自定义指标",
          path: "/yw/customnorm",
          imgUrl: "",
          iconUrl: "",
          children: [],
          isActive: false,
          isShow: true
        },
        {
          name: "物联数据",
          path: "/yw/instrumented",
          imgUrl: "",
          iconUrl: "",
          children: [],
          isActive: false,
          isShow: true
        },
        {
          name: "拓扑能量流",
          path: "/yw/tuopunengliangliu",
          imgUrl: "",
          iconUrl: "",
          children: [],
          isActive: false,
          isShow: true
        }
      ]
    };
  },
  created() {
    let num = window.location.href.indexOf("/yw");
    let str = window.location.href.slice(num);
    this.serilize(this.navLists, str);
  },

  mounted() {},

  methods: {
    toView(){},
    changeNav(flag, index, ind, path) {
      this.icon = index;
      if (path != "") {
        this.$router.push(path);
      }
      this.serilize(this.navLists);
      this.$router.push(path);
      if (flag == 0) {
        this.navLists[index].isShow = !this.navLists[index].isShow;
        this.navLists[index].isActive = true;
      } else if (flag == 1) {
        if (typeof ind == "number") {
          this.navLists[index].children[ind].isActive = true;
        }
      }
    },
    switchNav(flag) {
      if (flag) {
        this.navWidth = 15;
      } else {
        this.navWidth = 200;
      }
      this.switchFlag = !this.switchFlag;
      this.content = !this.content;
    },
    serilize(arr, path) {
      let that = this;
      arr.forEach(function(data, index) {
          if (path == data.path) {
          data.isActive = true;
        } else {
          data.isActive = false;
        }
        if (data.children && data.children.length != 0) {
          that.serilize(data.children);
        }
      });
    }
  },

  components: {}
};
</script>

<style scoped lang='less'>
.nav {
  background: rgba(26, 27, 37, 1);
  color: #ffffff;
  transition: all 0.3s;
  .switchBtn {
    width: 100%;
    height: 50px;
    color: rgba(255, 255, 255, 0.6);
    box-sizing: border-box;
    line-height: 50px;
    cursor: pointer;
    background-color: #1a1b25;
  }
}
.navFather {
  height: 49px;
  line-height: 49px;
  // display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid #0e0f1a;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  i:nth-child(1) {
    width: 15px;
    height: 15px;
    float: left;
    margin: 8px 20px 0 26px;
    img {
      width: 15px;
      height: 15px;
    }
  }
  h5 {
    width: 112px;
    float: left;
    white-space: nowrap;
    transition: all 0.3s;
    &.disapear {
      transform: translateX(-200px);
    }
  }
  span:nth-child(3) {
    margin-right: 15px;
    transition: all 0.8s;
    &.disapear {
      transform: translateX(200px);
      display: none;
    }
  }
  &.active {
    background-color: #0e0f1a;
    h5 {
      color: #34a9ff;
    }
  }
  &.active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 50px;
    background: linear-gradient(
      -90deg,
      rgba(52, 169, 255, 1),
      rgba(2, 159, 225, 1)
    );
  }
}
.navSon {
  height: 49px;
  line-height: 49px;
  cursor: pointer;
  padding-left: 60px;
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #0e0f1a;
  // transition: all 0.3s;
  &.disapear {
    height: 0px;
    display: none;
    border-bottom: none;
    transform: translateX(-200px);
  }
  &.active {
    color: #34a9ff;
    background-color: #0e0f1a;
  }
  &.active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 50px;
    background: linear-gradient(
      -90deg,
      rgba(52, 169, 255, 1),
      rgba(2, 159, 225, 1)
    );
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}
@keyframes disapearAnimation {
  from {
    opacity: 0;
  }
  to {
    background: 1;
  }
}
</style>