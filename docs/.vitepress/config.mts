import { type ConfigEnv, defineConfig, loadEnv } from 'vitepress';

import { prefix, replace } from './plugins/assets';

export default (config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd());

  const { VITE_HOST, VITE_API, VITE_ASSETS_PROXY } = env;

  const logo = `/assets/logo.svg`;

  return defineConfig({
    title: 'betavs',

    titleTemplate: ':title · betavs',

    description:
      'The personal website of betavs, sharing open source projects, software development experiences, and technical insights.',

    head: [
      [
        'meta',
        {
          name: 'keywords',
          content:
            'betavs, github, programming, engineering, software developer, open source projects',
        },
      ],
      ['link', { rel: 'icon', href: logo }],
    ],

    themeConfig: {
      logo,

      siteTitle: 'betavs',

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Clash', link: '/clash/' },
        { text: 'Contributions', link: '/contributions/' },
      ],

      socialLinks: [{ icon: 'github', link: 'https://github.com/betavs/hub' }],
    },

    sitemap: {
      hostname: VITE_HOST,
    },

    vite: {
      plugins: [
        prefix(VITE_ASSETS_PROXY, [
          'https://github-readme-stats-one-bice.vercel.app',
          'https://github-stats-extended.vercel.app',
        ]),
        replace('__API__', VITE_API),
      ],
    },

    ignoreDeadLinks: 'localhostLinks',
  });
};
