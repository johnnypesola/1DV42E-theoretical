# 1DV42E-theoretical

## What is this?

This repo contains three things:

- A simple blog written in Angular.js 1.5 (see the angular folder)
- A simple blog written in react-router-redux (see the react-router-redux)
- Some testcode using the [browser-perf lib](https://github.com/axemclion/browser-perf)

### Why?

Well, the purpose is to test if there are any performance differences between the two frameworks in the context
of displaying a simple blog.
   
It comes preconfigured with rendering out 1000 blog posts. The tests are run in Chrome and Firefox.

### Test enviroments

Theese tests have been executed in an Windows 7 enviroment, where they worked quite well. 

## Install instructions

I'm sure this could be optimized, and maybe I'll look in to that in the future. But at the time beeing this is how to get started.

1. Run `npm install -g selenium-standalone` and `selenium-standalone install` to install [selenium](http://www.seleniumhq.org/). 
2. Run `selenium-standalone start` to start up a selenium server that is used to automate the browser further on.
3. Run `npm install -g browser-perf` to install browser perf globally (Has to be a global install).
4. Fire up another console and run `cd angular` and after that `npm start` to fire up the web server for the angular blog.
5. Fire up another console and run `cd react-router-redux` and after that `npm start` to fire up the web server for the react-router-redux blog.
6. Fire up another console and run `cd browser-perf-tests` and after that `npm start` to initiate the tests. It's configured to run 100 tests. Change this in `browser-perf-tests/run_tests.js`
7. The output goes into the folder `browser-perf-tests/test_output`.
8. If you want process the testdata then run `npm run process` in the `browser-perf-tests` folder.

### Known issues

It seems that some test values are missing when using browser-perf on Windows 10.  