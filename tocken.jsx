import { useStoreActions, useStoreState } from "easy-peasy";

import { TextField, Typography, Input, Button } from "@mui/material";
import { useEffect, useState } from "react";

import styles from "./Styled.module.css";
import RegisterUi from "./registerUi";
import { useNavigate } from "react-router-dom";

const clientRegister = () => {
  const [desabled, setDesabled] = useState(true);

  const [dynamic, setDynamic] = useState("");

  const [err, setErr] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    country: false,
    divition: false,
    dristic: false,
    thana: false,
    union: false,
    address: false,
  });

  const [valueData, setValueData] = useState({
    name: null,
    email: null,
    phone: null,
    password: null,
    country: null,
    divition: null,
    dristic: null,
    thana: null,
    union: null,
    address: null,
  });

  ///easy
  const clientRegister = useStoreActions((actions) => actions.clientRegister);
  const clientData = useStoreState((state) => state.data.clientData);
  console.log("1", clientData);

  const dataSet = (e) => {
    setDynamic(e.target.name);

    setValueData({ ...valueData, [e.target.name]: e.target.value });
  };
  console.log(valueData);
  if (valueData.name) {
    console.log(valueData.name.length, valueData.name, err.name);
  }
  console.log(err);

  useEffect(() => {
    if (valueData[dynamic]) {
      console.log("useEfect");
      console.log(valueData[dynamic], dynamic, valueData[dynamic].length);
    }
    if ([dynamic] == "phone" && valueData[dynamic].length === 11) {
      setErr({ ...err, [dynamic]: false });
      console.log("a");
    } else if (valueData.email && [dynamic] == "email" && valueData[dynamic].length > 6 && valueData[dynamic].length < 21) {
      setErr({ ...err, [dynamic]: false });
    } else if ([dynamic] == "password" && valueData[dynamic].length === 8) {
      setErr({ ...err, [dynamic]: false });
      console.log("a");
    } else if ([dynamic] == "name" && valueData[dynamic].length > 4 && valueData[dynamic].length < 31) {
      setErr({ ...err, [dynamic]: false });
    } else if (
      [dynamic] == "country" ||
      [dynamic] == "divition" ||
      [dynamic] == "dristic" ||
      [dynamic] == "thana" ||
      [dynamic] == "union" ||
      [dynamic] == "address"
    ) {
      console.log("jjj");
      if (valueData[dynamic].length > 3 && valueData[dynamic].length < 16) {
        setErr({ ...err, [dynamic]: false });
        console.log("a");
      } else {
        setErr({ ...err, [dynamic]: true });
        console.log("b");
      }
    } else {
      if (dynamic) {
        setErr({ ...err, [dynamic]: true });
        console.log("c", typeof [dynamic]);
      }
    }

    // setErr({ ...err, [dynamic]: false });
  }, [valueData]);
  console.log(dynamic, valueData[dynamic]);

  useEffect(() => {
    const { phone, name, email, password, country, divition, dristic, thana, union, address } = valueData;
    if (
      phone &&
      phone.length > 0 &&
      name &&
      name.length > 0 &&
      email &&
      email.length > 0 &&
      password &&
      password.length > 0 &&
      country &&
      country.length > 0 &&
      divition &&
      divition.length > 0 &&
      dristic &&
      dristic.length > 0 &&
      thana &&
      thana.length > 0 &&
      union &&
      union.length > 0 &&
      address &&
      address.length > 0
    ) {
      console.log(valueData, "kkk");
      const { phone, name, email, password, country, divition, dristic, thana, union, address } = err;
      if (phone || name || email || password || country || divition || dristic || thana || union || address) {
        console.log(valueData, "ddd");

        setDesabled(true);
      } else {
        console.log(valueData, "fff");

        setDesabled(false);
      }
    } else {
      console.log("rrr");
    }
  });

  // console.log("t", eValue, nValue, email.length, nameValue.length);

  // console.log(items);

  const dataHandler = (e, nameValue, email) => {
    e.preventDefault();

    // alert default for costomer practics if database or networking error
    const johurul = "@@@@@@";
    if (valueData.name === johurul) {
      alert(`Report Is Not Save In Database

               Please Try Again `);
      return;
    } else {
      clientRegister(valueData);
    }
  };
  console.log("hello", clientData);

  useEffect(() => {
    if (clientData === null) {
      console.log("nul", clientData);
    } else {
      console.log("nul", clientData);
      if (clientData.status === "success") {
        setValueData({
          name: "",
          email: "",
          phone: "",
          password: "",
          country: "",
          divition: "",
          dristic: "",
          thana: "",
          union: "",
          address: "",
        });

        setDesabled(true);
        console.log("success", clientData);
      } else if (clientData.status === "user already exist") {
        alert("user already exist");
        console.log("user already exist", clientData);
      } else if (clientData.status === "somthing is wrong please try again") {
        alert("somthing is wrong please try again");
        console.log("somthing is wrong please try again");
      } else if (clientData.status === "plsea real data submit not scham") {
        alert("plsea real data submit not scham");
        console.log("plsea real data submit not scham");
      } else {
        alert("your not validate man");
        console.log("your not validate man");
      }
    }
  }, [clientData]);

  const gotoHome = useNavigate();
  let btn = "go to home page...";

  return (
    <div>
      <h1> clint get page by namevalue or email </h1>
      <RegisterUi client={valueData} handleChange={dataSet} saveHandler={dataHandler} errors={err} buttonShow={desabled} />
      <div>
        <button onClick={() => gotoHome("/")} style={{ fontSize: "18px", fontWeight: "lighter", fontStyle: "italic", color: "#424fe5" }}>
          {btn}
        </button>
      </div>
    </div>
  );
};
export default clientRegister;
