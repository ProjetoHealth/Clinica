import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100% - 36px);
`
export const Content = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`
export const Subtitle = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  span{
    font-size: 18px;
    font-weight: bold;
  }
`
export const InputGroup = styled.div`
  display: flex;
  .MuiFormControl-root{
    margin: 5px 5px;
  }
`
export const ContentForm = styled.div`
  height: 80%;
  margin: 20px;
`
export const FormItem = styled.div`
  margin-bottom: 15px;
`