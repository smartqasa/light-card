import { ToggleCardWithToolchain } from "./card";

customElements.define('smartqasa-light-card2', SmartQasaLightCard2);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-light-card2',
  name: 'SmartQasa Light Card - v2',
  preview: true,
  description: 'A SmartQasa card for controlling a light entity.',
});