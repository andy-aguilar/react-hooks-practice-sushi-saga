import React, {useEffect, useState} from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [allSushi, setAllSushi] = useState([])
  const [start, setStart] = useState(0)
  const [wallet, setWallet] = useState(100)
  const [newMoney, setNewMoney] = useState(0)

  useEffect(() => {
    fetch(API)
    .then(resp => resp.json())
    .then(data => setAllSushi(data))
  }, [])

  const displaySushi = allSushi.slice(start, start+4)

  const forwardSushi = () => {
    if(start >= allSushi.length - 4){
      setStart(0)
    } else{
      setStart(start => start + 4)
    }
  }

  const eatSushi = (clickedSushi) => {
    // X pass up the sushi that is being clicked on /eaten
    // X  make a copy of the allSushi array (use arrow function)
    // X find the individual sushi in that copy of the array
    // X  give that sushi a key of `eaten` and set that to true
    if(wallet >= clickedSushi.price){

      fetch(`http://localhost:3001/sushis/${clickedSushi.id}`, {
        method: "DELETE"
      })
      .then(resp => resp.json())
      .then(data => {
          
          const newSushi = allSushi.filter(sushi => sushi.id !== clickedSushi.id)
          setAllSushi(newSushi)
      })


      // const newSushi = [...allSushi]
      // const sushiToUpdate = newSushi.find(sushi => sushi.id === clickedSushi.id)
      // sushiToUpdate.eaten = true
      // setAllSushi(newSushi)
      // setWallet(wallet - clickedSushi.price)
    } else if (wallet < clickedSushi.price) {
      alert("you're broke")
    }
  }

  const plates = new Array(100 - allSushi.length).fill(1)

  const handleAddMoney = (e) => {
    e.preventDefault()
    setWallet(wallet + newMoney)
    setNewMoney(0)
  }

  return (
    <div className="app">
      <SushiContainer allSushi={displaySushi} forwardSushi={forwardSushi} eatSushi={eatSushi} />
      <Table plates={plates} wallet={wallet} />
      <form onSubmit={handleAddMoney}>
        <label>$</label>
        <input type="number" value={newMoney} onChange={(e) => setNewMoney(parseInt(e.target.value))} />
        <input type="submit" value="Add Money" />
      </form>
    </div>
  );
}

export default App;
