import React, { Component } from "react"
import Spinner from "../../../assets/Spinner/Spinner"
import base from '../../../base'

import { Form, Field } from "react-final-form"

import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardHeader,
  CardText
} from "reactstrap";

import {
  Box,
  Button,
  Checkbox,
  Col,
  ControlFeedback,
  FormCheck,
  FormCheckLabel,
  FormGroup,
  Input,
  Label,
  Radio,
  RadioGroup,
  Row,
  Select,
  Textarea,
  Typography
} from '@smooth-ui/core-sc'

import { AdaptedInput, 
         AdaptedCheckbox,
         AdaptedRadio,
         AdaptedTextarea,
         normalizeRG,
         normalizeCPF,
         required,
         mustBeNumber,
         minValue,
         composeValidators,
         documentoUtilizado
          } from '../../../assets/Validations/Validations'

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { touched, error } }) =>
      touched && error ? (
        <ControlFeedback valid={!error}>{error}</ControlFeedback>
      ) : null
    }
  </Field>
);

class FichaAtendimento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: null,
      demandas: null,
      loading: true
    };
  }

  componentWillMount() {
    /*  base.fetch('demandas', {
        context: this,
        asArray: true
      }).then(data => {
        //console.log(data);   
        this.setState({ 
          demandas: Object.values(data)
        })
        this.setState({ loading: false })
      }).catch(error => {
        
      })*/
    base.get("demandas", {
      context: this,
      // asArray: true,
      // query: (ref) => ref.where('name', '==', 'Atendimento Médico'),
    }).then(data => {
      let arr = []
      Object.values(data).map(demanda => {
        arr.push(demanda.name)
      })
      console.log(arr)
      this.setState({
        demandas: arr
      })
      this.setState({ loading: false })
      //do something with data
    }).catch(err => {
      //handle error
    })
  }

  /*componentWillUnmount() {
    base.removeBinding(this.demandasRef)
  }*/

  componentDidMount() {

  }

  onSubmit = async values => {

    base.addToCollection('assistidos', values)
      .then(() => {
        console.log(values)
        //document is added to the collection
      }).catch(err => {
        //handle error
      });
    /*  let immediatelyAvailableReference = base.push('data', {
        data: values,
        then(err){
          if(!err){
            console.log(values)
          }
        }
      });
      //available immediately, you don't have to wait for the callback to be called
      let generatedKey = immediatelyAvailableReference.key;
      console.log(generatedKey)*/

  };

  render() {

    let checkDemandas = <Spinner />

    let cardStyle = {
      border: "1px solid #ccc",
      boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.2)",
      padding: "20px"
    }

    if (!this.state.loading) {
      checkDemandas = (
        <div>
          {this.state.demandas.map(demanda => {
            return <FormCheck key={demanda}>
              <Field
                name="demandas"
                component={AdaptedCheckbox}
                id={demanda}
                type="checkbox"
                value={demanda}
              />
              <FormCheckLabel htmlFor={demanda}>{demanda}</FormCheckLabel>
            </FormCheck>
          })}
        </div>
      )
    }

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader tag="h4">Ficha de Atendimento Social</CardHeader>
          <CardBody>

            <Form
              onSubmit={this.onSubmit}
              initialValues={{}}
              render={({ handleSubmit, form, submitting, pristine, values, validating }) => (
                <form onSubmit={handleSubmit}>
                  {validating && <Spinner />}
                  <Card style={cardStyle}>
                    <CardSubtitle>Dados pessoais</CardSubtitle>

                    <Row>
                      <Col sm={2}>
                        <FormGroup>
                          <Label>RG</Label>
                          <Field
                            key="rg"
                            name="rg"
                            component={AdaptedInput}
                            placeholder="99.999.999-9"
                            validate={composeValidators(required, documentoUtilizado)}
                            parse={normalizeRG}
                            control
                          />
                          <Error name="rg" />
                        </FormGroup>
                      </Col>

                      <Col sm={3}>
                        <FormGroup>
                          <Label>CPF</Label>
                          <Field
                            key="cpf"
                            name="cpf"
                            component={AdaptedInput}
                            placeholder="999.999.999-99"
                            //validate={required}
                            parse={normalizeCPF}
                            control
                          />
                          <Error name="CPF" />
                        </FormGroup>
                      </Col>

                      <Col sm={3}>
                        <FormGroup>
                          <Label>Data de Nascimento</Label>
                          <Field
                            key="nascimento"
                            name="nascimento"
                            component={AdaptedInput}
                            type="date"
                            placeholder="nascimento"
                            //validate={required}
                            control
                          />

                          <Error name="nascimento" />
                        </FormGroup>
                      </Col>

                      <Col sm={3}>
                        <FormGroup>
                          <Label>Sexo</Label>
                          <RadioGroup>

                            <FormCheck>
                              <Field
                                name="sexo"
                                component={AdaptedRadio}
                                type="radio"
                                id="masc"
                                value="masc"
                              />
                              <FormCheckLabel htmlFor="masc">Masculino</FormCheckLabel>
                            </FormCheck>

                            <FormCheck>
                              <Field
                                name="sexo"
                                component={AdaptedRadio}
                                type="radio"
                                id="fem"
                                value="fem"
                              />
                              <FormCheckLabel htmlFor="fem">Feminino</FormCheckLabel>
                            </FormCheck>

                          </RadioGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <FormGroup>
                          <Label>Nome</Label>
                          <Field
                            key="primeiroNome"
                            name="primeiroNome"
                            component={AdaptedInput}
                            placeholder="Nome"
                            //validate={required}
                            control
                          />
                          <Error name="primeiroNome" />
                        </FormGroup>
                      </Col>

                      <Col sm={6}>
                        <FormGroup>
                          <Label>Sobrenome</Label>
                          <Field
                            key="sobrenome"
                            name="sobrenome"
                            component={AdaptedInput}
                            placeholder="Sobrenome"
                            //validate={required}
                            control
                          />
                          <Error name="sobrenome" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <FormGroup>
                          <Label>Mãe</Label>
                          <Field
                            key="mae"
                            name="mae"
                            component={AdaptedInput}
                            placeholder="Nome da Mãe"
                            //validate={required}
                            control
                          />
                          <Error name="mae" />
                        </FormGroup>
                      </Col>

                      <Col sm={6}>
                        <FormGroup>
                          <Label>Pai</Label>
                          <Field
                            key="pai"
                            name="pai"
                            component={AdaptedInput}
                            placeholder="Nome do Pai"
                            //validate={required}
                            control
                          />
                          <Error name="pai" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={8}>
                        <FormGroup>
                          <Label>Endereçe</Label>
                          <Field
                            key="endereco"
                            name="endereco"
                            component={AdaptedInput}
                            placeholder="Endereço"
                            //validate={required}
                            control
                          />
                          <Error name="endereco" />
                        </FormGroup>
                      </Col>

                      <Col sm={4}>
                        <FormGroup>
                          <Label>Telefones</Label>
                          <Field
                            key="telefones"
                            name="telefones"
                            component={AdaptedInput}
                            placeholder="Telefones"
                            //validate={required}
                            control
                          />
                          <Error name="telefones" />
                        </FormGroup>
                      </Col>
                    </Row>

                  </Card>
                  <Card style={cardStyle}>
                    <FormGroup>
                      <Label>Demandas</Label>
                      {checkDemandas}
                    </FormGroup>
                  </Card>
                  
                  <FormGroup>
                    <Label>Observações</Label>
                    <Field
                      name="notes"
                      component={AdaptedTextarea}
                      placeholder="Notes"
                      //validate={required}
                      control
                    />
                    <Error name="notes" />
                  </FormGroup>

                  <Box justifyContent="space-between">
                    <Button
                      type="submit"
                      disabled={submitting || pristine}
                      variant="primary"
                    >
                      Gravar
                          </Button>
                    <Button
                      type="button"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                      variant="secondary"
                    >
                      Limpar
                          </Button>
                  </Box>


                  <pre
                    style={{
                      border: "1px solid #ccc",
                      background: "rgba(0, 0, 0, 0.1)",
                      boxShadow: "inset 1px 1px 3px rgba(0, 0, 0, 0.2)",
                      padding: "20px"
                    }}
                  >
                    {JSON.stringify(values, 0, 2)}
                  </pre>
                </form>

              )}
            />

          </CardBody>
        </Card>

      </div >
    );
  }
}

export default FichaAtendimento;
