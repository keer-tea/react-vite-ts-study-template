// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿元素尺寸/10
      unitPrecision: 5, 
      propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      selectorBlackList: [], // 则是一个对css选择器进行过滤的数组，比如你设置为['el-']，那所有el-类名里面有关px的样式将不被转换，这里也支持正则写法。
      replace: true,
      mediaQuery: false, // 媒体查询( @media screen 之类的)中不生效
      minPixelValue: 0, // px 绝对值小于 0 的不会被转换
      exclude: /node_modules/i,
    },
  },
}
