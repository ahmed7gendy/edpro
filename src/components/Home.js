// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('https://new-e-learning-edecs-default-rtdb.firebaseio.com/vendors.json');
        const vendorsData = Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data.vendorInfo // الوصول إلى خصائص vendorInfo
        }));
        setVendors(vendorsData);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div>
      <h1>قائمة الموردين</h1>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.id}>
            <Link to={`/vendor/${vendor.id}`}>{vendor.vendorName || 'لا يوجد اسم'}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
