// On load
window.addEventListener('load', function() {
  // Get all tabs and content panes and define i for later use
  let theTabs = document.querySelectorAll('[data-target]'),
      contentPanes = document.querySelectorAll('[data-id]'),
      i;

  // Tabbing functionality
  function theTabClicks(e) {
    // Prevent link click
    e.preventDefault();
    /*
      * Define local variables:
        * Tab that was clicked
        * ID of that tab
        * Which tab content to make active
    */
    let clickedTab = e.target,
        activePaneId = clickedTab.getAttribute('data-target'),
        activePane = document.querySelectorAll('[data-id="' + activePaneId + '"]');

    // For all the tabs
    for (i = 0; i < theTabs.length; i++) {
      // Remove active classes
      theTabs[i].classList.remove('active');
      contentPanes[i].classList.remove('active');
    }
    // Add active classes to the elements
    clickedTab.classList.add('active');
    activePane[0].classList.add('active');
  }

  // Add event listener to all tabs
  for (i = 0; i < theTabs.length; i++) {
    // Call function with event listener
    theTabs[i].addEventListener('click', theTabClicks);
  }
});
