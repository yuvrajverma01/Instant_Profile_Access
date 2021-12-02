// [ADD NEW PROFILE] button fetched ---------------------------------------------------
const add_new_button = document.getElementById("add_new_button");

// [DIV WITH PROFILE LINKS] and buttons fetched below  --------------------------------
const linksDiv = document.querySelector(".links-area");

// [key] is the name of the field
// [linkData] is the data/links in the field ------------------------------------------
const saveToLocalStorage = (key, linkData) => {
  if (!linkData) {
    return;
  }
  localStorage.setItem(key, linkData);
};

// [urlData] is the linkdata of the field ---------------------------------------------
const copyToClipboard = async (urlData) => {
  try {
    await navigator.clipboard.writeText(urlData);
    showalert(urlData);
  } catch (error) {
    alert("Did you give the clipboard permission ?");
  }
};

const showalert = (linkData) => {
  if (!linkData) {
    alert("No link to copy ❌ ");
    return;
  }
  alert(linkData + " copied to clipboard ✔  ");
};

// [PRESET] of profiles --------------------------------------------------------------

const loadAllFromLocalStorage = () => {
  const defaultFields = [
    "Github",
    "Linkedin",
    "Twitter",
    "Portfolio",
    "Email",
    "Dev",
  ];

  // An array for custom fields -----------------------------------------------------
  let customFields = JSON.parse(localStorage.getItem("customFields")) ?? [];

  if (customFields.length != 0) {
    customFields.forEach((field) => {
      renderFieldsFromLocalStorage({ newFieldName: field, isNewField: false });
    });
  } else {
    localStorage.setItem("customFields", JSON.stringify(defaultFields));
  }
};

// [newFieldName] is the name of the field
// [isNewField] is a boolean to check if the field is new or not ---------------------
const renderFieldsFromLocalStorage = ({ newFieldName, isNewField }) => {
  const newField = document.createElement("div");
  newField.classList.add(
    "flex",
    "flex-row",
    "justify-center",
    "items-center",
    "ml-3"
  );

// [FONT AWESOME] icons -------------------------------------------------------------

  const iconsHash = {
    Linkedin: "fab fa-linkedin",
    Github: "fab fa-github-alt",
    Twitter: "fab fa-twitter",
    Portfolio: "fab fa-instagram",
    Email: "fas fa-envelope",
    Dev: "fab fa-dev",
  };

  // Add default [LINK] icon to new fields ------------------------------------------

  const newIcon = document.createElement("i");
  newIcon.style.fontSize = "28px";

  if (iconsHash[newFieldName]) {
    newIcon.classList.add(...iconsHash[newFieldName].split(" "));
  } else {
    newIcon.classList.add("fas", "fa-link");
  }

  // Creating Copy and Delete Buttons -----------------------------------------------

  const newSaveIcon = document.createElement("i");
  newSaveIcon.classList.add("fas", "fa-save");
  
  const newCopyIcon = document.createElement("i");
  newCopyIcon.classList.add("fas", "fa-copy");

  const newDeleteIcon = document.createElement("i");
  newDeleteIcon.classList.add("fas", "fa-trash");

  // Creating Input Field -------------------------------------------------------------

  const newFieldInput = document.createElement("input");
  newFieldInput.classList.add(
    "w-3/5",
    "ml-4",
    "px-2",
    "py-2",
    "shadow-md",
    "rounded-md",
    "text-left"
  );

  newFieldInput.setAttribute("placeholder", newFieldName);
  newFieldInput.setAttribute("id", newFieldName);
  newFieldInput.value = localStorage.getItem(newFieldName);
  newFieldInput.setAttribute("type", "text");

// -------------------------- SAVE BUTTON -------------------------------

  const newFieldSaveBtn = document.createElement("button");
  newFieldSaveBtn.classList.add(
    "m-2",
    "bg-grey-500",
    "hover:bg-grey-700",
    "text-black",
    "font-bold",
    "py-2",
    "px-4",
    "rounded-md",
    "shadow-md"
  );
  newFieldSaveBtn.setAttribute("id", newFieldName + "SaveBtn");

  newFieldSaveBtn.appendChild(newSaveIcon);

  newFieldSaveBtn.addEventListener("click", () => {
    const data = document.getElementById(newFieldName).value;
    saveToLocalStorage(newFieldName, data);
  });

// -------------------------- DELETE BUTTON -------------------------------

const newFieldDeleteBtn = document.createElement("button");
newFieldDeleteBtn.classList.add(
  "m-2",
  "bg-grey-500",
  "hover:bg-grey-700",
  "text-black",
  "font-bold",
  "py-2",
  "px-4",
  "rounded-md",
  "shadow-md"
);
newFieldDeleteBtn.setAttribute("id", newFieldName + "DeleteBtn");

newFieldDeleteBtn.appendChild(newDeleteIcon);

newFieldDeleteBtn.addEventListener("click", () => {
  const data = document.getElementById(newFieldName).value = "";
  localStorage.setItem(newFieldName, data);
});


// -------------------------- COPY BUTTON -------------------------------

  const newFieldCopyBtn = document.createElement("button");
  newFieldCopyBtn.classList.add(
    "bg-grey-500",
    "hover:bg-grey-700",
    "text-black",
    "font-bold",
    "py-2",
    "px-4",
    "rounded-md",
    "shadow-md"
  );

  newFieldCopyBtn.setAttribute("id", newFieldName + "CopyBtn");
  newFieldCopyBtn.appendChild(newCopyIcon);

  newFieldCopyBtn.addEventListener("click", () => {
    const data = document.getElementById(newFieldName).value;
    copyToClipboard(data);
  });

// Adding above elements -------------------------------------------------------------

  newField.appendChild(newIcon);
  newField.appendChild(newFieldInput);
  newField.appendChild(newFieldSaveBtn);
  newField.appendChild(newFieldCopyBtn);
  newField.appendChild(newFieldDeleteBtn);

  linksDiv.appendChild(newField);

  if (isNewField) {
    let existingFields = JSON.parse(localStorage.getItem("customFields"));
    existingFields.push(newFieldName);
    localStorage.setItem("customFields", JSON.stringify(existingFields));
  }
};

add_new_button.addEventListener("click", () => {
  newFieldName = prompt("Enter a new field name");
  if (!newFieldName) return;

  if (isDuplicateField(newFieldName)) return;
  renderFieldsFromLocalStorage({ newFieldName, isNewField: true });
});

// [newLinkName] is the name of the field -------------------------------------------

const isDuplicateField = (newLinkName) => {
  const links = JSON.parse(localStorage.getItem("customFields"));

  if (!links) return;

  if (links.includes(newLinkName)) {
    alert("This field already exists");
    return true;
  }
};

// Load all the fields from local storage of browser on startup.
document.onload = loadAllFromLocalStorage();
