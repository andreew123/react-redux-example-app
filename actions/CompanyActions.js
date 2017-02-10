export const START_FETCHING_COMPANIES = 'START_FETCHING_COMPANIES';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';
export const REQUEST_SAVE_COMPANY = 'REQUEST_SAVE_COMPANY';
export const SAVE_COMPANY_SUCCESS = 'SAVE_COMPANY_SUCCESS';
export const SAVE_COMPANY_FAILURE = 'SAVE_COMPANY_FAILURE';

function requestCompanyList() {
  return {
    type: START_FETCHING_COMPANIES,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveCompanyList(companies) {
  return {
    type: FETCH_COMPANIES_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
	companyList: companies.companyList
  }
}

function failCompanyList(error) {
  return {
    type: FETCH_COMPANIES_FAILURE,
    isFetching: false,
    isAuthenticated: false,
	error: error
  }
}

export function fetchCompanies() {

    let config = {
		method: 'GET',
		headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    return dispatch => {
		dispatch(requestCompanyList())
		return fetch('http://localhost:3001/companies', config)
	      .then(response =>
	        response.json()
	        .then(companies => ({ companies, response }))
		).then(({ companies, response }) =>  {
	        if (!response.ok) {
	          dispatch(failCompanyList(companies.message))
	          return Promise.reject(companies)
	        }
	        else {
	          // Dispatch the success action
	          dispatch(receiveCompanyList(companies))
	        }
	      }).catch(err => console.log("Error: ", err))
    }
}

export function requestSaveCompany(data) {
    return {
      type: REQUEST_SAVE_COMPANY,
      isFetching: true,
      isAuthenticated: false,
      data
    }
}

export function saveCompanySuccess(res) {
    return {
      type: SAVE_COMPANY_SUCCESS,
      isFetching: false,
      isAuthenticated: true
    }
}

export function saveCompanyFail(message) {
    return {
      type: SAVE_COMPANY_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      message
    }
}

export function saveCompany(data) {

    let config = {
		method: 'POST',
		headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `companyName=${data.companyName}&taxNumber=${data.taxNumber}
            &recordNumber=${data.recordNumber}&phone=${data.phone}&seat=${data.seat}`
    }

    return dispatch => {
		dispatch(requestSaveCompany())
		return fetch('http://localhost:3001/company', config)
	      .then(response =>
	        response.json()
	        .then(company => ({ company, response }))
		).then(({ company, response }) =>  {
	        if (!response.ok) {
	          dispatch(saveCompanyFail(company.message))
	          return Promise.reject(company)
	        }
	        else {
	          // Dispatch the success action
	          dispatch(saveCompanySuccess(company))
	        }
	      }).catch(err => console.log("Error: ", err))
    }
}
