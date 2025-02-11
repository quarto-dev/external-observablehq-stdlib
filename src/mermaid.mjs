import {mermaid as merd} from "./dependencies.mjs";
import uid from "./dom/uid.mjs";

export default async function mermaid(require) {
  const mer = await require(merd.resolve());
  mer.initialize({securityLevel: "loose", theme: "neutral"});
  return function mermaid() {
    const root = document.createElement("div");
    root.innerHTML = mer.render(uid().id, String.raw.apply(String, arguments));
    return root.removeChild(root.firstChild);
  };
}
