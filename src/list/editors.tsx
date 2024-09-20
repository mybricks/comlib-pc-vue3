export default {
  ':slot': {},
  '@init': ({ style }) => {
    style.height = 'auto';
  },
  '@resize': {
    options: ['width']
  },
};
