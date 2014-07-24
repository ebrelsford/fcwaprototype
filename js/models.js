var DS = require('ember-data');
var videos = require('./videos');
require('ember-data-extensions-embedded-adapter');


App.ApplicationAdapter = DS.EmbeddedAdapter.extend({
    host: CONFIG.API_BASE
})

App.ApplicationSerializer = DS.EmbeddedSerializer.extend();

App.Organization = DS.Model.extend({
    address_line1: DS.attr(),
    city: DS.attr(),
    country: DS.attr(),
    email: DS.attr('string'),
    name: DS.attr('string'),
    phone: DS.attr('string'),
    postal_code: DS.attr('string'),
    state_province: DS.attr('string'),
    photos: DS.hasMany('photo'),
    sectors: DS.hasMany('sector'),
    types: DS.hasMany('type'),
    videos: DS.hasMany('video'),

    media: function () {
        var media = Ember.A();
        media.addObjects(this.get('photos'));
        media.addObjects(this.get('videos'));
        return media;
    }.property('photos')
});

App.OrganizationSerializer = App.ApplicationSerializer.extend({
    attrs: {
        photos: { embedded: 'always' },
        sectors: { embedded: 'always' },
        types: { embedded: 'always' },
        videos: { embedded: 'always' }
    }
});

App.Sector = DS.Model.extend({
    name: DS.attr('string')
});

App.Type = DS.Model.extend({
    name: DS.attr('string')
});

App.Photo = DS.Model.extend({
    fullUrl: function () {
        return CONFIG.API_BASE + this.get('url');
    }.property('url'),

    photo: DS.attr(),
    organization: DS.belongsTo('organization'),
    url: DS.attr()
});

App.Video = DS.Model.extend({
    embedCode: function () {
        return videos.embed(this.get('url'));
    }.property('url'),
    organization: DS.belongsTo('organization'),
    url: DS.attr()
});
