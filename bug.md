- 生产环境打包后，访问 popup 无法链接到 background；background 与 popup 公用的变量使用后出现无法链接到 background

  ”我真傻，真的“。
  之前 manifest 中对于 background 使用 script 加载文件，然而 background 与 popup 的公用代码被我提取打包了，我完全忘记了这一点，口诺八嘎！还是偷懒用 html 引入吧。

- home/tab 组件重复渲染问题

  tab 组件使用 React.memo，父组件传入 tab 的依赖数据使用 useCallback 优化(估计还有很多这样的屎代码，见一个干一个)

- google font 本地化问题

  - font-display: swap 在字体加载完成前，使用默认字体，并在加载完成后提供非常小的阻塞(平滑过渡的意思)
  - webpack 打包 file-loader outpath 使用根路径

- saga 轮询方法无错误判断

  badge notification 业务在背景页轮询时，若当前环境网络异常，则直接停止轮询。
  现已加上 catch 处理 error

- gitignore 对已添加 git 追踪的文件无效

  本地文件需保留的话，使用`git rm -r --cached file_path` 删除本地缓存，然后再提交，gitignore 就会生效

- ts 2749

  ts 后缀文件不能书写 jsx， <>会被识别成 ts 泛型
