const getFilterSelector = (id: string) => `:not(#{id} *[data-isslot="1"] *)`;
export default {
  ':slot': {},
  "@init"({ style }) {
    style.height = 'fit-content';
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: '标题',
        options: ['font'],
        target: ({ id }) =>
          `.ant-card-head-title${getFilterSelector(id)}`
      },
      {
        title: '边框',
        options: ['border'],
        target: ({ id }) => `.ant-card${getFilterSelector(id)}`
      },
      {
        title: '背景',
        options: ['background'],
        target: ({ id }) => `.ant-card${getFilterSelector(id)}`
      },
    ],
    items: [
      {
        title: '标题内容',
        type: 'Text',
        description: '卡片的标题内容',
        options: {
          locale: true
        },
        ifVisible({ data }) {
          return data.showTitle;
        },
        value: {
          get({ data }) {
            return data.cardTitle;
          },
          set({ data }, value) {
            data.cardTitle = value;
          }
        }
      },
      {
        title: '显示标题',
        type: 'Switch',
        description: '是否显示卡片上半部的标题区',
        value: {
          get({ data }) {
            return data.showTitle ?? true;
          },
          set({ data }, value) {
            data.showTitle = value;
          }
        }
      },
    ],
  },
  '.ant-card-head .ant-card-head-wrapper .ant-card-head-title': {
    '@dblclick': {
      type: 'text',
      value: {
        get({ data }) {
          return data.cardTitle;
        },
        set({ data }, value) {
          data.cardTitle = value;
        }
      }
    },
    items:[
      {
        title: '标题内容',
        type: 'Text',
        description: '卡片的标题内容',
        options: {
          locale: true
        },
        ifVisible({ data }) {
          return data.showTitle;
        },
        value: {
          get({ data }) {
            return data.cardTitle;
          },
          set({ data }, value) {
            data.cardTitle = value;
          }
        }
      },
    ]
  }
};
