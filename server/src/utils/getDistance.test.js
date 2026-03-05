const {getDistance} = require('./getDistance');

describe('getDistance', () => {
    it('should return distance between two points on earth', () => {
        const point1 = {lat: 40.7128, lng: -74.0060}; // New York
        const point2 = {lat: 34.0522, lng: -118.2437}; // Los Angeles

        const distance = getDistance(point1, point2);
        expect(distance).toBeCloseTo(3935.75, 2);
    });
});

describe('getDistance with same points', () => {
    it('should return 0 when both points are the same', () => {
        const point = {lat: 40.7128, lng: -74.0060}; // New York

        const distance = getDistance(point, point);
        expect(distance).toBe(0);
    });
});