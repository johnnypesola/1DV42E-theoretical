module.exports = function() {

  return function( browser ) {

    // browser is created using wd.promiseRemote()
    // More info about wd at https://github.com/admc/wd

    var MS_BETWEEN_PAGES = 5000

    // Sleep a little, load page.
    return browser.sleep( MS_BETWEEN_PAGES )

    // Get link to blog post page
    .then( function() {
      return  browser.elementById( 'post1-link' )
    })

    // Click on link and sleep
    .then( function ( elem ) {
      elem.click();
      return browser.sleep( MS_BETWEEN_PAGES )
    })

    // Get link back to index page
    .then( function ( ) {
      return browser.elementById( 'back' );
    })

    // Click on link and sleep
    .then( function ( elem ) {
      elem.click()
      return browser.sleep( MS_BETWEEN_PAGES )
    })

    // And we are done
    .then( function () {
      browser.fin( function(){

        return browser.quit();
      } )
      .done();
    })
  }
};