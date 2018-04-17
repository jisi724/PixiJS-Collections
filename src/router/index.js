import Vue from 'vue'
import Router from 'vue-router'

import Entry from '@/components/Entry'
import GetStart from '@/components/01-get-start/'
import PixiFeatures from '@/components/02-pixi-features/'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/01-get-start/:componentName',
      name: 'getStart',
      component: GetStart
    },
    {
      path: '/02-pixi-features/:componentName',
      name: 'PixiFeatures',
      component: PixiFeatures
    }
  ]
})
