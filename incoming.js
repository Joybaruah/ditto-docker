function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
  const jsonString = String.fromCharCode.apply(
    null,
    new Uint8Array(bytePayload)
  );
  const jsonData = JSON.parse(jsonString);
  const thingId = jsonData.thingId.split(":");
  const value = {
    temperature: {
      properties: {
        value: jsonData.tValue,
      },
    },
    humidity: {
      properties: {
        value: jsonData.hValue,
      },
    },
    timestamp: {
        properties: {
            value: new Date()
        }
    }
  };
  return Ditto.buildDittoProtocolMsg(
    thingId[0],
    thingId[1],
    "things",
    "twin",
    "commands",
    "modify",
    "/features",
    headers,
    value
  );
}

