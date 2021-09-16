import { useState, useEffect, React, useRef } from "react";
import "../../index.scss";
import "./Home.scss";
import CardInfo from "../CardInfo/CardInfo";
import DownloadButton from "../DownloadButton/DownloadButton";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

function Home() {
  const [amount, setAmount] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [asset, setAsset] = useState("ARG");
  const [coin, setCoin] = useState({
    oficialDolar: {
      price: "",
      label: "DOLAR OFICIAL",
      classColor: "color-dolar",
    },
    blueDolar: {
      price: "",
      label: "DOLAR BLUE",
      classColor: "color-dolarBlue",
    },
    argentinePeso: {
      price: "1",
      label: "PESOS ARGENTINOS",
      classColor: "color-pesosArg",
    },
  });

  // const [dolarPrice, setDolarPrice] = useState(["0","0","0"])

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
      const dolar = data[0].casa.compra;
      const dolarBlue = data[1].casa.compra;
      setCoin((prevState) => ({
        ...prevState,
        oficialDolar: {
          ...prevState.oficialDolar,
          price: dolar,
        },
        blueDolar: {
          ...prevState.blueDolar,
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
              { Object.keys(coin).map((key) => (
                <CardInfo
                  key={coin[key].label}
                  coinInfo={coin[key]}
                  money={amount}
                  hours={DEFAULT_HOURS_DIVISOR}
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
