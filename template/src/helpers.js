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

// Get required params to pass to prefetch functions
export const getRouteParams = ({ url, path }) => {
  // Example
  // /       posts       /       antique       /     12
  // / skip as not param /      :category      /    :id
  // will be sent as { category: "antique", id: 12 }
  const preparedUrl = url[0] == "/" ? url.slice(1) : url.repeat(1);
  const preparedPath = path[0] == "/" ? path.slice(1) : path.repeat(1);
  const splittenUrl = preparedUrl.split("?").shift().split("/");
  const splittenPath = preparedPath.repeat(1).split("/");

  // For each param in path return key value pair
  // param is defined if its path includes ':'
  const params = {};
  splittenPath.forEach((element, index) => {
    if (element.includes(":")) {
      const paramName = element.slice(1);
      const paramValue = splittenUrl[index];

      params[paramName] = paramValue;
    }
  });
  return params;
};
