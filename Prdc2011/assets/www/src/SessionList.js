prdc.views.SessionList = Ext.extend(Ext.Panel, {
    layout: 'fit',
    scroll: 'vertical',
    initComponent: function(){

       this.dockedItems = [{
            xtype: 'toolbar',
            title: this.record.data.name,
            items: [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }]
        }];
       
       this.list = new Ext.List({
            itemTpl: '<div class="x-list-item-body"><div class="star"> </div><div class="title"><h3>{title}</h3> <h4>{presenter}, {style}</h4></div> <div class="icon">  </div></div>',
            store: sessionStore,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
              
        this.list.on('afterrender', loadSessionsStore, this);
        
        this.items = [this.list];
         
        prdc.views.SessionList.superclass.initComponent.call(this);
    },

    onSelect: function(sel, records){
              if (records[0] !== undefined) {
            
													        var sd = new prdc.views.SessionDetail({
													                prevCard: this.listpanel,
													                record: records[0]
													        });
													            
													        this.ownerCt.setActiveItem(sd, 'slide');	    	   
     		 }
     }    
});

Ext.reg('sessionList', prdc.views.SessionList);