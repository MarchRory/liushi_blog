/**
 * md buffer转md文档
 * @param buffer md buffer
 * @returns 
 */
export const BufferToMd = (buffer: Buffer) => {
    const blob = new Blob([new Uint8Array(buffer)])
    const fileReader = new FileReader()
    let res:string = ''
    return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
        res = e.target!.result as string
        resolve(res)
    }
    fileReader.onerror = (e) => {
        console.log('md文件解析失败')
        reject(e)
    }
    fileReader.readAsText(blob)
    })
}