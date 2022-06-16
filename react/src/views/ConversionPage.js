import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import FormControl from "@mui/material/FormControl";
import { currencies } from "../helpers/Currencies";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import {
    AppBar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
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
    progress: undefined,
};

export const ConversionPage = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [loginPassword, setLoginPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currency, setCurrency] = useState("");
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState("0.00");
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [minValueFee, setMinValueFee] = useState("0.00");
    const [maxValueFee, setMaxValueFee] = useState("0.00");
    const [boletoFee, setBoletoFee] = useState("0.00");
    const [creditCardFee, setCreditCardFee] = useState("0.00");
    const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const handleCurrencyChange = (currency) => {
        const symbol = currency.split(";")[1];
        setCurrency(currency);
        setSymbol(symbol);
    };

    const handleLoginDialogClose = () => {
        setLoginDialogOpen(!loginDialogOpen);
    };

    useEffect(() => {
        getFees();
    }, []);

    const getFees = () => {
        axios
            .get("http://127.0.0.1:8000/api/cotation_fee")
            .then(function (response) {
                setBoletoFee(response.data.data.boleto_fee);
                setCreditCardFee(response.data.data.credit_card_fee);
                setMinValueFee(response.data.data.min_value_fee);
                setMaxValueFee(response.data.data.max_value_fee);
            });
    };

    const handleRegister = () => {
        const request = {};
    };

    const handleLogin = () => {
        const request = {
            email: loginEmail,
            password: loginPassword,
        };

        axios
            .post("http://127.0.0.1:8000/api/login", request)
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
            });
    };

    const handleLogout = () => {
        localStorage.setItem("token", null);
        localStorage.setItem("userName", null);
        setJwtToken(null);
        setUserName(null);
    };

    return (
        <>
            <div>
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
                                    id="name"
                                    label="Nome Completo"
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
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="reg_password"
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="confirm_password"
                                    label="Confirme sua senha"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={handleLoginDialogClose}
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
                                <img
                                    src={
                                        "http://localhost:3000/img/oliveira_trust.png"
                                    }
                                    alt="loading..."
                                />
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
                                            onClick={handleLogout}
                                            variant="text"
                                        >
                                            Taxas
                                        </Button>

                                        <Button
                                            onClick={handleLogout}
                                            variant="text"
                                        >
                                            Deslogar
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
                                    <Grid item xs={12}>
                                        <Div>
                                            {`Taxa de ${minValueFee}% para valores abaixo de R$3000.00 e para valores acima de R$3000.00 ${maxValueFee}%`}
                                        </Div>
                                    </Grid>
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
                                                        handleCurrencyChange(
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
                                                        handleCurrencyChange(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    {currencies.map(
                                                        (currency) => {
                                                            return (
                                                                <MenuItem
                                                                    value={
                                                                        currency.code +
                                                                        ";" +
                                                                        currency.symbol
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
                                                    disabled={currency === ""}
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
                                            >
                                                Realizar cotação
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <hr />
                                        </Grid>

                                        <Grid
                                            justifyContent="flex-end"
                                            container
                                            xs={12}
                                        >
                                            <table
                                                style={{ textAlign: "left" }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <th>Preço: </th>
                                                        <td>R$ {amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Taxa da Forma de
                                                            Pagamento:
                                                        </th>
                                                        <td>R$</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Taxa de valor
                                                            minimo:
                                                        </th>
                                                        <td>R$ </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total:</th>
                                                        <td>R$ </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
