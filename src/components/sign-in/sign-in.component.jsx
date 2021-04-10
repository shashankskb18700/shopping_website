import React from 'react';
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'

import CustomButton from '../custom-button/custom-button.component'

import {signInWithGoogle,auth} from '../../firebase/firebase.utils'


class SignIn extends React.Component{
  constructor() {
    super();
    this.state = {
      email: '',
      password:''
    }
  }
  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email:'',password:''})

    } catch (error) {
      console.log(error);
    }
    
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({[name]:value})
  }
    
  


  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email id & password </span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            label="email"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="password"
            type='password'
            value={this.state.password}
            label="passoword"
            handleChange={this.handleChange}
            required
          />

          {/* <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="confirm password"
            required
          /> */}

          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  
    
  }
}

export default SignIn;