import App from './components/App'
import LogInForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { redirect } from "react-router-dom"

const loggedInUserReRouter = () => {
    const localData = localStorage.getItem('blog-user');
    if (localData) {
      return redirect("/");
    }
    return null;
  };


const routes = [
    {
        path: "/",
        element: <App />,
        children: []
    },
    {
        path: "/login",
        loader: loggedInUserReRouter,
        element: <LogInForm />
    },
    {
        path: "/signup",
        loader: loggedInUserReRouter,
        element: <SignUpForm />
    },
]

export default routes;