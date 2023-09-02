import React, { useRef } from 'react'


const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef()
    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item </label>
            <input
                type="text"
                autoFocus
                id='addItem'
                placeholder='Add Item'
                value={newItem}
                ref={inputRef}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
            > Submit

            </button>
        </form>
    )
}

export default AddItem


