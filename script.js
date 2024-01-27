// Function to generate a unique URL for the entered text
function generateSharedLink() {
  var text = document.getElementById("textToShare").value.trim();
  if (text === "") {
    alert("Please enter some text.");
    return;
  }
  var link = "https://justpaste.it/"; // Placeholder link
  document.getElementById("sharedLink").innerHTML = "Share this link: <a href='" + link + "'>" + link + "</a>";
}

// Function to save text locally
function saveTextLocally() {
  var text = document.getElementById("textToShare").value.trim();
  if (text === "") {
    alert("Please enter some text.");
    return;
  }
  var savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
  savedTexts.push(text);
  localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
  displaySavedTexts();
  alert('Text saved locally.');
}

// Function to display locally saved texts
function displaySavedTexts() {
  var savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
  var list = document.getElementById("savedTexts");
  list.innerHTML = "";
  savedTexts.forEach(function(text) {
    var listItem = document.createElement("li");
    listItem.textContent = text;
    list.appendChild(listItem);
  });
}

// Function to clear locally saved texts
function clearLocalTexts() {
  localStorage.removeItem('savedTexts');
  displaySavedTexts();
}

// Function to clear the text area
function clearText() {
  document.getElementById("textToShare").value = "";
}

// Call function to display locally saved texts when page loads
window.onload = function() {
  displaySavedTexts();
};

