module.exports = function() {

  return function( browser ) {

    // browser is created using wd.promiseRemote()
    // More info about wd at https://github.com/admc/wd

    var MS_BETWEEN_PAGES = 5000
    var MS_BETWEEN_INPUTS = 1000

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

    // Get link to delete blog post
    .then( function ( ) {
        return browser.elementById( 'delete1-button' );
    })

    // Click on button and sleep
    .then( function ( elem ) {
        elem.click()
        return browser.sleep( MS_BETWEEN_PAGES )
    })

    // Get header input element
    .then( function (  ) {
      return browser.elementById( 'new-header' );
    })

    .then( function ( elem ) {
      elem.type( 'New super special header!' )
      return browser.sleep( MS_BETWEEN_INPUTS )
    })

    // Get header input element
    .then( function (  ) {
      return browser.elementById( 'new-content' );
    })

    .then( function ( elem ) {
      elem.type( 'Some mega cool content!' )
      return browser.sleep( MS_BETWEEN_INPUTS )
    })

    // Get link to delete blog post
    .then( function ( ) {
      return browser.elementById( 'new-submit' );
    })

    // Click on button and sleep
    .then( function ( elem ) {
      elem.click()
      return browser.sleep( MS_BETWEEN_PAGES )
    })
  }
};