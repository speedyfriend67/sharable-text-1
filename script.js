// Function to generate shared link with custom text
function generateSharedLink() {
  var text = document.getElementById("textToShare").value;
  var customPath = document.getElementById("customPath").value.trim();
  var customLinkText = prompt("Enter custom link text:") || ""; // Prompt for custom link text

  var sharedLink = window.location.href.split('?')[0] + '?text=' + encodeURIComponent(text);

  if (customPath !== "") {
    sharedLink += '&customPath=' + encodeURIComponent(customPath);
  }

  if (customLinkText !== "") {
    sharedLink += '&custom=' + encodeURIComponent(customLinkText);
  }

  var linkElement = document.getElementById("sharedLink");
  linkElement.innerHTML = ""; // Clear existing content
  var customLink = document.createElement("a");
  customLink.href = sharedLink;
  customLink.textContent = customLinkText;
  linkElement.appendChild(customLink);

  // Update URL parameters with shared text and custom path
  updateURL(text, customPath);
}

// Function to update URL parameters with shared text and custom path
function updateURL(text, customPath) {
  var baseUrl = window.location.href.split('?')[0];
  var newUrl = baseUrl + '?text=' + encodeURIComponent(text);

  if (customPath !== "") {
    newUrl += '&customPath=' + encodeURIComponent(customPath);
  }

  window.history.pushState({ path: newUrl }, '', newUrl);
}

// Function to copy shared link to clipboard
function copyToClipboard() {
  var sharedLink = document.getElementById("sharedLink").querySelector("a").href;
  navigator.clipboard.writeText(sharedLink)
    .then(() => alert('Link copied to clipboard'))
    .catch(error => console.error('Error copying link:', error));
}

// Function to save text locally
function saveTextLocally() {
  var text = document.getElementById("textToShare").value;
  var savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
  savedTexts.push(text);
  localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
  displaySavedTexts();
  alert('Text saved locally.');
}

// Function to display locally saved texts
function displaySavedTexts() {
  var savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
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

// Function to clear input text area
function clearText() {
  document.getElementById("textToShare").value = "";
  generateSharedLink();
}

// Function to clear locally saved texts
function clearLocalTexts() {
  localStorage.removeItem('savedTexts');
  displaySavedTexts();
}

// Function to update character count
function updateCharCount() {
  var text = document.getElementById("textToShare").value;
  var charCount = text.length;
  document.getElementById("charCount").innerText = "Characters: " + charCount;
}

// Call function to display shared link when page loads
window.onload = function() {
  var params = new URLSearchParams(window.location.search);
  var sharedText = params.get('text') || '';
  document.getElementById("textToShare").value = sharedText;
  generateSharedLink(); // Generate shared link with custom URL
  updateCharCount();
  displaySavedTexts();
};

// Add event listener for input text area
document.getElementById("textToShare").addEventListener("input", function() {
  updateCharCount();
});

// Add event listener for search input
document.getElementById("searchText").addEventListener("input", function() {
  displaySavedTexts();
});

