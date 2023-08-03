import typescript from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import { Addon } from '@embroider/addon-dev/rollup';
import { glimmerTemplateTag } from 'rollup-plugin-glimmer-template-tag';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints([
      // For our own build we treat all JS modules as entry points, to not cause rollup-plugin-ts to mess things up badly when trying to tree-shake TS declarations
      // but the actual importable modules are further restricted by the package.json entry points!
      '**/*.js',
    ]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['components/**/*.js']),

    // compile <template> tag into plain JS
    glimmerTemplateTag({ preprocessOnly: true }),

    // compile TypeScript to latest JavaScript, including Babel transpilation
    typescript({
      transpiler: 'babel',
      browserslist: false,
      // Reasoning for this being set to true: https://github.com/NullVoxPopuli/rollup-plugin-glimmer-template-tag/#configure-rollup-plugin-ts-ts-only
      transpileOnly: true,
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),

    // Copy Readme, License, and Notice into published package
    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
        { src: '../NOTICE.md', dest: '.' },
      ],
    }),
  ],
};
