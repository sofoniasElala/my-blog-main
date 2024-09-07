import App from './components/App'
import LogInForm from './components/LoginForm';
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
]

export default routes;