'use strict'

const Hapi = require('hapi');
const Good = require('good');
const mongoose = require("mongoose");
const School = require("./data/school");
const _ = require("underscore");
const server = new Hapi.Server();
server.connection({ port: 7777 });


// Connect to mongodb database
mongoose.connect("mongodb://monicagrandy:monica123@ds011314.mlab.com:11314/react-test");
console.log("connected to mongodb")

server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    School.find(function (err, schools) {
      return reply(schools)
    })
  }
})


server.route({
  method: 'POST',
  path: '/schools/{id}',
  handler: function(request, reply) {
    console.log("this it the request on line 40: ", request.body)
    let school = new School(_.extend({}, request.body))
    school.save(function (err) {
        if (err)
          return reply(err)
        else
          return reply(school)

    })
  }
})

server.route({
  method: 'DELETE',
  path: '/schools/{id}',
  handler: function(request, reply) {
    let id = request.params.id;
    School.remove({ _id: id }, function (err, removed) {
        if (err)
          return reply(err)
        else
          return reply(removed)
    })
  }
})

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
          module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
    if(err) {
      throw err;
    }

  server.start((err) => {
    if(err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
    })
  })
})






