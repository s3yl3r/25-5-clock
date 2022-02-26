function App() {
    const [idomutato, idomutatoallit] = React.useState(25*60);
    const [megy, menjen] = React.useState(false);
    const [szunet, szunetallit] = React.useState(5);
    const [szeson, szesonallit] = React.useState(25);
    const [szuneten, szunetenallit] = React.useState(false);
    const zaj = document.getElementById("beep");

    const idoformatum = (ido) => {
      let perc = Math.floor(ido/60);
      let masodp = ido%60;
      return (
          (perc <10 ? "0"+perc : perc) + ":" + (masodp <10 ? "0"+masodp : masodp)
        );
    };
    const szuncsi = (mertek) => {    
        if (szunet <=1 && mertek <0) {
            return;
        } else if (szunet >=60 && mertek >0) {
            return;
        } else {
        szunetallit(elozo => elozo + mertek);
        }
    };       
    const szesscsi = (mertek) => {
        if (szeson <=1 && mertek <0) {
            return;
        } else if (szeson >=60 && mertek >0) {
            return;
        } else {
        szesonallit(elozo => elozo + mertek);
        }
        if (!megy) {
            idomutatoallit((szeson + mertek)*60);
        } 
    };
    const indito = () => {
        let masodp = 1000;
        let datum = new Date().getTime();
        let masikdatum = new Date().getTime()+masodp;
        let szunetenvalt = szuneten;
        if (!megy) {
            let interval = setInterval(() => {
                datum = new Date().getTime();
                if (datum > masikdatum) {
                    idomutatoallit(elozo => {
                        if (elozo == 0) {
                           zaj.play();
                        }
                        if (elozo == 0 && !szunetenvalt) {
                            szunetenallit(true);
                            szunetenvalt = true;
                            return szunet*60;
                        } else if (elozo == 0 && szunetenvalt) {
                            szunetenallit(false);
                            szunetenvalt = false;
                            return szeson*60;
                        }
                        return elozo-1;
                    });              
                masikdatum = masikdatum+masodp;
                }
            }, 30);
            localStorage.clear();
            localStorage.setItem("azonosito", interval)
        }
        if (megy) {
            clearInterval(localStorage.getItem("azonosito"))
        }
        menjen(!megy)
    };  
    const reszet = () => {
        idomutatoallit(25*60);
        szunetenallit(false);
        szunetallit(5);
        szesonallit(25);
        zaj.pause();
        zaj.currentTime = 0;
        if (megy) {
            indito();
        }
    };
    return (
        <>  <h1>25 + 5 timer</h1>
            <div className="keret"><div className="balra">
            <div className="kisido">
              <div id="break-label" className="cime">BREAK LENGTH</div>
              <div className="sorba">
                <div id="break-decrement" className="gombom" 
                onClick={() => szuncsi(-1)}><i className="fa-solid fa-angle-down"></i></div>
                <div className="idok" id="break-length">{szunet}</div>
                <div id="break-increment" className="gombom" 
                onClick={() => szuncsi(1)}><i className="fa-solid fa-angle-up"></i></div>
              </div>
            </div>
            <div className="kisido">
              <div id="session-label" className="cime">SESSION LENGTH</div>
              <div className="sorba">
                <div id="session-decrement" className="gombom" 
                onClick={() => szesscsi(-1)}><i className="fa-solid fa-angle-down"></i></div>
                <div className="idok" id="session-length">{szeson}</div>
                <div id="session-increment" className="gombom" 
                onClick={() => szesscsi(1)}><i className="fa-solid fa-angle-up"></i></div>
              </div>
            </div>     
            </div>
            <div className="balra"><div className="cime" id="timer-label">{szuneten ? "BREAK" : "SESSION"}</div>
            <div className="nagyido" id="time-left">{idoformatum(idomutato)}</div>
            <div id="start_stop" className="gombom" onClick={indito}>
             {megy ? (<i className="fa-solid fa-pause"></i>)
             : (<i className="fa-solid fa-play"></i>)}</div>
             <div id="reset" className="gombom" onClick={reszet}><i className="fa-solid fa-repeat"></i></div>
             </div></div>
             <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));