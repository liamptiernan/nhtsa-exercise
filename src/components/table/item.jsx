import './item-list.css'

function Item(props) {
  const { data } = props;

  return (
    <li className='listItem'>
      <div>{data["Make_ID"]}</div>
      <div>{data["Make_Name"]}</div>
      <div>{data["Model_ID"]}</div>
      <div>{data["Model_Name"]}</div>
    </li>
  );
}

export default Item;
