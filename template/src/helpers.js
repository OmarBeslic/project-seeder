export function isClientSide() {
  return typeof window !== "undefined";
}

export function prepareStyleCSS(style) {
  let styleCSS = "";

  for (const variableName in style) {
    styleCSS += `--${variableName}: ${style[variableName]};`;
  }

  return styleCSS;
}

export function showNotification({ message, length = 3 * 1000 }) {
  // create a new notification element
  const notification = document.createElement("div");
  const notificationMessage = document.createTextNode(message);

  notification.setAttribute("id", "toastNotification");
  notification.appendChild(notificationMessage);

  // add the newly created element and its content into the DOM
  const insertionDiv = document.getElementById("root");
  document.body.insertBefore(notification, insertionDiv);

  // Show notification
  notification.className = "show";
  // Remove notification after timeout
  setTimeout(function () {
    notification.className = notification.className.replace("show", "");
    notification.remove();
  }, length);
}
