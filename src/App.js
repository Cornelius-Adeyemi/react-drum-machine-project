import React, { useEffect, useRef } from 'react';

import "./App.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];



function Button(props){

  const myRef = useRef(null)


useEffect(()=>{
 myRef.current.volume = (myRef.current.volume * 0) + (props.volume/100);



},[props.volume])

  return (
    <div  id={props.keyTrigger} data-sound-name={props.soundName} onClick={props.theMethod} className="button-class drum-pad">
     <audio ref={myRef} src={props.url}  />
      {props.keyTrigger}
     </div>
  )
}

function Padded(props){
  return (
    <div className='button-pad'> 
    {props.noteType.map((a,b,c)=>{
     return <Button volume={props.volume} key={b} soundName={a.id} keyTrigger={a.keyTrigger} url={a.url} theMethod={props.theMethod}/>
    })}

    </div>
  )
}



export default class App extends React.Component{
 constructor(props){
   super(props)
   this.state = { power:true, bank:true, soundText:"", volume:50};
   this.power= this.power.bind(this);
   this.bankMethod = this.bankMethod.bind(this);
   this.playSound = this.playSound.bind(this);
   this.volumeChange = this.volumeChange.bind(this);
   
 }


 power(){
   this.setState(state=>{
     return {power:!state.power, soundText:""}
   })
 }

bankMethod(){
  this.setState((state)=>{
    return{bank:!state.bank};
   });

   this.setState((state)=>{
     return {soundText:(state.bank)?"Heater kit":"smooth piano kit"}
   })
   
}

playSound(event){
  
  const audio = event.target.childNodes[0];
  audio.currentTime=0;

  const element = event.target;
  setTimeout(()=>{element.style.boxShadow = "0 0 0px black"},0);
  if(this.state.power){
  const element = event.target;
  setTimeout(()=>{element.style.backgroundColor = "yellowgreen"},0);
  const soundName = event.target.dataset.soundName;
  const audio = event.target.childNodes[0];
  
  audio.play(); 

  this.setState({soundText:soundName});
  setTimeout(()=>{element.style.backgroundColor = "rgb(7, 180, 7)"},100)
  }
  
  setTimeout(()=>{element.style.boxShadow = "0 0 10px black"},100)

}

volumeChange(event){
  if(this.state.power){
 
  this.setState({soundText:event.target.value,volume:event.target.value});
  setTimeout(()=>{this.setState({soundText:""})},1000);

  }
}

componentDidMount(){

  
  

  const bank =  document.getElementById("bank");
   if(this.state.power){
     bank.addEventListener("click", this.bankMethod)
   }
   document.addEventListener("keydown", (event)=>{
     const key = event.key.toUpperCase();
     const element = document.getElementById(key);
     if(element) element.click();
     
   })
   
 }

 componentWillUnmount(){
 
  const bank =  document.getElementById("bank");
  
  bank.removeEventListener("click", this.bankMethod );
 
 }

 componentDidUpdate(){
   
  const bank =  document.getElementById("bank");
  if(this.state.power === false){
    
    bank.removeEventListener("click", this.bankMethod )
  }
  if(this.state.power){
    
    bank.addEventListener("click", this.bankMethod )
  }

 }

 render(){
   
  
   const noteType = this.state.bank? bankOne:bankTwo; 
  
   return (<div id='drum-machine' className='app-div'> 
   <p>Adebisi Adeyemi</p>
   <div className='flex-div'> 
     <div className='left'><Padded volume={this.state.volume} theMethod={this.playSound} noteType={noteType}/></div>
     <div className='right'>
     <div className='text-holder'>Power<div className='select' onClick={this.power}> <div className='inner' style={this.state.power?{float:"left"}:{float:"right"}}></div></div></div>
      <div id='display' className='display'>{this.state.soundText} </div>
     <input onChange={this.volumeChange} className="vol" type="range" min="0" max="100" step="2" disabled={(this.state.power)?false:true}/>

     <div className='text-holder'>Bank<div className='select select2' id="bank" style={this.state.power?{}:{cursor:"default"}}> <div className='inner' style={this.state.bank?{float:"left"}:{float:"right"}}></div></div></div>
     </div>
     
   </div>
  
  </div>)
 }
}


