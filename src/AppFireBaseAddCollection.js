import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import HomePage from './pages/homepage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx';
import SignPage from './pages/signpage/signpage.jsx';
import CheckoutPage from './pages/checkout/checkout.jsx';
import Header from './components/header/header.jsx';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";

function App() {

  const currentUser = useSelector(state => state.user.currentUser)
  const useSelectorItemVal = useSelector((state) => state.shop.collections);
  const useSelectorItem = Object.keys(useSelectorItemVal).map(key => useSelectorItemVal[key]);
  const dispatch = useDispatch()
  
  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot  => {
          dispatch(setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }));
        });
      }
      dispatch(setCurrentUser(userAuth));
      addCollectionAndDocuments("collections", useSelectorItem.map(({title, items}) => ({title, items})));
    });
  }, [auth]);
  
  return (
      <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/sign" render={() => currentUser ? ( <Redirect to="/"/>) : (<SignPage/>)}/>
          </Switch>
      </div>
  );
}

export default App;