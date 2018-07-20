window.addEventListener('load', function() {
  let theTabs = document.querySelectorAll('[data-target]');
  let i;

  function theTabClicks(tabClickEvent) {
    let clickedTab = tabClickEvent.currentTarget;
    let tabParent =
    tabClickEvent.currentTarget.parentNode.parentNode.parentNode;
    let theTabs = tabParent.querySelectorAll('[data-target]');
    for (i = 0; i < theTabs.length; i++) {
      theTabs[i].classList.remove('active');
    }

    clickedTab.classList.add('active');
    tabClickEvent.preventDefault();
    let contentPanes = tabParent.querySelectorAll('[data-id]');
    for (i = 0; i < contentPanes.length; i++) {
      contentPanes[i].classList.remove('active');
    }
    let anchorReference = tabClickEvent.target;
    let activePaneId = anchorReference.getAttribute('data-target');
    // console.log(activePaneId + " | " + activePane);
    let activePane =
    tabParent.querySelectorAll('[data-id="' + activePaneId + '"]');
    activePane[0].classList.add('active');
  }

  for (let i = 0; i < theTabs.length; i++) {
    theTabs[i].addEventListener('click', theTabClicks)
  }
});
