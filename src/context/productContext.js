import React, { useEffect, useState, useContext } from 'react';
import { firebase } from '../firebase';

export const AuthContext = React.createContext();

export const productContext = ({ children }) => {
  const [products, setProducts] = useState([]);

  const uploadMerchantInfo = (
    displayName,
    displayEmail,
    displayAddress,
    parentDisplayCountry,
    cityInputValue,
    user
  ) => {
    firebase
      .firestore()
      .collection('merchants')
      .doc(user.uid)
      .set({
        storeName: displayName,
        email: displayEmail,
        address: displayAddress,
        city: cityInputValue.cityName,
        country: parentDisplayCountry,
        isMerchant: true,
        numberOfProducts: 0
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const getProducts = () => {
    firebase
      .firestore()
      .collection('merchants')
      .doc('merchantID')
      .collection('products')
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setProducts(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  return (
    <productContext.Provider
      value={{
        products,
        getProducts,
        uploadMerchantInfo,
        createProduct
      }}
    >
      {children}
    </productContext.Provider>
  );
};
