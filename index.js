/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-gridstack',

  included: function(app) {
    this._super.included(app);

    // lodash
    app.import({
      development: app.bowerDirectory + '/lodash/lodash.js',
      production:  app.bowerDirectory + '/lodash/dist/lodash.min.js'
    });

    // jquery-ui dependencies needed by gridstack.js
    // https://github.com/gridstack/gridstack.js/blob/v0.2.6/src/gridstack.js#L10
    [ 'version', 'data', 'disable-selection', 'focusable', 'escape-selector', 'form',
      'ie', 'keycode', 'labels', 'jquery-1-7', 'plugin', 'safe-active-element',
      'safe-blur', 'scroll-parent', 'tabbable', 'unique-id', 'widget'
    ].forEach(function(module) {
      app.import({
        development: app.bowerDirectory + '/jquery-ui/ui/' + module + '.js',
        production:  app.bowerDirectory + '/jquery-ui/ui/minified/' + module + '.min.js'
      });
    });

    [ 'mouse', 'draggable', 'droppable', 'resizable' ].forEach(function(module) {
      app.import({
        development: app.bowerDirectory + '/jquery-ui/ui/widgets/' + module + '.js',
        production:  app.bowerDirectory + '/jquery-ui/ui/widgets/minified/' + module + '.min.js'
      });
    });

    let config = this.getOptions();
    if (config.exclude.indexOf('jquery.ui.touch-punch') < 0) {
      app.import({
        development: app.bowerDirectory + '/jquery.ui.touch-punch/dist/jquery.ui.touch-punch.js',
        production: app.bowerDirectory + '/jquery.ui.touch-punch/dist/jquery.ui.touch-punch.min.js'
      });
    }


    // Gridstack
    [ 'gridstack', 'gridstack.jQueryUI' ].forEach(function(module) {
      app.import({
        development: app.bowerDirectory + '/gridstack/dist/' + module + '.js',
        production: app.bowerDirectory + '/gridstack/dist/' + module + '.min.js'
      });
    });
    app.import(app.bowerDirectory + '/gridstack/dist/gridstack.css');
  },

  getOptions() {
    let projectConfig = (this.project.config(process.env.EMBER_ENV) || {})['ember-gridstack'] || {};

    let config = Object.assign({}, {
      exclude: [],
    }, projectConfig);
    config.exclude = config.exclude || [];

    return config;
  }
};
