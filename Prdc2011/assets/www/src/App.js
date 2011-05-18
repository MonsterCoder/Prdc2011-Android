prdc.App = Ext.extend(Ext.TabPanel, {
    tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
    fullscreen: true,
	ui: 'light',
    cardSwitchAnimation: false,

	initComponent: function() {
	       var sessions, speakers, tweets, locations, about;
	        
           sessions = new Ext.Component({
               
                title: 'Sessions',
                scroll: 'vertical',
                iconCls: 'time',
                tpl: [
                '<tpl for=".">',
                    '<div class="session">',
                        '<div class="session-title">',
                            '<h2>{Title}</h2>',
                        '</div>',
                        '<p class="session_description">{Abstract}</p>',
                    '</div>',
                '</tpl>'
                ]
            });
            
            speakers = {
               	xtype: 'speakerlist',
                title: 'Speakers',   
                scroll: 'vertical',
                iconCls: 'user'
            };
            
            tweets = new Ext.Component({
                title: 'Tweets',
                 iconCls: 'team'
            });
            
            locations = new Ext.Component({
            	iconCls: 'locate',
                title: 'Location'
            });
            
            about = new Ext.Component({
                iconCls: 'info',
                title: 'About'
            });
            
            if (navigator.onLine) {
	            this.items = [sessions, speakers, tweets, locations, about];
	            
	            refresh = function() {
	                Ext.Ajax.defaultHeaders = {'Accept': 'application/json' } ; 
	                
	                 function makerequest(link, target) {            
	                  Ext.Ajax.request({
	                    url: link,
	                    method: "GET",
	                    params: {},
	                    success: function(res, request) {                
	                               if (res) {
	                                        
	                                        result = Ext.util.JSON.decode(res.responseText);   
	                                        target.update(result);             
	                                    }
	                                    else {
	                                        alert('There was an error retrieving the data.');
	                                    }
	                                },
	                   failure: function(res, request){
	                                 alert('Failed: ', res);
	                                }
	                            });
	                        }
	                        
	                makerequest('http://prairiedevcon.com/Sessions', sessions);
	            }
        
        		refresh();    
        } else {
            this.on('render', function(){
                this.el.mask('No internet connection.');
            }, this);
        }
        
	   	prdc.cfg = {};
		prdc.cfg.shortUrl = this.shortUrl;
		prdc.cfg.title = this.title;
		
		prdc.App.superclass.initComponent.call(this);
	},
});
