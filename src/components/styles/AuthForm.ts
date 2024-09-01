import styled from 'styled-components'

const AuthForm = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
  @media (min-height: 678px) {
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: 53%;
  }


  .form {
    margin-top: 5rem;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    min-width: 40%;
    @media (max-width: 576px) {
      margin-top: 4rem;
      transform: translateY(-2rem);
      width: 80%;
    }
  }

  .form__name {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 4rem;
    @media (min-width: 576px) {
      font-size: 5rem;
    }
  }

  .inputGroup {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    @media (min-width: 576px) {
      font-size: 3rem;
    }

    label {
      margin-bottom: 0.5rem;
    }
    
  }
  .form__button {

    color: white;
    background: ${props => props.theme.mainThemeColor};
    
    border: 1px solid #555;
    border-radius: 5px;
    padding: 1rem 1.6rem;
    font-size: 2rem;
    text-transform: uppercase;
    cursor: pointer;
    width: 100%;
  }
  .form__link--container {
    display: flex;
    flex-direction: column;
  }

  .form__link {
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    padding-bottom: .3rem;
    text-decoration: none;
    text-align: center;
    border-bottom: 1px solid transparent; 

    /*  */
    color: grey;
  }
  .form__link:hover {
    border-bottom: 1px solid #ccc;

    /* text-decoration: underline; */
  }
  .errorMessage,
  .successMessage {
    display: block;
    margin: 1rem 0;

        
  }
  .errorMessage {
    color: #550000;
  }

  .successMessage {
    /*  */
    color: black;
  }

  .testAccount {
    font-size: 2rem;
    cursor: pointer;
    margin-top: 1rem;
    background: none;
    border: none;
    color: black;
  }
  
`

export default AuthForm