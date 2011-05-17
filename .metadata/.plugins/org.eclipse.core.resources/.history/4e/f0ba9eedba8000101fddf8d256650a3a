prdc.App = Ext.extend(Ext.TabPanel, {
    
    fullscreen: true,

    tabBar: {
        ui: 'gray',
        dock: 'bottom',
        layout: { pack: 'center' }
    },
    
    cardSwitchAnimation: false,

	initComponent: function() {
            this.items = [{
                iconCls: 'time',
                title: 'Sessions',
                confTitle: this.title,
                shortUrl: this.shortUrl,
 		iconCls: 'time',
            }, {
                title: 'Speakers',
                iconCls: 'team1',
		iconCls: 'team1',
            },{
                title: 'Tweets',
                iconCls: 'chat',
                hashtag: this.twitterSearch
            },{
                title: 'Location',
                iconCls: 'locate',
                coords: this.gmapCoords,
                mapText: this.gmapText,
                permLink: this.gmapLink,
            },{
                title: 'About',
                iconCls: 'info',
                pages: this.aboutPages
            }];
  
	   	prdc.cfg = {};
		prdc.cfg.shortUrl = this.shortUrl;
		prdc.cfg.title = this.title;
		
		prdc.App.superclass.initComponent.call(this);
	}

});
