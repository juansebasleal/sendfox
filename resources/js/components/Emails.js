import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import EMailsList from './EMailsList'
import MyEditor from './MyEditor'
// import SingleEMail from './SingleEMail'

class Emails extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/emails' component={EMailsList} />
            <Route exact path='/emails/create' component={MyEditor} />
            <Route path='/emails/view/:id' component={MyEditor} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Emails />, document.getElementById('emails'))