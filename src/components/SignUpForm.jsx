import { useNavigate, Link } from "react-router-dom";
import { signUpForAccount, notificationPopUp } from "../utils";
import { useState } from "react";

export default function SignUpForm() {
  const [inputs, setInputs] = useState(null);
  const navigate = useNavigate();
  document.title = 'Sign up - My Blog'

  async function handleSubmission(signupFormData, setInputs) {
    const signupData = {
      username: signupFormData.get("username"),
      password: signupFormData.get("password"),
      passwordConfirmation: signupFormData.get("passwordConfirmation"),
      roles: ["visitor"],
    };
    const signUpApiCall = signUpForAccount(signupData);
    const errorData = await notificationPopUp(
        signUpApiCall,
      { pending: "Creating account...", success: "Account created" },
      3000
    );

    if (errorData.id) {
      navigate("/login");
    } else {
        signupData.errorMessage = errorData.errors;
      setInputs(signupData);
    }
  }
  return (
    <main className="form-main">
      <p id="form-paragraph">
        {"Sign up"}
      </p>
    <form
      id="account"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmission(new FormData(e.currentTarget), setInputs);
      }}
    >
      <div className="username">
        <label htmlFor="username"> {"Username "} </label>
        <input
          type="text"
          name="username"
          id="username"
          required
        />
      </div>
      <div className="password">
        <label htmlFor="password">{"Password "}</label>
        <input
          type="password"
          name="password"
          id="password"
          required
        />
      </div>
      <div className="confirm-password">
        <label htmlFor="confirm-password">{"Confirm Password "}</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="confirm-password"
          required
        />
      </div>
      {inputs && <p className="error">{inputs.errorMessage}</p>}
      <button type="submit">Sign up</button>
    </form>
    <p>Have an account? <Link to='/login'>Log in</Link></p>
    <h1 className="background-title"><em><Link to='/' >My Blog</Link></em></h1>
    </main>
  );
}
