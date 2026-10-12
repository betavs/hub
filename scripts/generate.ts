import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const readme = 'https://raw.githubusercontent.com/betavs/betavs/main/README.md';

const template = `---
layout: home
title: Home
hero:
  name: betavs
  text:
  tagline: Passionate about programming, engineering, and open source.
  image: /assets/avatar.svg
  actions:
    - theme: brand
      text: Clash
      link: /clash/
    - theme: alt
      text: Contributions
      link: /contributions/
    - theme: sponsor
      text: Visual Studio Code Configuration
      link: https://github.com/betavs/betavs/tree/main/.vscode
---`;

const style = `<style scoped>
  [href$="#gh-dark-mode-only"] {
    display: none;
  }

  .dark [href$="#gh-dark-mode-only"] {
    display: block;
  }

  .dark [href$="#gh-light-mode-only"] {
    display: none;
  }

  p {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>`;

const path = join(process.cwd(), 'docs/index.md');

const home = async () => {
  const response = await fetch(readme);

  const text = await response.text();

  const content = text
    .replaceAll('bg_color=0d1117', 'bg_color=202127')
    .replaceAll('theme=default', 'theme=default&bg_color=f6f6f7')
    .trim();

  writeFileSync(path, `${template}\n\n${content}\n\n${style}\n`);
};

export const generate = async () => {
  await home();
};
