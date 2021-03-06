prdc.views.LocationMap = Ext.extend(Ext.Panel, {
    coords: [37.0625, -95.677068],
    mapText: '',
    permLink: '',
    
    initComponent: function(){
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]);
        
        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Location',
            items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){    
                    Ext.Msg.confirm('External Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = 'http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=1919+Saskatchewan+Drive,+Regina,+Saskatchewan,+Canada&aq=1&sll=37.0625,-95.677068&sspn=49.223579,113.818359&ie=UTF8&hq=&hnear=1919+Saskatchewan+Dr,+Regina,+Saskatchewan+S4P+4A5,+Canada&z=16';
                    }, this);
                }
            }]
        }]
        
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
            mapOptions : {
                center : position,  
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    var marker = new google.maps.Marker({
                         position: position,
                         title : 'Delta Regina',
                         map: map
                    });

                    infowindow.open(map, marker);

                    google.maps.event.addListener(marker, 'click', function() {
                         infowindow.open(map, marker);
                    });
                }
            }
        });
        
        this.items = this.map;
        
        prdc.views.LocationMap.superclass.initComponent.call(this);
    }
});

Ext.reg('location', prdc.views.LocationMap);