/* eslint-disable node/no-extraneous-require */

'use strict';

const fs = require('fs');

const GitLabReporter = require('testem-gitlab-reporter');
const MultiReporter = require('testem-multi-reporter');
const TAPReporter = require('testem/lib/reporters/tap_reporter');

let reporter = new MultiReporter({
  reporters: [
    {
      ReporterClass: TAPReporter,
      args: [false, null, { get: () => false }],
    },
    {
      ReporterClass: GitLabReporter,
      args: [false, fs.createWriteStream('junit.xml'), { get: () => false }],
    },
  ],
});

module.exports = {
  test_page: 'tests/index.html?hidepassed&dockcontainer',
  disable_watching: true,
  reporter,
  parallel: 8,
  launch_in_ci: ['Chrome'],
  launch_in_dev: [],
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
  },
};
