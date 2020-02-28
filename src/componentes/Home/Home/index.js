import React, {Component} from "react"
import {MdSearch, MdStar} from "react-icons/md"
import axios from "axios"
import {Link} from "react-router-dom";
import {Navbar,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Container,
    Col,
    Form,
    Card,
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle,
    Row,
    Spinner
} from "reactstrap";


class Home extends Component{

    state={         // foi criado para receber o objeto seguidores
        carregando: false,
        meteoro:[]               // array vazio para receber os seguidores 
        
    }
    meteoroDaPaixao= async (evento)=>{    // async irei utilizar para consumir API
        this.setState({carregando:true})
        evento.preventDefault()
        // evento.target procura definicao
        const form = evento.target 

        const InputGroup= form.children [0]

        const input = InputGroup.children[0]


        //const {data} = await axios (`https://api.github.com/users/${input.value}/followers`) outro metodo com a desistruturação 
       
        const meteoro = await axios (`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=ePIri7JLxcZM43VvZJdQ64fmeybu8ynA5pFwHrWS`) // await buscar definição* 
              this.setState({meteoro: [meteoro.data, ...this.state.meteoro], carregando: false})  
              // estou setando o seguidores de states no seguidres da const, e estou colocando mais de 1 card sem
              //recarregar outro por cima
        
            console.log (meteoro.data);
            // ATÉ AQUI SÓ ESTÁ MOSTRANDO NO CONSOLE


        // consumindo api do github 
    } 
    

    render(){
        return (
            <>
                {/* USUARIO LOGADO  */}
               <Navbar color= "danger">         
             
                <Container className="d-flex justify-content-center">
                     
                        <img className= "rounded-circle border border-white mr-1"
                        width="80"
                        src="https://www.thispersondoesnotexist.com/image" 
                        alt= "pessoa aleatória"/>
                        <span className= "text=white">
                            Logado como 
                            
                        <Link className= "text-white font-weight-bold ml-3" to = "/">
                        {this.props.match.params.usuario}
                        {/* BUSCA O USUARIO */}
                        
                        </Link>
                        </span>
                    
                </Container>  
               </Navbar>         
            <Navbar color ="dark" fixed="bottom">
                <Container className="d-flex justify-content-center">
                    <Col xs="12" md="6">
                        <Form onSubmit={this.meteoroDaPaixao}>
                            <InputGroup>
                                <Input type="date"/>
                                    <InputGroupAddon addonType= "append">
                                        <Button color = "danger">
                                        {this.state.carregando ? (<Spinner color= "light" size= "sm"/>): (<MdSearch size = "20"/>)}
                                        
                                        </Button>
                                    </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </Col>
                </Container>
            </Navbar>
           {/* passsar o CARD dentro do Map para aparecer na tela */}
          


        {this.state.carregando ? (                     // sempre sera TRUE
        <Container className="h-100% d-flex flex-column justify-content-center align-items-center">
            
                <Spinner color= "dark" size ="lg" />
                <span>Carregando....</span>
        </Container>
    ) : ( <Container className="mt- 3 mb-5">
            <Row>
                    {this.state.meteoro.map((meteoro) =>(
                <Col className="d-flex"xs = '12' md= "4"> 
                    <Card className="text-white mb-2"color="danger">
                        <CardImg top width="100%" height="30%" src= {meteoro.url} alt={meteoro.title} /> 
                            <CardBody>
                                    <CardTitle className="h3 text-center"> {meteoro.title}</CardTitle>
                                    <CardSubtitle className="text-center">{meteoro.date.split("-").reverse().join("/")}</CardSubtitle> 
                                    {/* converteu a data para o padrao  */}
                                    <CardText className= "text-justify">{meteoro.explanation}</CardText>
                    
                            </CardBody>
                    </Card>
                </Col>
    ))}
            </Row>
        </Container>
        
    )}

        {this.state.meteoro.length === 0 && (
            <Container className="h-100% d-flex flex-column justify-content-center align-items-center">
            
                <MdStar color= "dark" size ="lg" />
                <h3>Escolha uma data !</h3>
            </Container>
        )}   

        {/* {this.state.carregando && (                     // sempre sera TRUE
        <Container className="h-100% d-flex flex-column justify-content-center align-items-center">
            
                <Spinner color= "dark" size ="lg" />
                <span>Carregando....</span>
        </Container>
        )}  metodod para carregando*/}
            

            </> // fragment nao tera problemas visuais igual a DIV

        )
    }
}
export default Home;

