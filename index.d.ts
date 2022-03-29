interface reCAPTCHAAPIParam {
    onload?: string
    render?: 'explicit' | 'onload' | string
    hl?: string
}

type setOptionsFunction = (optionsToSet: reCAPTCHAAPIParam) => void
type loadFunction = () => Promise<void>
type waitScriptLoadFunction = (element: HTMLScriptElement) => Promise<void>
type waitGrecaptchaFunction = () => Promise<void>
