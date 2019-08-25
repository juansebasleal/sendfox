import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewEMail from './NewEMail'
import EMailsList from './EMailsList'
import SingleEMail from './SingleEMail'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={EMailsList} />
            <Route path='/create' component={NewEMail} />
            <Route path='/:id' component={SingleEMail} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))