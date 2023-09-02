
import { FaTrashAlt } from 'react-icons/fa';

const List = ({ items, handleCheck, handleDelete }) => {

    return (

        <>
            <ul >
                {items.map((item) => (
                    <li className="item" key={item.id}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheck(item.id)}
                            checked={item.checked}

                        />
                        <label>{item.item}</label>
                        <FaTrashAlt
                            role="button"
                            tabIndex="0"
                            onClick={() => handleDelete(item.id)}
                        />
                    </li>
                ))
                }
            </ul>
        </>

    );
}

export default List