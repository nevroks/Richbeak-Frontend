import {FC, useCallback, useEffect, useState} from "react";
import cn from "classnames";
import classes from "./style.module.css";
// @ts-ignore
//import LogoImg from "../../assets/Logo32x32.svg?react"
import LogoImg from "../../assets/NewLogo.svg?react"
// @ts-ignore
import ShowPassImg from "../../assets/icons/iconShowPass.svg?react"
import Input from "../../components/ui/input/Input";
import Checkbox from "../../components/ui/checkbox/Checkbox";
import Button from "../../components/ui/button/Button";
import {Link} from "react-router-dom";
import {APP_PAGES_PATHS_CONSTS} from "../../utils/consts/appConsts";
import isEmailValid from "../../utils/helpers/emailValidation";
import isPasswordValid from "../../utils/helpers/passwordValidation";
import {useAppDispatch} from "../../utils/hooks/ReduxHooks.ts";
import {FormattedMessage, useIntl} from "react-intl";
import {registerThunk} from "../../utils/api/auth/helpers/registerThunk.tsx";
import useDebounce from "../../utils/hooks/useDebounce.ts";

const SignUpPage: FC = () => {
    const dispatch = useAppDispatch()
    const [signUpData, setSignUpData] = useState({email: '', password: '', confirmPassword: ''})
    const debouncedSingUpData=useDebounce(signUpData,1000)
    const [isAcceptedSendingNotifs, setNotifSending] = useState(false);
    const [hasError, setHasError] = useState({email: false, password: false, confirmPassword: false});
    const [isPassHidden, setHidden] = useState(true);
    const intl = useIntl();
    const [requestError, setRequestError] = useState<{statusCode: number, message: string, hasError: boolean}>({statusCode: 0, message: '', hasError: false})

    const getHandler = (name: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setSignUpData({...signUpData, [name]: event.target.value});
        }
    }
    const handleSignUp = async () => {
        const resp = await dispatch(registerThunk({password: signUpData.password, email: signUpData.email, userName: signUpData.email}))
        if(resp.error) {
            //@ts-ignore
            setRequestError({...resp.error.data, hasError: true})
        }}
    const callbacks = {
        setNotifSend: useCallback(() => {
            setNotifSending(prev => !prev)
        }, [setNotifSending]),
        setPassHidden: useCallback(() => {
            setHidden(prev => !prev)
        }, [setHidden])
    }

    useEffect(() => {
        setHasError(debouncedSingUpData.email ? {...hasError, email: isEmailValid(debouncedSingUpData.email)} : {
            ...hasError,
            email: false
        });
        setRequestError((prev) => {return {...prev, hasError: false}})
    }, [debouncedSingUpData.email])
    useEffect(() => {
        setHasError(debouncedSingUpData.password ? {...hasError, password: isPasswordValid(debouncedSingUpData.password)} : {
            ...hasError,
            password: false
        })
        setRequestError((prev) => {return {...prev, hasError: false}})
    }, [debouncedSingUpData.password])
    useEffect(() => {
        setHasError(debouncedSingUpData.confirmPassword ? {
            ...hasError,
            confirmPassword: !(debouncedSingUpData.confirmPassword === debouncedSingUpData.password)
        } : {...hasError, confirmPassword: false})
        setRequestError((prev) => {return {...prev, hasError: false}})
    }, [debouncedSingUpData.confirmPassword, debouncedSingUpData.password])

    return (
        <section className={classes["signInPage"]}>
            <form onSubmit={event => event.preventDefault()} className={classes["form"]}>
                <LogoImg className={classes["form__logo"]}/>
                <h4 className={classes["form__title"]}><FormattedMessage id='SignUp.title'/></h4>
                <Input error={hasError.email} errorText="Something wrong" value={signUpData.email}
                       onChange={getHandler('email')} className={classes["form__input"]} variant="form"
                       placeholder={intl.formatMessage({id: 'SignIn.email'})} type="email" wrapperCN={classes["form__input--wrapper"]}/>
                <Input error={hasError.password} errorText="Something wrong" value={signUpData.password}
                       onChange={getHandler('password')} className={classes["form__input"]} variant="form"
                       placeholder={intl.formatMessage({id: 'SignIn.password'})} type={isPassHidden ? "password" : "text"} icon={<ShowPassImg/>}
                       wrapperCN={classes["form__input--wrapper"]} onIconClick={callbacks.setPassHidden}/>
                <Input error={hasError.confirmPassword} errorText="Something wrong" value={signUpData.confirmPassword}
                       onChange={getHandler('confirmPassword')} className={classes["form__input"]} variant="form"
                       placeholder={intl.formatMessage({id: 'SignUp.repeat_pass'})} type={isPassHidden ? "password" : "text"} icon={<ShowPassImg/>}
                       wrapperCN={classes["form__input--wrapper"]} onIconClick={callbacks.setPassHidden}/>
                <Button
                    disabled={(hasError.email || hasError.password || hasError.confirmPassword || requestError.hasError) || !(!!signUpData.email && !!signUpData.password && !!signUpData.confirmPassword)}
                    onClick={() => handleSignUp()}
                    className={classes["form__button"]}
                    text={intl.formatMessage({id: 'SignIn.create_acc'})}/>]
                {requestError.hasError && <p className={cn(["text-medium", "text-400", classes["error--text"]])}>{requestError.message}</p>}
                <div className={classes["form__checkbox--wrapper"]}>
                    <Checkbox index={1} checked={isAcceptedSendingNotifs} handleChange={callbacks.setNotifSend}
                              text={intl.formatMessage({id: 'SignUp.checkbox'})}/>
                </div>
                <Link to={APP_PAGES_PATHS_CONSTS.SIGN_IN_PAGE}
                      className={cn('text-medium', 'text-500', classes["form__link"])}><FormattedMessage id='SignIn.login'/></Link>
                <p className={cn('text-small', 'text-400')}><FormattedMessage id='SignUp.info'/></p>
            </form>
        </section>
    )
}

export default SignUpPage;