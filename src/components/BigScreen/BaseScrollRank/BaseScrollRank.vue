<template>
  <div class="BaseScollRank">
    <div
      class="BaseScollRank-item"
      v-for="(item, index) in tableData"
      :key="'key' + index"
    >
      <div class="BaseScollRank-item-top">
        <div class="BaseScollRank-item-top__rank">No.{{ item.ranking }}</div>
        <div class="BaseScollRank-item-top__name" v-html="item.name"></div>
        <div class="BaseScollRank-item-top__value">
          {{ item.value ? item.value : "" }}
        </div>
      </div>
      <div class="BaseScollRank-item-bottom">
        <div class="inside-column" :style="`width: ${item.percent}%;`">
          <div class="shine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
export default {
  name: "VBaseScrollRank",
  props: {
    data: {
      type: Array,
    },
    color: {
      type: String,
      default: "#1370fb",
    },
    max: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  setup(props) {
    const getData = computed({
      get() {
        return props.data;
      },
      set() {},
    });
    const getValue = computed({
      get() {
        const value = getData.value.map(({ value }) => value);
        return value;
      },
      set() {},
    });
    const tableData = computed({
      get() {
        const max = Math.max(...getValue.value) || 0;
        const maxAbs = Math.abs(max);
        const total = max + maxAbs;
        const data = getData.value.map((row, i) => ({
          ...row,
          ranking: i + 1,
          percent: ((row.value + maxAbs) / total) * 100,
        }));
        return data;
      },
      set() {
        // console.log()
      },
    });
    return {
      tableData,
    };
  },
};
</script>
<style lang="scss" scoped>
$color: v-bind(color);
.BaseScollRank {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  .BaseScollRank-item {
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    .BaseScollRank-item-top {
      display: flex;
      width: 100%;
      font-size: 13px;
      .BaseScollRank-item-top__rank {
        width: 40px;
        color: $color;
      }
      .BaseScollRank-item-top__-name {
        flex: 1;
      }
    }
    .BaseScollRank-item-bottom {
      border-bottom: 2px solid rgba($color, 50%);
      margin-top: 5px;
      .inside-column {
        position: relative;
        height: 6px;
        background-color: $color;
        margin-bottom: 2px;
        border-radius: 1px;
        overflow: hidden;
      }
      .shine {
        position: absolute;
        left: 0%;
        top: 2px;
        height: 2px;
        width: 50px;
        transform: translateX(-100%);
        background: radial-gradient(rgb(40, 248, 255) 5%, transparent 80%);
        animation: shine 3s ease-in-out infinite alternate;
      }
    }
  }
}
@keyframes shine {
  80% {
    left: 0%;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
