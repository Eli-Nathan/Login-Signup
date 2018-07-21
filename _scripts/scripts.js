window.addEventListener('load', function() {
  let theTabs = document.querySelectorAll('[data-target]'),
      contentPanes = document.querySelectorAll('[data-id]'),
      i;

  function theTabClicks(e) {
    e.preventDefault();
    let clickedTab = e.target,
        activePaneId = clickedTab.getAttribute('data-target'),
        activePane = document.querySelectorAll('[data-id="' + activePaneId + '"]');

    for (i = 0; i < theTabs.length; i++) {
      theTabs[i].classList.remove('active');
      contentPanes[i].classList.remove('active');
    }
    clickedTab.classList.add('active');

    activePane[0].classList.add('active');
  }

  for (i = 0; i < theTabs.length; i++) {
    theTabs[i].addEventListener('click', theTabClicks);
  }
});
