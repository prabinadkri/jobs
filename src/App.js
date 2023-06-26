import logo from './logo.svg';
import './App.css';
import List from './Components/List';

function App() {
  return (
    <div className="App">
      <div className='heading'>
        <div className='pattern1'></div>
        <div className='pattern1' style={{position:"relative",left:"700px",top:"-600px"}}></div>
        <div className='pattern1' style={{position:"relative",left:"1200px",top:"-1100px"}}></div>
        <div className='pattern1' style={{position:"relative",left:"400px",top:"-1870px"}}></div>
      </div>
      <List></List>
    </div>
  );
}

export default App;
