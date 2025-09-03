import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Overview from "@/components/pages/Overview";
import Receivables from "@/components/pages/Receivables";
import Payables from "@/components/pages/Payables";
import Forecast from "@/components/pages/Forecast";
import History from "@/components/pages/History";
import MyBusiness from "@/components/pages/MyBusiness";
import MyNetwork from "@/components/pages/MyNetwork";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="receivables" element={<Receivables />} />
          <Route path="payables" element={<Payables />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="history" element={<History />} />
<Route path="business" element={<MyBusiness />} />
          <Route path="network" element={<MyNetwork />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;