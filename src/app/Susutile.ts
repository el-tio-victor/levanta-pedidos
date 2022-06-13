

export class Susutile {

//rgb(0, 39, 88)secundario axul marino
//rgb(255, 255, 255) primario blanco 
//rgb(0, 59, 122) primario azul marino tono bajo
//rgb(0, 196, 226) primario azul claro



  tcolor = { 
    "C01" : 'rgb(255,255,255)',
    "C02" : 'rgb(0, 39, 88)',//naranja
    "C03" : 'rgb(135,134,138) ',
    "C04" : 'rgb(0, 196, 226)',//azul
    "C05" : 'rgb(114,161,171)',
    "C06" : 'rgb(255,197,130)',
    "C07" : 'rgb(0, 196, 226)',
    "C08" : 'rgb(255,255,255)',
    "C09" : 'rgb(0,0,0)',
    
    "O01" : 'rgb(114,161,171,0.5)',
    "P01" : 'rgb(114,161,171,1)',
    "O02" : 'rgb(217,136,65,0.5)',
    "O03" : 'rgb(148,190,211,0.1)',
    "O04" : 'rgb(149,165,173,0.5)',
    "O05" : 'rgb(255,255,255,0.5)',
    "O06" : 'rgb(255,197,130,0.5)',
    "O07" : 'rgb(250,100,31,0.5)'
  }












  cssDefault = [
    
    /* {e:'.mat-form-field-underline',
    reg:[
      { p:'background-image',s: 'none !important;'},
    ]}, */
    {e:'.inputLetra-hora',
    reg:[
      { p:'font-size',s: '30px !important'},
      { p:'color',s: this.tcolor.C02 +'!important'},
      { p:'font-weight',s: '600'},
      
    ]},
    {e:'.inputLetra-titulo',
    reg:[
      { p:'font-size',s: '30px !important'},
      { p:'color',s: this.tcolor.C02 +'!important'},
      { p:'font-weight',s: '600'},
      
    ]},
    {e:'::-webkit-input-placeholder, :-ms-input-placeholder',
    reg:[
      { p:'color', s: this.tcolor.C04+' !important' },
      { p:'font-size',s: '20px !important'},
    ]},
    {e:'input:-webkit-autofill, input:-webkit-autofill:hover,input:-webkit-autofill:focus, textarea:-webkit-autofill, textarea:-webkit-autofill:hover,textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover,select:-webkit-autofill:focus ',
    reg:[
      { p:'-webkit-text-fill-color', s: this.tcolor.C01+' !important' },
      { p:'border-bottom', s: 'solid 1px '+this.tcolor.C04+' !important'  },
    ]},
    {e:'input[type=text]:focus, input[type=text]:placeholder',
    reg:[
      { p:'color', s: this.tcolor.C01+' !important' },
      { p:'border-bottom', s: 'solid 1px '+this.tcolor.C01+' !important'  },
      
    ]},
    {e:'.form-control',
    reg:[
      { p:'border', s: '0px' },
      { p:'font-family', s: 'biko_regular' },
    ]},
    {e:'.form-control:disabled, .form-control[readonly]',
    reg:[
      { p:'color', s: this.tcolor.C07+' !important' },
      { p:'background-color', s: this.tcolor.C05 },
    ]},
    {e:'.activeSp',
    reg:[
      { p:'background', s: this.tcolor.C05+' !important' },
      { p:'border', s: 'solid 1px '+this.tcolor.C01 },
    ]},
    {e:'.bootstrap-table > .fixed-table-toolbar > .btn-group > input',
    reg:[
      { p:'background', s: this.tcolor.C05+' !important' },
      { p:'font-family', s: 'biko_regular' },
      { p:'border', s: '0px' },
      { p:'border-radius', s: '0px' },
    ]},
    {e:'.bootstrap-table > .fixed-table-toolbar > .btn-group > input:focus',
    reg:[
      { p:'box-shadow', s: 'none' },
      { p:'outline', s: 'none' },
      { p:'border', s: '0px solid !important' },
    ]},
    {e:'.bootstrap-table > div >  .btn-group  > .btn-secondary',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C01 },
      { p:'border', s: '0px' },
      { p:'border-radius', s: '40px' },
      { p:'width', s: '80px' },
    ]},
    {e:'.bootstrap-table > div >  .btn-group  > .btn-secondary:focus',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C01 },
      { p:'box-shadow', s: 'none !important' },
      { p:'outline', s: 'none !important' },
    ]},
   
    {e:'.bootstrap-table .fixed-table-container .table tbody tr.no-records-found',
    reg:[
      { p:'text-align', s: 'center' },
      { p:'color', s: this.tcolor.C04 },
      { p:'font-family', s: 'biko_regular' },
    ]},
   
    {e:'.progress',
    reg:[
      { p:'background-color', s: this.tcolor.C01 },
    ]},
    {e:'.progress-bar',
    reg:[
      { p:'background-color', s: this.tcolor.C07 },
    ]},
    {e:'.ngx-dropdown-button, .ngx-dropdown-button.disabled, .ngx-dropdown-button:disabled',
    reg:[
      { p:'color', s: this.tcolor.C05+' !important' },
      { p:'background-color', s: this.tcolor.C01+' !important' },
      { p:'border-color', s: this.tcolor.C01+' !important' },
      { p:'outline', s:'none !important' },
      { p:'border-radius', s:' 0px !important' },
      { p:'opacity', s:' 1 !important' },
    ]},
    {e:'.btn-primary, .btn-primary.disabled, .btn-primary:disabled',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C01 },
      { p:'border-color', s: this.tcolor.C01 },
      { p:'padding', s:'7px 21px' },
      { p:'border-radius', s:'50px' },
      { p:'opacity', s:'1 !important' },
    ]},
    {e:'.btn-primary:hover, .btn-primary:focus',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C01+' !important' },
      { p:'border-color', s: this.tcolor.C01+' !important' },
    ]},
    {e:'.btn-danger, .btn-danger.disabled, .btn-danger:disabled',
    reg:[
      { p:'border-color', s: this.tcolor.C07 },
      { p:'padding', s:'7px 21px' },
      { p:'border-radius', s:'50px' },
    ]},

    {e:'.page-link',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C01 },
      { p:'border', s: '0px' },
      { p:'margin', s: '5px' },
      { p:'font-family', s: 'biko_regular' },
    ]},
    {e:'.page-link:hover',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C01 },
    ]},
    {e:'.page-link:focus',
    reg:[
      { p:'box-shadow', s: 'none !important' },
      { p:'outline', s: 'none !important' },
    ]},
    {e:'.page-item:last-child .page-link',
    reg:[
      { p:'border-top-right-radius', s: '0px !important' },
      { p:'border-bottom-right-radius', s: '0px !important' },
    ]},
    {e:'.page-item:first-child .page-link',
    reg:[
      { p:'margin-left', s: '0' },
      { p:'border-top-left-radius', s: '0px !important' },
      { p:'border-bottom-left-radius', s: '0px !important' },
    ]},
    {e:'.page-item.active .page-link',
    reg:[
      { p:'color', s: this.tcolor.C05 },
      { p:'background-color', s: this.tcolor.C07 },
      { p:'border-color', s: this.tcolor.C07 },
    ]},
    {e:'#preload',
    reg:[
      { p:'background', s: this.tcolor.O01+' 0.7) !important' },
    ]},
    {e:'.text-primary',
    reg:[
      { p:'color', s: this.tcolor.C04+' !important' },
    ]},
    {e:'.text-light',
    reg:[
      { p:'color', s: this.tcolor.C05+' !important' },
    ]},
    {e:'.activeChe',
    reg:[
      { p:'color', s: this.tcolor.C04+' !important' },
    ]},
    {e:'.mybtndanger',
    reg:[
      { p:'color', s: this.tcolor.C01+' !important' },
      { p:'background-color', s: this.tcolor.C07+' !important' },
    ]},
    {e:'.mybtninfo',
    reg:[
      { p:'color', s: this.tcolor.C05+' !important' },
      { p:'background-color', s: this.tcolor.C02+' !important' },
    ]},
    {e:'.cahker .checkmark:after',
    reg:[
      { p:'border', s: 'solid '+this.tcolor.C07 },
    ]},
    {e:'.owl-dt-container-disabled, .owl-dt-trigger-disabled .checkmark:after',
    reg:[
      { p:'color', s: this.tcolor.C07+' !important' },
    ]},
    {e:'.custom-checkbox .custom-control-indicator',
    reg:[
      { p:'background-color', s: this.tcolor.C07 },
    ]},
    {e:'.custom-checkbox .custom-control-indicator:after',
    reg:[
      { p:'background-color', s: this.tcolor.C05 },
    ]},
    {e:'.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator',
    reg:[
      { p:'background-color', s: this.tcolor.C01 },
    ]},
    {e:'.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator:after',
    reg:[
      { p:'background-color', s: this.tcolor.C05 },
    ]},
    {e:'::-webkit-scrollbar',
    reg:[
      { p:'width', s:'8px' },
    ]},
    {e:'::-webkit-scrollbar-track',
    reg:[
      { p:'background', s: this.tcolor.C01 },
      { p:'margin', s: '10px 0px' },
      { p:'box-shadow', s: '0px 30px '+this.tcolor.C01+', 0px -30px '+this.tcolor.C01 },
      { p:' border-radius', s: '0px' },
    ]},
    {e:'::-webkit-scrollbar-thumb',
    reg:[
      { p:'background', s: "#737277" },
      { p:' border-radius', s: '50px' },
    ]},
    {e:'.ngx-dropdown-container .ngx-dropdown-list-container',
    reg:[
      { p:'background', s: this.tcolor.C01+' !important' },
      { p:'border-radius', s: '0px !important' },
      { p:'box-shadow', s: 'none !important' },
    ]},
    {e:'.ngx-dropdown-container .ngx-dropdown-list-container ul li',
    reg:[
      { p:'color', s: this.tcolor.C05+' !important' },

    ]},
    {e:'.ngx-dropdown-container .ngx-dropdown-list-container ul.selected-items li',
    reg:[
      { p:'background-color', s: this.tcolor.C07+' !important' },

    ]},
    {e:'.ngx-dropdown-container button ',
    reg:[
      { p:'border-bottom', s:'1px solid '+this.tcolor.C05+' !important' },
      { p:'color', s: this.tcolor.C05+' !important' },
      { p:'font-family', s: 'biko_regular' },
      { p:'font-weight', s: '100' },

    ]},
    {e:'.ngx-dropdown-container .ngx-dropdown-list-container .search-container input',
    reg:[
      { p:'border-bottom', s:'1px solid '+this.tcolor.C05+' !important' },
      { p:'color', s: this.tcolor.C05+' !important' },
      { p:'font-family', s: 'biko_regular' },
      { p:'font-weight', s: '100' },

    ]},
    {e:'[class^="nsdicon-"], [class*=" nsdicon-"]',
    reg:[
      { p:'color', s: this.tcolor.C04+' !important' },
    ]},

    {e:'.ngx-dropdown-container .ngx-dropdown-list-container .search-container label ',
    reg:[
      { p:'color', s: this.tcolor.C04+' !important' },
    ]},




  ]








  genCss(data){
    var style="<style type='text/css'>";
    data.forEach(v => {
      var n = Object.keys(v.reg).length;
      if(n>0){
        style = style+v.e+'{';
        v.reg.forEach(b => {
          style = style+b.p+':'+b.s+';';
        })
        style = style+'}';
      }
    });
    return style+'</style>';
  }
}
