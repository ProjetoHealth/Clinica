import styled from 'styled-components';
import Banner from "../../assets/img/login-banner.jpg";

export const Container = styled.div`
  display: flex;
`
export const Content = styled.div`
  min-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const LogoStyled = styled.img`
  margin: 50px;
`
export const BannerLogin = styled.div`
  background-image: url(${Banner});
  background-repeat: no-repeat;
  background-size: cover;
  width: calc(100% - 600px);
  height: 100vh;
`
export const Forms = styled.div`
  padding: 0px 50px;
  display: flex;
  flex-direction: column;
  .MuiFormControl-root{
    margin: 10px 0px;
  }
`
export const ContentForms = styled.div`
  height: calc(100% - 380px);
  display: flex;
  align-items: center;
`