import { Layout } from './constants'
import { setSlotLayout } from '../../utils/editorTools'
import { createItem, addEventIO } from './common';

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
        title: '插槽布局',
        type: 'layout',
        description: '配置插槽内部的布局类型',
        ifVisible({ data }) {
          return !data.hideSlots;
        },
        value: {
          get({ data }) {
            return data.slotStyle;
          },
          set({ slots, data }, val) {
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
              title: newItem.name
            });
            const slotInstance = slots.get(newItem.id);
            setSlotLayout(slotInstance, data.slotStyle);
            addEventIO(output, newItem, env);
            data.tabList.push(newItem);
            // slots.add({
            //   id,
            //   title: `标签页${data.tabList.length + 1}`,
            //   type: 'scope',
            //   inputs: [
            //     {
            //       id: `${id}_render`,
            //       title: '首次显示',
            //       schema: DefaultSchema
            //     },
            //     {
            //       id: `${id}_into`,
            //       title: '显示',
            //       schema: DefaultSchema
            //     },
            //     {
            //       id: `${id}_leave`,
            //       title: '隐藏',
            //       schema: DefaultSchema
            //     }
            //   ]
            // });
          }
        }
      },
    ]
  }
};
