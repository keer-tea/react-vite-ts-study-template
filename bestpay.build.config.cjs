const config = {
  featureBranch: {
    // 项目开发分支所在的目录
    project:  'C:\\Users\\lukecheng\\Desktop\\code\\test-vite-project\\react-vite-ts-study-template',
    //
    tempDir: './temp-dist'
  },
  distBranch: {
    // 项目打包部署分支所在的目录
    project: 'C:/Users/lukecheng/Desktop/code/test-vite-project/test',
    // 版本文件所在路径
    versionFile: './utilities/healthcheck.html',
    // 打包资源放置路径
    placePath: './utilities/union'
  }
}

module.exports = config
