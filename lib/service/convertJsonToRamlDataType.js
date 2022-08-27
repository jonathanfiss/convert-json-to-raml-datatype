// Modules
const Type = require('type-of-is')
const yaml = require('js-yaml');

var patternDateOnly = /^[1-9]\d{3}-\d{2}-\d{2}$/;
var patternTimeOnly = /^\d{2}:\d{2}:\d{2}$/;
var patternDateTimeOnly = /^[1-9]\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
var patternDateTime = /^[1-9]\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
var patternDateTimeRFC = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), ([0-3][0-9]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ([0-9]{4}) ([01][0-9]|2[0-3])(:[0-5][0-9]){2} GMT$/;
/*
 * @param {any} json
 * @returns {object} a json schema
*/
module.exports = function convert(json, options) {

    console.log(JSON.parse(json))
    console.log(JSON.parse(JSON.stringify(options)))
    json = JSON.parse(json)
    var processOutput
    var output = {}
    
    // Set initial object type
    output.type = Type.string(json).toLowerCase()

    if (output.type === 'object') {
        processOutput = processObject(json, options)
        output.type = processOutput.type
        output.properties = processOutput.properties
        // output.required = Object.keys(json).filter(function (key) {
        //     return !key.startsWith('$')
        // })
    }
    if (output.type === 'array') {
        processOutput = processArray(json, options)
        output.type = processOutput.type
        output.items = processOutput.items
    }
    var response = yaml.dump(output, json)
    var response2 = `#%RAML 1.0 DataType \n` + response
    return response2
}


function processObject(object, options, output, nested) {
    if (nested && output) {
        output = { properties: output }
    } else {
        output = output || {}
        output.type = getPropertyType(object)
        output.properties = output.properties || {}
        // output.required = Object.keys(object)
    }

    for (var key in object) {
        var value = object[key]
        var type = getPropertyType(value)
        var format = getPropertyFormat(value, type)

        type = type === 'undefined' ? 'null' : type

        if (type === 'object') {
            output.properties[key] = processObject(value, options, output.properties[key])
            continue
        }

        if (type === 'array') {
            output.properties[key] = processArray(value, options, output.properties[key])
            continue
        }

        if (output.properties[key]) {
            var entry = output.properties[key]
            var hasTypeArray = Array.isArray(entry.type)

            // When an array already exists, we check the existing
            // type array to see if it contains our current property
            // type, if not, we add it to the array and continue
            if (hasTypeArray && entry.type.indexOf(type) < 0) {
                entry.type.push(type)
            }

            // When multiple fields of differing types occur,
            // json schema states that the field must specify the
            // primitive types the field allows in array format.
            if (!hasTypeArray && entry.type !== type) {
                entry.type = [entry.type, type]
            }

            continue
        }
        output.properties[key] = {}
        output.properties[key].type = type

        if (options.example && !options.separateExample){
            output.properties[key].example = value
        }

        if (!options.required){
            output.properties[key].required = false
        }

        if (format) {
            output.properties[key].format = format
        }
    }

    return nested ? output.properties : output
}

function processArray(array, options, output, nested) {
    var format
    var oneOf
    var type
    var value = []
    var simpleArray

    if (nested && output) {
        output = { items: output }
    } else {
        output = output || {}
        output.type = getPropertyType(array)
        output.items = output.items || {}
        type = output.items.type || null
    }

    // Determine whether each item is different
    for (var arrIndex = 0, arrLength = array.length; arrIndex < arrLength; arrIndex++) {
        var elementType = getPropertyType(array[arrIndex])
        var elementFormat = getPropertyFormat(array[arrIndex], elementType)

        if (type && elementType !== type) {
            output.items.oneOf = []
            oneOf = true
            break
        } else {
            type = elementType
            format = elementFormat
        }
    }

    // Setup type otherwise
    if (!oneOf && type) {
        output.items.type = type
        // if(arrLength >= 0){
        //     output.items.example = array[0]
        // }
        if (format) {
            output.items.format = format
        }
    } else if (oneOf && type !== 'object') {
        output.items = {
            oneOf: [{ type: type }],
            // required: output.items.required
        }
    }

    // Process each item depending
    if (typeof output.items.oneOf !== 'undefined' || type === 'object') {
        for (var itemIndex = 0, itemLength = array.length; itemIndex < itemLength; itemIndex++) {
            var value = array[itemIndex]
            var itemType = getPropertyType(value)
            var itemFormat = getPropertyFormat(value, itemType)
            var arrayItem
            if (itemType === 'object') {
                // if (output.items.properties) {
                    // output.items.required = getUniqueKeys(output.items.properties, value, output.items.required)
                // }
                simpleArray = false
                arrayItem = processObject(value, options, oneOf ? {} : output.items.properties, true)
            } else if (itemType === 'array') {
                simpleArray = false
                arrayItem = processArray(value, options, oneOf ? {} : output.items.properties, true)
            } else {
                arrayItem = {}
                arrayItem.type = itemType
                simpleArray = true
                if (itemFormat) {
                    arrayItem.format = itemFormat
                }
            }
            if (oneOf) {
                var childType = Type.string(value).toLowerCase()
                var tempObj = {}
                if (!arrayItem.type && childType === 'object') {
                    tempObj.properties = arrayItem
                    tempObj.type = 'object'
                    arrayItem = tempObj
                }
                output.items.oneOf.push(arrayItem)
            } else {
                if (output.items.type !== 'object') {
                    continue;
                }
                output.items.properties = arrayItem
            }
        }
    }
    return nested ? output.items : output
}

function isDate(value) {
    if (patternDateOnly.test(value)){
        return 'date-only'
    }else if (patternTimeOnly.test(value)) {
        return 'time-only'
    } else if (patternDateTimeOnly.test(value)) {
        return 'datetime-only'
    } else if (patternDateTime.test(value) || patternDateTimeRFC.test(value)) {
        return 'datetime'
    } else {
        return 'string'
    }
}

function getPropertyType(value) {
    var type = Type.string(value).toLowerCase()

    if (type === 'number') return Number.isInteger(value) ? 'integer' : type
    if (type === 'date') return 'string' 
    if (type === 'regexp') return 'string'
    if (type === 'function') return 'string'
    if (type === 'string') return isDate(value)

    return type
}


function getPropertyFormat(value, type) {
    // var type = Type.string(value).toLowerCase()

    if (type === 'datetime'){
        if (patternDateTimeRFC.test(value)) {
            return 'rfc2616'
        }
    }

    return null
}

function getUniqueKeys(a, b, c) {
    a = Object.keys(a)
    b = Object.keys(b)
    c = c || []
  
    var value
    var cIndex
    var aIndex
  
    for (var keyIndex = 0, keyLength = b.length; keyIndex < keyLength; keyIndex++) {
      value = b[keyIndex]
      aIndex = a.indexOf(value)
      cIndex = c.indexOf(value)
  
      if (aIndex === -1) {
        if (cIndex !== -1) {
          // Value is optional, it doesn't exist in A but exists in B(n)
          c.splice(cIndex, 1)
        }
      } else if (cIndex === -1) {
        // Value is required, it exists in both B and A, and is not yet present in C
        c.push(value)
      }
    }
  
    return c
  }