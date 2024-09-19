import { Data, InputIds, OutputIds, SlotIds } from '../constants';
import TabEditor from './tab';
import { createItem, addEventIO } from './common';
/**
 * @description 根据 layout 编辑器返回值，设置插槽布局类型
 * 
 */
const setSlotLayout = (slot, val) => {
  if (!slot) return;

  if (val.position === 'smart') {
    slot.setLayout('smart');
  } else if (val.position === 'absolute') {
    slot.setLayout(val.position);
  } else if (val.display === 'flex') {
    if (val.flexDirection === 'row') {
      slot.setLayout('flex-row');
    } else if (val.flexDirection === 'column') {
      slot.setLayout('flex-column');
    }
  }
};

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
          title: '插槽布局',
          type: 'layout',
          description: '配置插槽内部的布局类型',
          ifVisible({ data }: EditorResult<Data>) {
            return !data.hideSlots;
          },
          value: {
            get({ data }: EditorResult<Data>) {
              return data.slotStyle;
            },
            set({ slots, data }: EditorResult<Data>, val: any) {
              if (!data.slotStyle) {
                data.slotStyle = {};
              }

              data.slotStyle = val

              data.tabList.forEach((item) => {
                const slotInstance = slots.get(item.id);
                setSlotLayout(slotInstance, val);
              });
            }
          }
        },
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
              const slotInstance = slots.get(newItem.id);
              setSlotLayout(slotInstance, data.slotStyle);
              // addEventIO(output, newItem, env);
              // console.log("data.tabList",data.tabList,"newItem",newItem)
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
              title: '标签页新增',
              type: '_Event',
              description: '新增标签页时触发【标签页新增】输出项事件',
              ifVisible({ data }: EditorResult<Data>) {
                return data.type === 'editable-card';
              },
              options() {
                return {
                  outputId: OutputIds.AddTab
                };
              }
            },
            {
              title: '标签页删除',
              type: '_Event',
              description: '删除标签页时触发【标签页删除】输出项事件',
              ifVisible({ data }: EditorResult<Data>) {
                return data.type === 'editable-card';
              },
              options() {
                return {
                  outputId: OutputIds.RemoveTab
                };
              }
            },
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
  ...TabEditor
};
