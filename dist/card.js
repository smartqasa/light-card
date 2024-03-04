(function (lit) {
  'use strict';

  class SmartQasaLightCard2 extends lit.LitElement {
    _hass;
    static get properties() {
      return {
        _entity: {
          state: true
        },
        _stateObj: {
          state: true
        },
        _icon: {
          state: true
        },
        _name: {
          state: true
        },
        _state: {
          state: true
        }
      };
    }
    setConfig(config) {
      if (config.entity) {
        this._entity = config.entity;
        this._icon = config.icon || null;
        this._name = config.name || null;
      } else {
        throw new Error('You need to define an entity');
      }
    }
    set hass(hass) {
      this._hass = hass;
      this._stateObj = this._hass.states[this._entity] || undefined;
    }
    static get styles() {
      return lit.css`
      .container {
        display: grid;
        height: var(--sq-card-height, 4.0rem);
        padding: var(--sq-card-padding, 0 1.0rem);
        border: var(--sq-card-border, 'none');
        border-radius: var(--sq-card-border-radius, 1.0rem);
        box-shadow: var(--sq-card-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.2));
        grid-template-areas: 'i n' 'i s';
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
    render() {
      let icon, iconColor, name, stateFmtd;
      if (this._stateObj) {
        this._state = this._stateObj.state;
        icon = this._icon || this._stateObj.attributes.icon;
        name = this._name || this._stateObj.attributes.friendly_name;
        iconColor = this._state == 'on' ? 'var(--sq-light-on-rgb)' : 'var(--sq-inactive-rgb)';
        stateFmtd = this._hass.formatEntityState(this._stateObj) + (this._state == 'on' && this._stateObj.attributes.brightness ? ' - ' + this._hass.formatEntityAttributeValue(this._stateObj, 'brightness') : '');
      } else {
        icon = 'hass:alert-rhombus';
        name = this._name || 'Unknown';
        iconColor = 'var(--sq-unavailable-rgb)';
        stateFmtd = 'Unknown';
      }
      return lit.html`
      <div class='container' @click=${this._showMoreInfo}>
        <div class='icon' @click=${this._toggleEntity} style='
          color: rgb(${iconColor});
          background-color: rgba(${iconColor}, var(--sq-icon-opacity));
        '>
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class='name'>${name}</div>
        <div class='state'>${stateFmtd}</div>
      </div>
    `;
    }
    _toggleEntity(e) {
      e.stopPropagation();
      this._hass.callService('light', 'toggle', {
        entity_id: this._entity
      });
    }
    _showMoreInfo(e) {
      e.stopPropagation();
      const event = new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: {
          entityId: this._entity
        }
      });
      this.dispatchEvent(event);
    }
  }

  customElements.define("smartqasa-light-card2", SmartQasaLightCard2);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "smartqasa-light-card2",
    name: "SmartQasa Light Card v2.12",
    description: "A SmartQasa card for controlling a light entity."
  });

})(lit);
