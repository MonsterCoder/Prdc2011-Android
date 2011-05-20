prdc.views.SessionDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    initComponent: function(){
        this.dockedItems = [{
            xtype: 'toolbar',
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
        
        this.items = [{
            styleHtmlContent: true,
            tpl: new Ext.XTemplate('<div class="Session_detail">{abstract}</div> '),
            data: this.record.data
        }];

        prdc.views.SessionDetail.superclass.initComponent.call(this);
    }
});

Ext.reg('sessionDetail', prdc.views.SessionDetail);