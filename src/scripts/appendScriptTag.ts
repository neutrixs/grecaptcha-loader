import waitScriptLoad from './waitScriptLoad'

export default async function appendScriptTag(baseURL: string, params: URLSearchParams) {
    if (window.grecaptcha) return

    const existingScriptElement = document.querySelector('#recaptcha_script_element') as HTMLScriptElement | null
    const newScriptElement = document.createElement('script')

    newScriptElement.async = true
    newScriptElement.src = baseURL + '?' + params.toString()
    newScriptElement.id = 'recaptcha_script_element'

    if (!existingScriptElement) document.head.appendChild(newScriptElement)

    return waitScriptLoad(existingScriptElement || newScriptElement)
}
