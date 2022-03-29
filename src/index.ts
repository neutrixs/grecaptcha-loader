const baseAPIURL = 'https://www.google.com/recaptcha/api.js'
let options: reCAPTCHAAPIParam = {}

const setOptions: setOptionsFunction = function (optionsToSet) {
    options = optionsToSet
}

const load: loadFunction = async function () {
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

const waitScriptLoad: waitScriptLoadFunction = function (element) {
    return new Promise((resolve, reject) => {
        element.addEventListener('load', () => {
            resolve()
        })
        element.addEventListener('error', () => {
            reject('Script failed to load')
        })
    })
}

const waitGrecaptcha: waitGrecaptchaFunction = function () {
    return new Promise<void>(resolve => {
        grecaptcha.ready(() => {
            resolve()
        })
    })
}

export { load, setOptions }
