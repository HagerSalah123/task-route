import React, { useState } from "react";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";

const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewChartCustomer, setViewChartCustomer] = useState(null);

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const handleViewChart = (customerId) => {
    setViewChartCustomer(customerId);
  };

  return (
    <div>
      <CustomerTable
        onSelectCustomer={handleSelectCustomer}
        onViewChart={handleViewChart}
      />
      {selectedCustomer && (
        <div>
          <h2>Transactions for Customer ID: {selectedCustomer}</h2>
          <TransactionGraph customerId={selectedCustomer} />
        </div>
      )}
      {viewChartCustomer && (
        <div>
          <h2>Chart for Customer ID: {viewChartCustomer}</h2>
          <TransactionGraph customerId={viewChartCustomer} />
        </div>
      )}
    </div>
  );
};

export default App;
