import './Recuperacion.css'
import { Fragment, useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepButton,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavBar from '../../components/publicComponents/Navbar/NavBar';

const steps = ['Correo Electrónico', 'Código de Verificación', 'Nueva Contraseña'];

function Recuperacion() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            case 'verificationCode':
                if (!value) return 'Código de verificación obligatorio';
                return '';
            case 'password':
                if (!value) return 'Contraseña obligatoria';
                if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
                return '';
            default:
                return '';
        }
    };

    // ! Todavia taba corrigiendo cosas pero al ver que la necesita mire si le da para trabajar sobre esto, sigo experimentos en la otra parte y breve

    const handleReset = () => {
        console.log('hola');
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
                                <form>
                                    {activeStep === 0 && (
                                        <TextField
                                            label="Correo Electrónico"
                                            name="email"
                                            // value={email}
                                            // onChange={handleChange}
                                            required
                                            fullWidth
                                            type="email"
                                            error={errors.email}
                                            helpertext={errors.email}
                                            variant='standard'
                                        />
                                    )}
                                    {activeStep === 1 && (
                                        <TextField
                                            label="Código de Verificación"
                                            name="verificationCode"
                                            // value={verificationCode}
                                            // onChange={handleChange}
                                            required
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
                                                // value={password}
                                                // onChange={handleChange}
                                                required
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
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0 || Object.values(errors).some((error) => error)}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                            style={{ background: activeStep ? '#97c7d0' : 'transparent', color: activeStep ? '#000' : 'transparent' }}
                                        >
                                            Atrás
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext} sx={{ mr: 1 }} style={{ background: '#97c7d0', color: '#000' }}>
                                            {isLastStep() ? 'Recuperar Contraseña' : 'Siguiente'}
                                        </Button>
                                    </Box>
                                </form>
                            </Fragment>
                        )}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default Recuperacion;

