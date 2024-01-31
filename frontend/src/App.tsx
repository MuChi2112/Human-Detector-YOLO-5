import { AddVideo } from "./components/AddVideo";
import styled from 'styled-components';


const StyledDiv = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height:97vh;
   flex: 1;
   flex-direction: column;
`;

const App = () => {
  return (

    <StyledDiv>
      <AddVideo />
    </StyledDiv>

  );
};

export default App;