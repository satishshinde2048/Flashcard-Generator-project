
import { createStore } from "redux"
import { Rootreducer } from "../reducer"

const store=createStore(Rootreducer);

export {store};