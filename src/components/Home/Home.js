import { useState, useEffect } from 'react';
import '../../index.scss';
import './Home.scss';
import Detail from '../Detail/Detail';
import CardInfo from '../CardInfo/CardInfo';
import TextField from '@material-ui/core/TextField';
import CardHeader  from '../CardHeader/CardHeader';
import {CoinInfo, InfoDetails} from '../../base/enum';


function Home (){
  const coinList = [];
  const DEFAULT_HOURS_DIVISOR = 160 // average hours that people work
  const ARGENTINA_VALUE_DIVISOR = 1; // it always should be 1 since its the main value
  const dolarEndpoint = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

  const [amount, setAmount] = useState(0)
  const [dolar, setDolar] = useState(0)
  const [dolarBlue, setDolarBlue] = useState(0)
  const [argentinaPeso, setArgentinaPeso] = useState(ARGENTINA_VALUE_DIVISOR)

  async function getDolarData(){
    const response = await fetch(dolarEndpoint);
    return await response.json();
  }

  useEffect(async () => {
    // CoinList should be an array with the next values 'Dolar', 'Dolar blue', 'Argentina peso'
    const data = await getDolarData();
    console.count('useEffecttest')
    coinList.push(data[0].casa.compra)
    coinList.push(data[1].casa.compra)
    coinList.push(ARGENTINA_VALUE_DIVISOR)

    coinList.map( (element, index) => CoinInfo[index].price = element );

  }, []);




  return (
    <div className="wrapper">
      <header className="header-explanation">
        Esta página fue creada para mostrar el valor de tu dinero en dolares, esta APP fue creada con el objetivo original de medir
        cuanto vale un sueldo cada mes en dolares y hacer una pequeña métrica de cuanto la inflación se va comiendo un sueldo.
      </header>
      <main className="main-section">
        <section className="money-section">
          <TextField
            id="amount-input"
            label="Monto por mes"
            type="number"
            onChange={event => { setAmount(event.target.value) }}
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
          <button className="btn"> Guardar </button>
        </section>
      </main>
    </div>
  );
}

export default Home;