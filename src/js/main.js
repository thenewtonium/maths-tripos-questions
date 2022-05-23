var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

darkModeQuery.addListener(function (query) {
	var theme = query.matches ? "dark" : "light";
	var signal = new CustomEvent("changeTheme", {
        detail: {
          theme: theme
        }
    });
	document.documentElement.dispatchEvent(signal);
});

// additional script to align the giscus theme to the page theme
function sendMessage(message) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: message }, iframe.src);
}

document.documentElement.addEventListener("changeTheme", e => {
	console.log(e);
	var theme = e.detail.theme;
	document.documentElement.setAttribute("data-theme", theme);
	sendMessage ({ setConfig: {theme: theme} });
});

