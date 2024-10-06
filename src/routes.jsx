import App from './components/App'
import LogInForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { redirect } from "react-router-dom";
import HomePage from './components/HomePage';
import Post from './components/Post';
import TagPosts from './components/TagPosts';
import NotFound from './components/NotFound';
import { element } from 'prop-types';

const loggedInUserReRouter = () => {
    const localData = localStorage.getItem('blog-visitor');
    if (localData) {
      return redirect("/");
    }
    return null;
  };


const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "posts/:postId",
                element: <Post />
            },
            {
                path: "tags/:tagName",
                loader: ({ params }) => {
                    const tagsArray = [{name: 'tech', id: '666e579c89d6642ee5ac734f'}, {name: 'fashion', id: '666fae0e5c4d34a29313be73'}, {name: 'film', id: '66d04f97ca8958353c1180f0'}, {name: 'other', id: '66d17fe8444354260cbe9f2a'}];
                    const tag = tagsArray.find(tag => tag.name == params.tagName);
                    
                    return tag.id;
                  },
                element: <TagPosts />
            },
        ]
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
    {
        path: '*',
        element: <NotFound />,
    }
]

export default routes;