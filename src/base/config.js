export const config ={
  default: "ARG", // default selected asset
  hours: 160, // default hours division // average hours that people work
  assets: 
  {
    ARGS: {
      symbol: "ARG",
      price: "1",
      label: "PESOS ARGENTINOS",
      classColor: "color-pesosArg",
      radioColor: "primary" // this is for the radio component
    },
    USD: {
      symbol: "USD",
      price: "",
      label: "DOLAR OFICIAL",
      classColor: "color-dolar",
      radioColor: "secondary" // this is for the radio component
    },
    USDBLUE: {
      symbol: "USDBLUE",
      price: "",
      label: "DOLAR BLUE",
      classColor: "color-dolarBlue",
      radioColor: "secondary" // this is for the radio component
    },
  }
}