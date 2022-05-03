export const EchartsData = {
  bar: {
    title: {
      text: "第一个 ECharts 实例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫1", "羊毛衫2", "雪纺衫3", "裤子4", "高跟鞋5", "袜子1"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [500, 2000, 3600, 1000, 1000, 2000],
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: "rgba(255, 255, 255,1)",
          },
        },
      },
    ],
  },
  pie: {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    },
    title: {
      text: "Traffic Sources",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} &lt;br/&gt;{b} : {c} ({d}%)",
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "left",
      data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
    },
    series: [
      {
        name: "Traffic Sources",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          {
            value: 335,
            name: "Direct",
          },
          {
            value: 310,
            name: "Email",
          },
          {
            value: 234,
            name: "Ad Networks",
          },
          {
            value: 135,
            name: "Video Ads",
          },
          {
            value: 1548,
            name: "Search Engines",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },
  ring: {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    },
    title: {
      text: "Traffic Sources",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "left",
      data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
    },
    series: [
      {
        name: "Traffic Sources",
        type: "pie",
        radius: ["55%", "70%"],
        center: ["50%", "60%"],
        data: [
          {
            value: 335,
            name: "Direct",
          },
          {
            value: 310,
            name: "Email",
          },
          {
            value: 234,
            name: "Ad Networks",
          },
          {
            value: 135,
            name: "Video Ads",
          },
          {
            value: 1548,
            name: "Search Engines",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },
};
