import { SizeEnum, TypeEnum } from './constants'
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
        title: '尺寸',
        type: 'Select',
        options() {
          return [
            { value: SizeEnum.Large, label: '大' },
            { value: SizeEnum.Middle, label: '中等' },
            { value: SizeEnum.Small, label: '小' }
          ];
        },
        value: {
          get({ data, focusArea }: EditorResult<any>) {
            return data.size || SizeEnum.Middle;
          },
          set({ data, focusArea }: EditorResult<any>, value: SizeEnum) {
            data.size = value;
          }
        }
      },
      {
        title: '风格',
        type: 'Select',
        options() {
          return [
            { value: TypeEnum.Primary, label: '主按钮' },
            { value: TypeEnum.Default, label: '次按钮' },
            { value: TypeEnum.Dashed, label: '虚线按钮' },
            // { value: TypeEnum.Danger, label: '危险按钮' },
            { value: TypeEnum.Link, label: '链接按钮' },
            { value: TypeEnum.Text, label: '文字按钮' }
          ];
        },
        value: {
          get({ data, focusArea }: EditorResult<any>) {
            return data.type || TypeEnum.Primary;
          },
          set({ data, focusArea }: EditorResult<any>, value: TypeEnum) {
            data.type = value;
          }
        }
      },
      {
        title:"按钮样式",
        options: ["font", "padding", "border", "background", "boxShadow"],
        target: ".ant-btn",
      },
    ],
    items: [
      {
        // 使用 ifVisible 来控制是否显示该配置项
        ifVisible({ data }) {
          return !data.asHotarea;
        },
        title: "文字标题",
        type: "text",
        value: {
          get({ data }) {
            return data.text;
          },
          set({ data }, value: string) {
            data.text = value;
          },
        },
      },
      {}, //空对象可以用来分割配置项
      {
        title: "单击",
        type: "_Event",
        options: {
          outputId: "click",
        },
      }
    ],
  },
};
