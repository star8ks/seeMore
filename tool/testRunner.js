/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
const jasmine = new (require('jasmine'))();
jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    // '**/*spec.js'
    'util.spec.js'
    // '**/bing-spec.js'
  ],
  helpers: []
});
jasmine.execute();
