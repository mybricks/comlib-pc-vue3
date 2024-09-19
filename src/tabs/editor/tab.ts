
import { updateIO, getFocusTab, removeIOAndSlot } from './common';
export default {
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
