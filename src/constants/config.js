import * as dft from "./default";
import * as styleFormConfig from "./style-form-config";
export const WIDGE_LIST = [
  {
    type: "text",
    component: "customText",
    label: "文字",
    url: "http://oss-chart.ppchart.com/ecg-storage/ec_gallery_thumbnail/xFkzKG-bpl.jpg",
    default: dft.TEXT_DATA,
    styles: dft.TEXT_STYLE,
    styleForm: styleFormConfig.TEXT,
  },
  {
    type: "bar",
    component: "customEchartsBar",
    label: "柱形图",
    url: "http://oss-chart.ppchart.com/ecg-storage/ec_gallery_thumbnail/xFkzKG-bpl.jpg",
    default: dft.ECHARTSBAR_DATA,
    styles: dft.ECHARTSBAR_STYLE,
    styleForm: styleFormConfig.BAR,
  },
  {
    type: "pie",
    url: "http://oss-chart.ppchart.com/ecg-storage/ec_gallery_thumbnail/xFkzKG-bpl.jpg",
    component: "customEchartsPie",
    label: "饼图",
    default: dft.ECHARTSPIE_DATA,
    styles: dft.ECHARTSPIE_STYLE,
    styleForm: styleFormConfig.PIE,
  },
];
