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
    if (value === 'SEXO' || value === 'FECHA' || value === 'NACIMIENTO') {
      isTitle = true;
    } else {
      if (value === 'DE' && data[`${i + 1}`] === 'NACIMIENTO') {
        isTitle = true;
      }

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
    if (data[`${i}`].DetectedText === 'CLAVE') {
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
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getCurp(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getSection(keyIndex, data) {
  let value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getAge(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getSex(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined && value.length === 1 ? value.DetectedText : '';
}

function getFolio(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getState(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getMunicipality(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getLocalty(keyIndex, data) {
  const value = data[`${Number(keyIndex) + 1}`];
  return value !== undefined ? value.DetectedText : '';
}

function getDOB(keyIndex, data) {}

function getFormattedData(data) {
  const keys = {
    NOMBRE: { key: '', value: '', data: getName },
    NACIMIENTO: { key: '', value: '', data: getDOB },
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
      keys[value.DetectedText].key = `${key}`;
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
