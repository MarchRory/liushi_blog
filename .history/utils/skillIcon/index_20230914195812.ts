//  后面应该从server获取
interface skill{
    skillName: string,
    icon: string
}
export const skill: Array<skill> = [
    {
        skillName: 'HTML',
        icon: 'logos:html-5'
    }, {
        skillName: 'CSS',
        icon: 'logos:css-3'
    }, {
        skillName: 'JavaScript',
        icon: 'logos:javascript'
    }, {
        skillName: 'Node.js',
        icon: 'logos:nodejs'
    }, {
        skillName: 'Webpack',
        icon: 'logos:webpack'
    }, {
        skillName: 'Axios',
        icon: 'logos:axios'
    }, {
        skillName: 'Vite',
        icon: 'logos:vitejs'
    }, {
        skillName: 'Vue.js',
        icon: 'logos:vue'
    }, , {
        skillName: 'TypeScript',
        icon: 'vscode-icons:file-type-typescript-official'
    }, {
        skillName: 'Express',
        icon: 'logos:express'
    }, {
        skillName: 'MongoDB',
        icon: 'logos:mongodb'
    }, {
        skillName: 'Nuxt.js',
        icon: 'logos:nuxt-icon'
    }
]