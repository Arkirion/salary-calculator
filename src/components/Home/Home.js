import { useState, useEffect, React, useRef} from 'react';
import '../../index.scss';
import './Home.scss';
import Detail from '../Detail/Detail';
import CardInfo from '../CardInfo/CardInfo';
import TextField from '@material-ui/core/TextField';
import CardHeader  from '../CardHeader/CardHeader';
import {CoinInfo, InfoDetails} from '../../base/enum';
import ReactToPdf from "react-to-pdf";
import { useScreenshot, createFileName } from "use-react-screenshot";


function Home (){
  const coinList = [];
  const DEFAULT_HOURS_DIVISOR = 160 // average hours that people work
  const ARGENTINA_VALUE_DIVISOR = 1; // it always should be 1 since its the main value
  const dolarEndpoint = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

  const componentRef = useRef();

  const [amount, setAmount] = useState(0)
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { extension = "jpg" } = {}) => {
    const date = new Date().toLocaleString();
    const name = (date+'CalculadoraDolar').replace(' ','__');
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(componentRef.current).then(download);

  async function getDolarData(){
    const response = await fetch(dolarEndpoint);
    return await response.json();
  }

  useEffect(async () => {
    // CoinList should be an array with the next values 'Dolar', 'Dolar blue', 'Argentina peso'
    const data = await getDolarData();
    coinList.push(data[0].casa.compra)
    coinList.push(data[1].casa.compra)
    coinList.push(ARGENTINA_VALUE_DIVISOR)

    coinList.map( (element, index) => CoinInfo[index].price = element );

  }, []);

  // let delayTimer = null;

  // function handleOnChangeAmount(value) {
  //   setAmount(value);

  //   if (delayTimer) {  
  //     clearTimeout(delayTimer);
  //   }
  //   delayTimer = setTimeout(function() {
  //     setDelayedAmount(value); //this is your existing function
  //   }, 4000);
  // }




  return (
    <div className="wrapper">
      <header className="header-explanation">
        Esta página fue creada para mostrar el valor de tu dinero en dolares, por ejemplo, tu sueldo mensual neto en dolares.
      </header>
      <main className="main-section" ref={componentRef}>
        <section className="money-section">
          <TextField
            id="amount-input"
            label="Monto por mes"
            type="number"
            onChange={event => { 
              setAmount(event.target.value)
            }}
            value={amount}
            variant="outlined" />
        </section>

        <section className="info-frame">
          { CoinInfo.map( coin => 
            <CardInfo key={coin.label}
              header={<CardHeader coinValue={coin.price} coinInfo={coin} />}
              details={InfoDetails.map(detail => 
                <Detail 
                  key={detail.action} 
                  detail={detail} 
                  money={amount} 
                  divisor={DEFAULT_HOURS_DIVISOR} 
                  coinValue={coin.price} />)}
            /> 
          )}
        </section>
        

        <section className="actions-section">
          <button className="btn" onClick={downloadScreenshot}> Guardar Imagen </button>
          {/* <ReactToPdf  targetRef={componentRef} filename="code-example.pdf">
            {({ toPdf }) => <button  className="btn" onClick={toPdf}>Generate Pdf</button>}
          </ReactToPdf > */}
        </section>
      </main>
    </div>
  );
}

export default Home;