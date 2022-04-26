function PropsTry(props){
  console.log(props.name);
  const name= props.name;
  const newName= 'props changé!'
  function changeProps(){
    console.log('click btn')
    props.changeName(newName)

  }
  // this.setStatus("caca");
  return(
    <div>
    <p>la props est : {name}</p>
    <p>la nouvelle props est: {newName}</p>$
    <button onClick={changeProps}>changer la props ici </button>
    </div>
    )
}

export default PropsTry;