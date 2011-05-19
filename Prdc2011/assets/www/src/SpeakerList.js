Ext.regModel('Speaker', {
    fields: ['id', 'FirstName', 'LastName', 'Picture', 'Company']
});
       
speakers = [ ];

speakerStore =new Ext.data.JsonStore({
								            model  : 'Speaker',	
								            sorters: 'lastName',						
								            data: speakers,
								            getGroupString: function(r){
										        return r.get('lastName')[0]
										    }
								        });
								        
prdc.views.SpeakerList = Ext.extend(Ext.Panel, {
    layout: 'card',

    initComponent: function() {		
        Ext.Ajax.defaultHeaders = {'Accept': 'application/json' } ; 
        Ext.Ajax.request({
						     url: 'http://prairiedevcon.com/Speakers?format=json',
						     method: "GET",
						     success: function(res, request) {                
						                    if (res) {
						                                  result = Ext.util.JSON.decode(res.responseText); 
						                                        
						                          		  for (var i = 0; i < result.length; i++) {
							                                        speaker = Ext.ModelMgr.create({
																				   firstName: result[i]['FirstName'],
																				   lastName: result[i]['LastName'],
																				   picture: result[i]['Picture'],
																				   company: result[i]['Company']
																				}, 'Speaker'); 
																				 
																	speakers.push(speaker);
														  };
														  
						                                  speakerStore.add.apply(speakerStore, speakers); 
						               		}
						               		else {
						                            alert('There was an error retrieving the data.');					               		
						                    }
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						     }
		});  

        
        this.list = new Ext.List({
            grouped: true,
            indexBar: false,
            itemTpl: '<div class="x-list-item-body"><div class="avatar"><tpl if="picture"><img src="http://prairiedevcon.com/Content/imgs/speakers/{picture}" alt="{picture}" /></tpl></div><span class="name">{firstName} {lastName}<br><span class="company"><tpl if="company">{company}</tpl></span></span></div>',
            store: speakerStore,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
         
        this.listpanel = new Ext.Panel({
            layout: 'fit',
            items: this.list,
            fullscreen: true,
            dockedItems: [{
                xtype: 'toolbar',
                title: 'Speakers'
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        });
        
        this.items = this.listpanel;
        
        prdc.views.SpeakerList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            
            var bioCard = new prdc.views.SpeakerDetail({
                prevCard: this.listpanel,
                record: records[0]
            });
            
            this.setActiveItem(bioCard, 'slide');
        }
    }
});

Ext.reg('speakerlist', prdc.views.SpeakerList);