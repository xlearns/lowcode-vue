import * as dft from "./default";
import * as styleFormConfig from "./style-form-config";
export const WIDGE_LIST = [
  {
    type: "text",
    component: "customText",
    label: "文字",
    default: dft.TEXT_DATA,
    styles: dft.TEXT_STYLE,
    styleForm: styleFormConfig.TEXT,
  },
  {
    type: "bar",
    component: "customEchartsBar",
    label: "柱形图",
    default: dft.ECHARTSBAR_DATA,
    styles: dft.ECHARTSBAR_STYLE,
    styleForm: styleFormConfig.BAR,
  },
  {
    type: "pie",
    component: "customEchartsPie",
    label: "饼图",
    default: dft.ECHARTSPIE_DATA,
    styles: dft.ECHARTSPIE_STYLE,
    styleForm: styleFormConfig.PIE,
  },
];
