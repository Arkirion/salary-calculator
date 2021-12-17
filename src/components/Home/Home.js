import { useState, useEffect, React, useRef } from "react";
import "../../index.scss";
import "./Home.scss";
import CardInfo from "../CardInfo/CardInfo";
import DownloadButton from "../DownloadButton/DownloadButton";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

function Home() {
  const [amount, setAmount] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [asset, setAsset] = useState("ARGS"); // ARG, USD, USDBLUE
  const [coin, setCoin] = useState({
    ARGS: {
      symbol: "ARG",
      price: "1",
      label: "PESOS ARGENTINOS",
      classColor: "color-pesosArg",
    },
    USD: {
      symbol: "USD",
      price: "",
      label: "DOLAR OFICIAL",
      classColor: "color-dolar",
    },
    USDBLUE: {
      symbol: "USDBLUE",
      price: "",
      label: "DOLAR BLUE",
      classColor: "color-dolarBlue",
    },
  });


  const DEFAULT_HOURS_DIVISOR = 160; // average hours that people work
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
      const dolar = data[0].casa.venta;
      const dolarBlue = data[1].casa.venta;
      setCoin((prevState) => ({
        ...prevState,
        USD: {
          ...prevState.USD,
          price: dolar,
        },
        USDBLUE: {
          ...prevState.USDBLUE,
          price: dolarBlue,
        },
      }));
      setIsLoaded(true);
    };

    fetchDolarData();
  }, []);

  async function onChangeAsset(value) {
    setAsset(value);
  }

  return (
    <div className="wrapper">
      <header className="header-explanation">
        Esta página fue creada para mostrar el valor de tu dinero en dolares
      </header>
      <main className="main-section" ref={componentRef}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="ARGS"
            onChange={(event) => onChangeAsset(event.target.value)}
          >
            <FormControlLabel
              value="ARGS"
              control={<Radio color="primary" />}
              label="PESOS ARG"
              labelPlacement="start"
            />
            <FormControlLabel
              value="USD"
              control={<Radio color="secondary" />}
              label="DOLAR"
              labelPlacement="start"
            />
            <FormControlLabel
              value="USDBLUE"
              control={<Radio color="secondary" />}
              label="DOLAR BLUE"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <section className="money-section">
          {
          /* Keeping this code as example
             <TextField
            id="amount-input"
            label="Monto por mes"
            type="number"
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            value={amount}
            variant="outlined"
          /> */}
          <CurrencyTextField
            id="amount-input"
            autoFocus = {true}
            label="Monto por mes"
            variant="outlined"
            decimalCharacter=","
            digitGroupSeparator="."
            value={amount}
            currencySymbol="$"
            outputFormat="string"
            textAlign = "left"
            maximumValue={100000000000}
            minimumValue={0}
            onChange={(event, value)=> setAmount(value)}
          />
        </section>

        <section className="info-frame">
          {isLoaded ? (
            <>
              { Object.keys(coin).map((coinSymbol) => (
                <CardInfo
                  key={coinSymbol}
                  coinInfo={coin}
                  coinSymbol={coinSymbol}
                  balance={amount}
                  hours={DEFAULT_HOURS_DIVISOR}
                  asset={asset}
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
