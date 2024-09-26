export default {
  "@init"({ style }) {
    style.width = 'fit-content';
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: '显示连线',
        type: 'switch',
        value: {
          get({ data }) {
            return !!data.showLine;
          },
          set({ data }, value) {
            data.showLine = value;
          }
        }
      },
    ],
    items: [
      {
        title: '空状态',
        items: [
          {
            title: '自定义空状态图片',
            type: 'switch',
            value: {
              get({ data }) {
                return data.isImage;
              },
              set({ data }, value) {
                data.isImage = value;
              }
            }
          },
          {
            title: '图片地址',
            type: 'ImageSelector',
            ifVisible({ data }) {
              return !!data.isImage;
            },
            value: {
              get({ data }) {
                return data.image;
              },
              set({ data }, value) {
                data.image = value;
              }
            }
          },
          {
            title: '空状态文案',
            type: 'Text',
            description: '自定义描述内容',
            options: {
              placeholder: '自定义描述内容',
              locale: true
            },
            value: {
              get({ data }) {
                return data.description;
              },
              set({ data }, value) {
                data.description = value;
              }
            }
          }
        ]
      },
      {
        title: '事件',
        items: [
          {
            title: '节点选中',
            type: '_Event',
            options: () => {
              return {
                outputId: 'click'
              };
            }
          },
          {
            title: "禁用取消选中",
            type: 'Switch',
            value: {
              get({ data }) {
                return data.disableCancelSelect;
              },
              set({ data }, value) {
                data.disableCancelSelect = value;
              }
            }
          },
          {
            title: '数据变化',
            type: '_Event',
            options: () => {
              return {
                outputId: 'onChange'
              };
            }
          }
        ]
      }
    ],
  },
};
