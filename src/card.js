import { LitElement, html, css } from 'lit';

class SmartQasaLightCard2 extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static get styles() {
    return css`
      .container {
        display: grid;
        height: var(--sq-card-height, 4.0rem);
        padding: var(--sq-card-padding, 0 1.0rem);
        border: var(--sq-card-border, 'none');
        border-radius: var(--sq-card-border-radius, 1.0rem);
        box-shadow: var(--sq-card-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.2));
        grid-template-areas: "i n" "i s";
        grid-template-columns: auto 1fr;
        grid-column-gap: var(--sq-card-gap-column, 0.7rem);
        grid-row-gap: var(--sq-card-gap-row, 0.3rem);
        background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
        cursor: pointer;
      }
      .icon {
        grid-area: i;
        display: flex;
        height: var(--sq-icon-size, 25px);
        width: var(--sq-icon-size, 25px);
        justify-content: center;
        align-self: center;
        padding: var(--sq-icon-padding, 14px);
        border-radius: 50%;
        transition: var(--sq-icon-transition, none);
      }
      .name {
        grid-area: n;
        place-self: end start;
        max-height: 3.5rem;
        max-width: 100%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 16px);
        color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
      }
      .state {
        grid-area: s;
        align-self: start;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: var(--sq-secondary-font-weight, 300);
        font-size: var(--sq-secondary-font-size, 14px);
        color: rgb(var(--sq-secondary-font-rgb, 0, 0, 0));
      }
    `;
  }

  constructor() {
    super();
    this.hass = {};
    this._config = {};
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
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
