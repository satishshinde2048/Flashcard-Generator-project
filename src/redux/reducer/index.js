import { combineReducers } from "redux";
import {FlashcardReducers} from './FlashcardReducers';
 
const Rootreducer=combineReducers({
    FlashcardReducers:FlashcardReducers
})

export {Rootreducer};