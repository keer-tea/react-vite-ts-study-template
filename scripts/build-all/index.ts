#!/usr/bin/env node
// 坑：使用 ts-node，如果设置了 package.json 中的 type 为 module，并且引入 npm 包，就会报错：
// ReferenceError: exports is not defined in ES module scope
// 这是为什么呢？
import enquirer from 'enquirer'
import shell from 'shelljs'
import path from 'path'
import fs from 'fs'

// join 和 resolve 区别？
const testAbsolutePath = path.join('C:/Users/lukecheng/Desktop/code/react-vite-ts-study-template')
const tempDir = 'temp-dist'

function resolve (...paths: Array<string>) {
  return path.resolve(...paths)
}

main()

async function main () {
  // 
  // const versionRes = enquirer.prompt({
  //   type: 'select',
  //   name: 'versionType',
  //   message: '需要提示版本类型',
  //   choices: [
  //   ]
  // })
  const config = {} as {
    buildPurpose: 'test' | 'prod';
    envList: Array<'test' | 'pre' | 'prod'>
  }

  const res = await enquirer.prompt<{buildPurpose: 'test' | 'prod'}>({
    type: 'select',
    name: 'buildPurpose',
    message: '项目打包目的',
    choices: [
      {
        message: '用于测试',
        name: 'test'
      },
      {
        message: '用于发版',
        name: 'publish'
      }
    ]
  })
  config.buildPurpose = res.buildPurpose

  if (config.buildPurpose === 'test') {
    const envListRes = await enquirer.prompt<{envList: Array<'test'|'pre'|'prod'>}>({
      type: 'select',
      name: 'envList',
      message: '选择打包环境（多选）',
      initial: 0,
      multiple: true,
      choices: [
        {
          name: 'test',
          message: '综测'
        },
        {
          name: 'pre',
          message: '预生产'
        },
        {
          name: 'prod', 
          message: '生产'
        }
      ]
    })
    config.envList = envListRes.envList
  }
  // 创建存放打包输出的目录
  const tempDistDir = resolve(testAbsolutePath, tempDir)
  if (!fs.existsSync(tempDistDir)) {
    fs.mkdirSync(tempDistDir)
  }
  // 打包
  // if (config.buildPurpose === 'test') {
  //   for(const name of config.envList) {
  //     build(name)
  //   }
  // } else {
  //   build('pre')
  //   build('prod')
  // }
  // 切换分支
  if (config.buildPurpose === 'test') {
    checkoutPull('test')
  } else {
    checkoutPull('pre')
    checkoutPull('prod')
  }

}

function build (name: string) {
  console.log('开始打包')
  const info = execShell(`npm run build:${name}`, { cwd: testAbsolutePath })
  console.log(info)
  const tempDistPath = resolve(testAbsolutePath,'dist')
  const realDistPath = resolve(testAbsolutePath, tempDir, name)
  if (fs.existsSync(realDistPath)) {
    fs.rmSync(realDistPath, { recursive: true, force: true })
  }

  fs.renameSync(tempDistPath, realDistPath)
}

function execShell (command: string, options?: {[key: string]: unknown}) {
  // code：为 0 代表成功。
  // stdout：成功信息。（标准输出信息）
  // stderr：错误信息。（标准错误信息）
  const { code, stdout, stderr } = shell.exec(command, { silent: true, ...options })
  if (code === 0) {
    return stdout
  } else {
    return stderr
  }
}

function checkoutPull (branch: string) {
  // 获取当前分支名
  const currentBranch = execShell('git rev-parse --abbrev-ref HEAD', { cwd: testAbsolutePath })
  console.log(currentBranch,'currentBranch')
  execShell(`git checkout ${branch}`, { cwd: testAbsolutePath })
}
