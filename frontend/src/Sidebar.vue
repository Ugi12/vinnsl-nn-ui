<template>
  <div id="demo" :class="[{'collapsed' : collapsed}]">
    <div class="demo">
      <h1 v-show="false">vue-sidebar-menu</h1>
      <div v-show="false">select theme:
        <select v-model="selectedTheme">
          <option v-for="(theme, index) in themes" :key="index">{{theme == '' ? 'default-theme' : theme}}</option>
        </select>
      </div>
      <hr v-show="false" style="margin: 50px 0px;border: 1px solid #e3e3e3;">
      <router-view/>
    </div>
    <sidebar-menu :menu="menu" :collapsed="collapsed" @collapse="onCollapse" :theme="selectedTheme" :showOneChild="true" @itemClick="onItemClick"/>
  </div>
</template>

<script>
  const separator = {
    template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
  }

  export default {
    name: 'app',
    data () {
      return {
        menu: [
          {
            header: true,
            title: 'Training Engine'
          },
          {
            href: '/',
            title: 'ConbexNN',
            icon: 'fa fa-cog',
            badge: {
              text: 'Java',
              class: 'badge-success'
            }
          },
          {
            href: '/tensorflow-js',
            title: 'N2Container',
            icon: 'fa fa-cog',
            badge: {
              text: 'TF-JS',
              class: 'badge-success'
            },
            child: [
              {
                title: 'Iris Classification',
                icon: 'fa fa-list-alt',
                href: '/tf-js-iris'
              },
              {
                title: 'MNIST Digit Recognition',
                icon: 'fa fa-list-alt',
                href: '/tf-js-mnist-train',
                badge: {
                  text: 'train',
                  class: 'badge-success'
                }
              },
              {
                title: 'MNIST Digit Recognition',
                icon: 'fa fa-list-alt',
                href: '/tf-js-mnist-test',
                badge: {
                  text: 'test',
                  class: 'badge-success'
                }
              },
              {
                title: 'Wine Classification',
                icon: 'fa fa-list-alt',
                href: '/tf-js-wine'
              }
            ]
          },
          {
            href: '/tensorflow-python',
            title: 'N2Container',
            icon: 'fa fa-cog',
            badge: {
              text: 'TF-Python',
              class: 'badge-success'
            },
            child: [
              {
                title: 'Iris Classification',
                icon: 'fa fa-list-alt',
                href: '/tf-python-iris'
              },
              {
                title: 'MNIST Digit Recognition',
                icon: 'fa fa-list-alt',
                href: '/tf-python-mnist'
              },
              {
                title: 'Wine Classification',
                icon: 'fa fa-list-alt',
                href: '/tf-python-wine'
              }
            ]
          },
        /*
        {
          href: '/disabled',
          title: 'Disabled',
          icon: 'fa fa-cog',
          disabled: true,
          badge: {
            text: '20'
          }
          },
          */
          {
            header: true,
            component: separator,
            visibleOnCollapse: true
          }
          /* ,
          {
            header: true,
            title: 'Options'
          },

          {
            title: 'Iris Classification',
            icon: 'fa fa-list-alt',
            href: '/tf-js-iris'
          },
          {
            title: 'MNIST Digit Recognition',
            icon: 'fa fa-list-alt',
            href: '/tf-js-mnist'
          },
          {
            title: 'Wine Classification',
            icon: 'fa fa-list-alt',
            href: '/tf-js-wine'
          }
          */
        ],
        collapsed: false,
        themes: ['', 'white-theme'],
        selectedTheme: 'white-theme'
      }
    },
    methods: {
      onCollapse (collapsed) {
        console.log(collapsed)
        this.collapsed = collapsed
      },
      onItemClick (event, item) {
        console.log('onItemClick')
        // console.log(event)
        // console.log(item)
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

  body,
  html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #f2f4f7;
  }

  #demo {
    padding-left: 350px;
  }
  #demo.collapsed {
    padding-left: 50px;
  }

  .demo {
    padding: 50px;
  }

  .badge-danger {
    background-color: #ff2a2a;
    color: #fff;
  }
</style>

