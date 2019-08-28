import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import EMailsList from './EMailsList'
import MyEditor from './MyEditor'

class Emails extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
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