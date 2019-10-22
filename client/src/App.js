import React from 'react';
import ApolloClient from 'apollo-boost';
// This works similar to Redux. With Redux also we have a provider and 
// we wrap our main app with the provider and pass in the store. In this
// case we wrap our app in the provider and pass in the client.
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launches from './components/launches';
import './App.css';
import logo from './logo.jpg'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: 'block', margin: 'auto' }}
          />
          <Route exact path="/" component={Launches} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
