import { Data, InputIds, OutputIds, SlotIds } from './constants';
import { createItem, updateIO, getFocusTab, removeIOAndSlot } from './common';

export default {
  ':slot': {},
  '@resize': {
    options: ['width', 'height']
  },
  '@init': ({ style }) => {
    style.height = 'auto';
  },
  ':root': {
    items({ }: EditorResult<Data>, cate1, cate2, cate3) {
      cate1.title = '常规';
      cate1.items = [
        {
          title: '添加标签页',
          type: 'Button',
          description: '新增一个标签页，增加一个标签页插槽、标签页显示和隐藏输出',
          value: {
            set({ data, slots, output, env }: EditorResult<Data>) {
              const newItem = createItem(data);
              slots.add({
                id: newItem.id,
                title: newItem.name,
                type: "scope",
                inputs: [
                  {
                    "id": "itemData",
                    "title": "当前项",
                    "desc": "当前项展示内容",
                    "schema": {
                      "type": "any"
                    }
                  },
                  {
                    "id": "index",
                    "title": "当前项序号",
                    "desc": "当前项展示的序号",
                    "schema": {
                      "type": "number"
                    }
                  }
                ]
              });
              data.tabList.push(newItem);
            }
          }
        },
        {
          title: '外观',
          type: 'Select',
          description: '配置标签页的外观(基本样式)',
          options: [
            { value: 'card', label: '卡片' },
            { value: 'border-card', label: '带边框的卡片' }
          ],
          value: {
            get({ data }: EditorResult<Data>) {
              return data.type;
            },
            set({ data }: EditorResult<Data>, value: string) {
              data.type = value;
            }
          }
        },
        {
          title: '标签位置',
          type: 'Select',
          description: '标签位置, 默认是上部(top)',
          options: [
            { label: '上', value: 'top' },
            { label: '左', value: 'left' },
            { label: '右', value: 'right' },
            { label: '下', value: 'bottom' }
          ],
          value: {
            get({ data }: EditorResult<Data>) {
              return data.tabPosition || 'top';
            },
            set({ data }: EditorResult<Data>, value: 'left' | 'top' | 'bottom' | 'right') {
              data.tabPosition = value;
            }
          }
        },
        
        {
          title: '事件',
          items: [
            {
              title: '标签页点击',
              type: '_Event',
              description: '点击标签页时触发【标签页点击】输出项事件',
              options: () => {
                return {
                  outputId: OutputIds.OnTabClick
                };
              }
            }
          ]
        }
      ];
    },
    style: [
      {
        catelog: '默认',
        title: '标签',
        options: [
          { type: 'font', config: { disableTextAlign: true } },
          { type: 'background', config: { disableBackgroundImage: true } }
        ],
        target: '.el-tabs__item'
      },
      {
        catelog: '默认',
        title: '标签头',
        options: ['padding', { type: 'background', config: { disableBackgroundImage: true } }],
        target: '.el-tabs__nav-wrap'
      },
      {
        catelog: '默认',
        title: '底部横线',
        options: ['border'],
        target: '.el-tabs--card>.el-tabs__header'
      },
      {
        catelog: 'Hover',
        title: '标签',
        options: [
          { type: 'font', config: { disableTextAlign: true } },
          { type: 'background', config: { disableBackgroundImage: true } }
        ],
        target: '.el-tabs__item:hover'
      }
    ]
  },
  '.el-tabs__item': {
    title: '标签',
    items: (props: EditorResult<any>, cate1, cate2, cate3) => {
      if (!props.focusArea) return;
      const item = getFocusTab(props);
      cate1.title = '常规';
      cate1.items = [
        {
          title: '名称',
          type: 'Text',
          description: '配置标签默认名称',
          options: {
            locale: true
          },
          value: {
            get({ }: EditorResult<any>) {
              return item?.name;
            },
            set({ input, output, slots, env }: EditorResult<any>, title: string) {
              item.name = title;
              updateIO({ input, output, item, slots, env });
            }
          }
        },
        {
          title: '操作',
          items: [
            {
              title: '前移',
              type: 'Button',
              description: '向前移动该标签页',
              value: {
                get({ focusArea }: EditorResult<any>) {
                  return focusArea.index;
                },
                set({ data, focusArea }: EditorResult<any>) {
                  const { index } = focusArea;
                  const { tabList } = data;
                  if (index === 0) return;
                  [tabList[index - 1], tabList[index]] = [tabList[index], tabList[index - 1]];
                }
              }
            },
            {
              title: '后移',
              type: 'Button',
              description: '向后移动该标签页',
              value: {
                get({ focusArea }: EditorResult<any>) {
                  return focusArea.index;
                },
                set({ data, focusArea }: EditorResult<any>) {
                  const { index } = focusArea;
                  const { tabList } = data;
                  if (index === tabList.length - 1) return;
                  [tabList[index], tabList[index + 1]] = [tabList[index + 1], tabList[index]];
                }
              }
            },
            {
              title: '删除',
              type: 'Button',
              description: '删除该标签页',
              value: {
                get({ focusArea }: EditorResult<any>) {
                  return focusArea.index;
                },
                set(props: EditorResult<any>) {
                  const { data, focusArea } = props;
                  if (data.tabList.length > 1) {
                    const item = data.tabList[focusArea.index];
                    if (item) {
                      removeIOAndSlot(props, item);
                    }
                    data.tabList.splice(focusArea.index, 1);
                    data.defaultActiveKey = data.tabList[0].key;
                  }
                }
              }
            }
          ]
        }
      ];
    },
    '@dblclick': {
      type: 'text',
      value: {
        get(props: EditorResult<any>) {
          const item = getFocusTab(props);
          console.log("双击聚焦的item",item);
          return item?.name;
        },
        set(props: EditorResult<any>, title: string) {
          const item = getFocusTab(props);
          item.name = title;
          const { input, output, slots, env } = props;
          updateIO({ input, output, item, slots, env });
        }
      }
    }
  }
};
