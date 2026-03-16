
import React, { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function App() {

  const [log,setLog]=useState([])
  const [scannerOpen,setScannerOpen]=useState(false)

  const foods={
    "049000028911":{name:"Greek Yogurt Cup",calories:150,protein:15},
    "041196910019":{name:"Protein Bar",calories:200,protein:20},
    "012000161155":{name:"Oatmeal Packet",calories:160,protein:5}
  }

  const startScanner=()=>{

    setScannerOpen(true)

    setTimeout(()=>{
      const qr=new Html5Qrcode("reader")

      qr.start(
        {facingMode:"environment"},
        {fps:10,qrbox:{width:250,height:140}},
        (decoded)=>{

          const food=foods[decoded]

          if(food){
            setLog(prev=>[{...food,code:decoded},...prev])
          }else{
            alert("Barcode scanned: "+decoded+" (not mapped yet)")
          }

          qr.stop()
          setScannerOpen(false)

        }
      )

    },200)

  }

  return(

    <div style={{maxWidth:600,margin:"auto"}}>

      <h1>Jake G Fitness</h1>

      <div className="card">

        <h3>Barcode Scanner</h3>

        {!scannerOpen && (
          <button onClick={startScanner}>
          Open Camera
          </button>
        )}

        {scannerOpen && (
          <div id="reader"></div>
        )}

      </div>

      <div className="card">

        <h3>Food Log</h3>

        {log.map((f,i)=>(
          <div key={i}>
            {f.name} — {f.calories} cal — {f.protein}g protein
          </div>
        ))}

      </div>

    </div>

  )

}
