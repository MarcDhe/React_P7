import produce from 'immer';

const initialState = {
  id: null,
  username: null,
  avatar: null,
  createdAt: null,
  power: null,
  token: null,
};

const FETCHING = 'user/fetching';
const EXPIRED = 'user/expired';

export const userFetching = (data) => ({ type: FETCHING, payload: data });
export const userExpired = () => ({ type: EXPIRED });

export default function userReducer(state = initialState, action){
  if(action.type === FETCHING){
   return  produce(state,(draft =>{
      console.log('STATE', state)
      draft.id = action.payload.id
      draft.username = action.payload.username
      draft.avatar = action.payload.avatar
      draft.createdAt = action.payload.createdAt
      draft.power = action.payload.power
      draft.token = action.payload.token
      console.log('draft', draft)
      console.log('action', action.payload)
    }))
  }
  if(action.type === EXPIRED){
    return produce(state, (draft =>{
      draft = initialState; // REINITIALISATION DU STATE A SA VALEUR INITIALE
    }))
  }
  return state

};