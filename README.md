# Spike on ui template for AngularJS spa apps

This project is ui template for web projects based on bootstrap and angular-seed.

For guide, please visit angular-seed website to understand directory structures and
how to install tools and dependencies and how to run test and web server.

## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      index-async.html  --> just like index.html, but loads js files asynchronously
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      partials/             --> angular view partials (partial html templates)
        partial1.html
        partial2.html

    test/               --> test config and source files
      protractor-conf.js    --> config file for running e2e tests with Protractor
      e2e/                  --> end-to-end specs
        scenarios.js
      karma.conf.js         --> config file for running unit tests with Karma
      unit/                 --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services

## Mountebank

npm install -g mountebank --production
mb
imposter.json
curl -i -X POST -H 'Content-Type: application/json' -d@imposter.json http://localhost:2525/imposters
curl -X DELETE http://localhost:2525/imposters/8080

## Contact

For more information on Angular seed please check out https://github.com/angular/angular-seed

[angular-js]: http://angularjs.org/
[angular-seed]: https://github.com/angular/angular-seed
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server