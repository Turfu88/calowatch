import React from 'react';
import { Route } from 'wouter';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import './App.css';

function App() {
    return (
        <>
            <Route path="/" component={Homepage} />
            <Route path="/dashboard" component={Dashboard} />
        </>
    );
}

export default App;
