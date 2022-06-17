import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { currencies } from "../helpers/Currencies";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../img/oliveira_trust.png";

import {
    Box,
    Grid,
    Select,
    InputLabel,
    FormControl,
    Radio,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Toolbar,
    IconButton,
    Container,
    MenuItem,
    AppBar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CircularProgress,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    color: "red",
}));

const toastProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

const spin = {
    content: "",
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: "9999",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
};

export const ConversionPage = () => {
    const [spinner, setSpinner] = useState(false);
    const [configBoletoFee, setConfigBoletoFee] = useState("");
    const [configCreditCardFee, setConfigCreditCardFee] = useState("");
    const [configMinValueFee, setConfigMinValueFee] = useState("");
    const [configMaxValueFee, setConfigMaxValueFee] = useState("");
    const [feeDialogOpen, setFeeDialogOpen] = useState(false);
    const [cotation, setCotation] = useState({
        originCurrency: "",
        destinationCurrency: "",
        conversionAmount: "",
        paymentMethod: "",
        currencyDestinyValue: "",
        purchaseAmount: "",
        paymentMethodFee: "",
        conversionFee: "",
        conversionWithFee: "",
    });
    const [loginEmail, setLoginEmail] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [loginPassword, setLoginPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currency, setCurrency] = useState("");
    const [amount, setAmount] = useState("0.00");
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [minValueFee, setMinValueFee] = useState("0.00");
    const [maxValueFee, setMaxValueFee] = useState("0.00");
    const [boletoFee, setBoletoFee] = useState("0.00");
    const [creditCardFee, setCreditCardFee] = useState("0.00");
    const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const handleLoginDialogClose = () => {
        setLoginDialogOpen(!loginDialogOpen);
    };

    const handleFeeDialogClose = () => {
        setFeeDialogOpen(!feeDialogOpen);
    };

    useEffect(() => {
        getFees();
    }, []);

    const getFees = () => {
        axios
            .get(process.env.REACT_APP_LARAVEL_URL + "/api/cotation_fee")
            .then(function (response) {
                setBoletoFee(response.data.data.boleto_fee);
                setCreditCardFee(response.data.data.credit_card_fee);
                setMinValueFee(response.data.data.min_value_fee);
                setMaxValueFee(response.data.data.max_value_fee);

                setConfigBoletoFee(response.data.data.boleto_fee);
                setConfigCreditCardFee(response.data.data.credit_card_fee);
                setConfigMinValueFee(response.data.data.min_value_fee);
                setConfigMaxValueFee(response.data.data.max_value_fee);
            });
    };

    const handleMakeCotation = () => {
        const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };

        const request = {
            originCurrency: "BRL",
            destinationCurrency: currency,
            conversionAmount: amount,
            paymentMethod: paymentMethod,
        };
        setSpinner(true);
        axios
            .post(
                process.env.REACT_APP_LARAVEL_URL + "/api/make_cotation",
                request,
                headers
            )
            .then(function (request) {
                setCotation(request.data.data);
                toast.success("Cotação realizada com sucesso", toastProps);
            })
            .catch(function (error) {
                toast.error(error.response.data.errorsMessage[0], toastProps);
            })
            .finally(() => {
                setSpinner(false);
            });
    };

    const handleDisabledMakeCotation = () => {
        console.log(jwtToken);

        if (
            currency === "" ||
            jwtToken === "" ||
            jwtToken === null ||
            amount === "0.00" ||
            amount === ""
        )
            return true;

        return false;
    };

    const handleRegister = () => {
        if (registerPassword !== confirmPassword) {
            toast.error("Campo senha invalido", toastProps);
            return null;
        }

        if (registerEmail === "") {
            toast.error("Campo email obrigatório", toastProps);
            return null;
        }

        if (registerPassword === "") {
            toast.error("Campo senha obrigatório", toastProps);
            return null;
        }

        if (registerName === "") {
            toast.error("Campo nome completo obrigatório", toastProps);
            return null;
        }

        const request = {
            email: registerEmail,
            password: registerPassword,
            name: registerName,
        };
        setSpinner(true);
        axios
            .post(process.env.REACT_APP_LARAVEL_URL + "/api/register", request)
            .then(function () {
                toast.success("Cadastro realizado com sucesso", toastProps);
                setRegisterEmail("");
                setRegisterPassword("");
                setRegisterName("");
            })
            .catch(function (error) {
                toast.error(error.response.data.errorMessages[0], toastProps);
            })
            .finally(() => {
                setSpinner(false);
            });
    };

    const handleLogin = () => {
        const request = {
            email: loginEmail,
            password: loginPassword,
        };
        setSpinner(true);
        axios
            .post(process.env.REACT_APP_LARAVEL_URL + "/api/login", request)
            .then(function (response) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userName", response.data.userName);
                setJwtToken(response.data.token);
                setUserName(response.data.userName);
                setLoginDialogOpen(false);
                toast.success("Login realizado com sucesso!", toastProps);
            })
            .catch(function (error) {
                toast.error(error.response.data.message, toastProps);
            })
            .finally(() => {
                setSpinner(false);
            });
    };

    const handleLogout = () => {
        setJwtToken("");
        setUserName("");
        localStorage.clear();
    };

    const handleFeeSave = () => {
        const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };
        const request = {
            creditCardFee: configCreditCardFee,
            boletoFee: configBoletoFee,
            minValueFee: configMinValueFee,
            maxValueFee: configMaxValueFee,
        };
        setSpinner(true);
        axios
            .put(
                process.env.REACT_APP_LARAVEL_URL + "/api/cotation_fee",
                request,
                headers
            )
            .then(function (response) {
                setCreditCardFee(configCreditCardFee);
                setBoletoFee(configBoletoFee);
                setMinValueFee(configMinValueFee);
                setMaxValueFee(configMaxValueFee);
                setFeeDialogOpen(false);
                toast.success("Taxas salva com sucesso!", toastProps);
            })
            .catch(function (error) {
                toast.error(error.response.data.errorsMessage[0], toastProps);
            })
            .finally(() => {
                setSpinner(false);
            });
    };

    return (
        <>
            <div>
                {spinner && <CircularProgress style={spin} disableShrink />}

                <ToastContainer />
                <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="log_email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    onChange={(event) =>
                                        setLoginEmail(event.target.value)
                                    }
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="log_password"
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                    onChange={(event) =>
                                        setLoginPassword(event.target.value)
                                    }
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleLogin()}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <hr></hr>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogTitle>Cadastro</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="reg_name"
                                    label="Nome Completo"
                                    required
                                    onChange={(event) =>
                                        setRegisterName(event.target.value)
                                    }
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="reg_email"
                                    label="Email"
                                    required
                                    type="email"
                                    onChange={(event) =>
                                        setRegisterEmail(event.target.value)
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="reg_password"
                                    label="Senha"
                                    required
                                    type="password"
                                    fullWidth
                                    onChange={(event) =>
                                        setRegisterPassword(event.target.value)
                                    }
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="confirm_password"
                                    required
                                    label="Confirme sua senha"
                                    type="password"
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={handleRegister}
                                    variant="contained"
                                    fullWidth
                                >
                                    Cadastrar-se
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoginDialogClose}>Fechar</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={feeDialogOpen} onClose={handleFeeDialogClose}>
                    <DialogTitle>Configuração de Taxas</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <CurrencyTextField
                                        label={`Taxa de Cartão de Crédito`}
                                        fullWidth
                                        variant="standard"
                                        value={configCreditCardFee}
                                        currencySymbol={"%"}
                                        minimumValue="1.00"
                                        maximumValue="100.00"
                                        position="end"
                                        outputFormat="number"
                                        onChange={(event) =>
                                            setConfigCreditCardFee(
                                                event.target.value
                                            )
                                        }
                                        decimalCharacter="."
                                        digitGroupSeparator=""
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <CurrencyTextField
                                        label={`Taxa de Boleto`}
                                        fullWidth
                                        variant="standard"
                                        value={configBoletoFee}
                                        currencySymbol={"%"}
                                        minimumValue="1.00"
                                        maximumValue="100.00"
                                        position="end"
                                        outputFormat="number"
                                        onChange={(event) =>
                                            setConfigBoletoFee(
                                                event.target.value
                                            )
                                        }
                                        decimalCharacter="."
                                        digitGroupSeparator=""
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <CurrencyTextField
                                    label={`Taxa de valor minimo(abaixo de 3000.00)`}
                                    fullWidth
                                    variant="standard"
                                    value={configMinValueFee}
                                    currencySymbol={"%"}
                                    minimumValue="1.00"
                                    maximumValue="100.00"
                                    position="end"
                                    outputFormat="number"
                                    onChange={(event) =>
                                        setConfigMinValueFee(event.target.value)
                                    }
                                    decimalCharacter="."
                                    digitGroupSeparator=""
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CurrencyTextField
                                    label={`Taxa de valor máximo(acima de 3000.00)`}
                                    fullWidth
                                    variant="standard"
                                    value={configMaxValueFee}
                                    currencySymbol={"%"}
                                    minimumValue="1.00"
                                    maximumValue="100.00"
                                    position="end"
                                    outputFormat="number"
                                    onChange={(event) =>
                                        setConfigMaxValueFee(event.target.value)
                                    }
                                    decimalCharacter="."
                                    digitGroupSeparator=""
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleFeeSave()}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFeeDialogClose}>Fechar</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        style={{ background: "transparent", boxShadow: "none" }}
                        position="static"
                    >
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <img src={logo} alt="loading..." />
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                News
                            </Typography>
                            {!jwtToken && (
                                <Button
                                    onClick={handleLoginDialogClose}
                                    variant="text"
                                >
                                    Login
                                </Button>
                            )}

                            {jwtToken && (
                                <>
                                    <ButtonGroup
                                        variant="text"
                                        aria-label="text button group"
                                    >
                                        <Button
                                            onClick={handleFeeDialogClose}
                                            variant="text"
                                        >
                                            Taxas
                                        </Button>

                                        <Button
                                            onClick={handleLogout}
                                            variant="text"
                                        >
                                            Sair
                                        </Button>
                                        <Button
                                            onClick={() => null}
                                            variant="text"
                                        >
                                            {userName}
                                        </Button>
                                    </ButtonGroup>
                                </>
                            )}
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        style={{ background: "transparent", boxShadow: "none" }}
                        position="static"
                    >
                        <Container maxWidth="xl">
                            <Toolbar disableGutters></Toolbar>
                        </Container>
                    </AppBar>
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid
                            xs={12}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid container xs={12} spacing={3}>
                                        <Grid item xs={4}>
                                            <FormControl
                                                fullWidth
                                                sx={{ m: 1 }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    Moeda de Origem
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={"BRL"}
                                                    variant="standard"
                                                    disabled={true}
                                                    label="Moeda de Origem"
                                                    onChange={(event) =>
                                                        setCurrency(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    {currencies.map(
                                                        (currency) => {
                                                            return (
                                                                <MenuItem value="BRL">
                                                                    BRL
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl
                                                fullWidth
                                                sx={{ m: 1 }}
                                            >
                                                <CurrencyTextField
                                                    label={`Valor a ser convertido`}
                                                    fullWidth
                                                    variant="standard"
                                                    value={amount}
                                                    currencySymbol={"R$"}
                                                    outputFormat="number"
                                                    onChange={(event) =>
                                                        setAmount(
                                                            event.target.value
                                                        )
                                                    }
                                                    decimalCharacter="."
                                                    digitGroupSeparator=""
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl
                                                fullWidth
                                                sx={{ m: 1 }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    Moeda de Destino
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={currency}
                                                    variant="standard"
                                                    label="Moeda de Destino"
                                                    onChange={(event) =>
                                                        setCurrency(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    {currencies.map(
                                                        (currency) => {
                                                            return (
                                                                <MenuItem
                                                                    value={
                                                                        currency.code
                                                                    }
                                                                >
                                                                    {
                                                                        currency.code
                                                                    }
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl
                                                fullWidth
                                                sx={{ m: 1 }}
                                            >
                                                <FormLabel id="demo-controlled-radio-buttons-group">
                                                    Forma de Pagamento
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={paymentMethod}
                                                    onChange={(event) =>
                                                        setPaymentMethod(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    <FormControlLabel
                                                        value="credit"
                                                        control={<Radio />}
                                                        label={`Cartão de Crédito(Taxa de ${creditCardFee}%)`}
                                                    />
                                                    <FormControlLabel
                                                        value="boleto"
                                                        control={<Radio />}
                                                        label={`Boleto(Taxa de ${boletoFee}%)`}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                disabled={handleDisabledMakeCotation()}
                                                onClick={() =>
                                                    handleMakeCotation()
                                                }
                                            >
                                                Realizar cotação
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <hr />
                                        </Grid>
                                    </Grid>
                                    {cotation.originCurrency !== "" && (
                                        <Grid container xs={12}>
                                            <table
                                                style={{
                                                    textAlign: "left",
                                                }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                            Moeda de origem:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.originCurrency
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Moeda de destino:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.destinationCurrency
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Valor para
                                                            Conversão:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.conversionAmount
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Forma de pagamento:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.paymentMethod
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Valor da moeda de
                                                            destino usado para
                                                            conversão:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.currencyDestinyValue
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Valor comprado:</th>
                                                        <td>
                                                            {
                                                                cotation.purchaseAmount
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Taxa de pagamento:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.paymentMethodFee
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Taxa de conversão:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.conversionFee
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Valor utilizado para
                                                            conversão
                                                            descontando as
                                                            taxas:
                                                        </th>
                                                        <td>
                                                            {
                                                                cotation.conversionWithFee
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Grid>
                                    )}
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <ul>
                                                <li>
                                                    <Div>
                                                        {`Taxa de ${minValueFee}% para valores abaixo de R$3000.00 e para valores acima de R$3000.00 ${maxValueFee}%`}
                                                    </Div>
                                                </li>
                                                <li>
                                                    <Div>
                                                        Valor minimo de
                                                        R$1000.00 e valor máximo
                                                        de R$100000.00
                                                    </Div>
                                                </li>
                                                <li>
                                                    <Div>
                                                        É necessário estar
                                                        logado para fazer a
                                                        cotação
                                                    </Div>
                                                </li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
};
