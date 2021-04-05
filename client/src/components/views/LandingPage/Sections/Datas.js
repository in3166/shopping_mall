const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    },
]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "0-199($)",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "200-249($)",
        "array": [200, 499]
    },
    {
        "_id": 3,
        "name": "250-279($)",
        "array": [250, 279]
    },
    {
        "_id": 4,
        "name": "280-299($)",
        "array": [280, 299]
    },
    {
        "_id": 5,
        "name": "More than 300($)",
        "array": [300, 1500000]
    },
]

export {
    continents,
    price
}