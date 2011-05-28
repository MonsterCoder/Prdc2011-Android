speakers = [ ];
sessions = [ ];
tracks = [ ];

speakerStore =new Ext.data.JsonStore({
								            model  : 'Speaker',	
								            sorters: 'lastName',						
								            data: speakers,
								            getGroupString: function(r){
										        return r.get('lastName')[0]
										    }
								        });
								        
sessionStore =new Ext.data.JsonStore({
								            model: 'Session',					
								            data :  sessions
								        });	
								        
trackStore =new Ext.data.JsonStore({
								            model: 'Track',					
								            data :  tracks
								        });								        							        
				        
loadSpeakerStore = function(ui){   
		ui.setLoading(true);
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
						                    
						                    ui.setLoading(false);
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						                                 ui.setLoading(false);
						                                 
						     }
		 });  
    };
    								        

 loadSessionsStore = function(ui){
 		ui.setLoading(true);
        Ext.Ajax.defaultHeaders = {'Accept': 'application/json' } ; 
       	
        Ext.Ajax.request({
						     url: 'http://prairiedevcon.com/Sessions/'+ this.record.data.key +'?format=json',
						     method: "GET",
						     success: function(res, request) {             
						                    if (res) {
						                                  result = Ext.util.JSON.decode(res.responseText);  
						                                  sessionStore.remove(sessions);
						                                  sessions.length = 0;  
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
						                    };
						                    ui.setLoading(false);
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						                                  ui.setLoading(false);
						     }
		});  
};

 loadTrackStore = function(ui){
  		ui.setLoading(true);
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
						                    };
						                     
						                   ui.setLoading(false);
						     },
						     failure: function(res, request){
						                                 alert('Failed: ', res);
						                                 ui.setLoading(false);
						     }
		});  
		
};
     

								        								        