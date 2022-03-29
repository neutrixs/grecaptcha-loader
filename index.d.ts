interface reCAPTCHAAPIParam {
    onload?: string
    render?: 'explicit' | 'onload' | string
    hl?: string
}

type loadFunction = (options?: reCAPTCHAAPIParam) => Promise<void>
type waitScriptLoadFunction = (element: HTMLScriptElement) => Promise<void>
type waitGrecaptchaFunction = () => Promise<void>
