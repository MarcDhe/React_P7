

// PUSH USER IN LOCALSTORAGE
export function setLocalStorage(user){
  const now = new Date(); // RAPPEL getTime NB DE MS DEPUIS 1970
  user.expiry = now.getTime() + (1000 * 60 * 60 * 24); // 1J // AJOUT NOUVEAU CHAMP A USER + SOURCE https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
  localStorage.setItem('user', JSON.stringify(user));
};
// CHECK DU LOCAL STORAGE ET DE SA PERIODE D EXPIRATION 
export function checkLocalStorage(navigate){
  if(localStorage.user === undefined){
    return navigate('/login'); // on peux passer navigate en para pour l'utiliser
   }
   const user = JSON.parse(localStorage.getItem('user'));
   const now = new Date();
   if(now.getTime() > user.expiry){ // ALORS SESSION EXPIRE
     localStorage.clear()
     return navigate('/login'); 
   }
}
//CHECK LOCALSTORAGE: EMPTY OR NOT 
