Ext.regModel('Session', {
    fields: ['Id', 'Presenter', 'Style', 'Title', 'Track', 'Abstract', 'Year']
});
       
sessions = [];

sessionStore =new Ext.data.JsonStore({
								            model: 'Session',					
								            data :  sessions
								        });
								        
prdc.views.SessionList = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    initComponent: function(){
       	Ext.Ajax.defaultHeaders = {'Accept': 'application/json' } ; 
       	
        Ext.Ajax.request({
						     url: 'http://prairiedevcon.com/Sessions/'+ this.record.data.key +'?format=json',
						     method: "GET",
						     success: function(res, request) {             
						                    if (res) {
						                                  result = Ext.util.JSON.decode(res.responseText);     
						                          		  for (var i = 0; i < result.length; i++) {
							                                        session = Ext.ModelMgr.create({
							                                         			   id: result[i]['Id'],
																				   presenter: result[i]['Presenter'],
																				   style: result[i]['Style'],
																				   title: result[i]['Title'],
																				   track: result[i]['Track'],
																				   year: result[i]['Year'],
																				   abstract: result[i]['Abstract']
																				}, 'Session'); 
																				 
																	sessions.push(session);
														  };
														  
						                                  sessionStore.add.apply(sessionStore, sessions); 
						               		}
						               		else {
						                            alert('There was an error retrieving the data.');					               		
						                    }
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						     }
		});  
		
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
            itemTpl: '<div >{title} <br> {presenter} <br>{style}<div class="x-list-disclosure"></div></div>',
            store: sessionStore,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
         

        
        this.items = this.list;

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