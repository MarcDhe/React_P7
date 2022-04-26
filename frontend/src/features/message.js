import produce from 'immer';

const initialState =  {} ;

const FETCHING = 'message/fetching';
const RESOLVED = 'message/resolved';
const REJECTED = 'message/rejected';

export const messageFetching = () => ({ type: FETCHING});
export const messageResolved = (data) => ({ type: RESOLVED, payload: data});
export const messageRejected = (error) => ({ type: REJECTED, payload: error})

export default function messageReducer (state = initialState, action){
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