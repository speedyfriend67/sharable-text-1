// Function to update URL with text parameter
function updateURL(text) {
  var baseUrl = window.location.href.split('?')[0];
  var newUrl = baseUrl + '?text=' + encodeURIComponent(text);
  window.history.pushState({ path: newUrl }, '', newUrl);
}

// Function to retrieve text from URL parameter
function getTextFromURL() {
  var params = new URLSearchParams(window.location.search);
  return params.get('text') || '';
}

// Function to generate shared link
function generateSharedLink() {
  var text = document.getElementById("textToShare").value;
  var customPath = document.getElementById("customPath").value.trim();
  var customLinkText = document.getElementById("customLinkText").value.trim();
  
  var sharedLink = window.location.href.split('?')[0] + '?text=' + encodeURIComponent(text);
  
  if (customPath !== "") {
    sharedLink += '/' + encodeURIComponent(customPath);
  }
  
  if (customLinkText !== "") {
    sharedLink += '&custom=' + encodeURIComponent(customLinkText);
  }
  
  document.getElementById("sharedLink").innerHTML = "Share this link: <a href='" + sharedLink + "'>" + sharedLink + "</a>";
}

// Function to copy shared link to clipboard
function copyToClipboard() {
  var sharedLink = document.getElementById("sharedLink").innerText;
  navigator.clipboard.writeText(sharedLink)
    .then(() => alert('Link copied to clipboard'))
    .catch(error => console.error('Error copying link:', error));
}

// Function to save text locally
function saveTextLocally() {
  var text = document.getElementById("textToShare").value;
  localStorage.setItem('savedText', text);
  alert('Text saved locally.');
}

// Function to clear input text area
function clearText() {
  document.getElementById("textToShare").value = "";
  generateSharedLink();
}

// Function to update character count
function updateCharCount() {
  var text = document.getElementById("textToShare").value;
  var charCount = text.length;
  document.getElementById("charCount").innerText = "Characters: " + charCount;
}

// Call function to display shared link when page loads
window.onload = function() {
  var sharedText = getTextFromURL();
  document.getElementById("textToShare").value = sharedText;
  generateSharedLink();
  updateCharCount();
};

// Add event listener for input text area
document.getElementById("textToShare").addEventListener("input", function() {
  updateCharCount();
});
