import { SmartQasaLightCard2 } from "./card";

declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

customElements.define("smartqasa-light-card2", SmartQasaLightCard2);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "smartqasa-light-card2",
  name: "SmartQasa Light Card2",
  description: "A SmartQasa card for controlling a light entity.",
});