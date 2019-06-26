const apiUrl = 'http://localhost:9000/api';

function getRooms() {
  return makeRequest('rooms.json');
}

function getConsentForms() {
  return makeRequest('consent-forms.json');
}

function getConsentFormDetails(code) {
  return makeRequest(`consent-form-details/${code}.json`);
}

function makeRequest(resourceLocation) {
  return fetch(`${apiUrl}/${resourceLocation}`)
    .then(res => res.json())
}

export {
  getRooms,
  getConsentForms,
  getConsentFormDetails
}
