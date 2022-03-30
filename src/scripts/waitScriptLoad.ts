export default function waitScriptLoad(element: HTMLScriptElement): Promise<void> {
    return new Promise((resolve, reject) => {
        element.addEventListener('load', () => {
            resolve()
        })
        element.addEventListener('error', () => {
            reject('Script failed to load')
        })
    })
}
