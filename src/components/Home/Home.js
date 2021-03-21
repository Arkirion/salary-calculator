import { useState, useEffect } from 'react';
import '../../index.scss';
import './Home.scss';
import Detail from '../Detail/Detail';
import TextField from '@material-ui/core/TextField';
import CardHeader  from '../CardHeader/CardHeader';
import {CoinInfo, InfoDetails} from '../../base/enum';


const Home = () => {
  const coinList = [];
  const DEFAULT_HOURS_DIVISOR = 160 // average hours that people work
  const ARGENTINA_VALUE_DIVISOR = 1; // it always should be 1 since its the main value
  const dolarEndpoint = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

  const [amount, setAmount] = useState(0)
  const [dolar, setDolar] = useState()
  const [dolarBlue, setDolarBlue] = useState()
  const [argentinaPeso, setArgentinaPeso] = useState(ARGENTINA_VALUE_DIVISOR)

  async function getDolarData(){
    const response = await fetch(dolarEndpoint);
    const data = await response.json();
    setDolar( data[0].casa.compra);
  }

  async function getDolarBlueData(){
    const response = await fetch(dolarEndpoint);
    const data = await response.json();
    setDolarBlue(data[1].casa.compra);
  }

  useEffect(() => {
    // CoinList should be an array with the next values 'Dolar', 'Dolar blue', 'Argentina peso'
    coinList.push(getDolarData())
    coinList.push(getDolarBlueData())
    coinList.push(ARGENTINA_VALUE_DIVISOR)
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
          <article className="info-wrapper">
            <CardHeader coinValue={dolar} coinInfo={CoinInfo.DOLAR} />
            <div className="info-item-list">
              {InfoDetails.map(detail => <Detail key={detail.action} detail={detail} money={amount} divisor={DEFAULT_HOURS_DIVISOR} coinValue={dolar} />)}
            </div>
          </article>

          <article className="info-wrapper">
            <CardHeader coinValue={dolarBlue} coinInfo={CoinInfo.DOLAR_BLUE} />
            <div className="info-item-list">
              {InfoDetails.map(detail => <Detail key={detail.action} detail={detail} money={amount} divisor={DEFAULT_HOURS_DIVISOR} coinValue={dolarBlue} />)}
            </div>
          </article>

          <article className="info-wrapper">
            <CardHeader coinValue={argentinaPeso} coinInfo={CoinInfo.ARGENTINA} />
            <div className="info-item-list">
              {InfoDetails.map(detail => <Detail key={detail.action} detail={detail} money={amount} divisor={DEFAULT_HOURS_DIVISOR} coinValue={argentinaPeso}/>)}
            </div>
          </article>
        </section>
        

        <section className="actions-section">
          <button className="btn"> Guardar </button>
        </section>
      </main>
    </div>
  );
}

export default Home;