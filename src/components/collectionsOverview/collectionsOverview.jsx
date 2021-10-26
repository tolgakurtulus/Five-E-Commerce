import React from "react";
import { useSelector } from "react-redux";
import CollectionPreview from "../collectionPreview/collectionPreview";
import "./collectionsOverview.scss";

const CollectionsOverview = () => {
  const useSelectorItemVal = useSelector((state) => state.shop.collections);
  const useSelectorItem = Object.keys(useSelectorItemVal).map(key => useSelectorItemVal[key]);

  return (
    <div className="collections-overview">
      {useSelectorItem.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;