import { Secret, sign, verify } from "jsonwebtoken"
import toast from "react-hot-toast"

export interface productOffTimerProps {
    hours: number | string
    days: number | string
    minutes: number | string
    seconds: number | string
}

interface unknownObject {
    [key: string]: unknown
}

interface FetchOptions {
    method?: 'POST' | 'DELETE' | 'PUT'
    body?: unknownObject
}

type FetchResponse<T> = {
    data: T | null;
    error: object | null
};

export interface inputValidationProps {
    title: string
    isValid: boolean
    errorMessage: string
}

const getTimer = (date?: string) => {

    const currentDate = new Date();
    const endOfTimer = date || new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);

    const differenceBetweenDates = (endOfTimer instanceof Date ? endOfTimer.getTime() : new Date(endOfTimer).getTime()) - currentDate.getTime();
    const secondsRemaining = Math.floor(differenceBetweenDates / 1000);

    const hours = Math.floor(secondsRemaining / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((secondsRemaining % 3600) / 60).toString().padStart(2, "0");
    const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

    return {
        days: Math.floor(differenceBetweenDates / (60 * 60 * 24 * 1000)).toString().padStart(2, "0"),
        hours,
        minutes,
        seconds
    } satisfies productOffTimerProps;
}

const fetchData = async<T>(url: string, options?: FetchOptions): Promise<FetchResponse<T>> => {

    let response: FetchResponse<T> = { data: null, error: null, }

    try {

        // different options for different request  
        let res = options?.method ?
            await fetch(url, { method: options.method, body: JSON.stringify(options.body), headers: { 'Content-Type': 'application/json' } })
            :
            await fetch(url);

        if (res.ok) {
            response.data = await res.json();
        } else throw new Error(`HTTP error with ${res.status} code!`);

    } catch (error) { response.error = error!, console.log(error) }

    return response;
};

const showToast = (status: boolean, message: string, duration: number = 2500) => {
    toast[status ? 'success' : 'error'](message,
        {
            position: "top-right",
            duration,
            style: {
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'cneter',
                fontFamily: 'peyda',
                backgroundColor: '#292A2D',
                color: '#e3e3e3',
                fontSize: '17px',
                padding: '9px',
                border: `2px solid #${status ? '16723A' : 'FD0019'}`,
                borderRadius: '6px',
                zIndex: '999999',
                wordSpacing: '4px'
            }
        }
    )
}

const priceDiscountCalculator = (price: number, discount: number) => {
    const priceAfterDiscount = price - (price * (discount / 100))
    return priceAfterDiscount.toLocaleString('fa-Ir')
}

const tokenDecoder = (token: string) => verify(token, process.env.secretKey as Secret)

const tokenGenerator = (data: object, days: number = 7) => sign({ email: data }, process.env.secretKey as Secret, { expiresIn: 60 * 60 * 24 * days })

const isEmptyInput = (payload: {}, props: string[]) => {

    const expectedProps = props;
    const actualProps = Object.keys(payload);
    const values = Object.values(payload)

    if (values.some(value => { if (!String(value).trim().length) return true })) return true // check for all value of properties not to be empty

    if (expectedProps.some(prop => !actualProps.includes(prop))) true

    return false
};

const inputValidations = (title: string, value: string, confirmPassword?: string): inputValidationProps | undefined => {

    const inputRules = [
        { title: 'username', isValid: value.length > 3, errorMessage: 'طول نام کاربری باید بیشتر از ۳ و کمتر از ۲۰ کاراکتر باشد' },
        { title: 'email', isValid: /^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/.test(value), errorMessage: 'ایمیل نامعتبر است' },
        { title: 'password', isValid: value.length < 20 && value.length > 7, errorMessage: 'طول رمز عبور باید بیشتر از ۷ و کمتر از ۲۰ کاراکتر باشد' },
        { title: 'confirmPassword', isValid: Boolean(value === confirmPassword), errorMessage: 'رمز تایید با رمز وارد شده تناقض دارد' }
    ]

    const inputTargetToCheck = inputRules.find(inputTitle => inputTitle.title == title)

    return inputTargetToCheck;
}

export {
    getTimer,
    fetchData,
    showToast,
    priceDiscountCalculator,
    tokenDecoder,
    tokenGenerator,
    isEmptyInput,
    inputValidations
}