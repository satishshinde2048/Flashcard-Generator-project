import { CREATE_GROUP,DELETE_GROUP } from "../constant/ActionType"

const CreteGroup=(data)=>{

return {
    type:CREATE_GROUP,
    payload:{
        id:new Date().getTime().toString(),
        data:data
    }
}

}

const DeleteGroup=(id)=>{

    return{
        type:DELETE_GROUP,
        id
    }
}

export {CreteGroup ,DeleteGroup};