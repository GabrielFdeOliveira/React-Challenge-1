import { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number,
  clientY: number
}

function App() {
//Here I use an useState to store and update the coordinates
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]) //I spent a very long time here until I discovered I had to use [] after "ClickedProps".
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])
  
  function getCoordinates( e: React.MouseEvent){
    //console.log(e)
//Here I destructured the two properties I needed from the event I console.logged
    const {clientX, clientY} = e
//Now I use a spread method to update the current state instead of override it
    setClickedPoints([...clickedPoints, {clientX, clientY}])
    // console.log(clickedPoints)
  }

//Spread the clickedPoints state into a new variable, so we can manipulate it, then call the .pop method to remove the latest point and finally use the result of that to replace/update our state.
//Create a new variable to store the deleted points in the process, this way we can use the Redo button.  
  function handleUndo(){
    const newClickedPoints = [...clickedPoints]
    const deletedPoint = newClickedPoints.pop() 
    setClickedPoints(newClickedPoints)
//Here TS complained about undoPoints type when undefined, so I made a condition to avoid that
    if(!deletedPoint) return    
    setUndoPoints([...undoPoints, deletedPoint])
  }

//I got hard stuck on this one, couldn't apply the logic I had in mind, store the "unmade clicks" in a variable so I could reapply them if I wanted
  function handleRedo(){
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()
    if (!redoPoint) return
    setUndoPoints(newUndoPoints)
    setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    <>
    <button onClick={handleUndo} disabled={clickedPoints.length === 0} >Undo</button>
    <button onClick={handleRedo} disabled={undoPoints.length === 0} >Redo</button>
    <div className="App" onClick={getCoordinates}>
{/* Now I map through my state and render something on it */}
    {clickedPoints.map((point, index) => {
//I couldn't use the axis values on the css file so I researched how to inline style in React    
      return (<div className="Circle"
                key={index}
                style={{
                  left: point.clientX, 
                  top: point.clientY,
                  position: 'absolute',
                  borderRadius: '50%',
                  background: 'green',
                  width: '10px',
                  height: '10px',
                }}
              ></div>
              )
    })}
    </div>
    </>
  )
}

export default App
