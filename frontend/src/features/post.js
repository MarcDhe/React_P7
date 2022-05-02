import { isSSRSafeAttrName } from '@vue/shared';
import produce from 'immer';

const initialState =  {
  status: "void",
  data: null,
  error: null,
} ;

const FETCHING = 'allPost/fetching';
const RESOLVED = 'allPost/resolved';
const REJECTED = 'allPost/rejected';
const UPDATELIKE = 'allPost/updateLike';

export const allPostFetching = () => ({ type: FETCHING});
export const allPostResolved = (data) => ({ type: RESOLVED, payload: data});
export const allPostRejected = (error) => ({ type: REJECTED, payload: error});
export const allPostUpdateLike = (data) => ({type: UPDATELIKE, payload: data});

export default function allPostReducer (state = initialState, action){
  return produce(state, (draft) =>{
    switch(action.type){
      case FETCHING: {
        if(draft.status === "void" || draft.status === 'updateLike'){
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
      case UPDATELIKE:{
        draft.status = 'updateLike';
        const { index, post_id, user_id, like } = action.payload;
        if( like === 1){
          draft.data[index].Liked.push({post_id: post_id,user_id: user_id});
        }
        if (like === -1){
          const filterArray = draft.data[index].Liked.filter(item => item.user_id !== user_id)
          draft.data[index].Liked = filterArray
        }
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