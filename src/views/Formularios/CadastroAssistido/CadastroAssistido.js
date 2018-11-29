import React, { Component } from "react"

import Spinner from "../../../assets/Spinner/Spinner"
import base from '../../../base'
import Modal from '../../../components/Modals/Modal'
import MaskedInput from 'react-text-mask'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { Form, Field } from "react-final-form"
import {
    AdaptedInput,
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
    //Button,
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

const Error = ({ name }) => (
    <Field name={name} subscription={{ error: true, touched: true }}>
        {({ meta: { touched, error } }) =>
            touched && error ? (
                <ControlFeedback valid={!error}>{error}</ControlFeedback>
            ) : null
        }
    </Field>
);

class CadastroAssistido extends Component {
    constructor(props) {
        super(props);

        this.cancelClicked = this.cancelClicked.bind(this);
        this.novoAssistido = this.novoAssistido.bind(this);
        this.modificarRG = this.modificarRG.bind(this);
        this.verificarRG = this.verificarRG.bind(this);
        //  this.getAssistido = this.getAssistido.bind(this);

        this.state = {
            modalOpen: false,
            redirect: false,
            modalClass: 'modal-primary',
            rg: ''
        };
    }

    cancelClicked() {
        this.setState({
            modalOpen: !this.state.modalOpen,
            redirect: true
        })
    }

    novoAssistido() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    modificarRG = (event) => {
        this.setState({
            rg: event.target.value
        })
    }

    verificarRG = (event) => {
        this.setState({
            modalClass: 'modal-success'
        })
        //  this.getAssistido(this.state.rg);
    }

    onSubmit = async values => {

        base.addToCollection('assistidos', values)
            .then(() => {
                console.log(values)
                //document is added to the collection
            }).catch(err => {
                //handle error
            });
    };

    render() {

        let cardStyle = {
            border: "1px solid #ccc",
            boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.2)",
            padding: "20px"
        }

        let redirect = <div></div>

        if (this.state.redirect) { redirect = <Redirect to="/dashboard" /> }

        return (
            <div className="animated fadeIn">
                <Modal
                    isOpen={this.state.modalOpen}
                    title="Teste"
                    cancelled={this.cancelClicked}
                    classType={this.state.modalClass}
                >
                    <form>
                        <MaskedInput
                            mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]}
                            className="form-control"
                            placeholder="Digite o RG"
                            guide={false}
                            id="rg"
                            onBlur={this.modificarRG}
                            onChange={() => { }}
                        />
                        <br></br>
                        <Button onClick={this.verificarRG} color="primary" >Verificar RG</Button>
                    </form>
                </Modal>
                {redirect}

                {/* Formulário do cadastro*/}

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

            </div>
        );
    }
}

export default CadastroAssistido;
