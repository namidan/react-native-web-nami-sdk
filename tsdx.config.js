const postcss = require('rollup-plugin-postcss');
module.exports = {
  rollup(config, _) {
    config.plugins.push(
      postcss({
        modules: true,
      })
    );
    return {
      ...config,
      output: {
        ...config.output,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      },
    };
  },
};
