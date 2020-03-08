import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Portfolio from "./Portfolio";
import PurchaseForm from "./PurchaseForm";

import { useSelector } from "react-redux";

import axios from "axios";

const Home = () => {
  const [stocks, setStocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useSelector(state => state.user);

  useEffect(() => {
    if (loading) {
      axios
        .get(`/stocks/portfolio/${id}`)
        .then(response => {
          const { data: stocks } = response;
          console.log(stocks);
          setStocks(stocks);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [loading]);

  if (!loading) {
    return (
      <>
        <Navbar />
        <Portfolio stocks={stocks} />
        <PurchaseForm />
      </>
    );
  } else {
    return <></>;
  }
};

export default Home;
