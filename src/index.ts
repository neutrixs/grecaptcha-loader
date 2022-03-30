const baseAPIURL = 'https://www.google.com/recaptcha/api.js'

interface reCAPTCHAAPIParam {
    onload?: string
    render?: 'explicit' | 'onload' | string
    hl?: string
}

let options: reCAPTCHAAPIParam = {}

function setOptions(optionsToSet: reCAPTCHAAPIParam) {
    options = optionsToSet
}

async function load(): Promise<void> {
    if (window.grecaptcha) {
        return waitGrecaptcha()
    }

    const optionParam = new URLSearchParams()

    Object.entries(options).forEach(([key, value]) => {
        optionParam.append(key, value)
    })

    const existing = document.querySelector('#recaptcha_script_element') as HTMLScriptElement | null

    if (!existing) {
        const scriptElement = document.createElement('script')
        scriptElement.src = baseAPIURL + '?' + optionParam.toString()
        scriptElement.async = true
        scriptElement.id = 'recaptcha_script_element'
        document.head.appendChild(scriptElement)

        await waitScriptLoad(scriptElement)
    } else {
        await waitScriptLoad(existing)
    }

    return waitGrecaptcha()
}

function waitScriptLoad(element: HTMLScriptElement): Promise<void> {
    return new Promise((resolve, reject) => {
        element.addEventListener('load', () => {
            resolve()
        })
        element.addEventListener('error', () => {
            reject('Script failed to load')
        })
    })
}

function waitGrecaptcha() {
    return new Promise<void>(resolve => {
        grecaptcha.ready(() => {
            resolve()
        })
    })
}

export { load, setOptions }
