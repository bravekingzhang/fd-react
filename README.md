# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



# 一个react 的快速开发框架

最近想整理一个 react 的快速开发框架，这样在以后的项目中就可以直接使用这个框架，而不用每次都重新配置一遍。这样可以提高开发效率，同时也可以减少一些不必要的错误。这个框架有以下特点：

### 框架特性

- 全局状态管理 zustand
- 路由 react-router-dom
- 网络请求 axios
- swr 做数据请求封装
- UI 组件 arco-design
- 本地存储 localforage
- 代码格式化 prettier
- typescript 支持
- eslint
- prettier
- vite 配置
- 环境变量配置

### 如何使用
直接基于该工程，使用模板创建一个新项目即可，然后根据自己的需求进行修改即可。https://github.com/bravekingzhang/fd-react



### 设计思路

- 项目中使用了 zustand 来进行全局状态管理，这样可以避免使用 redux 的繁琐配置，同时也可以避免使用 context 的嵌套问题。
- 项目中使用了 arco-design 来进行 UI 组件的开发，arco-design 是阿里的一个开源组件库，它的组件非常丰富，而且也支持自定义主题，所以在项目中使用它是非常方便的。

- 项目中使用了 axios 来进行网络请求，axios 是一个非常好用的网络请求库，它支持拦截器，同时也支持取消请求，所以在项目中使用它是非常方便的,可以自定义请求头，请求参数等，同时也可以自定义响应拦截器，请求拦截器等。

- 项目中使用了 react-router-dom 来进行路由的管理，react-router-dom 是一个非常好用的路由库，它支持路由的懒加载，同时也支持路由的嵌套，所以在项目中使用它是非常方便的。

- 项目中使用了 localforage 来进行本地存储的管理，localforage 是一个非常好用的本地存储库，它支持存储的数据是异步的，同时也支持存储的数据是持久化的，所以在项目中使用它是非常方便的。配合 zustand 可以实现全局状态的持久化。简直不要太方便。

- 项目中使用了 prettier 来进行代码的格式化，prettier 是一个非常好用的代码格式化工具，它支持自定义配置，同时也支持自定义规则，所以在项目中使用它是非常方便的。

- 项目中使用了 typescript 来进行类型的管理，typescript 是一个非常好用的类型检查工具，它支持自定义类型，同时也支持自定义规则，所以在项目中使用它是非常方便的。这样，基本上写代码的时候就不用担心类型错误了。

- 项目中使用 swr 来进行数据请求的封装，swr 是一个非常好用的数据请求库，它支持数据的缓存，同时也支持数据的自动更新，所以在项目中使用它是非常方便的。

- 项目中使用了 eslint 来进行代码的检查，eslint 是一个非常好用的代码检查工具，它支持自定义配置，同时也支持自定义规则，所以在项目中使用它是非常方便的。

- 项目中使用了 vite 来进行项目的构建，vite 是一个非常好用的项目构建工具，它支持自定义配置，同时也支持自定义规则，所以在项目中使用它是非常方便的,同时也支持热更新，所以在开发的时候是非常方便的。 arco-design 的相关配置全部都在 vite.config.ts 中进行配置，开发者无需关心 arco-design 的配置。

- 项目中使用了环境变量来进行配置，环境变量是一个非常好用的配置工具，它支持自定义配置，同时也支持自定义规则，所以在项目中使用它是非常方便的。


### vite 环境比变量配置相关

在 Vite 中，.env 文件用于定义环境变量。Vite 具有特殊的环境加载策略，它会按照下面的顺序加载对应的环境文件：
```
.env：在所有情况下都会被加载
.env.local：在所有情况下都会被加载，但会被 git 忽略
.env.[mode]：只在指定模式下被加载
.env.[mode].local：只在指定模式下被加载，但会被 git 忽略
其中，[mode] 是你在命令行中指定的模式（例如，development 或 production）。
```