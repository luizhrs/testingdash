import React, { Component } from 'react';
import axios from '../../axios-instance';
import Spinner from '../../assets/Spinner/Spinner';

import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataCadastro: '',
      numAtendimento: 0,
      assistente: 'userPadrao',
      nome: '',
      sobrenome: '',
      sexo: 'Masculino',
      mae: '',
      pai: '',
      endereco: '',
      nascimento: '',
      rg: '',
      cpf: '',
      estadoCivil: '',
      filhos: '',
      numFilhos: 0,
      escolaridade: '',
      statusEscolaridade: '',
      telefones: '',
      experienciaProfissional: '',
      dependencia: '',
      descDependencia: '',
      problemasSaude: '',
      descSaude: '',
      condMoradia: '',
      comoConheceu: '',
      solicitacao: '',
      demandaConcedida: '',
      situacaoApresentada: '',
      retorno: '',
      observacoes: '',
      pagina: {
        loading: true,
      },
      demandas: {}
      };
  }


  componentDidMount() {
    axios.get('/demandas.json')
      .then(response => {
        let newState = {loading: false}
        this.setState({
          demandas: Object.values(response.data),
          pagina: newState
        })
        
        console.log(this.state.demandas)
        console.log(this.state.pagina.loading)
      });
  }

  handleChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state)
  }


  handleSubmit = (event) => {
    event.preventDefault()
    const dataAssist = {...this.state}
    console.log(dataAssist)
    axios.post('/data.json', dataAssist);
  }

  montaDemandas (demandas) {
    for (let key in demandas) {
      console.log(demandas.length)
    }
  }

  render() {

    let checkDemandas = <Spinner />

    if (!this.state.pagina.loading) {
      checkDemandas =                   
      <div>
        {this.state.demandas.length}
      </div>
    }

    return (
      <div className="animated fadeIn">

        <Card>
          <CardHeader tag="h4">Ficha de Atendimento Social</CardHeader>
          <CardBody>
            <CardText>Assistente Social: {this.state.assistente}</CardText>
            <CardText>Data: {this.state.dataCadastro}</CardText>
          </CardBody>
          <CardFooter className="text-muted">Número do Atendimento: {this.state.numAtendimento}</CardFooter>
        </Card>

        <Card>
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
                
                <Row form>

                  <Col md={5}>
                    <FormGroup>
                      <Label for="nome">Nome</Label>
                      <Input type="text" name="nome" id="nome" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>

                  <Col md={5}>
                    <FormGroup>
                      <Label for="sobrenome">Sobrenome</Label>
                      <Input type="text" name="sobrenome" id="sobrenome" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup>
                    <Label for="sobrenome">Sexo</Label>
                      <Col sm={2}>                        
                          <FormGroup check>
                            <Label check>
                              <Input 
                                type="radio" 
                                value="Masculino"                                 
                                name="sexo"                               
                                checked={this.state.sexo === "Masculino"} 
                                onChange={this.handleChanged.bind(this)}
                              /> Masculino
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input 
                                type="radio" 
                                value="Feminino" 
                                name="sexo" 
                                checked={this.state.sexo === "Feminino"}
                                onChange={this.handleChanged.bind(this)}
                              /> Feminino
                            </Label>
                          </FormGroup>                                            
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">Mãe</Label>
                      <Input type="text" id="mae" name="mae" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">Pai</Label>
                      <Input type="text" id="pai" name="pai" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Endereço/Localização</Label>
                    <Input type="text" id="endereco" name="endereco" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>
                
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      
                        <Label for="nascimento">Data de Nascimento</Label>
                        <Input type="date" id="nascimento" name="nascimento" onChange={this.handleChanged}/>
                      
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      
                        <Label htmlFor="text-input">RG</Label>
                        <Input type="text" id="rg" name="rg" onChange={this.handleChanged}/>
                      
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                        <Label htmlFor="text-input">CPF</Label>
                        <Input type="text" id="cpf" name="cpf" onChange={this.handleChanged}/>
                      
                    </FormGroup>
                  </Col>

                  </Row>

                  <Row form>
                    <Col md="4">
                      <FormGroup>                        
                        <Label htmlFor="text-input">Estado Civil</Label>
                        <Input type="text" id="estadoCivil" name="estadoCivil" onChange={this.handleChanged}/>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="text-input">Filhos</Label>
                        <Input type="text" id="filhos" name="filhos" onChange={this.handleChanged}/>
                      </FormGroup>
                     </Col>

                    <Col md="4">
                      <FormGroup>
                      <Label htmlFor="text-input">Número de Filhos</Label>
                      <Input type="text" id="numFilhos" name="numFilhos" onChange={this.handleChanged}/>
                      </FormGroup>
                    </Col>
                </Row>
                
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">Escolaridade</Label>
                      <Input type="text" id="" name="" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="text-input">Concluído</Label>
                      <Input type="text" id="statusEscolaridade" name="statusEscolaridade" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Telefones</Label>
                    <Input type="text" id="telefones" name="telefones" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Experiência Profissional</Label>
                    <Input type="textarea" id="experienciaProfissional" name="experienciaProfissional" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <Row form>
                  <Col md="3">
                    <FormGroup>
                      <Label htmlFor="text-input">Dependência Química</Label>
                      <Input type="text" id="dependencia" name="dependencia" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>

                  <Col md="9">
                    <FormGroup>
                      <Label htmlFor="text-input">Descrição Dependência</Label>
                      <Input type="text" id="descDependencia" name="descDependencia" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md="3">
                    <FormGroup>
                      <Label htmlFor="text-input">Problemas de Saúde</Label>
                      <Input type="text" id="problemasSaude" name="problemasSaude" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>

                  <Col md="9">
                    <FormGroup>
                      <Label htmlFor="text-input">Descrição Problemas de Saúde</Label>
                      <Input type="text" id="descSaude" name="descSaude" onChange={this.handleChanged}/>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="text-input">Condições de Moradia</Label>
                    <Input type="text" id="condMoradia" name="condMoradia" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Como Conheceu</Label>
                    <Input type="textarea" id="comoConheceu" name="comoConheceu" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Solicitação</Label>
                    <Input type="textarea" id="solicitacao" name="solicitacao" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Demanda Concedida</Label>
                    <Input type="text" id="demandaConcedida" name="demandaConcedida" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleCheckbox">Demanda Concedida</Label>
                  {checkDemandas}
                </FormGroup>               

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Situação Apresentada</Label>
                    <Input type="textarea" id="situacaoApresentada" name="situacaoApresentada" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="text-input">Retorno</Label>
                    <Input type="date" id="retorno" name="retorno" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">Observações</Label>
                    <Input type="textarea" id="observacoes" name="observacoes" onChange={this.handleChanged}/>
                  </Col>
                </FormGroup>

              </Form>

            </CardBody>

            <CardFooter>
              <Button onClick={this.handleSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Enviar</Button>
            </CardFooter>

          </Card>


      </div>
    );
  }
}

export default Formulario;