const Types = {
    Int64: Symbol('Int64'),
    Int32: Symbol('Int32'),
    Int16: Symbol('Int16'),
    Int8: Symbol('Int8'),
    Boolean: Symbol('Boolean'),
    String: Symbol('String'),
    Struct: Symbol('Struct'),
    ByteSlice: Symbol('ByteSlice'),
    Interface: Symbol('Interface')
}

//reference : https://developers.google.com/protocol-buffers/docs/encoding
let WireType = {
    Varint: 0, // int64, uint64, sint32, sint64, bool, enum
    Type8Byte: 1, //fixed64, sfixed64, double
    ByteLength: 2, //string, bytes, embedded messages, packed repeated fields
    ByteStruct: 3, //string, bytes, embedded messages, packed repeated fields
    Struct:4,
    Type4Byte: 5,  //fixed32, sfixed32, float,int32,uint32
    Interface: 7
    
}

const WireMap = {
    [Types.Int64]: WireType.Type8Byte,
    [Types.Int32]: WireType.Type4Byte,
    [Types.Int16]: WireType.Varint,
    [Types.Int8]: WireType.Varint,
    [Types.String]: WireType.ByteLength,
    [Types.Struct]: WireType.ByteStruct, //compatible
    [Types.ByteSlice]: WireType.ByteLength, //compatible
    [Types.Interface]: WireType.Interface //compatible
   

}

WireType.keysOf = number => {
    let resultKey = null
    Reflect.ownKeys(WireType).forEach(key => {        
        if(WireType[key] == number ) {
            resultKey = key
            return;
        }
    })
    return resultKey
}

WireMap.keysOf = wireType => {    
    let resultKey = null
    Reflect.ownKeys(WireMap).forEach(key => {                
        if(WireMap[key] == wireType ) {
            resultKey = key
            return;
        }
    })
    return resultKey
}

module.exports = {
    Types,
    WireType,
    WireMap
}