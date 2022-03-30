import waitScriptLoad from './waitScriptLoad'

export default async function appendScriptTag(baseURL: string, params: URLSearchParams) {
    // If the recaptcha script is already loaded, then there's no need to do anything
    if (window.grecaptcha) return

    // If the script tag already exists, then we just need to wait for it to fully load
    const existingScriptElement = document.querySelector('#recaptcha_script_element') as HTMLScriptElement | null
    const newScriptElement = document.createElement('script')

    newScriptElement.async = true
    newScriptElement.src = baseURL + '?' + params.toString()
    newScriptElement.id = 'recaptcha_script_element'

    if (!existingScriptElement) document.head.appendChild(newScriptElement)

    return waitScriptLoad(existingScriptElement || newScriptElement)
}
