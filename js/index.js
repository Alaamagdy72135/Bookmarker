var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitButton = document.getElementById("submitButton");
var websiteList = [];
var deleteBtn = document.getElementById("delete");
var viewBtn = document.getElementById("visit");
var currentIndex = 0;
if (localStorage.getItem("websiteList") !== null) {
  websiteList = JSON.parse(localStorage.getItem("websiteList"));
  displayWebsite();
}

function addWebsite() {
  var website = {
    code: siteNameInput.value,
    url: siteUrlInput.value,
  }
  for (var i = 0; i < websiteList.length; i++) {
    if (websiteList[i].code === website.code) {
      alert("This website is already bookmarked");
      return;
    }
  }
  websiteList.push(website);
  console.log(website);
  localStorage.setItem("websiteList", JSON.stringify(websiteList));
  clearWebsite();
  displayWebsite();
}
function clearWebsite() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function displayWebsite() {
  var cartona = "";
  for (var i = 0; i < websiteList.length; i++) {
    cartona +=
      `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${websiteList[i].code}</td>
                <td>
                  <button onclick="visitWebsite(${i});" id="visit" target="_blank" href="${websiteList[i].url}" class="btn btn-success">
                    <span><i class="fa-solid fa-eye"></i> </span>Visit
                  </button>
                </td>
                <td>
                  <button onclick="deleteWebsite(${i});" id="delete" class="btn btn-danger">
                    <span><i class="fa-solid fa-trash-can"></i></span>
                    Delete
                  </button>
                </td>
              </tr>
        `
  }
  document.getElementById("rowData").innerHTML = cartona;
  clearWebsite();
}

function deleteWebsite(i) {
  websiteList.splice(i, 1);
  localStorage.setItem("websiteList", JSON.stringify(websiteList));
  displayWebsite();
}

function visitWebsite(i) {
  window.open(websiteList[i].url);
}

function validateUrl() {
  var regex = /^((https?|ftp):\/\/)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|localhost|(\d{1,3}\.){3}\d{1,3}|\[[a-fA-F0-9:]+\])(:\d+)?(\/[-a-zA-Z0-9@:%._~!$&'()*+,;=]*)*(\?[;&a-zA-Z0-9@:%._~+=-]*)?(#[-a-zA-Z0-9@:%._~+=]*)?$/gi;
  var url = siteUrlInput.value;
  if (regex.test  (url)) {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
    return false;
  } 
}