function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789', maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

export const createItem = (data): any => {
  const key = uuid();
  return {
    id: key,
    key,
    name: `标签页${data.tabList.length + 1}`
  };
};

export const addEventIO = (output, item: any, env) => {
  const { id, key, name: originName } = item;
  const name = env.i18n(originName);
  output.add(`${id}_into`, `${name}显示`, { type: 'any' });
  output.add(`${id}_leave`, `${name}隐藏`, { type: 'any' });
};

export const updateIO = ({
  input,
  output,
  item,
  slots,
  env
}: {
  input?: any;
  output?: any;
  item: any;
  slots;
  env;
}) => {
  const { id, key, name: originName } = item;
  const name = env.i18n(originName);
  input.setTitle(key, `${name}的通知数`);
  output.setTitle(`${id}_into`, `${name}显示`);
  output.setTitle(`${id}_leave`, `${name}隐藏`);
  slots.get(item.key) && slots.get(item.key)!.setTitle(`${name}`);
};

export const removeIOAndSlot = (props, item: any) => {
  const { input, output, slots } = props;
  const { key, id } = item;
  slots.remove(id);
  output.remove(`${id}_into`);
  output.remove(`${id}_leave`);
  if (input.get(key)) {
    input.remove(key);
  }
};

export const getFocusTab = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.tabList[index];
};
