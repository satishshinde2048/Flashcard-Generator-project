import { CREATE_GROUP, DELETE_GROUP } from "../constant/ActionType"


let initialstate={
    Cards:localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[] }

 const FlashcardReducers=(state=initialstate,action)=>{
    switch(action.type){
        case CREATE_GROUP:
        const {id,data}=action.payload;
        localStorage.setItem("data",JSON.stringify([...state.Cards,{id,...data}]));
        return{
           Cards: [
                ...state.Cards,{
                    id,
                    ...data
                }
            ]
        }

        case DELETE_GROUP:
            const RemoveCards=state.Cards.filter((item)=>item.id!==action.id);
            localStorage.setItem("data",JSON.stringify([...RemoveCards]));
            return {
               ...state,
               Cards:RemoveCards

            }

        default:
            return state;


    }

 }

 export {FlashcardReducers};

