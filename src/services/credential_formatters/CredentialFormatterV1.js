class CredentialFormatterV1 {
  static formatResponse(response) {
    let detections = response.TextDetections;
    return getFormattedData(detections);
  }
}

function getName(keyIndex, data) {
  let startIndex = Number(keyIndex);
  let lastIndex = startIndex + 1;
  for (let i = startIndex; i < Object.keys(data).length; i++) {
    if (data[`${i}`].DetectedText === 'DOMICILIO') {
      lastIndex = i;
      break;
    }
  }

  let nameItems = [];
  let isTitle = false;

  for (let i = startIndex + 1; i < lastIndex; i++) {
    let value = data[`${i}`].DetectedText;
    if (value === 'EDAD' || value === 'SEXO') {
      isTitle = true;
    } else {
      if (!isTitle) {
        nameItems.push(value);
      }

      isTitle = false;
    }
  }
  return nameItems.join(' ');
}

function getAddress(keyIndex, data) {
  let startIndex = Number(keyIndex);
  let lastIndex = startIndex + 1;
  for (let i = startIndex; i < Object.keys(data).length; i++) {
    if (data[`${i}`].DetectedText === 'FOLIO') {
      lastIndex = i;
      break;
    }
  }
  let addressItems = [];

  for (let i = startIndex + 1; i < lastIndex; i++) {
    let value = data[`${i}`].DetectedText;
    addressItems.push(value);
  }
  return addressItems.join(' ');
}

function getClave(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getCurp(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getSection(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getAge(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getSex(keyIndex, data) {
  let sex = data[`${Number(keyIndex) + 1}`];
  return sex.length === 1 ? sex : '';
}

function getFolio(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getState(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getMunicipality(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getLocalty(keyIndex, data) {
  return data[`${Number(keyIndex) + 1}`].DetectedText;
}

function getFormattedData(data) {
  const keys = {
    NOMBRE: { key: '', value: '', data: getName },
    DOMICILIO: { key: '', value: '', data: getAddress },
    EDAD: { key: '', value: '', data: getAge },
    SEXO: { key: '', value: '', data: getSex },
    FOLIO: { key: '', value: '', data: getFolio },
    ELECTOR: { key: '', value: '', data: getClave },
    CURP: { key: '', value: '', data: getCurp },
    ESTADO: { key: '', value: '', data: getState },
    MUNICIPIO: { key: '', value: '', data: getMunicipality },
    LOCALIDAD: { key: '', value: '', data: getLocalty },
    SECCION: { key: '', value: '', data: getSection }
  };
  for (let [key, value] of Object.entries(data)) {
    if (value.Type === 'WORD' && keys[value.DetectedText] != undefined) {
      keys[value.DetectedText].key = `${value.Id}`;
    }
  }
  let result = [];
  for (let key in keys) {
    let value = keys[key];
    if (value.key !== '') {
      result.push({
        [key]: value.data(value.key, data)
      });
    }
  }
  return result;
}

module.exports = CredentialFormatterV1;
