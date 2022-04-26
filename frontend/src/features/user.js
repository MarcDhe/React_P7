import produce from 'immer';

let initialState = {
  id: null,
  username: null,
  avatar: null,
  createdAt: null,
  power: null,
  token: null,
};

if (localStorage.user !== undefined){ // RECUPERATION DU LOCALSTORAGE POUR LE STATE INITIALE
  initialState = JSON.parse(localStorage.getItem('user'));
}

const FETCHING = 'user/fetching';
const UPDATING = 'user/updating';
const EXPIRED = 'user/expired';

export const userFetching = (data) => ({ type: FETCHING, payload: data });
export const userUpdating = (data) => ({ type: UPDATING, payload: data})
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
  if(action.type === UPDATING){
    return produce(state, (draft =>{
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
    return produce(state, (draft =>{ // ATTENTION DANS LE CAS OU INITIALESTATE ETAIT INIT DANS LE LOCALSTORAGE
      draft = initialState; // REINITIALISATION DU STATE A SA VALEUR INITIALE
    }))
  }
  return state

};