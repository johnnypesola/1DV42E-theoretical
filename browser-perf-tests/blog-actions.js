module.exports = function() {

  return function( browser ) {

    // browser is created using wd.promiseRemote()
    // More info about wd at https://github.com/admc/wd

    var MS_BETWEEN_PAGES = 5000

    return browser.sleep( MS_BETWEEN_PAGES )
    .then( function() {
      console.log( 'get link to post' )

      return  browser.elementById( 'post1-link' )
    })
    .then( function ( elem ) {
      elem.click();
      return browser.sleep( MS_BETWEEN_PAGES )
    })
    .then( function ( ) {
      return browser.elementById( 'back' );
    })
    .then( function ( elem ) {
      elem.click()
      return browser.sleep( MS_BETWEEN_PAGES )
    })
    .then( function () {
      browser.fin( function(){

        return browser.quit();
      } )
      .done();
    })
  }
};