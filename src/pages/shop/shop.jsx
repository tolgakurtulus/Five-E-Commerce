import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collectionsOverview/collectionsOverview";
import CollectionsPage from "../collection/collection";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions.js";
import WithSpinner from "../../components/withSpinner/withSpinner.jsx";

const Shop = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
  const CollectionsPageWithSpinner = WithSpinner(CollectionsPage);

  useEffect(() => {
    // const collectionRef = firestore.collection("collections");
    // collectionRef.onSnapshot(async snapShot => {
    //  const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //  dispatch(fetchCollectionsStartAsync(collectionsMap));
    //  setLoading(false);
    // })

     dispatch(fetchCollectionsStartAsync());


    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/ecommerce-db-3015c/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log("collections", collections));


  }, []);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverview}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionsPage}
      />
    </div>
  );
};

export default Shop;
