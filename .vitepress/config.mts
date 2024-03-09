import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WebGL",
  description: "A VitePress Site of WebGL",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'GLSL 着色器语言', link: '/GLSL' },
          { text: 'WebGL案例', link: '/WebGL' },
          { text: 'WebGPU介绍', link: '/WebGPU' },
          { text: 'Data in WebGL', link: '/data' },
          { text: '模型、视图以及投影矩阵', link: '/guides/modelViewProjection' },
          { text: 'ThreeJs', link: '/ThreeJs' },
          { text: 'WebGL shader', link: '/webgl_shader' },
        ]
      }
    ],
    outline:{
      level: [2, 3],
      label: '目录'
    },
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
