var assert = require('assert'),
    EventTypeFactory = require('../src/event-types/event-type-factory'),
    DefaultEventTypesFactory = require('../src/event-types/default-event-types-factory').DefaultEventTypesFactory,
    ParameterCountError = require('../src/errors').ParameterCountError

describe('EventTypeFactory', function () {
  context('constructor', function () {
    it('throws a ParameterCountError if there is only one input parameter', function () {
      assert.throws(new EventTypeFactory(4), ParameterCountError)
    })
    it('throws a TypeError if the input type map is not an object', function () {
      assert.throws(new EventTypeFactory(4, null), TypeError)
    })
    it('throws a SyntaxError if the input type map contains mappings to non-existent event types', function () {
      assert.throws(new EventTypeFactory({ "zombino": ["click"] }, null), SyntaxError)
    })
    it('throws a TypeError if the customTypes object is not an array of constructors', function () {
      assert.throws(new EventTypeFactory({ "default": [ "click", "touch", "hover", "scroll", "wait" ] }, 4), TypeError)
    })
    it('succeeds if there is no input type map, and so it uses the defaults', function () {
      assert.doesNotThrow(new EventTypeFactory())
      var factory = new EventTypeFactory()
      assert(factory.prototype.name === 'EventTypeFactory')
    })
    it('succeeds if there is an input type map that maps to locatable, user-defined event types')
    it('succeeds if there is an input type map that mixes both user-defined event types and default event types')
  })
  context('validateTypeMap()', function () {
    it('throws an Error if the type map isn\'t of the right form', function () {
      var factory = new EventTypeFactory()
      factory.typeMap = { "default": "click" }
      assert.throws(function () {
        factory.validateTypeMap()
      }, Error)
    })
    it('throws an Error if it fails to find any user-defined types mandated by the type map')
  })
  context('generate()', function () {
    it('generates an array containing only a DefaultEventTypesFactory if no type map is supplied to the constructor', function () {
      var factory = new EventTypeFactory()
      assert.doesNotThrow(function () {
        factory.generate()
      })
      var types = factory.generate()
      assert(types instanceof Array)
    })
    it('stores the generated array for quicker access later', function () {
      var factory = new EventTypeFactory()
      var types = factory.generate()
      assert(typeof factory.types !== 'undefined')
      assert(types === factory.types)
    })
    it('generates an array containing all relevant EventFactories if a type map and custom types are supplied')
  })
})