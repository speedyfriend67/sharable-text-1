// Function to save text locally
function saveTextLocally() {
  var text = document.getElementById("textToShare").value;
  var savedTexts = JSON.parse(getCookie('savedTexts')) || [];
  savedTexts.push(text);
  setCookie('savedTexts', JSON.stringify(savedTexts), 365); // Cookie expires in 365 days
  displaySavedTexts();
  alert('Text saved locally.');
}

// Function to display locally saved texts
function displaySavedTexts() {
  var savedTexts = JSON.parse(getCookie('savedTexts')) || [];
  var searchText = document.getElementById("searchText").value.trim().toLowerCase();
  var list = document.getElementById("savedTexts");
  list.innerHTML = "";
  savedTexts.forEach(function(text) {
    if (text.toLowerCase().includes(searchText)) {
      var listItem = document.createElement("li");
      listItem.textContent = text;
      listItem.addEventListener('click', function() {
        document.getElementById("textToShare").value = text;
        generateSharedLink();
      });
      list.appendChild(listItem);
    }
  });
}

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Call function to display locally saved texts when page loads
window.onload = function() {
  displaySavedTexts();
};

// Function to clear locally saved texts
function clearLocalTexts() {
  setCookie('savedTexts', '', -1); // Delete the cookie
  displaySavedTexts();
}
