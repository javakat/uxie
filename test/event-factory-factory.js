var assert = require('assert'),
    EventFactoryFactory = require('../src/event-types/event-factory-factory'),
    TemporalEventFactory = require('../src/event-types/temporal-event-factory'),
    PhysicalEventFactory = require('../src/event-types/physical-event-factory'),
    ParameterCountError = require('../src/errors').ParameterCountError

describe('EventFactoryFactory', function () {
  context('constructor', function () {
    it('throws a ParameterCountError if there is only one input parameter', function () {
      assert.throws(function () { new EventFactoryFactory(4) }, ParameterCountError)
    })
    it('throws a TypeError if the input type map is not an object', function () {
      assert.throws(function () { new EventFactoryFactory(4, null) }, TypeError)
    })
    
    // the next two require type map validation to be complete, so I'll worry about that later
    it('throws a SyntaxError if the input type map contains mappings to non-existent event types')
    it('throws a TypeError if the customTypes object is not an array of constructors')
    
    it('succeeds if there is no input type map, and so it uses the defaults', function () {
      assert.doesNotThrow(function () { new EventFactoryFactory() })
      var factory = new EventFactoryFactory()
      assert(factory instanceof EventFactoryFactory)
    })
    it('succeeds if there is an input type map that maps to locatable, user-defined event types')
    it('succeeds if there is an input type map that mixes both user-defined event types and default event types')
  })
  context('validateTypeMap()', function () {
    it('throws an Error if the type map isn\'t of the right form')
    it('throws an Error if it fails to find any user-defined types mandated by the type map')
  })
  context('generate()', function () {
    it('generates an object containing only a TemporalEventFactory and a PhysicalEventFactory if no type map is supplied to the constructor', function () {
      var factory = new EventFactoryFactory()
      assert.doesNotThrow(function () {
        factory.generate()
      })
      var types = factory.generate()
      assert(types['temporal'] instanceof TemporalEventFactory)
      assert(types['physical'] instanceof PhysicalEventFactory)
      assert(Object.keys(types).length === 2)
    })
    it('stores the generated array for quicker access later', function () {
      var factory = new EventFactoryFactory()
      var types = factory.generate()
      assert(typeof factory.types !== 'undefined')
      assert(types === factory.types)
    })
    it('generates an array containing all relevant EventFactories if a type map and custom types are supplied')
  })
  context('getFactoryFor()', function () {
    it('throws a ParameterCountError if no type parameter is supplied', function () {
      var factory = new EventFactoryFactory()
      factory.generate()
      
      assert.throws(function () {
        factory.getFactoryFor()
      }, ParameterCountError)
    })
    it('throws a TypeError if the supplied type parameter is not a string', function () {
      var factory = new EventFactoryFactory()
      factory.generate()
      
      assert.throws(function () {
        factory.getFactoryFor(4)
      }, TypeError)
    })
    it('throws an Error if the supplied type parameter is a string, but our type map doesn\'t contain it', function () {
      var factory = new EventFactoryFactory()
      factory.generate()
      
      assert.throws(function () {
        factory.getFactoryFor('baka gaijin')
      }, Error)
    })
    it('returns the EventFactory tied to the given type string', function () {
      var factory = new EventFactoryFactory()
      factory.generate()
      
      assert.doesNotThrow(function () {
        factory.getFactoryFor('temporal')
      })
      
      assert(factory.getFactoryFor('temporal') instanceof TemporalEventFactory)
    })
  })
})