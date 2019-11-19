import { lessString , sanitizeHTML } from '../js/helpers/functions'

describe('helper function check', () => {
    
    it('lessString check', () => {
        expect.assertions(2)
        let txt = "testText10"
        let newTxt = lessString(txt)
        expect(newTxt).toBe(txt)
        
        let txt2 = "testText10"
        for (let i=0; i<50; i++){
            txt2 = txt2.concat(txt)
        }
        let newTxt2 = lessString(txt2)
        expect(newTxt2).toHaveLength(503)
    })

    it('sanitizeHTML check', () => {
        expect.assertions(1)
        let html = `<img src="empty.gif" onload="alert('test');this.parentNode.removeChild(this);" />`
        let htmlNew = sanitizeHTML(html)
        let mustResult = `&lt;img src="empty.gif" onload="alert(\'test\');this.parentNode.removeChild(this);" /&gt;`
        expect(htmlNew).toBe(mustResult)
    })

})