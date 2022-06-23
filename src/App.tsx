import React from "react";
import { SimpleForm, ReactHookForm, FormicYup } from "./features";

import "./App.css";

function App() {
  return (
    <div className="App">
      <SimpleForm />
      <ReactHookForm />
      <hr />
      <FormicYup />
    </div>
  );
}

export default App;
