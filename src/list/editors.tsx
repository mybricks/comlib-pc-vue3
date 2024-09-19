import { Layout } from './constants'

export default {
  ':slot': {},
  '@init': ({ style }) => {
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height']
  },
  ':root': {
    items: [
      {
        title: '布局类型',
        type: 'select',
        description: '组件提供三种布局方式，包括横向、纵向、栅格布局',
        options: [
          { label: '横向布局', value: Layout.Horizontal },
          { label: '纵向布局', value: Layout.Vertical },
          { label: '栅格布局', value: Layout.Grid }
        ],
        value: {
          get({ data }: any) {
            return data.layout;
          },
          set({ data }: any, val: Layout) {
            data.layout = val;
          }
        }
      },
    ]
  }
};
