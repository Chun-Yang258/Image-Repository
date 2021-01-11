import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "components/Application.scss";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

import NavBar from "components/NavBar";
import ProductPage from "components/ProductPage";
import AuthenticationPage from "components/Athentication/AuthenticationPage";
import InventoryPage from "components/UserInventory/InventoryPage";
import UploadPage from "components/UploadImage/UploadPage";

export default function Application(props) {

  // State
  const [state, setState] = useState({
    currentUser: null
  })
  // user authentication useEffect
  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(
      async userAuth => {
        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            })
          })
        }else{
          setState({ currentUser: userAuth })
        }
      })

    return function cleanup() {
      unsubscribeFromAuth();
    };
  },[]);

  return (
    <main className="layout">
      <NavBar currentUser={state.currentUser} />
      <section className="main-page">
        <Switch> 
          <Route 
            exact 
            path="/"
            component={() => <ProductPage />}
          />  
          <Route 
            exact 
            path="/signin" 
            component={() => <AuthenticationPage currentUser={state.currentUser}/> } 
          />
          <Route 
            exact 
            path="/inventory" 
            component={() => <InventoryPage currentUser={state.currentUser} />} 
          />
          <Route 
            exact 
            path="/upload" 
            component={() => <UploadPage currentUser={state.currentUser} />}            
          />
        </Switch> 
      </section>
    </main>
  );
}
