import state from './state'
import * as types from './action-types'

export default (prevState=state,actions)=>{
    console.log(prevState,actions)
    let NewDate = JSON.parse(JSON.stringify(prevState))

    let {type,params} = actions
    switch (type) {
        case types.SET_TOKEN_MODAL:
            NewDate.tokenModal=params
            
            break;
    
        default:
            break;
    }
    return NewDate
}