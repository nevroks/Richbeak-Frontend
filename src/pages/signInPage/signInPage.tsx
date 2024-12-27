import {FC, useCallback, useEffect, useState} from "react";
import cn from "classnames";
import classes from "./style.module.css";
// @ts-ignore
import LogoImg from "../../assets/NewLogo.svg?react"
// @ts-ignore
import ShowPassImg from "../../assets/icons/iconShowPass.svg?react"
import Input from "../../components/ui/input/Input";
import Checkbox from "../../components/ui/checkbox/Checkbox";
import Button from "../../components/ui/button/Button";
import isEmailValid from "../../utils/helpers/emailValidation";
import isPasswordValid from "../../utils/helpers/passwordValidation";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch} from "../../utils/hooks/ReduxHooks.ts";
import {loginThunk} from "../../utils/api/auth/helpers/loginThunk.tsx";
import useDebounce from "../../utils/hooks/useDebounce.ts";

const SignInPage: FC = () => {
    const dispatch = useAppDispatch()
    const [authData, setAuthData] = useState({email: '', password: ''})
    const debouncedAuthData = useDebounce(authData, 1000)
    const [isPassRemembered, setPassRemember] = useState(false);
    const [hasError, setHasError] = useState({email: false, password: false});
    const [isPassHidden, setHidden] = useState(true);
    const intl = useIntl();
    const [requestError, setRequestError] = useState<{
        statusCode: number,
        message: string,
        hasError: boolean
    }>({statusCode: 0, message: '', hasError: false})

    const getHandler = (name: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setAuthData({...authData, [name]: event.target.value});
        }
    }

    const handleSignIn = async () => {
        const resp = await dispatch(loginThunk({password: authData.password, email: authData.email}))
        if (resp.error) {
            //@ts-ignore
            setRequestError({...resp.error.data, hasError: true})
        }
    }
    const callbacks = {
        setPassRemember: useCallback(() => {
            setPassRemember(prev => !prev)
        }, [setPassRemember]),
        setPassHidden: useCallback(() => {
            setHidden(prev => !prev)
        }, [setHidden])
    }

    useEffect(() => {
        setHasError(debouncedAuthData.email ? {
            ...hasError,
            email: isEmailValid(debouncedAuthData.email)
        } : {...hasError, email: false});
        setRequestError((prev) => {
            return {...prev, hasError: false}
        })
    }, [debouncedAuthData.email])
    useEffect(() => {
        setHasError(debouncedAuthData.password ? {
            ...hasError,
            password: isPasswordValid(debouncedAuthData.password)
        } : {
            ...hasError,
            password: false
        })
        setRequestError((prev) => {
            return {...prev, hasError: false}
        })
    }, [debouncedAuthData.password])

    return (
        <section className={classes["signInPage"]}>
            <form onSubmit={event => event.preventDefault()} className={classes["form"]}>
                <LogoImg className={classes["form__logo"]}/>
                <h4 className={classes["form__title"]}><FormattedMessage id='SignIn.title'/></h4>
                <Input error={hasError.email} errorText="Something wrong" value={authData.email}
                       onChange={getHandler('email')} className={classes["form__input"]} variant="form"
                       placeholder={intl.formatMessage({id: 'SignIn.email'})} type="email"
                       wrapperCN={classes["form__input--wrapper"]}/>
                <Input error={hasError.password} errorText="Something wrong" value={authData.password}
                       onChange={getHandler('password')} className={classes["form__input"]} variant="form"
                       placeholder={intl.formatMessage({id: 'SignIn.password'})}
                       type={isPassHidden ? "password" : "text"} icon={<ShowPassImg/>}
                       wrapperCN={classes["form__input--wrapper"]} onIconClick={callbacks.setPassHidden}/>
                <div className={classes["form__checkbox--wrapper"]}>
                    <Checkbox
                        index={1}
                        checked={isPassRemembered}
                        handleChange={callbacks.setPassRemember}
                        text={intl.formatMessage({id: 'SignIn.save'})}
                    />
                </div>
                <Button disabled={(hasError.email || hasError.password) || !(!!authData.email && !!authData.password)}
                        onClick={() => handleSignIn()}
                        className={classes["form__button"]}
                        text={intl.formatMessage({id: 'SignIn.login'})}/>
                {requestError.hasError &&
                    <p className={cn(["text-medium", "text-400", classes["error--text"]])}>{requestError.message}</p>}
                {/*<Link to={APP_PAGES_PATHS_CONSTS.SIGN_UP_PAGE}*/}
                {/*      className={cn('text-medium', 'text-500', classes["form__link"])}><FormattedMessage id='SignIn.create_acc'/></Link>*/}
                {/*<Link to={APP_PAGES_PATHS_CONSTS.RESET_PASSWORD_PAGE}*/}
                {/*      className={cn('text-medium', 'text-500', classes["form__link"])}><FormattedMessage id='SignIn.recover_pass'/></Link>*/}
                <p className={cn('text-small', 'text-400')}><FormattedMessage id='SignIn.info'/></p>
            </form>
        </section>
    )
}

export default SignInPage;