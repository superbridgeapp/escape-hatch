import packageJson from './package.json';

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Escape Hatch',
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage'],
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    '128': 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      // KEY for cache invalidation
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        '/src/pages/injected/index.js',
        '/assets/js/*.js',
        '/assets/css/*.css',
        '/assets/**/*.png',
        '/assets/fonts/*.woff',
        '/assets/fonts/*.woff2',
        '/assets/woff/*.woff',
        '/assets/woff2/*.woff2',
        '/icon-128.png',
        '/icon-34.png',
      ],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
