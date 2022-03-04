import axios from 'axios'
const baseURL = 'http://localhost:9000'


const login = async credentials => {
    var state = []
    await axios.post(baseURL + '/login', credentials)
    .then( function(data) {
        console.log(data)
        if(data.data.length > 0)
            state = {
                code : 200
            }
    } )
    .catch( function(error) {
        state = 'Failed'
    })

    return state
}

const REP1 = async credentials => {
    var state = []
    await axios.get(baseURL + '/Reporte1', credentials)
    .then( function(data) {
        console.log(data)
        if(data.data.length > 0)
            state = {
                code : 200
            }
    } )
    .catch( function(error) {
        state = 'Failed'
    })

    return state
}




export default { login, REP1}