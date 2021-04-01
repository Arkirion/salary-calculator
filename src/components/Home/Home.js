import { useState, useEffect, React, useRef } from "react";
import "../../index.scss";
import "./Home.scss";
import CardInfo from "../CardInfo/CardInfo";
import DownloadButton from "../DownloadButton/DownloadButton";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { coinInfoOptions, InfoDetails } from "../../base/enum";

function Home() {
  const [amount, setAmount] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // const [dolarPrice, setDolarPrice] = useState(["0","0","0"])

  const coinList = [];
  const DEFAULT_HOURS_DIVISOR = 160; // average hours that people work
  const ARGENTINA_VALUE_DIVISOR = "1"; // it always should be 1 since its the main value
  const dolarEndpoint =
    "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

  const componentRef = useRef(null);

  async function getDolarData() {
    const response = await fetch(dolarEndpoint);
    return await response.json();
  }

  useEffect(() => {
    const fetchDolarData = async () => {
      const data = await getDolarData();
      const dolar = data[0].casa.compra;
      const dolarBlue = data[1].casa.compra;
      coinList.push(dolar);
      coinList.push(dolarBlue);
      coinList.push(ARGENTINA_VALUE_DIVISOR);
      coinList.map(
        (element, index) => (coinInfoOptions[index].price = element)
      );

      setIsLoaded(true);
    };

    fetchDolarData();
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
        Esta página fue creada para mostrar el valor de tu dinero en dolares,
        por ejemplo, tu sueldo mensual neto en dolares.
      </header>
      <main className="main-section" ref={componentRef}>
        <section className="money-section">
          <TextField
            id="amount-input"
            label="Monto por mes"
            type="number"
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            value={amount}
            variant="outlined"
          />
        </section>

        <section className="info-frame">
          {isLoaded ? (
            <>
              {coinInfoOptions.map((coinInfoElement) => (
                <CardInfo
                  key={coinInfoElement.label}
                  coinInfo={coinInfoElement}
                  details={InfoDetails}
                  money={amount}
                  divisor={DEFAULT_HOURS_DIVISOR}
                />
              ))}
            </>
          ) : (
            <CircularProgress />
          )}
        </section>

        {isLoaded && (
          <section className="actions-section">
            <DownloadButton refElement={componentRef} />
            {/* <button className="btn" onClick={downloadScreenshot}> Guardar Imagen </button> */}
            {/* <ReactToPdf  targetRef={componentRef} filename="code-example.pdf">
              {({ toPdf }) => <button  className="btn" onClick={toPdf}>Generate Pdf</button>}
            </ReactToPdf > */}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
