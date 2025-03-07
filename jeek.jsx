//////////////////////////////////////////////////////
/// JEEK OS > CLIENT
/////////////////////////////////////////

import { Icon } from "@iconify/react";
import { Html } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

/////////////////////////////////////////

const JeekApp = () => {
  try {
    const [state, states] = useState({
      error: null,
      page: 1,
      loading: true,
    });

    function setstate(data) {
      states(prev => { return { ...prev, ...data } });
    }
    
    // useEffect(() => {
    //   return () => {
    //     // RETURN BURADA OLACAK
    //   };
    // }, [ TETİKLEYECEK DEĞİŞKEN ]);

    if (!state.error) {
      return (
        <>
          <body>
            <div className="camera">
              <img src="http://192.168.31.108:4747/video" alt="CAMERA 1" />
            </div>
            <div className="dataBox">
              <div className="dataBoxBox">
                <div className="data"><span>ROLL AÇISI: </span><span>1</span></div>
                <div className="data"><span>PITCH AÇISI: </span><span>1</span></div>
                <div className="data"><span>YAW AÇISI: </span><span>1</span></div>
                <div className="data"><span>ARAÇ HIZI: </span><span>1</span></div>
                <div className="data"><span>HAVA HIZI: </span><span>1</span></div>
                <div className="data"><span>YER HIZI: </span><span>1</span></div>
                <div className="data"><span>ARAÇ YÜKSEKLİĞİ: </span><span>1</span></div>
                <div className="data"><span>MOD DURUMU: </span><span>1</span></div>
              </div>
              <div className="dataBoxBox" style={{marginLeft: "90px", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                <div className="data"><span>KİLİTLENME: </span><span id="lockStatus">Aktif</span></div>
                <div className="data"><span>KİLİTLENME DURUMU: </span><span>Kilitlenmiş durumda</span></div>
                <div className="data"><span>KİLİTLENME SAYISI: </span><span>3</span></div>
                <div className="data"><span>KİLİTLENME SÜRESİ: </span><span>10 Dakika</span></div>
                <button style={{ marginRight: "20px" }} onClick={() => { document.getElementById("lockStatus").innerText = "Aktif"; }}>KİLİTLENMEYİ AÇ</button>
                <button onClick={() => { document.getElementById("lockStatus").innerText = "Aktif Değil"; }}>KİLİTLENMEYİ KAPAT</button>
              </div>
              <div className="dataBoxBox" style={{marginLeft: "50px"}}>
                <div className="data"><span>UÇUŞ SÜRESİ: </span><span>25 dakika 13 saniye</span></div>
                <div className="data"><span>KORDİNAT: </span><span>25N 14X</span></div>
                <div className="data"><span style={{ cursor: "pointer"}}onClick={ () => {
                  document.location = "https://youtube.com"
                }}>BATARYA: </span><span>88%</span></div>
                <div className="data"><span>KONUM: </span><span>ÇORLU / TEKİRDAĞ</span></div>
                <div className="data"><span>MOTOR 1: </span><span>AKTİF 2560 RPM</span></div>
                <div className="data"><span>MOTOR 2: </span><span>AKTİF 2530 RPM</span></div>
                <div className="data"><span>MOTOR 3: </span><span>AKTİF 2520 RPM</span></div>
                <div className="data"><span>MOTOR 4: </span><span>AKTİF 2540 RPM</span></div>
                </div>
              <p className="border" style={{ marginTop: "20px", width: "900px" }}> </p>
            </div>
            <div className="console">
              <p><span>14:06:49</span> Kamera aktif</p>
              <p><span>14:08:30</span> Kamera deaktif</p>
              <p><span>14:09:21</span> Kamera aktif</p>
            </div>
            <div className="map">
            <iframe
              width="600"
              height="350"
              style={{ border: "0" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=41.1556,27.8138&hl=tr&z=14&output=embed"
            ></iframe>
            </div>
          </body>
        </>
      );

    } else {
      return (
        <>
          <Icon icon="mdi-wifi-off" id="erroricon" />
          <div id="errorvalue"> {state?.error} </div>
        </>
      );
    }
  } catch (error) {
    return (
      <>
        <Icon icon="mdi-wifi-off" id="erroricon" />
        <div id="errorvalue"> {error.message} </div>
      </>
    );
  }
};

ReactDOM.createRoot(document.getElementById("jeek")).render(<JeekApp />);
