Ext.regModel('Track', {
    fields: ['Id', 'Category', 'Key', 'Name', 'NumberOfSessions']
});
       
tracks = [ ];

trackStore =new Ext.data.JsonStore({
								            model: 'Track',					
								            data :  tracks
								        });
								        
prdc.views.TrackList = Ext.extend(Ext.Panel, {
    layout: 'card',
    initComponent: function() {		
        Ext.Ajax.defaultHeaders = {'Accept': 'application/json' } ; 
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
             itemTpl: '<div ><strong>{name}</strong> ({numberOfSessions})<div class="x-list-disclosure"></div></div>',
            store: trackStore,
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
                title: 'Sessions'
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        });
        
        this.items = this.listpanel;
        
        prdc.views.TrackList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
          alert("selected");
        }
    }
});

Ext.reg('tracklist', prdc.views.TrackList);