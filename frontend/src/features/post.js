import produce from 'immer';
import { selectAllPost } from '../utils/selectors';
import axios from 'axios';

const initialState =  {
  status: "void",
  data: null,
  error: null,
} ;

const FETCHING = 'allPost/fetching';
const RESOLVED = 'allPost/resolved';
const REJECTED = 'allPost/rejected';

export const allPostFetching = () => ({ type: FETCHING});
export const allPostResolved = (data) => ({ type: RESOLVED, payload: data});
export const allPostRejected = (error) => ({ type: REJECTED, payload: error})

export default function allPostReducer (state = initialState, action){
  return produce(state, (draft) =>{
    switch(action.type){
      case FETCHING: {
        if(draft.status === "void"){
          draft.status = "pending";
          return;
        }
        if(draft.status === 'rejected'){
          draft.status = 'pending';
          draft.error = null;
          return
        }
        if(draft.status === "resolved"){
          draft.status = "updating";
          return ;
        }
        // ACTION IGNORER 
        return;
      }
      case RESOLVED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload;
          draft.status = 'resolved';
          return;
        }
      // ACTION IGNORER 
      return;
      }
      case REJECTED: {
        if (draft.status === "pending" || draft.status === "updating"){
          draft.status = "rejected";
          draft.error = action.payload;
          draft.data = null ;
          return;
        } 
        return;
      }
      //SINON ACTION INVALID OU INITIALISATION
      default:
        return;
    }
  })
}