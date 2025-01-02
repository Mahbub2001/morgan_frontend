"use client"
import React, { useEffect, useState } from 'react'

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`)
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  },[]);

  console.log(customers);
  
  return (
    <div>
      this is customers
    </div>
  )
}

export default Customers
