import axios from 'axios'
import React, { Component } from 'react'

class NewEMail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewEMail = this.handleCreateNewEMail.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewEMail (event) {
    event.preventDefault()

    const { history } = this.props

    const email = {
      name: this.state.name,
      description: this.state.description
    }

    axios.post('/api/emails', email)
    // axios.post('/api/', emails)
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new Email</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewEMail}>
                  <div className='form-group'>
                    <label htmlFor='subject'>Subject</label>
                    <input
                      id='subject'
                      type='text'
                      className={`form-control ${this.hasErrorFor('subject') ? 'is-invalid' : ''}`}
                      name='subject'
                      value={this.state.subject}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('subject')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='body'>Body</label>
                    <textarea
                      id='body'
                      className={`form-control ${this.hasErrorFor('body') ? 'is-invalid' : ''}`}
                      name='body'
                      rows='10'
                      value={this.state.body}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('body')}
                  </div>
                  <button className='btn btn-primary'>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewEMail