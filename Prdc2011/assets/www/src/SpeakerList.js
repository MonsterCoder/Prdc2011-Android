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
	scroll: 'vertical',
    initComponent: function() {		
        var toolbarBase = {
            xtype: 'toolbar',
            title: "Speakers"
        };
        
        this.list = new Ext.List({
            grouped: true,
            indexBar: false,
            itemTpl: '<tpl if="picture"><img class="avata_img" src="http://prairiedevcon.com/Content/imgs/speakers/{picture}" alt="{picture}" /></tpl> <div class="speaker_title"><h3>{firstName} {lastName}, {location}</h3><h4>{company}</h4></div>',
            store: speakerStore,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
              
        this.list.on('afterrender', this.loadStore, this);
        
        this.items = [this.list];
        this.dockedItems = toolbarBase;
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
    },
    loadStore: function(){
        var me  = this.list;
		me.setLoading(true); 
        
        Ext.Ajax.defaultHeaders = {'Accept': 'application/json' } ; 
        Ext.Ajax.request({
						     url: 'http://prairiedevcon.com/Speakers?format=json',
						     method: "GET",
						     success: function(res, request) {                
						                    if (res) {
						                                  result = Ext.util.JSON.decode(res.responseText); 
						                                        
						                          		  for (var i = 0; i < result.length; i++) {
							                                        speaker = Ext.ModelMgr.create({
							                                         			   id: result[i]['Id'],
																				   firstName: result[i]['FirstName'],
																				   lastName: result[i]['LastName'],
																				   picture: result[i]['Picture'],
																				   company: result[i]['Company'],
																				   bio: result[i]['Bio'],
																				   blog: result[i]['Blog'],
																				   email: result[i]['Email'],
																				   location: result[i]['Location'],
																				   twitter: result[i]['Twitter'],
																				   websit: result[i]['Websit'],
																				   year: result[i]['Year']
																				}, 'Speaker'); 
																				 
																	speakers.push(speaker);
														  };
														  
						                                  speakerStore.add.apply(speakerStore, speakers); 
						               		}
						               		else {
						                            alert('There was an error retrieving the data.');					               		
						                    };
						                    me.setLoading(false);
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						                                 me.setLoading(false);
						                                 
						     }
		 });  
    }
    
});

Ext.reg('speakerlist', prdc.views.SpeakerList);