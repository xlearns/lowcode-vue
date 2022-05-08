import * as dft from "./default";
import * as styleFormConfig from "./style-form-config";
/*
type:
carousel  轮播
media 多媒体
text 文本
border 边框
echarts 图表
map 地图
3d  3d
elementPlus  element-plus
other 其它
*/

export const WIDGE_LIST = [
  {
    type: "text",
    component: "customText",
    label: "文字",
    url: "/img/text1.png",
    default: dft.TEXT_DATA,
    styles: dft.TEXT_STYLE,
    styleForm: styleFormConfig.TEXT,
  },
  {
    type: "echarts",
    component: "customEchartsBar",
    label: "柱形图",
    url: "/img/echarts1.png",
    default: dft.ECHARTSBAR_DATA,
    styles: dft.ECHARTSBAR_STYLE,
    styleForm: styleFormConfig.BAR,
  },
  {
    type: "echarts",
    url: "/img/echarts2.png",
    component: "customEchartsPie",
    label: "饼图",
    default: dft.ECHARTSPIE_DATA,
    styles: dft.ECHARTSPIE_STYLE,
    styleForm: styleFormConfig.PIE,
  },
  {
    type: "border",
    url: "/img/border1.png",
    component: "customBorderBox1",
    label: "边框",
    default: dft.ECHARTSPIE_DATA,
    styles: dft.ECHARTSPIE_STYLE,
    styleForm: styleFormConfig.BORDER,
  },
  {
    type: "elementPlus",
    url: "/img/elementplus1.png",
    component: "customElementUiButton",
    label: "按钮",
    value: "hello world!",
    default: dft.ECHARTSPIE_DATA,
    styles: dft.ECHARTSPIE_STYLE,
    styleForm: styleFormConfig.BTN,
  },
];
