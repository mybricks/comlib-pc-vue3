export default {
  "@init"({ style }) {
    style.width = "fit-content";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "显示连线",
        type: "switch",
        value: {
          get({ data }) {
            return !!data.showLine;
          },
          set({ data }, value) {
            data.showLine = value;
          },
        },
      },
    ],
    items({ data }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "基础配置",
          items: [
            {
              title: "是否展示图标",
              type: "switch",
              value: {
                get({ data }) {
                  return data.showIcon;
                },
                set({ data }, value) {
                  data.showIcon = value;
                },
              },
            },
          ],
        },
        {
          title: "字段配置",
          items: [
            {
              title: "标题字段",
              type: "text",
              options: {
                placeholder: "默认值为 title",
              },
              value: {
                get({ data }) {
                  return data.fieldNames.title;
                },
                set({ data }, value) {
                  data.fieldNames.title = value;
                },
              },
            },
            {
              title: "标识字段",
              description:
                "所有节点的标识字段值在整个树范围内不能重复。不填时会根据节点位置生成唯一标识，存储在key属性中。",
              type: "text",
              options: {
                placeholder: "节点的唯一标识，默认值为 key",
              },
              value: {
                get({ data }) {
                  return data.fieldNames.key;
                },
                set({ data }, value) {
                  data.fieldNames.key = value;
                },
              },
            },
            {
              title: "子节点字段",
              type: "text",
              options: {
                placeholder: "默认值为 children",
              },
              value: {
                get({ data }) {
                  return data.fieldNames.children;
                },
                set({ data }, value) {
                  data.fieldNames.children = value;
                },
              },
            },
          ],
        },

        {
          title: "空状态",
          items: [
            {
              title: "自定义图片地址",
              type: "ImageSelector",
              value: {
                get({ data }) {
                  return data.placeholder.image;
                },
                set({ data }, value) {
                  data.placeholder.image = value;
                },
              },
            },
            {
              title: "自定义文案",
              type: "text",
              description: "自定义描述内容",
              options: {
                placeholder: "自定义描述内容",
                locale: true,
              },
              value: {
                get({ data }) {
                  return data.placeholder.description;
                },
                set({ data }, value) {
                  data.placeholder.description = value;
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "节点是否可被选中",
              type: "Switch",
              value: {
                get({ data }) {
                  return data.selectable;
                },
                set({ data }, value) {
                  data.selectable = value;
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.selectable;
              },
              title: "节点选中事件",
              type: "_Event",
              options: () => {
                return {
                  outputId: "onSelect",
                };
              },
            },
          ],
        },
      ];
    },
  },
};
