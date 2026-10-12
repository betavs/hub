import { type Plugin } from 'vitepress';

export const prefix = (proxy: string, source: string[]) => {
  return <Plugin>{
    name: 'assets-prefix',

    apply: 'build',

    enforce: 'post',

    transform(code: string, id: string) {
      if (id.includes('node_modules')) return null;

      let modified = false;

      for (const item of source) {
        if (code.includes(item)) {
          code = code.replaceAll(item, `${proxy}${item}`);

          modified = true;
        }
      }

      return modified ? code : null;
    },
  };
};

export const replace = (symbol: string, value: string) => {
  return <Plugin>{
    name: 'assets-replace',

    enforce: 'pre',

    transform(code: string, id: string) {
      if (id.includes('node_modules')) return null;

      let modified = false;

      if (code.includes(symbol)) {
        code = code.replaceAll(symbol, value);

        modified = true;
      }

      return modified ? code : null;
    },
  };
};
