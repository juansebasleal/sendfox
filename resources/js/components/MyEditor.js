import React from 'react'
import axios from 'axios'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      subject: '',
      title: 'Create New Email',
      submitButonText: 'Create',
      backButonText: 'Back',
      emailId: null,
      errors: []
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewEMail = this.handleCreateNewEMail.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
  
    this.emailId = this.props.match.params.id;
    this.isEditing = (this.emailId !== undefined && this.emailId !== null);

    if (this.isEditing) {

      this.setState({
        title: 'Edit Email',
        submitButonText: 'Update',
        emailId: this.emailId
      })

      axios.get(`/api/emails/view/${this.emailId}`).then(response => {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.body))),
          subject: response.data.subject,
        })

      });
    }

  }

  styles = {
    editor: {
      border: '1px solid gray',
      minHeight: '6em'
    }
  };

  onChange = (editorState) => {
    this.setState({
      editorState 
    });

    this.handleFieldChange;
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onUnderlineClick = () => {
    event.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    event.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicClick = () => {
    event.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  onBackButtonClick = () => {
    event.preventDefault();
    window.location.href = '/emails_list'; 
  }


  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * When hitting Create or Edit email
   */
  handleCreateNewEMail = (event) => {
    event.preventDefault()

    const { history } = this.props

    const editorContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    const editorHasText = this.state.editorState.getCurrentContent().hasText();

    // Prevent persisting email if the body is empty
    if (!editorHasText) {
      alert("Email body es mandatory");
      return false;
    }

    // Prepare variable to be sent to the service
    const email = {
      emailId: this.state.emailId,
      subject: this.state.subject,
      body: editorContent,
      userId: UserId
    }

    axios.post('/api/emails/create', email).then(response => {
        // redirect to the emails listing main page
        window.location.href = '/emails_list'; 
    }).catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
    })
  }

  hasErrorFor = (field) => {
    return !!this.state.errors[field]
  }

  renderErrorFor = (field) => {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render() {
    return(
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>{this.state.title}</div>
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

                    <div style={this.styles.editor} className="editorContainer">
                      <button onClick={this.onUnderlineClick}>U</button>
                      <button onClick={this.onBoldClick}><b>B</b></button>
                      <button onClick={this.onItalicClick}><em>I</em></button>
                      <div className="editors">
                        <Editor
                          editorState={this.state.editorState}
                          handleKeyCommand={this.handleKeyCommand}
                          onChange= { this.onChange }
                          />
                      </div>
                    </div>

                    {this.renderErrorFor('body')}
                  </div>
                  <button className='btn btn-primary'>{this.state.submitButonText}</button>
                  <button className='btn btn-secondary' onClick={this.onBackButtonClick}>
                    {this.state.backButonText}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyEditor
