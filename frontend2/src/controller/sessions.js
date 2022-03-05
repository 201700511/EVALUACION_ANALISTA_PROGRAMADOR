import axios from 'axios'
const baseURL = 'http://localhost:9000'


const login = async credentials => {
    var state = []
    await axios.post(baseURL + '/login', credentials)
    .then( function(data) {
        if(data.data !== 'fail')
            state = {
                status : 200,
                token: data
            }
        else
            state = 'Failed'
    } )
    .catch( function(error) {
        state = 'Failed'
    })

    return state
}

const GetName = async credentials => {
    var state = []
    let parametros = {
        method: 'get',
        url: baseURL + '/GetNameUser',
        data: credentials,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `bearer ${credentials.header.data}`
        },
      };

    await axios(parametros)
    .then( function(data) {
        console.log(data)
        state = data.data
    } )
    .catch( function(error) {
        state = []
    })

    return state
}

const REP1 = async credentials => {
    var state = []
    let parametros = {
        method: 'get',
        url: baseURL + '/Reporte1',
        data: credentials,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `bearer ${credentials.header.data}`
        },
      };
    await axios(parametros)
    .then( function(data) {
        state = data.data
    } )
    .catch( function(error) {
        state = 'Failed'
    })

    return state
}

const REP2 = async credentials => {
    var state = []
    let parametros = {
        method: 'get',
        url: baseURL + '/Reporte2',
        data: credentials,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `bearer ${credentials.header.data}`
        },
      };
    await axios(parametros)
    .then( function(data) {
        state = data.data
    } )
    .catch( function(error) {
        state = 'Failed'
    })

    return state
}

const UpdatePerfil = async credentials => {
    var state = []
    let parametros = {
        method: 'post',
        url: baseURL + '/UpdatePerfil',
        data: credentials,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `bearer ${credentials.header.data}`
        },
      };
    await axios(parametros)
    .then( function(data) {
        state = data.data
    } )
    .catch( function(error) {
        state = 'Failed'
    })

    return state
}





export default { login, GetName, REP1, REP2, UpdatePerfil}