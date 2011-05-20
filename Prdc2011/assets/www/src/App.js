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
	       var tracks, speakers, tweets, locations, about;
	        
           tracks = {
                title: 'Sessions',
                iconCls: 'time',
    			xtype: 'tracklist',
    			scroll: 'vertical'
            };
            
            speakers = {
                title: 'Speakers',  
               	xtype: 'speakerlist', 
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
	            this.items = [tracks, speakers, tweets, locations, about];	            
    
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
