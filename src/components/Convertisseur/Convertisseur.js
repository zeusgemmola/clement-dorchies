import React, { useState, useEffect } from "react";

import Spinner from "../Spinner/Spinner";

const Convertisseur = () => {
  //#region initialisation Data
  const regexFloat = new RegExp("^([1-9]+)([.][0-9])?([0-9])*$");
  const devises = ["EUR", "CHF", "GBP", "USD"];

  const [isLoading, setIsLoading] = useState(false);
  const [converterValue, setConverterValue] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [inputValueValidity, setInputValueValidity] = useState("");
  const [inputDevise, setInputDevise] = useState("EUR");
  const [outputDevise, setOutputDevise] = useState("EUR");
  const [resultValue, setResultValue] = useState("0");
  //#endregion

  //#region onChange
  const changeInputDevise = (e) => {
    setInputDevise(e?.target?.value);
    if (inputValue !== "0" && regexFloat.test(inputValue)) {
      fetchConvertisseur(e?.target?.value, outputDevise, true);
    }
  };

  const changeOutputDevise = (e) => {
    setOutputDevise(e?.target?.value);
    if (inputValue !== "0" && regexFloat.test(inputValue)) {
      fetchConvertisseur(inputDevise, e?.target?.value, true);
    }
  };

  const changeInputValue = (e) => {
    const inputValue = e?.target?.value;
    calculateResult(inputValue, converterValue);
  };
  //#endregion

  useEffect(() => {
    window.M.updateTextFields();
    fetchConvertisseur(inputDevise, outputDevise, false);
  }, []);

  const calculateResult = (inputValueParam, converterValueParam) => {
    if (inputValueParam === "0" || inputValueParam === "") {
      setInputValue("0");
      setInputValueValidity("");
      setResultValue(0);
    } else {
      var inputValueTmp = deleteFirstZero(inputValueParam);
      if (regexFloat.test(inputValueTmp)) {
        setInputValueValidity("valid");
        setResultValue(inputValueTmp * converterValueParam);
      } else {
        setInputValueValidity("invalid");
        setResultValue(0);
      }
      setInputValue(inputValueTmp);
    }
  };

  const deleteFirstZero = (input) => {
    if (
      input.length > 1 &&
      input[0] === "0" &&
      input[input.length - 1] !== "."
    ) {
      return input.replace("0", "");
    }
    return input;
  };

  const fetchConvertisseur = async (
    inputDeviseParam,
    outputDeviseParam,
    doCalcul
  ) => {
    setIsLoading(true);

    if (inputDeviseParam !== outputDeviseParam || converterValue === 0) {
      const result = await fetch(
        "https://api.currencyapi.com/v3/latest?apikey=vhs1nPvQ61yg9yGWEQGoxA3EXH3oI8ezUE4a6EGf&currencies=" +
          outputDeviseParam +
          "&base_currency=" +
          inputDeviseParam
      );
      const data = await result.json();
      const converterValueTmp = data.data[outputDeviseParam].value;
      setConverterValue(converterValueTmp);
      if (doCalcul === true) {
        calculateResult(inputValue, converterValueTmp);
      }
    } else {
      setConverterValue(1);
      calculateResult(inputValue, 1);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Convertisseur</h3>
        <div className="col s8">
          <div className="row">
            <div className="col s6">
              <label>From</label>
              <select
                defaultValue="EUR"
                className="browser-default"
                name="inputDevises"
                id="inputDevises"
                onChange={changeInputDevise}
              >
                {devises.map((devise) => (
                  <option value={devise}>{devise}</option>
                ))}
              </select>
            </div>
            <div className="col s6">
              <label>To</label>
              <select
                defaultValue="EUR"
                className="browser-default"
                name="inputDevises"
                id="inputDevises"
                onChange={changeOutputDevise}
              >
                {devises.map((devise) => (
                  <option value={devise}>{devise}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="amount"
                type="text"
                className={inputValueValidity}
                value={inputValue}
                onChange={changeInputValue}
              />
              <span
                className="helper-text"
                data-error="Erreur"
                data-success="Valide"
              ></span>
              <label htmlFor="amount">Montant</label>
            </div>
            <div className="input-field col s12">
              <h5>Result :{isLoading ? <Spinner /> : " " + resultValue}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convertisseur;
