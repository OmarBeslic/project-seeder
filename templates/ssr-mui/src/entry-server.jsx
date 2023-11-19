import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url, context, prefetched = {}) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App prefetched={prefetched}/>
    </StaticRouter>
  );
}
