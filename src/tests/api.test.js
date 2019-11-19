const fetch = require('node-fetch')
import * as api from '../js/api'

describe('api check', () => {
    it('now playing api check', async () => {
    
        expect.assertions(2)
        await api.getNowPlaying(1, fetch).then(data => {
            expect(data.results.length).toBeGreaterThan(0)
        })

        await api.getNowPlaying( -1, fetch).then(data => {
            expect(data.errors).toBeDefined()
        })
    
    })
    
    it('search api check', async () => {
        
        expect.assertions(4)
        await api.getSearchResults(null,'a', fetch).then(data => {
            expect(data.results).toBeTruthy()
        })

        await api.getSearchResults(undefined,'1234567890', fetch).then(data => {
            expect(data.results).toBeTruthy()
        })

        await api.getSearchResults(1,'aaaaaaaaaaaaaaaa', fetch).then(data => {
            expect(data.results).toBeTruthy()
        })

        await api.getSearchResults(1,'!@#$%^\"', fetch).then(data => {
            expect(data.results).toBeTruthy()
        })
    
    })
    
    it('genres api check', async () => {
        
        expect.assertions(1)
        await api.getGenres(fetch).then(data => {
            expect(data.genres).toBeDefined()
        })

    })
    
    it('similar api check', async () => {
        
        expect.assertions(3)
        await api.getSimilar( 707, fetch).then(data => {
            expect(data.results).toBeDefined()
        })

        await api.getSimilar( -1, fetch).then(data => {
            expect(data.results).toBeUndefined()
        })

        await api.getSimilar( 'abc', fetch).then(data => {
            expect(data.results).toBeUndefined()
        })
    
    })
    
    it('video api check', async () => {
        
        expect.assertions(1)
        await api.getVideos(-1, fetch).then(data => {
            expect(data.results).toBeUndefined()
        })
    
    })
    
    it('reviews api check', async () => {
        
        expect.assertions(1)
        await api.getReviews(-1, fetch).then(data => {
            expect(data.results).toBeUndefined()
        })
    
    })
})
