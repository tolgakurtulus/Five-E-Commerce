import React from 'react';
import { useSelector } from 'react-redux';
import CollectionItem from '../../components/collectionItem/collectionItem';
import './collection.scss';

const CollectionPage = (props) => {

  const collectionId = props.match.params.collectionId;
  const useSelectorItems = useSelector((state) => state.shop.collections[collectionId])
  const { title, items } = useSelectorItems;

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;