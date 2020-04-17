
import styled from 'styled-components';

export default styled.div`
  > form {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 20px 10px 20px 10px;
  }
  > form > input[type=text] {
    margin-right: 10px;
    flex-grow: 1;
    padding: 5px;
    background-color: #2E2E2E;
    color: #F2F2F2;
    border: 0px;
    border-bottom: 1px solid #F2F2F2;
    resize: none;
    font-size: 100%;
  }
  > form > input[type=text]:focus {
    outline: none;
    border-bottom: 1px solid #A66226;
  }
  > form > input:-internal-autofill-selected {
    background-color: #2E2E2E !important;
    color: #F2F2F2 !important;
  }
`;
