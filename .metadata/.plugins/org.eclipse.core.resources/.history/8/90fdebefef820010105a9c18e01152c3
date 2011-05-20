prdc.views.SpeakerDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    showSessionData: true,
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
        
        this.items = [{
            styleHtmlContent: true,
            tpl: new Ext.XTemplate( '<div class="bio_overview"><div class="avatar"<tpl if="picture"> style="background-image: url({picture})"</tpl>></div><h3>{firstName} {lastName}</h3><h4>{company}</h4></div> {bio}'),
            data: this.record.data
        }];

        prdc.views.SpeakerDetail.superclass.initComponent.call(this);
    },
    
    viewSession: function(selectModel, records){
        if (records[0] !== undefined) {
            var sessionCard = new prdc.views.SessionDetail({
                prevCard: this,
                record: records[0],
                showSpeakerData: false
            });
            this.ownerCt.setActiveItem(sessionCard, 'slide');
        }
    }
});

Ext.reg('speakerdetail', prdc.views.SpeakerDetail);