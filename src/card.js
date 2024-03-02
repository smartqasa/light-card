import { LitElement, html } from 'lit';
import styles from './styles';

export class SmartQasaLightCard2 extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.hass = {};
    this._config = {};
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity.');
    }
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];
    const name = this._config.name || stateObj?.attributes.friendly_name || 'Unknown';
    const state = stateObj?.state || 'unknown';
    let icon, iconColor, stateFmtd;

    if (stateObj) {
      icon = stateObj.attributes.icon || 'hass:alert-rhombus';
      iconColor = state == 'on' ? 'var(--sq-light-on-rgb)' : 'var(--sq-inactive-rgb)';
      stateFmtd = this.hass.formatEntityState(stateObj) + (state == 'on' && stateObj.attributes.brightness ? ' - ' + this.hass.formatEntityAttributeValue(stateObj, 'brightness') : '');
    } else {
      icon = 'hass:alert-rhombus';
      iconColor = 'var(--sq-unavailable-rgb)';
      stateFmtd = 'Unknown';
    }

    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div class="icon" @click=${this._toggleEntity} style="color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity));">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
  }

  _toggleEntity(e) {
    e.stopPropagation();
    this.hass.callService('light', 'toggle', {
      entity_id: this._config.entity
    });
  }

  _showMoreInfo(e) {
    e.stopPropagation();
    const event = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._config.entity } });
    this.dispatchEvent(event);
  }
}
