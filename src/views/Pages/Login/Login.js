import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { Form, Field } from 'react-final-form'
import TextField from '../../../assets/UI/TextField'
import { getUser, login } from '../../../store/Actions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.senha) {
    errors.senha = 'Required'
  }
  return errors
}

class Login extends Component {

  componentWillMount() {
    this.props.getUser()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/')
    }
  }
  
  onSubmit = values => {   
    this.props.login(values.email, values.senha).catch( err => {console.log(err.code);})
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                      <Form
                        onSubmit={this.onSubmit}
                        validate={validate}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                          <form onSubmit={handleSubmit}>
                            <div >

                              <Field
                                name="email"
                                component={TextField}
                                type="email"
                                label="Email"
                              />
                            </div>
                            <div>

                              <Field
                                name="senha"
                                component={TextField}
                                type="password"
                                label="Senha"
                              />
                            </div>
                            <div className="buttons btn1">
                              <Button type="submit" disabled={submitting}>
                                Fazer Login
                            </Button>
                            </div>                            
                          </form>
                        )}
                      />

                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return { user: state.user}
} 

export default connect(mapStatetoProps, { login, getUser })(Login);
