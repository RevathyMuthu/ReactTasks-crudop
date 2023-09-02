
import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
import AddItem from "./AddItem";
import React, { useState, useEffect } from 'react'
import SearchItem from "./SearchItem";
import Axios from 'axios'
//import data from "./data/db.json";
import apiRequest from "./apiRequest";


function App() {
  // const [items, setItems] = useState(
  //   [
  //     {
  //       id: 1,
  //       checked: true,
  //       item: "Practice React Code"
  //     },
  //     {
  //       id: 2,
  //       checked: false,
  //       item: "Learn to Fetch data from API"
  //     },
  //     {
  //       id: 3,
  //       checked: false,
  //       item: "Read about AI"
  //     },
  //     {
  //       id: 4,
  //       checked: false,
  //       item: "ChatGPT"
  //     }
  //   ]);

  //const [items, setItems] = useState(data.json);

  //{set last enter data to default}
  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo_list')));
  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo_list'))||[]);

  //const num = [-2, -1, 0, 1, 2]
  //const item = num.map(n => ({ num: n }))
  //console.log(item)
  //const items = num.filter(n => n >= 0).map(n => ({ num: n }))
  //console.log(items)

  const API_URL = 'http://localhost:3000/items';
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await Axios.get(API_URL);

    console.log(response.data);
    setItems(response.data);

  }

  const addItem = async (item) => {
    // const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item }
    const listItems = [...items, addNewItem]
    setItems(listItems)
    // localStorage.setItem("todo_list", JSON.stringify(listItems))

    //Add items to db.json 
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    //if (!result) setFetchError(result);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`The name you entered was: ${newItem}`)
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }


  const handleCheck = async (id) => {
    //const handleCheck = (id) => {
    console.log(`id: ${id}`)
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    //update the state of checkbox
    const myItem = listItems.filter((item) => item.id === id)
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    //if (result) setFetchError(result)

  }

  const handleDelete = async (id) => {
    //const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    // localStorage.setItem("todo_list", JSON.stringify(listItems))

    //delete in db
    const deleteOptions = {
      method: 'DELETE',
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    // //if (result) setFetchError(result)

  }

  return (
    <div className="App">
      <Header />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>


        <List
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />

      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
