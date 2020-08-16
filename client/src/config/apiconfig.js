
const API_BASE_URL = 'http://localhost:8000/api/v1/'
const PERSON_URL = API_BASE_URL + "persons/";
const ORGANISATION_URL = API_BASE_URL + "organisations/"

const HEADERS = {
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*'
                }


export { API_BASE_URL, PERSON_URL, ORGANISATION_URL, HEADERS };