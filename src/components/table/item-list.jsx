import './item-list.css'
import ListHeader from './list-header';
import Item from './item';

function ItemList(props) {
  const { models, isLoading } = props;

  return (
    <div className='list'>
      <ListHeader />
        {isLoading && 'Loading...'}
        <ul className='listBody'>
        {models.map((model, i) => (
          <Item
            data={model}
            key={model.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
