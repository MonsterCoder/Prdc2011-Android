tracks = [ ];

trackStore =new Ext.data.JsonStore({
								            model: 'Track',					
								            data :  tracks
								        });
								        
prdc.views.TrackList = Ext.extend(Ext.Panel, {
    layout: 'card',
    initComponent: function() {	
        var toolbarBase = {
            xtype: 'toolbar',
            title: "Sessions"
        };	

        this.list = new Ext.List({
         	itemTpl: '<div class="x-list-item-body"><div class="title"><strong>{name}</strong> <small>({numberOfSessions})</small></div>  <div class="icon"> </div></div>',
            store: trackStore,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
        
        this.list.on('afterrender', this.loadStore, this);
        
        this.items = [this.list];
        
        this.dockedItems = toolbarBase;
        
        prdc.views.TrackList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            
													            var track = new prdc.views.SessionList({
													                prevCard: this.listpanel,
													                record: records[0]
													            });
													            
													            this.setActiveItem(track, 'slide');
													        }		   
     },
     loadStore: function(){
     	var me  = this.list;
        me.setLoading(true); 
        
       	Ext.Ajax.request({
						     url: 'http://prairiedevcon.com/Tracks?format=json',
						     method: "GET",
						     success: function(res, request) {                
						                    if (res) {
						                                  result = Ext.util.JSON.decode(res.responseText);     
						                          		  for (var i = 0; i < result.length; i++) {
							                                        track = Ext.ModelMgr.create({
							                                         			   id: result[i]['Id'],
																				   category: result[i]['Category'],
																				   key: result[i]['Key'],
																				   name: result[i]['Name'],
																				   numberOfSessions: result[i]['NumberOfSessions']
																				}, 'Track'); 
																				 
																	tracks.push(track);
														  };
														  
						                                  trackStore.add.apply(trackStore, tracks); 	
						                                  me.setLoading(false); 		                                 
						               		}
						               		else {
						                            alert('There was an error retrieving the data.');
						                            me.setLoading(false); 				               		
						                    };
						                     
						                   
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						                                 me.setLoading(false); 
						                                 
						     }
		});  
		
     }
});

Ext.reg('tracklist', prdc.views.TrackList);