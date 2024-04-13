import './Recuperacion.css'
import { Fragment, useEffect, useState } from 'react';
import {
    Box, Stepper, Step, StepButton, Button, TextField, Typography, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavBar from '../../components/publicComponents/Navbar/NavBar';
import toastr from '../../assets/includes/Toastr';
import { useResetPasswordContext } from '../../context/ResetPassContext';
import { validarPassword } from '../../assets/includes/funciones';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/publicComponents/Footer/Footer';

const steps = ['Datos de Cuenta', 'Código de Verificación', 'Nueva Contraseña'];

function Recuperacion() {
    const navegar = useNavigate()

    const { responseMessage, errors: responseErrors, crearCodigo, validarCodigo, cambiarPassword } = useResetPasswordContext()
    useEffect(() => {
        toastr.clear()

        if (responseErrors.length != 0) {
            const deleteDuplicidad = new Set(responseErrors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(error => {
                return toastr.error(error)
            })
        }


        if (responseMessage.length != 0) {
            const deleteDuplicidad = new Set(responseMessage);
            const responseMessage2 = [...deleteDuplicidad]
            responseMessage2.map(msg => {
                return toastr.success(msg)
            })
        }

    }, [responseErrors, responseMessage]);

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [credential, setCredential] = useState('');
    const [identidad, setIdentidad] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(setCompleted).length;

    const isLastStep = () => activeStep === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            (activeStep === steps.length - 1 || !completed[activeStep]) && !allStepsCompleted()
                ? activeStep + 1
                : activeStep;
        setActiveStep(newActiveStep);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Validar el campo
        const error = validateField(name, value);

        // Actualizar el estado de errores
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));

        // Actualizar el valor del campo
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'id':
                setIdentidad(value);
                break;
            case 'verificationCode':
                setVerificationCode(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) return 'Correo electrónico obligatorio';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Correo electrónico no válido';
                return '';
            case 'id':
                if (!value) return 'Identidad es obligatoria';
                if (value.length > 11 || value.length <= 7) return 'No tiene los suficientes caracteres';
                return '';
            case 'verificationCode':
                if (!value) return 'Código de verificación obligatorio';
                return '';
            case 'password':
                if (!value) return 'Contraseña obligatoria';
                if (!validarPassword(value)) return 'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales';
                return '';
            default:
                return '';
        }
    };

    const submmitedResetPassword = (e) => {
        e.preventDefault()
        let data = {}
        switch (activeStep) {
            case 0:
                data = {
                    correo: email ? email : null,
                    id: identidad ? parseInt(identidad) : null
                }
                crearCodigo(data).then(data => {
                    if (data.ok) {
                        toastr.clear()
                        handleNext()
                        toastr.success('Busca en tu correo el código de recuperación')
                    }
                })
                break;
            case 1:
                data = {
                    id: identidad ? parseInt(identidad) : null,
                    token: verificationCode ? verificationCode : null
                }
                validarCodigo(data).then(data => {
                    if (data.ok) {
                        toastr.clear()
                        toastr.success(data.message)
                        setCredential(data.credential)
                        handleNext()
                    }
                })
                break;
            case 2:
                if (errors.password) {
                    toastr.error(errors.password)
                } else {
                    data = {
                        id: identidad ? parseInt(identidad) : null,
                        credential,
                        password
                    }
                    cambiarPassword(data).then(data => {
                        console.log(data)
                        if (data.ok) {
                            toastr.clear()
                            toastr.info(data.message)
                            setTimeout(() => {
                                navegar('/login')
                            }, 3000)
                        } else {
                            toastr.error(data.message)
                        }

                    })
                }
                break;
            default:
                toastr.warning("Desbordamiento de pasos")
                break;
        }

    };

    // ! Todavia taba corrigiendo cosas pero al ver que la necesita mire si le da para trabajar sobre esto, sigo experimentos en la otra parte y breve

    const handleReset = () => {
        alert('REINICIAR');
    };

    return (
        <>
            <NavBar />
            <div className="containerInput-recuperacion">
                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    Contraseña recuperada exitosamente. Inicia sesión ahora.
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reiniciar</Button>
                                </Box>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Typography sx={{ mt: 4, mb: 4 }}>{steps[activeStep]}</Typography>
                                <form onSubmit={submmitedResetPassword}>
                                    {activeStep === 0 && (
                                        <>
                                            <TextField
                                                label="Número de documento"
                                                name="id"
                                                value={identidad}
                                                onChange={handleChange}
                                                fullWidth
                                                type="number"
                                                error={errors.id}
                                                helpertext={errors.id}
                                                variant='standard'
                                            />
                                            <TextField
                                                label="Correo Electrónico"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                fullWidth
                                                type="text"
                                                error={errors.email}
                                                helpertext={errors.email}
                                                variant='standard'
                                            />
                                        </>
                                    )}
                                    {activeStep === 1 && (
                                        <TextField
                                            label="Código de Verificación"
                                            name="verificationCode"
                                            value={verificationCode}
                                            onChange={handleChange}
                                            fullWidth
                                            error={errors.verificationCode}
                                            helpertext={errors.verificationCode}
                                            variant='standard'
                                        />
                                    )}
                                    {activeStep === 2 && (
                                        <FormControl variant='standard' fullWidth sx={{ mt: 2, mb: 2 }}>
                                            <InputLabel htmlFor="password">Nueva Contraseña</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                variant='standard'
                                                value={password}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            style={{ color: '#000' }}
                                                            onClick={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                error={errors.password}
                                                helpertext={errors.password}
                                            />
                                        </FormControl>
                                    )}
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button type='submit' sx={{ mr: 1 }} style={{ background: '#97c7d0', color: '#000' }}>
                                            {isLastStep() ? 'Cambiar Contraseña' : 'Siguiente'}
                                        </Button>
                                    </Box>
                                </form>
                            </Fragment>
                        )}
                    </div>
                </Box>
            </div>
            <Footer />
        </>
    );
}

export default Recuperacion;

