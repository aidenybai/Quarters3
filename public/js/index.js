function add() {
  var panel = document.querySelector('#add-panel');
  var tabs = document.querySelector('#tabs');
  var name = document.querySelector('#name');

  var ls = {
    'person': {
      quarters: 1
    }
  };
  
  var user = 'person';
  tabs.append(document.createRange().createContextualFragment(`
  <li>
    <div id="${user}" class="collapsible-header">
      ${name.value}
    </div>
    <div class="collapsible-body">
      <p>
        Quarters: <input id="${name}-d" value="${ls[user].quarters}" type="number">
      </p>
    </div>
  </li>
`));
}