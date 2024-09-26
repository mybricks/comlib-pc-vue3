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
    items: ({ data, output }, ...cate) => {
      cate[0].title = '常规';
      cate[0].items = [
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
      ]
      cate[1].title = '高级';
      cate[1].items = [
        {
          title: "自动展开父节点",
          type: 'switch',
          value: {
            get({ data }) {
              return data.autoExpandParent;
            },
            set({ data }, value) {
              data.autoExpandParent = value;
            }
          }
        },
        {
          title: "自动展开全部节点",
          type: 'switch',
          value: {
            get({ data }) {
              return data.defaultExpandAll;
            },
            set({ data }, value) {
              data.defaultExpandAll = value;
            }
          }
        }, 
        {
          title: "支持勾选",
          type: 'Radio',
          options: [
            {
              label: '不开启',
              value: false
            },
            {
              label: '全部节点',
              value: true
            }
          ],
          value: {
            get({ data }) {
              return data.checkable || false;
            },
            set({ data }, value) {
              data.checkable = value;
            }
          }
        }, 
        {
          title:"支持拖拽",
          type: 'Radio',
          options: [
            {
              label: '不开启',
              value: false
            },
            {
              label: '全部节点',
              value: true
            }
          ],
          value: {
            get({ data }) {
              return data.draggable || false;
            },
            set({ data }, value) {
              data.draggable = value;
            }
          }
        },
        {
          title: "树禁用",
          type: 'switch',
          value: {
            get({ data }) {
              return data.disabled;
            },
            set({ data }, value) {
              data.disabled = value;
            }
          }
        }
      ]
    }
  },
};
