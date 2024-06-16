(function () {

  console.log('Plugin Dual Columns started')

  const HtmlContent = `

  <style>
    :host {
      overflow: hidden;
      font-size: 30px;
      width: 100%;
      height: 70px;
      padding: 10px;
      box-sizing: border-box;
    }

    .screens {
      display: flex;
    }

    .screen {
      flex-shrink: 0;
      width: 50%;
    }
  </style>

  <div class="screens">
    <div class="screen left" ></div>
    <div class="screen right" ></div>
  </div>                       
`;

  class DualColumnsComponent extends HTMLElement {

    constructor() {
      super()

      this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

      this.shadow.innerHTML = HtmlContent     
      
      this.refresh()
    }
    
    static get observedAttributes() {
      return ['screen-left', 'screen-right'];
    }
    
    attributeChangedCallback() {
      this.refresh()
    }
    
    refresh() {
      
      setTimeout(async () => {
        
        const screenLeftId = this.getAttribute('screen-left')
        
        const screenRightId = this.getAttribute('screen-right')
        
        const application = zySdk.services.runtime.getApplication()

        const screenLeft = application.screens.find(s => s.id === screenLeftId)      
        const elementLeft = this.shadowRoot.querySelector('.left')        
        elementLeft.innerHTML = screenLeft.htmlContent
        
        const screenRight = application.screens.find(s => s.id === screenRightId)      
        const elementRight = this.shadowRoot.querySelector('.right')        
        elementRight.innerHTML = screenRight.htmlContent
        
      })
    }
  }

  const Icon = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    
    <path d="M13,23H11V1H13V23M9,19H5V5H9V3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.9,21 5,21H9V19M19,7V9H21V7H19M19,5H21C21,3.89 20.1,3 19,3V5M21,15H19V17H21V15M19,11V13H21V11H19M17,3H15V5H17V3M19,21C20.11,21 21,20.11 21,19H19V21M17,19H15V21H17V19Z" />
  </svg>
`;

  const DualColumnsMetadata = {
    id: 'custom-dual-columns',
    metadataVersion: 2,
    icon: Icon,
    label: 'Dual columns',
    category: 'Plugins',
    subCategory: 'Plugins',
    hidden: false,
    keepRatio: false,
    properties: [{
      id: 'screen-left',
      name: 'Screen left',
      type: 'screen',
      tootip: '',
      default: '',
      main: true
    }, {
      id: 'screen-right',
      name: 'Screen right',
      type: 'screen',
      tootip: '',
      default: '',      
    }],
    styles: []
  }

  zySdk.services.registry.registerComponent(DualColumnsMetadata, DualColumnsComponent)

})();