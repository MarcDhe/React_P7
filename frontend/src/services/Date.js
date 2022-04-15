
  //CREATION FONCTION SOUSTRACTION DATE 
  exports.dateDiff = (date1, date2) => { //SORUCE: http://www.finalclap.com/faq/88-javascript-difference-date
  let diff = {}                           // Initialisation du retour
  let tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures
    
  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;
    
  return diff;
  }

  //AFFICHE LA DIFFERENCE DE JOUR OU HEURE  OU MINUTE PAR RAPPORT A L'HEURE ACTUEL
 exports.setDate = (date) => {
    const currentTime = new Date()
    let newDate = new Date((date))
    // const dayDate = newDate.toLocaleDateString() pour afficher uniquement le jour et/ou l'heure
    // const timeDate = newDate.toLocaleTimeString()
    const compareDate = this.dateDiff(newDate,currentTime); // retourne un objet
    if(compareDate.day === 0 && compareDate.hour === 0){
      return `${compareDate.min}min`
    }
    if(compareDate.day === 0){
      return `${compareDate.hour}h`
    }
      return `${compareDate.day}d`
  }
