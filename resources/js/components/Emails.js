import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import EMailsList from './EMailsList'
// import NewEMail from './NewEMail'
// import SingleEMail from './SingleEMail'

class Emails extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path='/:id' component={EMailsList} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Emails />, document.getElementById('emails'))