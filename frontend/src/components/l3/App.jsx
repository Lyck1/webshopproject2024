import CardContainer from './CardContainer';
import { Route, Routes, Link , Navigate, Outlet} from 'react-router-dom';
import Card from './Card';

export default function App() {

  const colors=["pink", "yellow", "green", "black"];
  
  return (

 <div>
  My App
  
  <h2>Static cards</h2>
      <div style={{display:"flex"}}>
      <Card color={'green'}></Card>
      <Card color={'blue'}></Card>
      </div>
    
  <h2>Cards from list with container</h2>  
     <CardContainer cardList={colors}></CardContainer>
  
  <h2>Routing Example</h2>
  <nav>
      <Link to="/l3/page1">Pink Page  </Link>
      <Link to="/l3/page2">Green Page </Link>
      <Link to="/l3/page3"> Redirect to pink </Link>
    </nav>
  
    <Routes> 
    <Route path='page1' element={<Card color={"pink"}></Card>}> </Route>
    <Route path='page2' element={<Card color={"green"}></Card>}> </Route>
    <Route path='page3' element={<Navigate to="/l3/page1"></Navigate>}/>
   
  </Routes>
  <Outlet/>
  
  </div>
  
    )
}


