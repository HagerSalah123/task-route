import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerTable = ({ onSelectCustomer, onViewChart }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ name: "", amount: "" });

  useEffect(() => {
    axios
      .get("http://localhost:4000/customers")
      .then((response) => {
        console.log("Customers:", response.data);
        setCustomers(response.data);
      })
      .catch((error) => console.error("Error fetching customers:", error));

    axios
      .get("http://localhost:4000/transactions")
      .then((response) => {
        console.log("Transactions:", response.data);
        setTransactions(response.data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.name.toLowerCase())
  );

  const getCustomerTransactions = (customerId) => {
    const customerTransactions = transactions.filter(
      (transaction) =>
        transaction.customer_id == customerId &&
        transaction.amount.toString().includes(filter.amount)
    );

    return customerTransactions;
  };

  return (
    <div>
      <h1>Customer Transactions</h1>
      <input
        type="text"
        placeholder="Filter by customer name"
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Filter by transaction amount"
        value={filter.amount}
        onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
      />
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Transactions</th>

            <th>View Chart</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>
                {getCustomerTransactions(customer.id).map((transaction) => (
                  <div key={transaction.id}>
                    {transaction.date}: ${transaction.amount}
                  </div>
                ))}
              </td>

              <td>
                <button onClick={() => onViewChart(customer.id)}>
                  View Chart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
