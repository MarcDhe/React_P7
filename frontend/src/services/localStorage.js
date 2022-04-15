

// PUSH USER IN LOCALSTORAGE
function setLocalStorage(user){
  const now = new Date(); // RAPPEL getTime NB DE MS DEPUIS 1970
  user.expiry = now.getTime() + (1000 * 60 * 60 * 24); // 1J // AJOUT NOUVEAU CHAMP A USER + SOURCE https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
  localStorage.setItem('user', JSON.stringify(user));
}


//CHECK LOCALSTORAGE: EMPTY OR NOT 
export {setLocalStorage };