

// PUSH USER IN LOCALSTORAGE
function setLocalStorage(user){
  const now = new Date(); // RAPPEL getTime NB DE MS DEPUIS 1970
  user.expiry = now.getTime() + (1000 * 60 * 60 * 24); // 1J // AJOUT NOUVEAU CHAMP A USER + SOURCE https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
  localStorage.setItem('user', JSON.stringify(user));
}

function checkLocalStorage(){
  if(localStorage.user === undefined){
    // return this.$router.push(`/login`);
   }
   this.user = JSON.parse(localStorage.getItem('user'));
   const now = new Date();
   if(now.getTime() > this.user.expiry){ // ALORS SESSION EXPIRE
     localStorage.clear()
    //  return this.$router.push('/login');
   }
}
//CHECK LOCALSTORAGE: EMPTY OR NOT 
export {setLocalStorage };